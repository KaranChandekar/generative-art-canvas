'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { SavedArtwork } from '@/types/art';
import { MODE_LABELS } from '@/utils/constants';

interface ArtworkCardProps {
  artwork: SavedArtwork;
  onLoad: (artwork: SavedArtwork) => void;
  onDelete: (id: string) => void;
}

export default function ArtworkCard({ artwork, onLoad, onDelete }: ArtworkCardProps) {
  const [confirmDelete, setConfirmDelete] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="group relative rounded-xl overflow-hidden bg-gray-900 border border-white/5 hover:border-purple-500/30 transition-all"
    >
      <img
        src={artwork.thumbnail}
        alt={`${MODE_LABELS[artwork.mode]} artwork`}
        className="w-full h-48 object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
        <div className="flex gap-2">
          <button
            onClick={() => onLoad(artwork)}
            className="flex-1 py-1.5 text-xs font-medium bg-purple-600 hover:bg-purple-500 rounded-md transition-colors"
          >
            Load
          </button>
          {confirmDelete ? (
            <>
              <button
                onClick={() => onDelete(artwork.id)}
                className="px-3 py-1.5 text-xs font-medium bg-red-600 hover:bg-red-500 rounded-md transition-colors"
              >
                Yes
              </button>
              <button
                onClick={() => setConfirmDelete(false)}
                className="px-3 py-1.5 text-xs font-medium bg-gray-700 hover:bg-gray-600 rounded-md transition-colors"
              >
                No
              </button>
            </>
          ) : (
            <button
              onClick={() => setConfirmDelete(true)}
              className="px-3 py-1.5 text-xs font-medium bg-gray-700 hover:bg-red-600 rounded-md transition-colors"
            >
              Delete
            </button>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="p-3">
        <p className="text-xs font-medium text-gray-300">{MODE_LABELS[artwork.mode]}</p>
        <p className="text-[10px] text-gray-600 mt-0.5">
          {new Date(artwork.timestamp).toLocaleDateString(undefined, {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </p>
      </div>
    </motion.div>
  );
}
