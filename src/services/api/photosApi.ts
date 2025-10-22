import BaseApiService from './baseApi';
import { Photo } from '../../types';

export interface PhotoUploadRequest {
  repairId: number;
  category: 'PRE_REPAIR' | 'DURING_REPAIR' | 'POST_REPAIR' | 'DAMAGED_PARTS';
  description?: string;
  file: File;
}

class PhotosApiService extends BaseApiService {
  async getPhotos(repairId: number): Promise<Photo[]> {
    return this.get<Photo[]>(`/repairs/${repairId}/photos`);
  }
  
  async getPhotoById(id: number): Promise<Photo> {
    return this.get<Photo>(`/photos/${id}`);
  }
  
  async uploadPhoto(data: PhotoUploadRequest): Promise<Photo> {
    // Create form data for file upload
    const formData = new FormData();
    formData.append('repairId', data.repairId.toString());
    formData.append('category', data.category);
    if (data.description) {
      formData.append('description', data.description);
    }
    formData.append('file', data.file);
    
    return this.post<Photo>('/photos', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }
  
  async deletePhoto(id: number): Promise<void> {
    return this.delete<void>(`/photos/${id}`);
  }
}

export const photosApi = new PhotosApiService();
