package com.gameshelf.backend.config;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;


@Component
@RequiredArgsConstructor
public class MailTestRunner implements CommandLineRunner {

    private final JavaMailSender mailSender;

    @Override
    public void run(String... args) throws Exception {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("noreply@gameshelf.local");
        message.setTo("teste@email.com");
        message.setSubject("Teste GameShelf");
        message.setText("Se você está lendo isso, o envio funciona.");
        mailSender.send(message);
    }
}
