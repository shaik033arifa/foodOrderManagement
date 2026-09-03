package foodorderbackend.service;

import foodorderbackend.entity.Cart;
import foodorderbackend.entity.CartItem;
import foodorderbackend.entity.Order;
import foodorderbackend.entity.OrderItem;
import foodorderbackend.entity.User;
import foodorderbackend.repository.CartItemRepository;
import foodorderbackend.repository.CartRepository;
import foodorderbackend.repository.OrderItemRepository;
import foodorderbackend.repository.OrderRepository;
import foodorderbackend.repository.UserRepository;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final UserRepository userRepository;

    public OrderService(
            OrderRepository orderRepository,
            OrderItemRepository orderItemRepository,
            CartRepository cartRepository,
            CartItemRepository cartItemRepository,
            UserRepository userRepository) {

        this.orderRepository = orderRepository;
        this.orderItemRepository = orderItemRepository;
        this.cartRepository = cartRepository;
        this.cartItemRepository = cartItemRepository;
        this.userRepository = userRepository;
    }


    // =========================================================
    // PLACE ORDER
    // =========================================================

    public Order placeOrder(Long userId) {

        // Find user
        User user = userRepository.findById(userId)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));


        // Find cart
        Cart cart = cartRepository.findByUserId(userId)
                .orElseThrow(() ->
                        new RuntimeException("Cart not found"));


        // Get cart items
        List<CartItem> cartItems =
                cartItemRepository.findByCartId(cart.getId());


        // Check empty cart
        if (cartItems.isEmpty()) {

            throw new RuntimeException(
                    "Cart is empty"
            );
        }


        // Calculate total
        double totalAmount = 0.0;


        for (CartItem cartItem : cartItems) {

            double price =
                    cartItem.getFood().getPrice();

            int quantity =
                    cartItem.getQuantity();

            totalAmount +=
                    price * quantity;
        }


        // Create order
        Order order = new Order();

        order.setUser(user);

        order.setTotalAmount(totalAmount);

        order.setStatus("PLACED");

        order.setOrderDate(
                LocalDateTime.now()
        );


        // Save order
        Order savedOrder =
                orderRepository.save(order);


        // Create order items
        for (CartItem cartItem : cartItems) {

            OrderItem orderItem =
                    new OrderItem();

            orderItem.setOrder(savedOrder);

            orderItem.setFood(
                    cartItem.getFood()
            );

            orderItem.setQuantity(
                    cartItem.getQuantity()
            );

            orderItem.setPrice(
                    cartItem.getFood().getPrice()
            );


            orderItemRepository.save(orderItem);
        }


        // Clear cart
        cartItemRepository.deleteAll(cartItems);


        return savedOrder;
    }


    // =========================================================
    // GET ORDERS FOR ONE USER
    // =========================================================

    public List<Order> getUserOrders(Long userId) {

        // Make sure user exists
        userRepository.findById(userId)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));


        return orderRepository.findByUserId(userId);
    }


    // =========================================================
    // GET ALL ORDERS - ADMIN
    // =========================================================

    public List<Order> getAllOrders() {

        return orderRepository.findAll();
    }


    // =========================================================
    // GET ONE ORDER
    // =========================================================

    public Order getOrderById(Long orderId) {

        return orderRepository.findById(orderId)
                .orElseThrow(() ->
                        new RuntimeException("Order not found"));
    }


    // =========================================================
    // GET ORDER ITEMS
    // =========================================================

    public List<OrderItem> getOrderItems(Long orderId) {

        // Make sure order exists
        orderRepository.findById(orderId)
                .orElseThrow(() ->
                        new RuntimeException("Order not found"));


        return orderItemRepository.findByOrderId(orderId);
    }


    // =========================================================
    // UPDATE ORDER STATUS
    // =========================================================

    public Order updateOrderStatus(
            Long orderId,
            String status) {

        // Find order
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() ->
                        new RuntimeException("Order not found"));


        // Clean status
        String newStatus =
                status.trim().toUpperCase();


        // Validate status
        if (!newStatus.equals("PLACED")
                && !newStatus.equals("CONFIRMED")
                && !newStatus.equals("PREPARING")
                && !newStatus.equals("OUT FOR DELIVERY")
                && !newStatus.equals("DELIVERED")
                && !newStatus.equals("CANCELLED")) {

            throw new RuntimeException(
                    "Invalid order status"
            );
        }


        // Update status
        order.setStatus(newStatus);


        // Save order
        return orderRepository.save(order);
    }
}