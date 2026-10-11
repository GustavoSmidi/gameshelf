package com.gameshelf.backend.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;

public record LoginRequest(
        @NotEmpty
        @Email(message = "Invalid email format")
        String email,

        @NotEmpty
        @Size(min = 8, max = 128, message = "Password must be between 8 and 128 characters")
        String password) {
}
