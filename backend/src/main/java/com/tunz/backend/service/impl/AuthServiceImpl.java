package com.tunz.backend.service.impl;

import com.tunz.backend.util.JwtUtil;
import com.tunz.backend.dto.AuthRequestDto;
import com.tunz.backend.entity.AppUser;
import com.tunz.backend.exception.DuplicateDataException;
import com.tunz.backend.repository.UserRepository;
import com.tunz.backend.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final ModelMapper modelMapper;

    public void register(AuthRequestDto request) {
        if (userRepository.findByUsername(request.getUsername()).isPresent()) {
            throw new DuplicateDataException("Username already exists");
        }
        AppUser user = modelMapper.map(request, AppUser.class);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
    }

    public String login(AuthRequestDto request) {
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
        );
        UserDetails userDetails = new User(request.getUsername(), request.getPassword(), new ArrayList<>());
        return jwtUtil.generateToken(userDetails.getUsername());
    }
}