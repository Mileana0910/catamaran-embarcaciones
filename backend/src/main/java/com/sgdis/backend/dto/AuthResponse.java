package com.sgdis.backend.dto;

public record AuthResponse(Long id, String email, String message, String jwtToken, boolean success) {
}