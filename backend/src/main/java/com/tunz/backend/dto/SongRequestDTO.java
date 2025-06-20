package com.tunz.backend.dto;

import com.tunz.backend.enums.Genre;
import jakarta.validation.constraints.*;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SongRequestDTO {

    @NotBlank(message = "Title is required")
    private String title;

    @NotBlank(message = "Artist is required")
    private String artist;

    private String album;

    @Min(value = 1900, message = "Year must be after 1900")
    @Max(value = 2100, message = "Year must be before 2100")
    private Integer releaseYear;

    @NotNull(message = "Genre is required")
    private Genre genre;

    @Positive(message = "Duration must be a positive number of seconds")
    private Integer duration;
}