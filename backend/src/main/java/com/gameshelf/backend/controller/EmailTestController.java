package com.gameshelf.backend.controller;

import com.gameshelf.backend.service.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class EmailTestController {

    private final EmailService emailService;

    @GetMapping("/test-email")
    public String sendTestEmail() {
        emailService.sendVerificationEmail("teste@email.com", "token-de-teste");
        return "Check Mailpit";
    }

}
