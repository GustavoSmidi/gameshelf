package com.gameshelf.backend.dto.request;

import jakarta.validation.constraints.NotEmpty;

public record RegisterUserRequest(@NotEmpty String username, @NotEmpty String email, @NotEmpty String password) {
}
