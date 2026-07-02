'use server';

import { FetchData } from "./LegacyFetch";


/**
 * Upload a file to Azure Storage
 * @param file - The file to upload
 * @returns Uploaded file metadata
 */
export async function uploadFile(
  file: File,
): Promise<{ url: string; fileName: string }> {
  if (!file || file.size === 0) {
    throw new Error('Yüklenecek dosya bulunamadı.');
  }

  const formData = new FormData();
  formData.append('file', file);

  const result = await FetchData('/File/UploadFile', {
    method: 'POST',
    body: formData,
    cache: 'no-store',
    secure: true,
    bodyType: 'file',
  });

  if (!result) {
    throw new Error('Dosya yüklenirken bir hata oluştu. Lütfen tekrar deneyin.');
  }

  if (!result.success) {
    const backendMessage =
      (Array.isArray(result.errors) && result.errors[0]) ||
      result.message ||
      'Dosya yüklenirken bir hata oluştu. Lütfen tekrar deneyin.';
    throw new Error(backendMessage);
  }

  if (!result.url || !result.fileName) {
    throw new Error('Dosya yüklendi ancak sunucudan geçerli bir yanıt alınamadı.');
  }

  return {
    url: result.url,
    fileName: result.fileName,
  };
}
