package com.sgdis.backend.dto;

import com.sgdis.backend.domain.Role;

public record UserRequest(
    String username,
    String email,
    String password,
    Role role
) {}