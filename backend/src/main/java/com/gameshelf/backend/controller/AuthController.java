package com.gameshelf.backend.controller;

import com.gameshelf.backend.dto.request.LoginRequest;
import com.gameshelf.backend.dto.request.RegisterUserRequest;
import com.gameshelf.backend.dto.response.LoginResponse;
import com.gameshelf.backend.dto.response.RegisterUserResponse;
import com.gameshelf.backend.entity.User;
import com.gameshelf.backend.repository.UserRepository;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final UserRepository userRepository;

    public AuthController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/register")
    public ResponseEntity<RegisterUserResponse> register(@Valid @RequestBody RegisterUserRequest request) {
        User newUser = new User();

        newUser.setPasswordHash(request.password());
        newUser.setEmail(request.email());
        newUser.setUsername(request.username());

        userRepository.save(newUser);

        return ResponseEntity.status(HttpStatus.CREATED).body(new RegisterUserResponse(newUser.getUsername(), newUser.getEmail()));
    }
}
