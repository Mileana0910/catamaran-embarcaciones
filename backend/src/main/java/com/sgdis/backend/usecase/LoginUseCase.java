package com.sgdis.backend.usecase;

import com.sgdis.backend.dto.AuthRequest;
import com.sgdis.backend.dto.AuthResponse;

public interface LoginUseCase {
    AuthResponse login(AuthRequest authLoginRequest);
}