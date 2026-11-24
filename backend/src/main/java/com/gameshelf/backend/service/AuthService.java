package com.gameshelf.backend.service;

import com.gameshelf.backend.dto.request.LoginRequest;
import com.gameshelf.backend.dto.request.RegisterUserRequest;
import com.gameshelf.backend.dto.request.ResetPasswordRequest;
import com.gameshelf.backend.dto.request.VerifyEmailRequest;
import com.gameshelf.backend.dto.response.LoginResponse;
import com.gameshelf.backend.dto.response.RegisterUserResponse;
import com.gameshelf.backend.entity.PasswordResetToken;
import com.gameshelf.backend.entity.PendingRegistration;
import com.gameshelf.backend.entity.User;
import com.gameshelf.backend.entity.UserRole;
import com.gameshelf.backend.repository.PasswordResetTokenRepository;
import com.gameshelf.backend.repository.PendingRegistrationRepository;
import com.gameshelf.backend.repository.UserRepository;
import com.gameshelf.backend.util.VerificationTokenUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.time.temporal.ChronoUnit;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final UserRepository userRepository;
    private final PendingRegistrationRepository pendingRegistrationRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;
    private final PasswordResetTokenRepository passwordResetTokenRepository;

    public LoginResponse login (LoginRequest request) {

        UsernamePasswordAuthenticationToken usernameAndPassword = new UsernamePasswordAuthenticationToken(request.email(), request.password());
        Authentication authentication = authenticationManager.authenticate(usernameAndPassword);

        User user = (User) authentication.getPrincipal();
        String token = jwtService.generateToken(user);

        return new LoginResponse(token);
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
        emailService.sendVerificationEmail(savedUser.getEmail(), token);
        return new RegisterUserResponse(savedUser.getUsername(), savedUser.getEmail());
    }

    @Transactional
    public void verifyEmail (VerifyEmailRequest request) {

        String hash = VerificationTokenUtils.sha256(request.token());

        PendingRegistration pendingUser = pendingRegistrationRepository.findByTokenHash(hash)
                .orElseThrow(() -> new IllegalArgumentException("Invalid verification token"));

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

    @Transactional
    public void resendVerificationEmail (String email) {
        PendingRegistration pendingUser = pendingRegistrationRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("Pending registration not found"));

        String token = VerificationTokenUtils.generateToken();
        String tokenHash = VerificationTokenUtils.sha256(token);

        pendingUser.setTokenHash(tokenHash);
        pendingUser.setExpiresAt(Instant.now().plus(15, ChronoUnit.MINUTES));

        pendingRegistrationRepository.save(pendingUser);

        emailService.sendVerificationEmail(pendingUser.getEmail(), token);
    }

    @Transactional
    public void forgotPassword (String email) {
        User user = userRepository.findUserByEmail(email).orElse(null);

        if (user == null) return;

        passwordResetTokenRepository.deleteByUser(user);

        String token = VerificationTokenUtils.generateToken();
        String tokenHash = VerificationTokenUtils.sha256(token);

        PasswordResetToken resetToken = new PasswordResetToken();

        resetToken.setUser(user);
        resetToken.setTokenHash(tokenHash);
        resetToken.setExpiresAt(Instant.now().plus(15, ChronoUnit.MINUTES));

        passwordResetTokenRepository.save(resetToken);

        emailService.sendResetPasswordEmail(user.getEmail(), token);
    }

    @Transactional
    public void resetPassword (ResetPasswordRequest request) {
        String tokenHash = VerificationTokenUtils.sha256(request.token());

        PasswordResetToken resetToken = passwordResetTokenRepository
                .findByTokenHash(tokenHash)
                .orElseThrow(() -> new IllegalArgumentException("Invalid or expired reset token"));

        if (!resetToken.getExpiresAt().isAfter(Instant.now())) {
            throw new IllegalArgumentException("Invalid or expired reset token");
        }

        User user = resetToken.getUser();

        user.setPasswordHash(passwordEncoder.encode(request.newPassword()));
        user.setUpdatedAt(Instant.now());

        userRepository.save(user);

        passwordResetTokenRepository.delete(resetToken);

    }

}
