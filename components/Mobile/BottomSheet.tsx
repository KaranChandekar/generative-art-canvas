'use client';

import { useState } from 'react';
import { motion, useDragControls, PanInfo } from 'framer-motion';

interface BottomSheetProps {
  children: React.ReactNode;
}

export default function BottomSheet({ children }: BottomSheetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dragControls = useDragControls();

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.y > 100) {
      setIsOpen(false);
    } else if (info.offset.y < -100) {
      setIsOpen(true);
    }
  };

  return (
    <motion.div
      drag="y"
      dragControls={dragControls}
      dragConstraints={{ top: 0, bottom: 0 }}
      dragElastic={0.2}
      onDragEnd={handleDragEnd}
      animate={{ y: isOpen ? 0 : 'calc(100% - 48px)' }}
      transition={{ type: 'spring', damping: 30, stiffness: 300 }}
      className="fixed bottom-0 left-0 right-0 z-40 bg-gray-950/98 backdrop-blur-xl border-t border-white/10 rounded-t-2xl"
      style={{ height: '70vh', touchAction: 'none' }}
    >
      {/* Handle */}
      <div
        className="flex justify-center pt-3 pb-2 cursor-grab active:cursor-grabbing"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="w-10 h-1 bg-gray-600 rounded-full" />
      </div>

      {/* Content */}
      <div className="overflow-y-auto h-full pb-20 px-4">{children}</div>
    </motion.div>
  );
}
