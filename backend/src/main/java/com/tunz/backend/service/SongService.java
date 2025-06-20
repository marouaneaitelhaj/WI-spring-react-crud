package com.tunz.backend.service;

import com.tunz.backend.dto.SongRequestDTO;
import com.tunz.backend.dto.SongResponseDTO;

import java.util.List;

public interface SongService {
    SongResponseDTO createSong(SongRequestDTO dto);
    SongResponseDTO getSongById(Long id);
    List<SongResponseDTO> getAllSongs();
    SongResponseDTO updateSong(Long id, SongRequestDTO dto);
    void deleteSong(Long id);
}