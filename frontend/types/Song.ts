export interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  releaseYear: number;
  genre: string;
  duration: number; // in seconds
  createdAt?: string;
  updatedAt?: string;
}

export interface SongFormData {
  title: string;
  artist: string;
  album: string;
  releaseYear: number;
  genre: string;
  duration: number;
}

export interface SongState {
  songs: Song[];
  currentSong: Song | null;
  loading: boolean;
  error: string | null;
}

export const GENRES = [
  'POP',
  'ROCK',
  'HIPHOP',
  'JAZZ',
  'CLASSICAL',
  'ELECTRONIC',
  'COUNTRY',
  'OTHER'
] as const;

export type Genre = typeof GENRES[number];