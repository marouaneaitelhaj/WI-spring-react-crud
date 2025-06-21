import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { type RootState, type AppDispatch } from '../store';
import { createSong, updateSong, clearError, clearCurrentSong } from '../store/songSlice';
import { type SongFormData, GENRES } from '../types/Song';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';
import { Save, ArrowLeft, Music } from 'lucide-react';

interface SongFormProps {
  isEdit?: boolean;
}

const SongForm: React.FC<SongFormProps> = ({ isEdit = false }) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { currentSong, loading, error } = useSelector((state: RootState) => state.songs);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<SongFormData>({
    defaultValues: {
      title: '',
      artist: '',
      album: '',
      releaseYear: new Date().getFullYear(),
      genre: GENRES[0],
      duration: null,
    },
  });

  useEffect(() => {
    if (isEdit && currentSong) {
      setValue('title', currentSong.title);
      setValue('artist', currentSong.artist);
      setValue('album', currentSong.album);
      setValue('releaseYear', currentSong.releaseYear);
      setValue('genre', currentSong.genre);
      setValue('duration', currentSong.duration);
    }

    return () => {
      if (!isEdit) {
        dispatch(clearCurrentSong());
      }
    };
  }, [isEdit, currentSong, setValue, dispatch]);

  const onSubmit = async (data: SongFormData) => {
    try {
      if (isEdit && currentSong) {
        await dispatch(updateSong({ id: currentSong.id, songData: data })).unwrap();
      } else {
        await dispatch(createSong(data)).unwrap();
      }
      navigate('/');
    } catch (err) {
      console.error('Error saving song:', err);
    }
  };

  const parseDurationInput = (value: string): number => {
    if (!value) return 0;
    if (value.includes(':')) {
      const [m, s] = value.split(':').map((n) => parseInt(n) || 0);
      return m * 60 + s;
    }
    return parseInt(value) || 0;
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Music className="w-8 h-8 text-white" />
              <h1 className="text-2xl font-bold text-white">{isEdit ? 'Edit Song' : 'Add New Song'}</h1>
            </div>
            <button
              onClick={() => navigate('/')}
              className="text-blue-100 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          {error && <ErrorMessage message={error} onClose={() => dispatch(clearError())} />}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label htmlFor="title" className="block text-sm font-medium text-slate-700 mb-2">
                Song Title *
              </label>
              <input
                id="title"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                  errors.title ? 'border-red-300' : 'border-slate-300'
                }`}
                {...register('title', { required: 'Title is required' })}
                placeholder="Enter song title"
              />
              {errors.title && <p className="text-sm text-red-600">{errors.title.message}</p>}
            </div>

            <div>
              <label htmlFor="artist" className="block text-sm font-medium text-slate-700 mb-2">
                Artist *
              </label>
              <input
                id="artist"
                className={`w-full px-4 py-3 border rounded-lg ${errors.artist ? 'border-red-300' : 'border-slate-300'}`}
                {...register('artist', { required: 'Artist is required' })}
                placeholder="Enter artist name"
              />
              {errors.artist && <p className="text-sm text-red-600">{errors.artist.message}</p>}
            </div>

            <div>
              <label htmlFor="album" className="block text-sm font-medium text-slate-700 mb-2">
                Album *
              </label>
              <input
                id="album"
                className={`w-full px-4 py-3 border rounded-lg ${errors.album ? 'border-red-300' : 'border-slate-300'}`}
                {...register('album', { required: 'Album is required' })}
                placeholder="Enter album name"
              />
              {errors.album && <p className="text-sm text-red-600">{errors.album.message}</p>}
            </div>

            <div>
              <label htmlFor="releaseYear" className="block text-sm font-medium text-slate-700 mb-2">
                Release Year *
              </label>
              <input
                type="number"
                id="releaseYear"
                className={`w-full px-4 py-3 border rounded-lg ${errors.releaseYear ? 'border-red-300' : 'border-slate-300'}`}
                {...register('releaseYear', {
                  required: 'Release year is required',
                  min: { value: 1800, message: 'Too old' },
                  max: { value: new Date().getFullYear() + 10, message: 'Too futuristic' },
                })}
              />
              {errors.releaseYear && <p className="text-sm text-red-600">{errors.releaseYear.message}</p>}
            </div>

            <div>
              <label htmlFor="genre" className="block text-sm font-medium text-slate-700 mb-2">
                Genre *
              </label>
              <select
                id="genre"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg"
                {...register('genre')}
              >
                {GENRES.map((genre) => (
                  <option key={genre} value={genre}>
                    {genre}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="duration" className="block text-sm font-medium text-slate-700 mb-2">
                Duration *
              </label>
                <input
                type="text"
                id="duration"
                className={`w-full px-4 py-3 border rounded-lg ${errors.duration ? 'border-red-300' : 'border-slate-300'}`}
                defaultValue={
                  currentSong && currentSong.duration
                  ? `${Math.floor(currentSong.duration / 60)}:${String(currentSong.duration % 60).padStart(2, '0')}`
                  : ''
                }
                {...register('duration', {
                  required: 'Duration is required',
                  validate: (value) => {
                  const parsed = parseDurationInput(String(value ?? ''));
                  if (isNaN(parsed) || parsed < 0) {
                    return 'Invalid duration format';
                  }
                  return true;
                  },
                  setValueAs: (value) => parseDurationInput(String(value ?? '')),
                })}
                placeholder="3:45 or 225"
                />
              <p className="text-xs text-slate-500 mt-1">
                Enter as MM:SS (e.g., 3:45) or total seconds (e.g., 225)
              </p>
              {errors.duration && <p className="text-sm text-red-600">{errors.duration.message}</p>}
            </div>
          </div>

          <div className="flex space-x-4 pt-6 border-t border-slate-200">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="flex-1 px-6 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {loading ? <LoadingSpinner size="sm" /> : <><Save className="w-4 h-4" /><span>{isEdit ? 'Update Song' : 'Add Song'}</span></>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SongForm;
