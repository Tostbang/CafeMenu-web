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
    throw new Error('File is required');
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

  if (!result || !result.url || !result.fileName) {
    throw new Error('Failed to upload file');
  }

  return {
    url: result.url,
    fileName: result.fileName,
  };
}
