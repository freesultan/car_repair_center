import React, { useState } from 'react';
import { Box, Container, Typography, Paper } from '@mui/material';
import { useTranslation } from 'react-i18next';
import CameraCapture from './CameraCapture';
import ImagePreview, { ImageSaveData } from './ImagePreview';

interface PhotoCapturePageProps {
  onSave: (data: ImageSaveData) => void;
  onCancel: () => void;
  title?: string;
}

const PhotoCapturePage: React.FC<PhotoCapturePageProps> = ({
  onSave,
  onCancel,
  title,
}) => {
  const { t } = useTranslation();
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  
  const handleCapture = (imageData: string) => {
    setCapturedImage(imageData);
  };
  
  const handleRetake = () => {
    setCapturedImage(null);
  };
  
  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 3, mb: 4 }}>
        <Typography variant="h5" component="h1" gutterBottom>
          {title || t('media.capturePhoto')}
        </Typography>
        
        {capturedImage ? (
          <ImagePreview
            imageData={capturedImage}
            onSave={onSave}
            onRetake={handleRetake}
            onCancel={onCancel}
          />
        ) : (
          <CameraCapture
            onCapture={handleCapture}
            onCancel={onCancel}
          />
        )}
      </Box>
    </Container>
  );
};

export default PhotoCapturePage;
