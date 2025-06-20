package com.tunz.backend.dto;

import com.tunz.backend.enums.Genre;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SongResponseDTO {

    private Long id;
    private String title;
    private String artist;
    private String album;
    private Integer releaseYear;
    private Genre genre;
    private Integer duration;
}