package foodorderbackend.controller;

import foodorderbackend.entity.CartItem;
import foodorderbackend.service.CartService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/cart")
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
public class CartController {

    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    // Add food to cart
    @PostMapping("/add")
    public ResponseEntity<CartItem> addToCart(
            @RequestBody Map<String, Object> request) {

        Long userId = Long.valueOf(request.get("userId").toString());
        Long foodId = Long.valueOf(request.get("foodId").toString());
        Integer quantity = Integer.valueOf(request.get("quantity").toString());

        CartItem cartItem =
                cartService.addToCart(userId, foodId, quantity);

        return ResponseEntity.ok(cartItem);
    }

    // View cart
    @GetMapping("/{userId}")
    public ResponseEntity<List<CartItem>> getCart(
            @PathVariable Long userId) {

        return ResponseEntity.ok(
                cartService.getCart(userId)
        );
    }

    // Remove food from cart
    @DeleteMapping("/{userId}/remove/{foodId}")
    public ResponseEntity<String> removeFromCart(
            @PathVariable Long userId,
            @PathVariable Long foodId) {

        cartService.removeFromCart(userId, foodId);

        return ResponseEntity.ok("Food removed from cart");
    }
      // Update food quantity
@PutMapping("/{userId}/update/{foodId}")
public ResponseEntity<CartItem> updateQuantity(
        @PathVariable Long userId,
        @PathVariable Long foodId,
        @RequestBody Map<String, Object> request) {

    Integer quantity =
            Integer.valueOf(request.get("quantity").toString());

    CartItem cartItem =
            cartService.updateQuantity(
                    userId,
                    foodId,
                    quantity
            );

    return ResponseEntity.ok(cartItem);
}

    // Clear cart
    @DeleteMapping("/{userId}/clear")
    public ResponseEntity<String> clearCart(
            @PathVariable Long userId) {

        cartService.clearCart(userId);

        return ResponseEntity.ok("Cart cleared successfully");
    }
}


      
