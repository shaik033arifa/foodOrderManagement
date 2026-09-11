package foodorderbackend.controller;

import foodorderbackend.entity.Order;
import foodorderbackend.service.OrderService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orders")
@CrossOrigin(
        origins = {
    "http://localhost:5173",
    "http://localhost:5174",
    "https://shaik033arifa.github.io"
},
        methods = {
                RequestMethod.GET,
                RequestMethod.POST,
                RequestMethod.PUT,
                RequestMethod.DELETE,
                RequestMethod.OPTIONS
        }
)
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    // Place order
    @PostMapping("/place/{userId}")
    public ResponseEntity<Order> placeOrder(
            @PathVariable Long userId) {

        Order order = orderService.placeOrder(userId);

        return ResponseEntity.ok(order);
    }

    // Get orders of a user
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Order>> getUserOrders(
            @PathVariable Long userId) {

        return ResponseEntity.ok(
                orderService.getUserOrders(userId)
        );
    }
    // Get order items
@GetMapping("/{orderId}/items")
public ResponseEntity<List<foodorderbackend.entity.OrderItem>> getOrderItems(
        @PathVariable Long orderId) {

    return ResponseEntity.ok(
            orderService.getOrderItems(orderId)
    );
}
}