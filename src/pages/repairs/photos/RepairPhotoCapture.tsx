import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { PhotoCapturePage, ImageSaveData } from '../../../components/media';

const RepairPhotoCapture: React.FC = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [saving, setSaving] = React.useState(false);
  
  const handleSave = async (data: ImageSaveData) => {
    try {
      setSaving(true);
      
      // In a real app, upload the image to the server
      console.log('Saving photo for repair', id, data);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Navigate back to the photos list
      navigate(`/repairs/${id}/photos`);
    } catch (error) {
      console.error('Error saving photo:', error);
      setSaving(false);
    }
  };
  
  const handleCancel = () => {
    navigate(`/repairs/${id}/photos`);
  };
  
  if (saving) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
        <CircularProgress size={60} />
        <Typography sx={{ mt: 2 }}>{t('media.saving')}</Typography>
      </Box>
    );
  }
  
  return (
    <PhotoCapturePage
      onSave={handleSave}
      onCancel={handleCancel}
      title={t('repairs.addPhoto')}
    />
  );
};

export default RepairPhotoCapture;
