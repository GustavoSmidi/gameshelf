package com.gameshelf.backend.dto.request;

import jakarta.validation.constraints.NotEmpty;

public record LoginRequest(@NotEmpty String email, @NotEmpty String password) {
}
