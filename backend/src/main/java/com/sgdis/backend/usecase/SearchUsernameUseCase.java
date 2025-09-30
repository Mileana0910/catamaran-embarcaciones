package com.sgdis.backend.usecase;

import org.springframework.security.core.userdetails.UserDetails;

public interface SearchUsernameUseCase {
    UserDetails searchUserDetails(String username);
}