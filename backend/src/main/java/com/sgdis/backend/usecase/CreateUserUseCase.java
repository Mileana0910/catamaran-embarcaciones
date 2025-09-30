package com.sgdis.backend.usecase;

import com.sgdis.backend.dto.UserRequest;
import com.sgdis.backend.dto.UserResponse;

public interface CreateUserUseCase {
    UserResponse execute(UserRequest userRequest);
}