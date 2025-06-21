import axios from 'axios';
import { type Song, type SongFormData } from '../types/Song';
import type { User } from '../types/User';

// Mock API base URL - in a real app, this would be your backend URL
const API_BASE_URL = 'http://localhost:8082'; // Using JSONPlaceholder for demo

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Set token from localStorage if available
const token = localStorage.getItem('token');
if (token) {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export const songApi = {
  // Get all songs
  getSongs: async (): Promise<Song[]> => {
    try {
      const response = await api.get<Song[]>('/api/songs');
      return response.data;
    } catch (error) {
      console.error('Error fetching songs:', error);
      throw new Error('Failed to fetch songs');
    }
  },

  // Get song by ID
  getSongById: async (id: string): Promise<Song> => {
    try {
      const response = await api.get<Song>(`/api/songs/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching song:', error);
      throw new Error('Failed to fetch song');
    }
  },

  // Create new song
  createSong: async (songData: SongFormData): Promise<Song> => {
    try {
      const response = await api.post<Song>('/api/songs', songData);
      return response.data;
    } catch (error) {
      console.error('Error creating song:', error);
      throw new Error('Failed to create song');
    }
  },

  // Update song
  updateSong: async (id: string, songData: SongFormData): Promise<Song> => {
    try {
      const response = await api.put<Song>(`/api/songs/${id}`, songData);
      return response.data;
    } catch (error) {
      console.error('Error updating song:', error);
      throw new Error('Failed to update song');
    }
  },

  // Delete song
  deleteSong: async (id: string): Promise<void> => {
    try {
      await api.delete(`/api/songs/${id}`);
    } catch (error) {
      console.error('Error deleting song:', error);
      throw new Error('Failed to delete song');
    }
  },
};


export const authApi = {
  // Login user
  login: async (credentials: User) => {
    try {
      const response = await api.post('/auth/login', credentials
      );
      return response.data;
    } catch (error) {
      console.error('Error logging in:', error);
      throw new Error('Login failed');
    }
  },
  // Register user
  register: async (userData: User) => {
    try {
      const response = await api.post('/auth/register', userData);
      return response.data;
    } catch (error) {
      console.error('Error registering:', error);
      throw new Error('Registration failed');
    }
  }
};