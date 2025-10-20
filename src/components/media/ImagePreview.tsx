import React, { useState } from 'react';
import {
  Box,
  Button,
  IconButton,
  Typography,
  Paper,
  TextField,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';

interface ImagePreviewProps {
  imageData: string;
  onSave: (data: ImageSaveData) => void;
  onRetake: () => void;
  onCancel: () => void;
}

export interface ImageSaveData {
  imageData: string;
  description: string;
  category: 'pre_repair' | 'during_repair' | 'post_repair' | 'damaged_parts';
}

const ImagePreview: React.FC<ImagePreviewProps> = ({
  imageData,
  onSave,
  onRetake,
  onCancel,
}) => {
  const { t } = useTranslation();
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<'pre_repair' | 'during_repair' | 'post_repair' | 'damaged_parts'>('pre_repair');
  const [error, setError] = useState<string | null>(null);
  
  const handleSave = () => {
    if (!description.trim()) {
      setError(t('validation.required'));
      return;
    }
    
    onSave({
      imageData,
      description,
      category,
    });
  };
  
  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      <Box sx={{ position: 'relative' }}>
        <Box
          component="img"
          src={imageData}
          alt={t('media.capturedImage')}
          sx={{
            width: '100%',
            borderRadius: '4px',
            mb: 2,
          }}
        />
        
        <FormControl fullWidth margin="normal">
          <InputLabel id="category-label">{t('media.category')}</InputLabel>
          <Select
            labelId="category-label"
            id="category"
            value={category}
            label={t('media.category')}
            onChange={(e) => setCategory(e.target.value as any)}
          >
            <MenuItem value="pre_repair">{t('media.categories.pre_repair')}</MenuItem>
            <MenuItem value="during_repair">{t('media.categories.during_repair')}</MenuItem>
            <MenuItem value="post_repair">{t('media.categories.post_repair')}</MenuItem>
            <MenuItem value="damaged_parts">{t('media.categories.damaged_parts')}</MenuItem>
          </Select>
        </FormControl>
        
        <TextField
          fullWidth
          margin="normal"
          id="description"
          label={t('media.description')}
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
            if (error) setError(null);
          }}
          multiline
          rows={2}
          error={!!error}
          helperText={error}
          required
        />
        
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={4}>
            <Button
              fullWidth
              variant="outlined"
              color="error"
              onClick={onCancel}
              startIcon={<DeleteIcon />}
            >
              {t('common.cancel')}
            </Button>
          </Grid>
          
          <Grid item xs={4}>
            <Button
              fullWidth
              variant="outlined"
              onClick={onRetake}
              startIcon={<EditIcon />}
            >
              {t('media.retake')}
            </Button>
          </Grid>
          
          <Grid item xs={4}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleSave}
              startIcon={<SaveIcon />}
            >
              {t('common.save')}
            </Button>
          </Grid>
        </Grid>
        
        <Typography variant="caption" sx={{ mt: 2, display: 'block', textAlign: 'center' }}>
          {t('media.imageTips')}
        </Typography>
      </Box>
    </Paper>
  );
};

export default ImagePreview;
