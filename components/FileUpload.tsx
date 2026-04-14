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
}

export const FileUploadStruc: React.FC<FileUploadProps> = ({
  onChange,
  defaultImageUrl,
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
          'p-6 group/file block rounded-lg w-full relative overflow-hidden border border-dashed',
          previewUrl ? 'cursor-default' : 'cursor-pointer',
        )}
      >
        <div className="mb-3 flex items-center justify-between">
          <p className="font-bold text-foreground text-xl">Logo</p>
          {previewUrl && (
            <button
              type="button"
              className="rounded-md border px-3 py-1 text-sm font-medium"
              onClick={handleClick}
            >
              Düzenle
            </button>
          )}
        </div>

        {previewUrl ? (
          <div className="relative overflow-hidden rounded-xl border bg-muted/20">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={previewUrl}
              alt="Logo önizleme"
              className="h-48 w-full object-contain"
            />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <p className="relative z-20 font-normal text-muted-foreground text-base mt-2">
              Görseli sürükleyip bırakın veya yüklemek için tıklayın
            </p>
            <div className="relative w-full mt-10 max-w-xl mx-auto">
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
        'relative group-hover/file:shadow-xl z-40 bg-card border flex items-center justify-center h-28 mt-4 w-full max-w-32 mx-auto rounded-md shadow-sm transition-shadow',
      )}
    >
      {isDragActive ? (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-muted-foreground flex flex-col items-center"
        >
          Drop it
          <Upload size={24} className="h-6 w-6 text-primary shrink-0" />
        </motion.p>
      ) : (
        <Upload size={24} className="h-6 w-6 text-muted-foreground shrink-0" />
      )}
    </motion.div>
    <motion.div
      variants={secondaryVariant}
      className="absolute opacity-0 border border-dashed border-primary/50 inset-0 z-30 bg-primary/5 flex items-center justify-center h-28 mt-4 w-full max-w-32 mx-auto rounded-md"
    />
  </>
);

const FileUploadMotion = () => {
  const handleFileUpload = (_files: File[]) => {};

  return (
    <div className="w-full max-w-4xl mx-auto min-h-96 border border-dashed bg-background border-muted rounded-xl flex items-center justify-center p-10">
      <FileUploadStruc onChange={handleFileUpload} />
    </div>
  );
};

export default FileUploadMotion;
