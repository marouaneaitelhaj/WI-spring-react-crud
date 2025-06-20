package com.tunz.backend.entity;

import com.tunz.backend.enums.Genre;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Song {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Title is required")
    private String title;

    @NotBlank(message = "Artist is required")
    private String artist;

    private String album;

    @Min(value = 1900, message = "Year must be after 1900")
    @Max(value = 2100, message = "Year must be before 2100")
    private Integer releaseYear;


    @NotNull(message = "Genre is required")
    @Enumerated(EnumType.STRING)
    private Genre genre;

    @Positive(message = "Duration must be a positive number of seconds")
    private Integer duration; // in seconds
}
