package com.sgdis.backend.dto;

import com.sgdis.backend.domain.Role;

public record UserUpdateRequest(
    String username,
    String email,
    Role role
) {}