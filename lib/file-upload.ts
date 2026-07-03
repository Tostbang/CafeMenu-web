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

  if (!result.fileUrl && !result.fileUri && !result.url) {
    // Surface what the backend actually sent so the user can compare it
    // with the OpenAPI spec without having to open devtools.
    const keys = Object.keys(result)
      .filter((k) => k !== "success")
      .join(", ");
    console.error("[uploadFile] missing url in response", result);
    throw new Error(
      `Dosya yüklendi ancak sunucudan geçerli bir yanıt alınamadı (alanlar: ${keys || "boş"}).`,
    );
  }

  // The backend has shipped the response under several field names over
  // time (fileUrl, fileUri, url). Be lenient so a single rename on the
  // server doesn't break product/avatar uploads here.
  const url = result.fileUrl || result.fileUri || (result.url as string);
  const fileName =
    result.fileName || (file instanceof File ? file.name : "upload");

  return { url, fileName };
}
