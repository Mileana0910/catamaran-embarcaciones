package com.sgdis.backend.service;

import com.sgdis.backend.domain.Role;
import com.sgdis.backend.domain.UserEntity;
import com.sgdis.backend.dto.UserRequest;
import com.sgdis.backend.dto.UserResponse;
import com.sgdis.backend.dto.UserUpdateRequest;
import com.sgdis.backend.mapper.UserMapper;
import com.sgdis.backend.repository.UserRepositoryJpa;
import com.sgdis.backend.usecase.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService implements
    ListUsersUseCase,
    ListUsersByRoleUseCase,
    CreateUserUseCase,
    UpdateUserUseCase,
    ToggleUserStatusUseCase {

    private final UserRepositoryJpa userRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserMapper userMapper;

    @Override
    public Page<UserResponse> execute(Pageable pageable) {
        return userRepository.findAll(pageable)
                .map(userMapper::toUserResponse);
    }

    @Override
    public Page<UserResponse> execute(Role role, Pageable pageable) {
        return userRepository.findByRole(role, pageable)
                .map(userMapper::toUserResponse);
    }

    @Override
    public UserResponse execute(UserRequest userRequest) {
        if (userRepository.findByUsername(userRequest.username()).isPresent()) {
            throw new IllegalArgumentException("Username already exists");
        }
        if (userRepository.findByEmail(userRequest.email()).isPresent()) {
            throw new IllegalArgumentException("Email already exists");
        }

        UserEntity userEntity = userMapper.toUserEntity(userRequest);
        userEntity.setPassword(passwordEncoder.encode(userRequest.password()));

        UserEntity savedUser = userRepository.save(userEntity);
        return userMapper.toUserResponse(savedUser);
    }

    @Override
    public UserResponse execute(Long userId, UserUpdateRequest userUpdateRequest) {
        UserEntity userEntity = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        if (userUpdateRequest.username() != null && !userUpdateRequest.username().equals(userEntity.getUsername())) {
            if (userRepository.findByUsername(userUpdateRequest.username()).isPresent()) {
                throw new IllegalArgumentException("Username already exists");
            }
        }

        if (userUpdateRequest.email() != null && !userUpdateRequest.email().equals(userEntity.getEmail())) {
            if (userRepository.findByEmail(userUpdateRequest.email()).isPresent()) {
                throw new IllegalArgumentException("Email already exists");
            }
        }

        userMapper.updateUserEntity(userEntity, userUpdateRequest);

        UserEntity updatedUser = userRepository.save(userEntity);
        return userMapper.toUserResponse(updatedUser);
    }

    @Override
    public UserResponse execute(Long userId) {
        UserEntity userEntity = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        userEntity.setStatus(!userEntity.getStatus());
        UserEntity updatedUser = userRepository.save(userEntity);
        return userMapper.toUserResponse(updatedUser);
    }
}