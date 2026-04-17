'use client'

import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { useDropzone } from 'react-dropzone';
import { motion } from 'motion/react';
import { Upload } from 'lucide-react';

const mainVariant = {
  initial: { x: 0, y: 0 },
  animate: { x: 20, y: -20, opacity: 0.9 },
};


const secondaryVariant = {
  initial: { opacity: 0 },

  animate: { opacity: 1 },
};

interface FileUploadProps {
  onChange?: (files: File[]) => void;
  defaultImageUrl?: string | null;
  title?: string;
}

export const FileUploadStruc: React.FC<FileUploadProps> = ({
  onChange,
  defaultImageUrl,
  title = "Görsel",
}) => {
  const [uploadedPreviewUrl, setUploadedPreviewUrl] = useState<string | null>(
    null,
  );
  const fileInputRef = useRef<HTMLInputElement>(null);
  const previewUrl = uploadedPreviewUrl ?? defaultImageUrl ?? null;

  const handleFileChange = (newFiles: File[]) => {
    const nextFile = newFiles[0];
    if (!nextFile) {
      return;
    }

    const nextPreviewUrl = URL.createObjectURL(nextFile);
    setUploadedPreviewUrl(nextPreviewUrl);
    onChange?.([nextFile]);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  useEffect(() => {
    return () => {
      if (uploadedPreviewUrl) {
        URL.revokeObjectURL(uploadedPreviewUrl);
      }
    };
  }, [uploadedPreviewUrl]);

  const { getRootProps, isDragActive } = useDropzone({
    multiple: false,
    noClick: true,
    accept: {
      'image/*': [],
    },
    onDrop: handleFileChange,
    onDropRejected: console.error,
  });

  return (
    <div className="w-full" {...getRootProps()}>
      <input
        ref={fileInputRef}
        id="file-upload-handle"
        type="file"
        accept="image/*"
        onChange={(e) => handleFileChange(Array.from(e.target.files || []))}
        className="hidden"
      />
      <motion.div
        onClick={previewUrl ? undefined : handleClick}
        whileHover="animate"
        className={cn(
          "group/file relative mx-auto block w-full max-w-sm overflow-hidden rounded-lg border border-dashed p-2.5",
          previewUrl ? 'cursor-default' : 'cursor-pointer',
        )}
      >
        <div className="mb-2 flex items-center justify-between">
          <p className="text-sm font-semibold text-foreground">{title}</p>
          {previewUrl && (
            <button
              type="button"
              className="rounded-md border px-2 py-0.5 text-[11px] font-medium"
              onClick={handleClick}
            >
              Değiştir
            </button>
          )}
        </div>

        {previewUrl ? (
          <div className="relative overflow-hidden rounded-xl border bg-muted/20">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={previewUrl}
              alt="Görsel önizleme"
              className="h-24 w-full object-contain"
            />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <p className="relative z-20 mt-1 text-center text-xs text-muted-foreground">
              Görseli sürükleyip bırakın veya yüklemek için tıklayın.
            </p>
            <div className="relative mx-auto mt-2 w-full max-w-xs">
              <EmptyState isDragActive={isDragActive} />
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

// Empty State Component
interface EmptyStateProps {
  isDragActive: boolean;
}
const EmptyState: React.FC<EmptyStateProps> = ({ isDragActive }) => (
  <>
    <motion.div
      layoutId="file-upload"

      variants={mainVariant}
      transition={{
        type: 'spring',
        stiffness: 300,

        damping: 20,

      }}
      className={cn(
        "relative z-40 mx-auto mt-1.5 flex h-14 w-full max-w-16 items-center justify-center rounded-md border bg-card shadow-sm transition-shadow group-hover/file:shadow-xl",
      )}
    >
      {isDragActive ? (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center text-xs text-muted-foreground"
        >
          Bırakın
          <Upload size={16} className="h-4 w-4 shrink-0 text-primary" />
        </motion.p>
      ) : (
        <Upload size={16} className="h-4 w-4 shrink-0 text-muted-foreground" />
      )}
    </motion.div>
    <motion.div
      variants={secondaryVariant}
      className="absolute inset-0 z-30 mx-auto mt-1.5 flex h-14 w-full max-w-16 items-center justify-center rounded-md border border-dashed border-primary/50 bg-primary/5 opacity-0"
    />
  </>
);

const FileUploadMotion = () => {
  const handleFileUpload = () => {};

  return (
    <div className="w-full max-w-4xl mx-auto min-h-96 border border-dashed bg-background border-muted rounded-xl flex items-center justify-center p-10">
      <FileUploadStruc onChange={handleFileUpload} />
    </div>
  );
};

export default FileUploadMotion;
