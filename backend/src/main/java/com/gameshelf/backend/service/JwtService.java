package com.gameshelf.backend.service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.gameshelf.backend.entity.User;
import org.springframework.stereotype.Service;

import java.time.Instant;

@Service
public class JwtService {

    private String secret = "secret";
    Algorithm algorithm = Algorithm.HMAC256(secret);

    public String generateToken (User user) {
        return JWT.create()
                .withClaim("userId", user.getId())
                .withSubject(user.getEmail())
                .withExpiresAt(Instant.now().plusSeconds(86400))
                .withIssuedAt(Instant.now())
                .sign(algorithm);
    }

}
