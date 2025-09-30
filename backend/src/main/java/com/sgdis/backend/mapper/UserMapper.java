package com.sgdis.backend.mapper;

import com.sgdis.backend.domain.UserEntity;
import com.sgdis.backend.dto.UserRequest;
import com.sgdis.backend.dto.UserResponse;
import com.sgdis.backend.dto.UserUpdateRequest;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {

    public UserResponse toUserResponse(UserEntity userEntity) {
        return new UserResponse(
                userEntity.getId(),
                userEntity.getUsername(),
                userEntity.getEmail(),
                userEntity.getRole(),
                userEntity.getStatus()
        );
    }

    public UserEntity toUserEntity(UserRequest userRequest) {
        UserEntity userEntity = new UserEntity();
        userEntity.setUsername(userRequest.username());
        userEntity.setEmail(userRequest.email());
        userEntity.setRole(userRequest.role());
        userEntity.setStatus(true);
        return userEntity;
    }

    public void updateUserEntity(UserEntity userEntity, UserUpdateRequest userUpdateRequest) {
        if (userUpdateRequest.username() != null) {
            userEntity.setUsername(userUpdateRequest.username());
        }
        if (userUpdateRequest.email() != null) {
            userEntity.setEmail(userUpdateRequest.email());
        }
        if (userUpdateRequest.role() != null) {
            userEntity.setRole(userUpdateRequest.role());
        }
    }
}