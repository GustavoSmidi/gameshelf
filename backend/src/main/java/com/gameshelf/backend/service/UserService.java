package com.gameshelf.backend.service;

import com.gameshelf.backend.dto.request.RegisterUserRequest;
import com.gameshelf.backend.dto.request.VerifyEmailRequest;
import com.gameshelf.backend.dto.response.RegisterUserResponse;
import com.gameshelf.backend.entity.PendingRegistration;
import com.gameshelf.backend.entity.User;
import com.gameshelf.backend.entity.UserRole;
import com.gameshelf.backend.repository.PendingRegistrationRepository;
import com.gameshelf.backend.repository.UserRepository;
import com.gameshelf.backend.util.VerificationTokenUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.time.temporal.ChronoUnit;

@Service
@RequiredArgsConstructor
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;
    private final PendingRegistrationRepository pendingRegistrationRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return userRepository.findUserByEmail(email).orElseThrow(() -> new UsernameNotFoundException(email));
    }

    public RegisterUserResponse register (RegisterUserRequest request) {

        String token = VerificationTokenUtils.generateToken();
        String tokenHash = VerificationTokenUtils.sha256(token);

        PendingRegistration user = new PendingRegistration();

        user.setUsername(request.username());
        user.setEmail(request.email());
        user.setPasswordHash(passwordEncoder.encode(request.password()));
        user.setTokenHash(tokenHash);
        user.setExpiresAt(Instant.now().plus(15, ChronoUnit.MINUTES));

        PendingRegistration savedUser = pendingRegistrationRepository.save(user);
        System.out.println("Usuário criado: " + savedUser.getEmail());
        emailService.sendVerificationEmail(savedUser.getEmail(), token);
        return new RegisterUserResponse(savedUser.getUsername(), savedUser.getEmail());
    }

    @Transactional
    public void verifyEmail (VerifyEmailRequest request) {

        System.out.println("VERIFY EMAIL FOI CHAMADO");

        String hash = VerificationTokenUtils.sha256(request.token());

        PendingRegistration pendingUser = pendingRegistrationRepository.findByTokenHash(hash)
                .orElseThrow(() -> new IllegalArgumentException("Invalid verification token"));

        System.out.println("Cadastro encontrado: " + pendingUser.getEmail());

        if (!pendingUser.getExpiresAt().isAfter(Instant.now())) {
            throw new IllegalArgumentException("Verification token expired");
        }

        if (userRepository.existsByEmail(pendingUser.getEmail())) {
            throw new IllegalArgumentException("Email already registered");
        }

        User newUser = new User();

        newUser.setUsername(pendingUser.getUsername());
        newUser.setEmail(pendingUser.getEmail());
        newUser.setPasswordHash(pendingUser.getPasswordHash());
        newUser.setRole(UserRole.USER);
        newUser.setCreatedAt(Instant.now());
        newUser.setUpdatedAt(Instant.now());

        userRepository.save(newUser);
        pendingRegistrationRepository.delete(pendingUser);
    }

}
