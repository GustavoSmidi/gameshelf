package com.gameshelf.backend.dto.response;

public record RegisterUserResponse(
        String username,
        String email,
        String waitSecret) {
}
