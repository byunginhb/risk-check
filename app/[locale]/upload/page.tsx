'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { FileUpload } from '@/src/shared/ui/file-upload';
import { Button } from '@/src/shared/ui/button';
import { uploadContract } from '@/src/shared/api/mock/contract';

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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('title')}</h1>
        <p className="text-lg text-gray-600">{t('subtitle')}</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        {isUploading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-lg text-gray-700">{t('uploading')}</p>
          </div>
        ) : (
          <FileUpload onFileSelect={handleFileSelect} />
        )}
      </div>

      {uploadedFile && !isUploading && (
        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-800">
            {t('uploadSuccess')}: {uploadedFile.name}
          </p>
        </div>
      )}
    </div>
  );
}

