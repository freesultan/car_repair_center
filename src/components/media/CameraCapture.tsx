import React, { useRef, useState, useEffect } from 'react';
import {
  Box,
  Button,
  IconButton,
  Typography,
  Paper,
  CircularProgress,
  Grid,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import FlipCameraIcon from '@mui/icons-material/FlipCameraAndroid';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';

interface CameraCaptureProps {
  onCapture: (imageData: string) => void;
  onCancel: () => void;
}

const CameraCapture: React.FC<CameraCaptureProps> = ({ onCapture, onCancel }) => {
  const { t } = useTranslation();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('environment');
  
  // Initialize camera
  useEffect(() => {
    let mounted = true;
    
    const initializeCamera = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Stop any existing stream
        if (stream) {
          stream.getTracks().forEach(track => track.stop());
        }
        
        // Get new stream with current facing mode
        const newStream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode,
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
          audio: false,
        });
        
        if (mounted) {
          setStream(newStream);
          
          if (videoRef.current) {
            videoRef.current.srcObject = newStream;
          }
        } else {
          // Clean up if component unmounted during async operation
          newStream.getTracks().forEach(track => track.stop());
        }
      } catch (err) {
        console.error('Error accessing camera:', err);
        if (mounted) {
          setError(t('media.cameraAccessError'));
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };
    
    initializeCamera();
    
    return () => {
      mounted = false;
      
      // Clean up on unmount
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [facingMode, t]);
  
  // Handle camera flip
  const handleFlipCamera = () => {
    setFacingMode(prev => (prev === 'user' ? 'environment' : 'user'));
  };
  
  // Handle photo capture
  const handleCapture = () => {
    if (!videoRef.current) return;
    
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    
    const context = canvas.getContext('2d');
    if (!context) return;
    
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    
    const imageData = canvas.toDataURL('image/jpeg');
    onCapture(imageData);
  };
  
  // Mock file input for image upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        onCapture(event.target.result as string);
      }
    };
    
    reader.readAsDataURL(file);
  };
  
  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      <Box sx={{ position: 'relative', width: '100%' }}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Box sx={{ textAlign: 'center', p: 4 }}>
            <Typography color="error">{error}</Typography>
            
            {/* Fallback to file upload if camera access fails */}
            <Button
              variant="contained"
              component="label"
              startIcon={<PhotoLibraryIcon />}
              sx={{ mt: 2 }}
            >
              {t('media.uploadFromGallery')}
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleFileUpload}
              />
            </Button>
          </Box>
        ) : (
          <>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              style={{
                width: '100%',
                borderRadius: '4px',
                transform: facingMode === 'user' ? 'scaleX(-1)' : 'none',
              }}
            />
            
            <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid item xs={4}>
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={onCancel}
                >
                  {t('common.cancel')}
                </Button>
              </Grid>
              
              <Grid item xs={4}>
                <IconButton
                  color="primary"
                  onClick={handleFlipCamera}
                  sx={{ width: '100%' }}
                >
                  <FlipCameraIcon />
                </IconButton>
              </Grid>
              
              <Grid item xs={4}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={handleCapture}
                  startIcon={<CameraAltIcon />}
                >
                  {t('media.capture')}
                </Button>
              </Grid>
            </Grid>
            
            <Typography variant="caption" sx={{ mt: 2, display: 'block', textAlign: 'center' }}>
              {t('media.cameraTips')}
            </Typography>
          </>
        )}
      </Box>
    </Paper>
  );
};

export default CameraCapture;
