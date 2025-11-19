'use client';

import { useCallback, useState } from 'react';
import { useTranslations } from 'next-intl';
import { UploadCloud, File as FileIcon, X, AlertCircle } from 'lucide-react';
import { cn } from '@/src/shared/lib/utils';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  accept?: string;
  maxSize?: number; // bytes
}

export function FileUpload({ onFileSelect, accept = '.pdf,.jpg,.jpeg,.png', maxSize = 10 * 1024 * 1024 }: FileUploadProps) {
  const t = useTranslations('upload');
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateFile = (file: File): boolean => {
    setError(null);

    // 파일 크기 검증
    if (file.size > maxSize) {
      setError(t('fileTooLarge'));
      return false;
    }

    // 파일 형식 검증
    const acceptedTypes = accept.split(',').map(type => type.trim());
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
    
    // Simple extension check - in production consider checking MIME types
    const isAccepted = acceptedTypes.some(type => 
      type.startsWith('.') ? fileExtension === type : file.type.match(new RegExp(type.replace('*', '.*')))
    );

    if (!isAccepted && acceptedTypes.length > 0) {
      setError(t('invalidFormat'));
      return false;
    }

    return true;
  };

  const handleFile = useCallback((file: File) => {
    if (validateFile(file)) {
      onFileSelect(file);
    }
  }, [onFileSelect, accept, maxSize, t]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFile(files[0]);
    }
  }, [handleFile]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  }, [handleFile]);

  return (
    <div className="w-full">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          "relative group cursor-pointer flex flex-col items-center justify-center w-full h-64 rounded-xl border-2 border-dashed transition-all duration-300",
          isDragging
            ? "border-primary bg-primary/5 scale-[0.99]"
            : "border-border hover:border-primary/50 hover:bg-secondary/50"
        )}
      >
        <input
          type="file"
          id="file-upload"
          accept={accept}
          onChange={handleFileInput}
          className="hidden"
        />
        <label htmlFor="file-upload" className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
          <div className={cn(
            "p-4 rounded-full bg-secondary mb-4 transition-transform duration-300 group-hover:scale-110",
            isDragging && "bg-primary/10 text-primary"
          )}>
            <UploadCloud className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors" />
          </div>
          
          <div className="space-y-2 text-center">
            <h3 className="text-lg font-semibold text-foreground">
              {t('dragDrop')}
            </h3>
            <p className="text-sm text-muted-foreground">
              {t('supportedFormats')}
            </p>
          </div>

          <div className="mt-6">
            <span className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium shadow hover:bg-primary/90 transition-colors">
              {t('selectFile')}
            </span>
          </div>
        </label>
      </div>

      {error && (
        <div className="mt-4 p-3 bg-destructive/10 border border-destructive/20 rounded-lg flex items-center gap-2 text-destructive text-sm animate-fade-in-up">
          <AlertCircle className="w-4 h-4" />
          {error}
        </div>
      )}
    </div>
  );
}
