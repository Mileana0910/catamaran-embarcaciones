package com.sgdis.backend.service;

import com.sgdis.backend.domain.UserEntity;
import com.sgdis.backend.dto.*;
import com.sgdis.backend.repository.UserRepositoryJpa;
import com.sgdis.backend.security.JwtUtils;
import com.sgdis.backend.usecase.*;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements LoginUseCase, AuthenticateUseCase, SearchUsernameUseCase, UserDetailsService {

    private final UserRepositoryJpa userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;

    @Override
    public AuthResponse login(AuthRequest authLoginRequest) {
        String email = authLoginRequest.email();
        String password = authLoginRequest.password();

        UserEntity userEntity = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("user not found!"));

        if (!userEntity.getStatus()) {
            throw new BadCredentialsException("Invalid username or password!");
        }

        Long id = userEntity.getId();
        String username = userEntity.getUsername();

        GrantedAuthority role = new SimpleGrantedAuthority("ROLE_".concat(userEntity.getRole().name()));

        Authentication authentication = new UsernamePasswordAuthenticationToken(
                username, null, Set.of(role)
        );
        // Store userId in details for JWT creation
        ((UsernamePasswordAuthenticationToken) authentication).setDetails(id);

        String jwtToken = jwtUtils.createToken(authentication);

        return new AuthResponse(userEntity.getId(), email, "logged successfully!", jwtToken, true);
    }

    @Override
    public Authentication authenticate(String username, String password) {
        UserDetails userDetails = this.searchUserDetails(username);

        if (userDetails == null) {
            throw new BadCredentialsException("Invalid username or password");
        }

        if (!passwordEncoder.matches(password, userDetails.getPassword())) {
            throw new BadCredentialsException("invalid password");
        }

        UserEntity userEntity = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("user not found"));

        return new UsernamePasswordAuthenticationToken(userEntity.getId(), null, userDetails.getAuthorities());
    }

    @Override
    public UserDetails searchUserDetails(String username) {
        UserEntity userEntity = userRepository.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("user not found"));

        GrantedAuthority role = new SimpleGrantedAuthority("ROLE_".concat(userEntity.getRole().name()));

        return new User(username, userEntity.getPassword(), Set.of(role));
    }


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return searchUserDetails(username);
    }
}