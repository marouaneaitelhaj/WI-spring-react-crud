import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { type Song,type  SongFormData, type SongState } from '../types/Song';
import { songApi } from '../services/api';

const initialState: SongState = {
  songs: [],
  currentSong: null,
  loading: false,
  error: null,
};

// Async thunks for API calls
export const fetchSongs = createAsyncThunk(
  'songs/fetchSongs',
  async (_, { rejectWithValue }) => {
    try {
      const songs = await songApi.getSongs();
      return songs;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch songs');
    }
  }
);

export const fetchSongById = createAsyncThunk(
  'songs/fetchSongById',
  async (id: string, { rejectWithValue }) => {
    try {
      const song = await songApi.getSongById(id);
      return song;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch song');
    }
  }
);

export const createSong = createAsyncThunk(
  'songs/createSong',
  async (songData: SongFormData, { rejectWithValue }) => {
    try {
      const newSong = await songApi.createSong(songData);
      return newSong;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to create song');
    }
  }
);

export const updateSong = createAsyncThunk(
  'songs/updateSong',
  async ({ id, songData }: { id: string; songData: SongFormData }, { rejectWithValue }) => {
    try {
      const updatedSong = await songApi.updateSong(id, songData);
      return updatedSong;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to update song');
    }
  }
);

export const deleteSong = createAsyncThunk(
  'songs/deleteSong',
  async (id: string, { rejectWithValue }) => {
    try {
      await songApi.deleteSong(id);
      return id;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to delete song');
    }
  }
);

const songSlice = createSlice({
  name: 'songs',
  initialState,
  reducers: {
    clearCurrentSong: (state) => {
      state.currentSong = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    setCurrentSong: (state, action: PayloadAction<Song>) => {
      state.currentSong = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch songs
      .addCase(fetchSongs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSongs.fulfilled, (state, action) => {
        state.loading = false;
        state.songs = action.payload;
      })
      .addCase(fetchSongs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Fetch song by ID
      .addCase(fetchSongById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSongById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentSong = action.payload;
      })
      .addCase(fetchSongById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Create song
      .addCase(createSong.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createSong.fulfilled, (state, action) => {
        state.loading = false;
        state.songs.push(action.payload);
      })
      .addCase(createSong.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Update song
      .addCase(updateSong.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSong.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.songs.findIndex(song => song.id === action.payload.id);
        if (index !== -1) {
          state.songs[index] = action.payload;
        }
        state.currentSong = action.payload;
      })
      .addCase(updateSong.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Delete song
      .addCase(deleteSong.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSong.fulfilled, (state, action) => {
        state.loading = false;
        state.songs = state.songs.filter(song => song.id !== action.payload);
        if (state.currentSong?.id === action.payload) {
          state.currentSong = null;
        }
      })
      .addCase(deleteSong.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearCurrentSong, clearError, setCurrentSong } = songSlice.actions;
export default songSlice.reducer;