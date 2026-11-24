package com.gameshelf.backend.config;

import org.jspecify.annotations.Nullable;
import org.springframework.security.crypto.password.PasswordEncoder;

public class PepperPasswordEncoder implements PasswordEncoder {

    private PasswordEncoder passwordEncoder;
    private String pepper;

    public PepperPasswordEncoder(PasswordEncoder passwordEncoder, String pepper) {
        this.passwordEncoder = passwordEncoder;
        this.pepper = pepper;
    }

    @Override
    public @Nullable String encode(@Nullable CharSequence rawPassword) {
        return passwordEncoder.encode(rawPassword + pepper);
    }

    @Override
    public boolean matches(@Nullable CharSequence rawPassword, @Nullable String encodedPassword) {
        return passwordEncoder.matches(rawPassword + pepper, encodedPassword);
    }

    @Override
    public boolean upgradeEncoding(@Nullable String encodedPassword) {
        return PasswordEncoder.super.upgradeEncoding(encodedPassword);
    }
}
