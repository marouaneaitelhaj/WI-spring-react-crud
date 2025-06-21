package com.tunz.backend.service.impl;

import java.util.ArrayList;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.argThat;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import org.modelmapper.ModelMapper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.tunz.backend.dto.AuthRequestDto;
import com.tunz.backend.entity.AppUser;
import com.tunz.backend.exception.DuplicateDataException;
import com.tunz.backend.repository.UserRepository;
import com.tunz.backend.util.JwtUtil;

class AuthServiceImplTest {

    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;
    private AuthenticationManager authenticationManager;
    private JwtUtil jwtUtil;
    private ModelMapper modelMapper;
    private UserDetailsService userDetailsService;

    private AuthServiceImpl authService;

    @BeforeEach
    void setup() {
        userRepository = mock(UserRepository.class);
        passwordEncoder = mock(PasswordEncoder.class);
        authenticationManager = mock(AuthenticationManager.class);
        jwtUtil = mock(JwtUtil.class);
        modelMapper = new ModelMapper();
        userDetailsService = mock(UserDetailsService.class);

        authService = new AuthServiceImpl(
                userRepository,
                passwordEncoder,
                authenticationManager,
                jwtUtil,
                modelMapper);
    }

    @Test
    void register_shouldThrowDuplicateDataException_whenUsernameExists() {
        AuthRequestDto dto = new AuthRequestDto();
        dto.setUsername("existing");
        dto.setPassword("pass");

        when(userRepository.findByUsername("existing")).thenReturn(Optional.of(new AppUser()));

        assertThrows(DuplicateDataException.class, () -> authService.register(dto));
        verify(userRepository, never()).save(any());
    }

    @Test
    void register_shouldSaveUserWithEncodedPassword() {
        AuthRequestDto dto = new AuthRequestDto();
        dto.setUsername("newuser");
        dto.setPassword("rawpass");

        when(userRepository.findByUsername("newuser")).thenReturn(Optional.empty());
        when(passwordEncoder.encode("rawpass")).thenReturn("encodedpass");

        authService.register(dto);

        verify(userRepository).save(argThat(user -> 
            user.getUsername().equals("newuser") && user.getPassword().equals("encodedpass")));
    }

    @Test
    void login_shouldReturnJwtToken_whenSuccessful() {
        AuthRequestDto dto = new AuthRequestDto();
        dto.setUsername("user");
        dto.setPassword("pass");

        when(userDetailsService.loadUserByUsername("user"))
                .thenReturn(org.springframework.security.core.userdetails.User
                        .withUsername("user")
                        .password("encodedpass")
                        .authorities(new ArrayList<>())
                        .build());

        UsernamePasswordAuthenticationToken token =
                new UsernamePasswordAuthenticationToken("user", "pass");

        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class)))
                .thenReturn(token);

        when(jwtUtil.generateToken("user")).thenReturn("jwt-token");

        String jwt = authService.login(dto);

        assertEquals("jwt-token", jwt);
    }

    @Test
    void login_shouldThrowException_whenAuthenticationFails() {
        AuthRequestDto dto = new AuthRequestDto();
        dto.setUsername("user");
        dto.setPassword("wrongpass");

        doThrow(new BadCredentialsException("bad credentials"))
                .when(authenticationManager).authenticate(any());

        assertThrows(BadCredentialsException.class, () -> authService.login(dto));
    }
}
