package com.tunz.backend.service;
import com.tunz.backend.dto.AuthRequestDto;



public interface AuthService {
    void register(AuthRequestDto request);
    String login(AuthRequestDto request);
}
