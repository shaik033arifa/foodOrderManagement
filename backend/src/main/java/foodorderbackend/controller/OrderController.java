package foodorderbackend.controller;

import foodorderbackend.entity.Order;
import foodorderbackend.entity.OrderItem;
import foodorderbackend.service.OrderService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/orders")
@CrossOrigin(
        origins = "http://localhost:5173",
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


    // =========================================================
    // PLACE ORDER
    // =========================================================

    @PostMapping("/place/{userId}")
    public ResponseEntity<Order> placeOrder(
            @PathVariable Long userId) {

        return ResponseEntity.ok(
                orderService.placeOrder(userId)
        );
    }


    // =========================================================
    // GET USER ORDERS
    // =========================================================

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Order>> getUserOrders(
            @PathVariable Long userId) {

        return ResponseEntity.ok(
                orderService.getUserOrders(userId)
        );
    }


    // =========================================================
    // GET ALL ORDERS - ADMIN
    // =========================================================

    @GetMapping("/all")
    public ResponseEntity<List<Order>> getAllOrders() {

        return ResponseEntity.ok(
                orderService.getAllOrders()
        );
    }


    // =========================================================
    // GET ONE ORDER
    // =========================================================

    @GetMapping("/{orderId}")
    public ResponseEntity<Order> getOrderById(
            @PathVariable Long orderId) {

        return ResponseEntity.ok(
                orderService.getOrderById(orderId)
        );
    }


    // =========================================================
    // GET ORDER ITEMS
    // =========================================================

    @GetMapping("/{orderId}/items")
    public ResponseEntity<List<OrderItem>> getOrderItems(
            @PathVariable Long orderId) {

        return ResponseEntity.ok(
                orderService.getOrderItems(orderId)
        );
    }


    // =========================================================
    // UPDATE ORDER STATUS
    // =========================================================

    @PutMapping("/{orderId}/status")
    public ResponseEntity<Order> updateOrderStatus(
            @PathVariable Long orderId,
            @RequestBody Map<String, String> request) {

        String status =
                request.get("status");


        if (status == null
                || status.trim().isEmpty()) {

            throw new RuntimeException(
                    "Status is required"
            );
        }


        return ResponseEntity.ok(
                orderService.updateOrderStatus(
                        orderId,
                        status
                )
        );
    }
}