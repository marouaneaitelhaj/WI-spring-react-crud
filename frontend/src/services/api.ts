import axios from 'axios';
import { type Song, type SongFormData } from '../types/Song';
import type { User } from '../types/User';


const API_BASE_URL = 'http://localhost:8082';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export function setAuthToken(token: string | null) {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
}

export const songApi = {
  getSongs: async (): Promise<Song[]> => {
    try {
      setAuthToken(localStorage.getItem('token'));
      const response = await api.get<Song[]>('/api/songs');
      return response.data;
    } catch (error) {
      console.error('Error fetching songs:', error);
      throw new Error('Failed to fetch songs');
    }
  },

  getSongById: async (id: string): Promise<Song> => {
    try {
      setAuthToken(localStorage.getItem('token'));
      const response = await api.get<Song>(`/api/songs/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching song:', error);
      throw new Error('Failed to fetch song');
    }
  },

  createSong: async (songData: SongFormData): Promise<Song> => {
    try {
      setAuthToken(localStorage.getItem('token'));
      const response = await api.post<Song>('/api/songs', songData);
      return response.data;
    } catch (error) {
      console.error('Error creating song:', error);
      throw new Error('Failed to create song');
    }
  },

  updateSong: async (id: string, songData: SongFormData): Promise<Song> => {
    try {
      setAuthToken(localStorage.getItem('token'));
      const response = await api.put<Song>(`/api/songs/${id}`, songData);
      return response.data;
    } catch (error) {
      console.error('Error updating song:', error);
      throw new Error('Failed to update song');
    }
  },

  deleteSong: async (id: string): Promise<void> => {
    try {
      setAuthToken(localStorage.getItem('token'));
      await api.delete(`/api/songs/${id}`);
    } catch (error) {
      console.error('Error deleting song:', error);
      throw new Error('Failed to delete song');
    }
  },
};

const _api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export const authApi = {
  login: async (credentials: User) => {
    try {
      const response = await _api.post('/auth/login', credentials
      );
      return response.data;
    } catch (error) {
      console.error('Error logging in:', error);
      throw new Error('Login failed');
    }
  },
  register: async (userData: User) => {
    try {
      const response = await _api.post('/auth/register', userData);
      return response.data;
    } catch (error) {
      console.error('Error registering:', error);
      throw new Error('Registration failed');
    }
  },
  me: async (token: string): Promise<User> => {
    try {
      const response = await api.get<User>('/auth/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw new Error('Failed to fetch user data');
    }
  }
};