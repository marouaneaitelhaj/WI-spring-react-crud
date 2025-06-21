import React from 'react';
import { type Song } from '../types/Song';
import { Edit2, Trash2, Clock, Calendar, Music2 } from 'lucide-react';

interface SongCardProps {
  song: Song;
  onEdit: (song: Song) => void;
  onDelete: (id: string) => void;
  isDeleting?: boolean;
}

const SongCard: React.FC<SongCardProps> = ({ song, onEdit, onDelete, isDeleting = false }) => {
  const formatDuration = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-lg transition-all duration-300 group">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-slate-800 truncate group-hover:text-blue-600 transition-colors">
              {song.title}
            </h3>
            <p className="text-slate-600 truncate">{song.artist}</p>
          </div>
          <div className="flex items-center space-x-2 ml-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => onEdit(song)}
              className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
              title="Edit song"
            >
              <Edit2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(song.id)}
              disabled={isDeleting}
              className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all disabled:opacity-50"
              title="Delete song"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="space-y-2 text-sm text-slate-600">
          <div className="flex items-center space-x-2">
            <Music2 className="w-4 h-4 text-slate-400" />
            <span>{song.album}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-slate-400" />
              <span>{song.releaseYear}</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-slate-400" />
              <span>{formatDuration(song.duration)}</span>
            </div>
          </div>
          
          <div className="pt-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
              {song.genre}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SongCard;