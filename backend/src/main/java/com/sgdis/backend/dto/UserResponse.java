package com.sgdis.backend.dto;

import com.sgdis.backend.domain.Role;

public record UserResponse(
    Long id,
    String username,
    String email,
    Role role,
    Boolean status
) {}