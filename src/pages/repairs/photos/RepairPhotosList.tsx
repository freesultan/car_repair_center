import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Typography,
  Button,
  Paper,
  Divider,
} from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { PhotoGallery } from '../../../components/media';

// Mock data - would come from API in real app
const mockPhotos = [
  {
    id: 1,
    imageUrl: 'https://source.unsplash.com/random/800x600?car&damage=1',
    thumbnailUrl: 'https://source.unsplash.com/random/400x300?car&damage=1',
    description: 'دمپر عقب سمت راننده آسیب دیده است',
    category: 'pre_repair' as const,
    createdAt: '2025-10-19T14:30:00Z',
    createdBy: 'تکنسین احمدی',
  },
  {
    id: 2,
    imageUrl: 'https://source.unsplash.com/random/800x600?car&damage=2',
    thumbnailUrl: 'https://source.unsplash.com/random/400x300?car&damage=2',
    description: 'خراشیدگی روی درب عقب',
    category: 'pre_repair' as const,
    createdAt: '2025-10-19T14:32:00Z',
    createdBy: 'تکنسین احمدی',
  },
  {
    id: 3,
    imageUrl: 'https://source.unsplash.com/random/800x600?car&repair=1',
    thumbnailUrl: 'https://source.unsplash.com/random/400x300?car&repair=1',
    description: 'تعویض دمپر عقب',
    category: 'during_repair' as const,
    createdAt: '2025-10-19T16:15:00Z',
    createdBy: 'تکنسین رضایی',
  },
  {
    id: 4,
    imageUrl: 'https://source.unsplash.com/random/800x600?car&repair=2',
    thumbnailUrl: 'https://source.unsplash.com/random/400x300?car&repair=2',
    description: 'صافکاری درب عقب',
    category: 'during_repair' as const,
    createdAt: '2025-10-19T16:45:00Z',
    createdBy: 'تکنسین رضایی',
  },
  {
    id: 5,
    imageUrl: 'https://source.unsplash.com/random/800x600?car&fixed=1',
    thumbnailUrl: 'https://source.unsplash.com/random/400x300?car&fixed=1',
    description: 'نمای نهایی دمپر تعویض شده',
    category: 'post_repair' as const,
    createdAt: '2025-10-20T10:20:00Z',
    createdBy: 'تکنسین احمدی',
  },
];

const RepairPhotosList: React.FC = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [photos, setPhotos] = useState(mockPhotos);
  
  const handleAddPhoto = () => {
    navigate(`/repairs/${id}/photos/new`);
  };
  
  const handleDeletePhoto = (photoId: number) => {
    // In real app, call API to delete photo
    setPhotos(photos.filter(photo => photo.id !== photoId));
  };
  
  const handleBack = () => {
    navigate(`/repairs/${id}`);
  };
  
  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Button 
          startIcon={<ArrowBackIcon />} 
          onClick={handleBack}
          sx={{ mr: 2 }}
        >
          {t('common.back')}
        </Button>
        <Typography variant="h4" component="h1">
          {t('repairs.photos')}
        </Typography>
      </Box>
      
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {t('repairs.repairId')}: {id}
        </Typography>
        
        <Divider sx={{ my: 2 }} />
        
        <PhotoGallery
          photos={photos}
          onAddPhoto={handleAddPhoto}
          onDeletePhoto={handleDeletePhoto}
        />
      </Paper>
    </Box>
  );
};

export default RepairPhotosList;
