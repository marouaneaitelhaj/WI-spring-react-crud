package com.tunz.backend.service.impl;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import org.modelmapper.ModelMapper;

import com.tunz.backend.dto.SongRequestDTO;
import com.tunz.backend.dto.SongResponseDTO;
import com.tunz.backend.entity.Song;
import com.tunz.backend.exception.DuplicateDataException;
import com.tunz.backend.exception.ResourceNotFoundException;
import com.tunz.backend.repository.SongRepository;

class SongServiceImplTest {

    private SongRepository songRepository;
    private ModelMapper modelMapper;
    private SongServiceImpl songService;

    @BeforeEach
    void setup() {
        songRepository = mock(SongRepository.class);
        modelMapper = new ModelMapper();
        songService = new SongServiceImpl(songRepository, modelMapper);
    }

    @Test
    void createSong_shouldThrowDuplicateDataException_whenSongExists() {
        SongRequestDTO dto = new SongRequestDTO();
        dto.setTitle("Title");
        dto.setArtist("Artist");
        dto.setAlbum("Album");

        when(songRepository.existsByTitleAndArtistAndAlbum("Title", "Artist", "Album")).thenReturn(true);

        assertThrows(DuplicateDataException.class, () -> songService.createSong(dto));
        verify(songRepository, never()).save(any());
    }

    @Test
    void createSong_shouldReturnCreatedSong() {
        SongRequestDTO dto = new SongRequestDTO();
        dto.setTitle("Title");
        dto.setArtist("Artist");
        dto.setAlbum("Album");

        Song songEntity = modelMapper.map(dto, Song.class);
        Song savedSong = new Song();
        savedSong.setId(1L);
        savedSong.setTitle("Title");
        savedSong.setArtist("Artist");
        savedSong.setAlbum("Album");

        when(songRepository.existsByTitleAndArtistAndAlbum("Title", "Artist", "Album")).thenReturn(false);
        when(songRepository.save(any(Song.class))).thenReturn(savedSong);

        SongResponseDTO responseDTO = songService.createSong(dto);

        assertEquals(1L, responseDTO.getId());
        assertEquals("Title", responseDTO.getTitle());
        verify(songRepository).save(any(Song.class));
    }

    @Test
    void getSongById_shouldReturnSong() {
        Song song = new Song();
        song.setId(1L);
        song.setTitle("Title");

        when(songRepository.findById(1L)).thenReturn(Optional.of(song));

        SongResponseDTO result = songService.getSongById(1L);

        assertEquals(1L, result.getId());
        assertEquals("Title", result.getTitle());
    }

    @Test
    void getSongById_shouldThrowResourceNotFoundException() {
        when(songRepository.findById(1L)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> songService.getSongById(1L));
    }

    @Test
    void getAllSongs_shouldReturnList() {
        Song song = new Song();
        song.setId(1L);
        song.setTitle("Title");

        when(songRepository.findAll()).thenReturn(List.of(song));

        List<SongResponseDTO> allSongs = songService.getAllSongs();

        assertEquals(1, allSongs.size());
        assertEquals("Title", allSongs.get(0).getTitle());
    }

    @Test
    void updateSong_shouldUpdateAndReturn() {
        SongRequestDTO dto = new SongRequestDTO();
        dto.setTitle("New Title");
        dto.setArtist("New Artist");
        dto.setAlbum("New Album");

        Song existing = new Song();
        existing.setId(1L);
        existing.setTitle("Old Title");
        existing.setArtist("Old Artist");
        existing.setAlbum("Old Album");

        when(songRepository.findById(1L)).thenReturn(Optional.of(existing));
        when(songRepository.save(any(Song.class))).thenAnswer(i -> i.getArgument(0));

        SongResponseDTO updated = songService.updateSong(1L, dto);

        assertEquals("New Title", updated.getTitle());
        assertEquals("New Artist", updated.getArtist());
        assertEquals("New Album", updated.getAlbum());
    }

    @Test
    void updateSong_shouldThrowResourceNotFoundException() {
        when(songRepository.findById(1L)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> songService.updateSong(1L, new SongRequestDTO()));
    }

    @Test
    void deleteSong_shouldDeleteWhenExists() {
        when(songRepository.existsById(1L)).thenReturn(true);

        songService.deleteSong(1L);

        verify(songRepository).deleteById(1L);
    }

    @Test
    void deleteSong_shouldThrowResourceNotFoundException() {
        when(songRepository.existsById(1L)).thenReturn(false);

        assertThrows(ResourceNotFoundException.class, () -> songService.deleteSong(1L));
    }
}
