import React, { useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { type RootState } from '../store';
import { fetchSongById } from '../store/songSlice';
import { type AppDispatch } from '../store';
import SongForm from '../components/SongForm';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

function EditSongPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { currentSong, loading, error } = useSelector((state: RootState) => state.songs);

  const hasFetched = useRef<string | null>(null);

  useEffect(() => {
    if (!id) return;

    if (hasFetched.current !== id) {
      dispatch(fetchSongById(id));
      hasFetched.current = id;
    }
  }, [id, dispatch]);

  if (!id) {
    navigate('/');
    return null;
  }

  if (loading && !currentSong) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto">
        <ErrorMessage message={error} />
      </div>
    );
  }

  if (!currentSong) {
    return (
      <div className="max-w-2xl mx-auto">
        <ErrorMessage message="Song not found" />
      </div>
    );
  }

  return <SongForm isEdit />;
}

export default EditSongPage;
