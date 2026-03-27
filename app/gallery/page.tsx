'use client';

import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useArtStore } from '@/store/artStore';
import ArtworkCard from '@/components/Gallery/ArtworkCard';
import { SavedArtwork } from '@/types/art';
import { MAX_GALLERY } from '@/utils/constants';

export default function GalleryPage() {
  const router = useRouter();
  const gallery = useArtStore((s) => s.gallery);
  const loadArtwork = useArtStore((s) => s.loadArtwork);
  const deleteFromGallery = useArtStore((s) => s.deleteFromGallery);

  const handleLoad = (artwork: SavedArtwork) => {
    loadArtwork(artwork);
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gray-950 overflow-auto">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-gray-950/90 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-white">Gallery</h1>
            <p className="text-xs text-gray-500 mt-0.5">
              {gallery.length} / {MAX_GALLERY} artworks saved
            </p>
          </div>
          <a
            href="/"
            className="px-4 py-2 text-sm bg-purple-600 hover:bg-purple-500 rounded-lg transition-colors"
          >
            Back to Canvas
          </a>
        </div>
      </header>

      {/* Gallery Grid */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        {gallery.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-gray-600">
            <svg
              className="w-16 h-16 mb-4 opacity-30"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <p className="text-lg font-medium">No artworks yet</p>
            <p className="text-sm mt-1">
              Create some art and save it to see it here
            </p>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            <AnimatePresence mode="popLayout">
              {[...gallery].reverse().map((artwork) => (
                <ArtworkCard
                  key={artwork.id}
                  artwork={artwork}
                  onLoad={handleLoad}
                  onDelete={deleteFromGallery}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {gallery.length >= MAX_GALLERY - 5 && gallery.length > 0 && (
          <p className="text-center text-xs text-amber-500 mt-6">
            Approaching gallery limit ({gallery.length}/{MAX_GALLERY}). Delete some artworks to make room.
          </p>
        )}
      </div>
    </div>
  );
}
