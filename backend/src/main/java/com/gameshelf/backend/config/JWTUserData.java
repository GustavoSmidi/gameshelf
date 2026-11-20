package com.gameshelf.backend.config;

import lombok.Builder;

@Builder
public record JWTUserData(Long userId, String email) {
}
