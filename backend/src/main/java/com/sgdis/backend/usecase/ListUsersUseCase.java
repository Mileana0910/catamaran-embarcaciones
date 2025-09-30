package com.sgdis.backend.usecase;

import com.sgdis.backend.dto.UserResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ListUsersUseCase {
    Page<UserResponse> execute(Pageable pageable);
}