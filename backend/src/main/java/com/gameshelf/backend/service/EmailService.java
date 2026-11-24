package com.gameshelf.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService {
    private final JavaMailSender mailSender;

    @Value("${app.mail.from}")
    private String from;

    @Value("${app.frontend-url}")
    private String frontendUrl;

    public void sendVerificationEmail(String to, String token) {
        String link = frontendUrl + "/verify-email?token=" + token;

        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(from);
        message.setTo(to);
        message.setSubject("Confirm your GameShelf account");
        message.setText("Welcome to GameShelf!\n\nConfirm your email by opening this link:\n"
                + link + "\n\nIf you didn't create an account, you can ignore this message.");

        mailSender.send(message);
    }

    public void sendResetPasswordEmail (String to, String token) {
        String link = frontendUrl + "/reset-password?token=" + token;

        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(from);
        message.setTo(to);
        message.setSubject("Reset your GameShelf password");
        message.setText("Reset your GameShelf password!\n\n" + "Reset your password by opening this link:\n"
                + link + "\n\nIf you didn't request a password reset, you can ignore this message.");

        mailSender.send(message);
    }
}
