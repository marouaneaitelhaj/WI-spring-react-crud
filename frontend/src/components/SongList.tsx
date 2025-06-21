import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { type RootState } from '../store';
import { fetchSongs, deleteSong, clearError, setCurrentSong } from '../store/songSlice';
import { type Song } from '../types/Song';
import SongCard from './SongCard';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';
import { type AppDispatch } from '../store';
import { Music, Search } from 'lucide-react';

const SongList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { songs, loading, error } = useSelector((state: RootState) => state.songs);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [deletingId, setDeletingId] = React.useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchSongs());
  }, [dispatch]);

  const handleEdit = (song: Song) => {
    dispatch(setCurrentSong(song));
    navigate(`/edit/${song.id}`);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this song?')) {
      setDeletingId(id);
      try {
        await dispatch(deleteSong(id)).unwrap();
      } catch (error) {
        console.error('Error deleting song:', error);
      } finally {
        setDeletingId(null);
      }
    }
  };

  const filteredSongs = songs.filter(song =>
    song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    song.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
    song.album.toLowerCase().includes(searchTerm.toLowerCase()) ||
    song.genre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading && songs.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 flex items-center space-x-3">
            <Music className="w-8 h-8 text-blue-600" />
            <span>My Music Library</span>
          </h1>
          <p className="text-slate-600 mt-1">
            {songs.length} {songs.length === 1 ? 'song' : 'songs'} in your collection
          </p>
        </div>

        <div className="relative max-w-md w-full sm:w-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search songs, artists, albums..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
        </div>
      </div>

      {error && (
        <ErrorMessage
          message={error}
          onClose={() => dispatch(clearError())}
        />
      )}

      {filteredSongs.length === 0 && !loading ? (
        <div className="text-center py-12">
          <Music className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-slate-600 mb-2">
            {searchTerm ? 'No songs found' : 'No songs in your library'}
          </h3>
          <p className="text-slate-500 mb-6">
            {searchTerm 
              ? 'Try adjusting your search terms' 
              : 'Start building your music collection by adding your first song'
            }
          </p>
          {!searchTerm && (
            <button
              onClick={() => navigate('/add')}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Add Your First Song
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSongs.map((song) => (
            <SongCard
              key={song.id}
              song={song}
              onEdit={handleEdit}
              onDelete={handleDelete}
              isDeleting={deletingId === song.id}
            />
          ))}
        </div>
      )}

      {loading && songs.length > 0 && (
        <div className="flex justify-center py-4">
          <LoadingSpinner />
        </div>
      )}
    </div>
  );
};

export default SongList;