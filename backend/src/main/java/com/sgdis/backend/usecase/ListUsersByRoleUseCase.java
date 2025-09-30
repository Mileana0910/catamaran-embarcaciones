package com.sgdis.backend.usecase;

import com.sgdis.backend.domain.Role;
import com.sgdis.backend.dto.UserResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ListUsersByRoleUseCase {
    Page<UserResponse> execute(Role role, Pageable pageable);
}