package com.sgdis.backend.usecase;

import com.sgdis.backend.dto.UserResponse;

public interface ToggleUserStatusUseCase {
    UserResponse execute(Long userId);
}