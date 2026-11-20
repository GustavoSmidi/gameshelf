package com.gameshelf.backend.service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.gameshelf.backend.config.JWTUserData;
import com.gameshelf.backend.entity.User;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Optional;

@Service
public class JwtService {

    @Value("${spring.jwt}")
    private String secret;
    private Algorithm algorithm;

    @PostConstruct
    public void init() {
        algorithm = Algorithm.HMAC256(secret);
    }

    public String generateToken (User user) {
        return JWT.create()
                .withClaim("userId", user.getId())
                .withSubject(user.getEmail())
                .withExpiresAt(Instant.now().plusSeconds(86400))
                .withIssuedAt(Instant.now())
                .sign(algorithm);
    }

    public Optional<JWTUserData> validateToken(String token) {
        try {
            DecodedJWT decode = JWT.require(algorithm).build().verify(token);

            return Optional.of(JWTUserData.builder()
                    .userId(decode.getClaim("userId").asLong())
                    .email(decode.getSubject())
                    .build());
        } catch (JWTVerificationException e) {
            return Optional.empty();

        }
    }
}
