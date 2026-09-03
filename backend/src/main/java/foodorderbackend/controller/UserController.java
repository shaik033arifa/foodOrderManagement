package foodorderbackend.controller;

import foodorderbackend.dto.LoginRequest;
import foodorderbackend.entity.User;
import foodorderbackend.service.UserService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/users")
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
public class UserController {


    private final UserService userService;


    // =================================================
    // CONSTRUCTOR
    // =================================================

    public UserController(UserService userService) {

        this.userService = userService;
    }


    // =================================================
    // LOGIN
    // =================================================

    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestBody LoginRequest request) {

        try {

            User user = userService.login(
                    request.getEmail(),
                    request.getPassword()
            );


            return ResponseEntity.ok(
                    Map.of(
                            "message", "Login successful",
                            "user", user
                    )
            );

        } catch (RuntimeException error) {

            return ResponseEntity
                    .badRequest()
                    .body(
                            Map.of(
                                    "message",
                                    error.getMessage()
                            )
                    );
        }
    }
}