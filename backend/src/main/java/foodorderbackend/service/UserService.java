package foodorderbackend.service;

import foodorderbackend.entity.User;
import foodorderbackend.repository.UserRepository;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;

    private final BCryptPasswordEncoder passwordEncoder =
            new BCryptPasswordEncoder();


    // =================================================
    // CONSTRUCTOR
    // =================================================

    public UserService(UserRepository userRepository) {

        this.userRepository = userRepository;
    }


    // =================================================
    // LOGIN
    // =================================================

    public User login(
            String email,
            String password) {

        // Find user by email
        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Invalid email or password"
                        )
                );


        // Check password using BCrypt
        if (!passwordEncoder.matches(
                password,
                user.getPassword())) {

            throw new RuntimeException(
                    "Invalid email or password"
            );
        }


        // Login successful
        return user;
    }
}