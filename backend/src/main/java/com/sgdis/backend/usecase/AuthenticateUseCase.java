package com.sgdis.backend.usecase;

import org.springframework.security.core.Authentication;

public interface AuthenticateUseCase {
    Authentication authenticate(String username, String password);
}