'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { FileUpload } from '@/src/shared/ui/file-upload';
import { uploadContract } from '@/src/shared/api/mock/contract';
import { Loader2 } from 'lucide-react';

export default function UploadPage() {
  const t = useTranslations('upload');
  const locale = useLocale();
  const router = useRouter();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleFileSelect = async (file: File) => {
    setUploadedFile(file);
    setIsUploading(true);

    try {
      const response = await uploadContract(file);
      if (response.success && response.analysisId) {
        router.push(`/${locale}/analysis/${response.analysisId}`);
      }
    } catch (error) {
      console.error('Upload error:', error);
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center mb-12 animate-fade-in-up">
        <h1 className="text-4xl font-bold text-foreground mb-4">{t('title')}</h1>
        <p className="text-xl text-muted-foreground">{t('subtitle')}</p>
      </div>

      <div className="glass-card rounded-2xl p-8 md:p-12 animate-fade-in-up animation-delay-200">
        {isUploading ? (
          <div className="text-center py-12">
            <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
            <p className="text-lg text-muted-foreground">{t('uploading')}</p>
          </div>
        ) : (
          <FileUpload onFileSelect={handleFileSelect} />
        )}
      </div>

      {uploadedFile && !isUploading && (
        <div className="mt-6 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg animate-fade-in-up">
          <p className="text-emerald-500 flex items-center justify-center gap-2">
            <span className="font-semibold">{t('uploadSuccess')}:</span> {uploadedFile.name}
          </p>
        </div>
      )}
    </div>
  );
}
