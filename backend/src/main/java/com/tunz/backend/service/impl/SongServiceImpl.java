package com.tunz.backend.service.impl;

import com.tunz.backend.dto.SongRequestDTO;
import com.tunz.backend.dto.SongResponseDTO;
import com.tunz.backend.entity.Song;
import com.tunz.backend.exception.DuplicateDataException;
import com.tunz.backend.exception.ResourceNotFoundException;
import com.tunz.backend.repository.SongRepository;
import com.tunz.backend.service.SongService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SongServiceImpl implements SongService {

    private final SongRepository songRepository;
    private final ModelMapper modelMapper;

    @Override
    public SongResponseDTO createSong(SongRequestDTO dto) {
        if (songRepository.existsByTitleAndArtistAndAlbum(dto.getTitle(), dto.getArtist(), dto.getAlbum())) {
            throw new DuplicateDataException("A song with the same title, artist, and album already exists.");
        }
        Song song = modelMapper.map(dto, Song.class);
        return modelMapper.map(songRepository.save(song), SongResponseDTO.class);
    }

    @Override
    public SongResponseDTO getSongById(Long id) {
        Song song = songRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Song not found with id: " + id));
        return modelMapper.map(song, SongResponseDTO.class);
    }

    @Override
    public List<SongResponseDTO> getAllSongs() {
        return songRepository.findAll()
                .stream()
                .map(song -> modelMapper.map(song, SongResponseDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public SongResponseDTO updateSong(Long id, SongRequestDTO dto) {
        Song existing = songRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Song not found with id: " + id));

        modelMapper.map(dto, existing); // Update fields from DTO to entity
        return modelMapper.map(songRepository.save(existing), SongResponseDTO.class);
    }

    @Override
    public void deleteSong(Long id) {
        if (!songRepository.existsById(id)) {
            throw new ResourceNotFoundException("Song not found with id: " + id);
        }
        songRepository.deleteById(id);
    }
}