package foodorderbackend.controller;

import foodorderbackend.entity.User;
import foodorderbackend.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<User> register(
            @RequestBody RegisterRequest request) {

        User user = authService.register(
                request.name(),
                request.email(),
                request.password()
        );

        return ResponseEntity.ok(user);
    }

    @PostMapping("/login")
    public ResponseEntity<User> login(
            @RequestBody LoginRequest request) {

        User user = authService.login(
                request.email(),
                request.password()
        );

        return ResponseEntity.ok(user);
    }

    public record RegisterRequest(
            String name,
            String email,
            String password
    ) {
    }

    public record LoginRequest(
            String email,
            String password
    ) {
    }
}