package com.gameshelf.backend.controller;

import com.gameshelf.backend.dto.request.LoginRequest;
import com.gameshelf.backend.dto.request.RegisterUserRequest;
import com.gameshelf.backend.dto.request.ResendVerificationEmailRequest;
import com.gameshelf.backend.dto.request.VerifyEmailRequest;
import com.gameshelf.backend.dto.response.LoginResponse;
import com.gameshelf.backend.dto.response.RegisterUserResponse;
import com.gameshelf.backend.service.AuthService;
import com.gameshelf.backend.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;
    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login (@Valid @RequestBody LoginRequest request) {

        return ResponseEntity.ok(authService.login(request));
    }

    @PostMapping("/register")
    public ResponseEntity<RegisterUserResponse> register(@Valid @RequestBody RegisterUserRequest request) {

        RegisterUserResponse response = userService.register(request);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping("/verify-email")
    public ResponseEntity<Void> verifyEmail(@Valid @RequestBody VerifyEmailRequest request) {

        userService.verifyEmail(request);

        return ResponseEntity.noContent().build();
    }

    @PostMapping("/resend-verification-email")
    public ResponseEntity<Void> resendVerificationEmail (@Valid @RequestBody ResendVerificationEmailRequest request) {
        userService.resendVerificationEmail(request.email());

        return ResponseEntity.noContent().build();
    }
}
