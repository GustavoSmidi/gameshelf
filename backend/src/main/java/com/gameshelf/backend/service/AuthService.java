package com.gameshelf.backend.service;

import com.gameshelf.backend.dto.request.LoginRequest;
import com.gameshelf.backend.dto.response.LoginResponse;
import com.gameshelf.backend.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final TokenService tokenService;

    public LoginResponse login (LoginRequest request) {

        UsernamePasswordAuthenticationToken UsernameAndPassword = new UsernamePasswordAuthenticationToken(request.email(), request.password());
        Authentication authentication = authenticationManager.authenticate(UsernameAndPassword);

        User user = (User) authentication.getPrincipal();
        String token = tokenService.generateToken(user);

        return new LoginResponse(token);
    }
}
