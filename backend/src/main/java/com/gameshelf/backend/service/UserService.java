package com.gameshelf.backend.service;

import com.gameshelf.backend.dto.request.RegisterUserRequest;
import com.gameshelf.backend.entity.User;
import com.gameshelf.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${spring.security.pepper}")
    private String pepper;

    public User register (RegisterUserRequest request) {

        User newUser = new User();

        newUser.setUsername(request.username());
        newUser.setEmail(request.email());
        newUser.setPasswordHash(passwordEncoder.encode(request.password() + pepper));

        return userRepository.save(newUser);
    }




}
