package com.tunz.backend.repository;

import com.tunz.backend.entity.Song;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SongRepository extends JpaRepository<Song, Long> {

    boolean existsByTitleAndArtistAndAlbum(String title, String artist, String album);
}