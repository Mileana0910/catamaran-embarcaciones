package com.sgdis.backend.usecase;

import com.sgdis.backend.dto.UserResponse;
import com.sgdis.backend.dto.UserUpdateRequest;

public interface UpdateUserUseCase {
    UserResponse execute(Long userId, UserUpdateRequest userUpdateRequest);
}