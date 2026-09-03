package foodorderbackend.service;

import foodorderbackend.entity.Cart;
import foodorderbackend.entity.CartItem;
import foodorderbackend.entity.Food;
import foodorderbackend.entity.User;
import foodorderbackend.repository.CartItemRepository;
import foodorderbackend.repository.CartRepository;
import foodorderbackend.repository.FoodRepository;
import foodorderbackend.repository.UserRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartService {

    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final FoodRepository foodRepository;
    private final UserRepository userRepository;

    public CartService(
            CartRepository cartRepository,
            CartItemRepository cartItemRepository,
            FoodRepository foodRepository,
            UserRepository userRepository) {

        this.cartRepository = cartRepository;
        this.cartItemRepository = cartItemRepository;
        this.foodRepository = foodRepository;
        this.userRepository = userRepository;
    }

    // ==========================================
    // Add food to cart
    // ==========================================
    public CartItem addToCart(
            Long userId,
            Long foodId,
            Integer quantity) {

        User user = userRepository.findById(userId)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        Food food = foodRepository.findById(foodId)
                .orElseThrow(() ->
                        new RuntimeException("Food not found"));

        // Find existing cart or create a new cart
        Cart cart = cartRepository.findByUserId(userId)
                .orElseGet(() ->
                        cartRepository.save(new Cart(user)));

        // Check whether food already exists in cart
        CartItem cartItem = cartItemRepository
                .findByCartIdAndFoodId(cart.getId(), foodId)
                .orElse(null);

        if (cartItem != null) {

            // Increase existing quantity
            cartItem.setQuantity(
                    cartItem.getQuantity() + quantity
            );

        } else {

            // Create new cart item
            cartItem = new CartItem(
                    cart,
                    food,
                    quantity
            );
        }

        return cartItemRepository.save(cartItem);
    }


    // ==========================================
    // View cart
    // ==========================================
    public List<CartItem> getCart(Long userId) {

        // Check whether user exists
        User user = userRepository.findById(userId)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        // Find cart or automatically create one
        Cart cart = cartRepository.findByUserId(userId)
                .orElseGet(() ->
                        cartRepository.save(new Cart(user)));

        // Return all items from the cart
        return cartItemRepository.findByCartId(cart.getId());
    }


    // ==========================================
    // Remove item from cart
    // ==========================================
    public void removeFromCart(
            Long userId,
            Long foodId) {

        Cart cart = cartRepository.findByUserId(userId)
                .orElseThrow(() ->
                        new RuntimeException("Cart not found"));

        CartItem cartItem = cartItemRepository
                .findByCartIdAndFoodId(
                        cart.getId(),
                        foodId
                )
                .orElseThrow(() ->
                        new RuntimeException(
                                "Food not found in cart"
                        ));

        cartItemRepository.delete(cartItem);
    }


    // ==========================================
    // Update food quantity in cart
    // ==========================================
    public CartItem updateQuantity(
            Long userId,
            Long foodId,
            Integer quantity) {

        Cart cart = cartRepository.findByUserId(userId)
                .orElseThrow(() ->
                        new RuntimeException("Cart not found"));

        CartItem cartItem = cartItemRepository
                .findByCartIdAndFoodId(
                        cart.getId(),
                        foodId
                )
                .orElseThrow(() ->
                        new RuntimeException(
                                "Food not found in cart"
                        ));

        // If quantity becomes 0 or less,
        // remove the item
        if (quantity <= 0) {

            cartItemRepository.delete(cartItem);

            return null;
        }

        // Update quantity
        cartItem.setQuantity(quantity);

        return cartItemRepository.save(cartItem);
    }


    // ==========================================
    // Clear cart
    // ==========================================
    public void clearCart(Long userId) {

        Cart cart = cartRepository.findByUserId(userId)
                .orElseThrow(() ->
                        new RuntimeException("Cart not found"));

        List<CartItem> items =
                cartItemRepository.findByCartId(cart.getId());

        cartItemRepository.deleteAll(items);
    }
}