package com.sgdis.backend.controller;

import com.sgdis.backend.domain.Role;
import com.sgdis.backend.dto.UserRequest;
import com.sgdis.backend.dto.UserResponse;
import com.sgdis.backend.dto.UserUpdateRequest;
import com.sgdis.backend.usecase.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final ListUsersUseCase listUsersUseCase;
    private final ListUsersByRoleUseCase listUsersByRoleUseCase;
    private final CreateUserUseCase createUserUseCase;
    private final UpdateUserUseCase updateUserUseCase;
    private final ToggleUserStatusUseCase toggleUserStatusUseCase;

    @GetMapping
    public ResponseEntity<Page<UserResponse>> getAllUsers(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<UserResponse> users = listUsersUseCase.execute(pageable);
        return ResponseEntity.ok(users);
    }

    @GetMapping("/role/{role}")
    public ResponseEntity<Page<UserResponse>> getUsersByRole(
            @PathVariable Role role,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<UserResponse> users = listUsersByRoleUseCase.execute(role, pageable);
        return ResponseEntity.ok(users);
    }

    @GetMapping("/propietarios")
    public ResponseEntity<Page<UserResponse>> getPropietarios(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<UserResponse> users = listUsersByRoleUseCase.execute(Role.PROPIETARIO, pageable);
        return ResponseEntity.ok(users);
    }

    @GetMapping("/administradores")
    public ResponseEntity<Page<UserResponse>> getAdministradores(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<UserResponse> users = listUsersByRoleUseCase.execute(Role.ADMIN, pageable);
        return ResponseEntity.ok(users);
    }

    @PostMapping
    public ResponseEntity<UserResponse> createUser(@RequestBody UserRequest userRequest) {
        UserResponse userResponse = createUserUseCase.execute(userRequest);
        return ResponseEntity.ok(userResponse);
    }

    @PutMapping("/{userId}")
    public ResponseEntity<UserResponse> updateUser(
            @PathVariable Long userId,
            @RequestBody UserUpdateRequest userUpdateRequest) {
        UserResponse userResponse = updateUserUseCase.execute(userId, userUpdateRequest);
        return ResponseEntity.ok(userResponse);
    }

    @PatchMapping("/{userId}/status")
    public ResponseEntity<UserResponse> toggleUserStatus(@PathVariable Long userId) {
        UserResponse userResponse = toggleUserStatusUseCase.execute(userId);
        return ResponseEntity.ok(userResponse);
    }
}