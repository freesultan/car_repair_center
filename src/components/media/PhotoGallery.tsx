import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
  Chip,
  Dialog,
  DialogContent,
  Tabs,
  Tab,
  ButtonGroup,
  Button,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import DeleteIcon from '@mui/icons-material/Delete';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

interface Photo {
  id: number;
  imageUrl: string;
  thumbnailUrl?: string;
  description: string;
  category: 'pre_repair' | 'during_repair' | 'post_repair' | 'damaged_parts';
  createdAt: string;
  createdBy: string;
}

interface PhotoGalleryProps {
  photos: Photo[];
  onAddPhoto: () => void;
  onDeletePhoto?: (id: number) => void;
  loading?: boolean;
}

const PhotoGallery: React.FC<PhotoGalleryProps> = ({
  photos,
  onAddPhoto,
  onDeletePhoto,
  loading = false,
}) => {
  const { t } = useTranslation();
  const [selectedPhotoId, setSelectedPhotoId] = useState<number | null>(null);
  const [filter, setFilter] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  const handlePhotoClick = (id: number) => {
    setSelectedPhotoId(id);
  };
  
  const handleCloseDialog = () => {
    setSelectedPhotoId(null);
  };
  
  const selectedPhoto = selectedPhotoId 
    ? photos.find(photo => photo.id === selectedPhotoId) 
    : null;
  
  const filteredPhotos = filter 
    ? photos.filter(photo => photo.category === filter)
    : photos;
  
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h6" component="h2">
          {t('media.photos')} ({photos.length})
        </Typography>
        
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddPhotoAlternateIcon />}
          onClick={onAddPhoto}
        >
          {t('media.addPhoto')}
        </Button>
      </Box>
      
      <Box sx={{ mb: 3 }}>
        <Tabs
          value={filter || 'all'}
          onChange={(_, newValue) => setFilter(newValue === 'all' ? null : newValue)}
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label={t('media.filters.all')} value="all" />
          <Tab label={t('media.categories.pre_repair')} value="pre_repair" />
          <Tab label={t('media.categories.during_repair')} value="during_repair" />
          <Tab label={t('media.categories.post_repair')} value="post_repair" />
          <Tab label={t('media.categories.damaged_parts')} value="damaged_parts" />
        </Tabs>
      </Box>
      
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'flex-end' }}>
        <ButtonGroup size="small">
          <Button
            variant={viewMode === 'grid' ? 'contained' : 'outlined'}
            onClick={() => setViewMode('grid')}
          >
            {t('media.viewMode.grid')}
          </Button>
          <Button
            variant={viewMode === 'list' ? 'contained' : 'outlined'}
            onClick={() => setViewMode('list')}
          >
            {t('media.viewMode.list')}
          </Button>
        </ButtonGroup>
      </Box>
      
      {filteredPhotos.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography color="text.secondary">
            {filter 
              ? t('media.noPhotosInCategory') 
              : t('media.noPhotos')}
          </Typography>
          <Button
            variant="outlined"
            startIcon={<AddPhotoAlternateIcon />}
            onClick={onAddPhoto}
            sx={{ mt: 2 }}
          >
            {t('media.addFirstPhoto')}
          </Button>
        </Box>
      ) : viewMode === 'grid' ? (
        <Grid container spacing={2}>
          {filteredPhotos.map((photo) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={photo.id}>
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image={photo.thumbnailUrl || photo.imageUrl}
                  alt={photo.description}
                  sx={{ cursor: 'pointer', objectFit: 'cover' }}
                  onClick={() => handlePhotoClick(photo.id)}
                />
                <CardContent sx={{ py: 1 }}>
                  <Chip
                    label={t(`media.categories.${photo.category}`)}
                    size="small"
                    color={
                      photo.category === 'pre_repair' ? 'primary' :
                      photo.category === 'during_repair' ? 'secondary' :
                      photo.category === 'post_repair' ? 'success' :
                      'warning'
                    }
                    sx={{ mb: 1 }}
                  />
                  <Typography variant="body2" noWrap>
                    {photo.description}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'space-between', pt: 0 }}>
                  <Typography variant="caption" color="text.secondary">
                    {new Date(photo.createdAt).toLocaleString()}
                  </Typography>
                  <Box>
                    <IconButton 
                      size="small" 
                      onClick={() => handlePhotoClick(photo.id)}
                    >
                      <ZoomInIcon fontSize="small" />
                    </IconButton>
                    {onDeletePhoto && (
                      <IconButton 
                        size="small" 
                        color="error"
                        onClick={() => onDeletePhoto(photo.id)}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    )}
                  </Box>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box>
          {filteredPhotos.map((photo) => (
            <Card key={photo.id} sx={{ mb: 2, display: 'flex' }}>
              <CardMedia
                component="img"
                sx={{ width: 140, height: 140, cursor: 'pointer' }}
                image={photo.thumbnailUrl || photo.imageUrl}
                alt={photo.description}
                onClick={() => handlePhotoClick(photo.id)}
              />
              <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                  <Chip
                    label={t(`media.categories.${photo.category}`)}
                    size="small"
                    color={
                      photo.category === 'pre_repair' ? 'primary' :
                      photo.category === 'during_repair' ? 'secondary' :
                      photo.category === 'post_repair' ? 'success' :
                      'warning'
                    }
                    sx={{ mb: 1 }}
                  />
                  <Typography variant="body1">
                    {photo.description}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {new Date(photo.createdAt).toLocaleString()} | {photo.createdBy}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'flex-end' }}>
                  <IconButton onClick={() => handlePhotoClick(photo.id)}>
                    <ZoomInIcon />
                  </IconButton>
                  {onDeletePhoto && (
                    <IconButton 
                      color="error"
                      onClick={() => onDeletePhoto(photo.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  )}
                </CardActions>
              </Box>
            </Card>
          ))}
        </Box>
      )}
      
      {/* Full image dialog */}
      <Dialog
        open={!!selectedPhotoId}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogContent sx={{ p: 0, position: 'relative' }}>
          {selectedPhoto && (
            <>
              <img
                src={selectedPhoto.imageUrl}
                alt={selectedPhoto.description}
                style={{ width: '100%' }}
              />
              <Box sx={{ p: 2 }}>
                <Chip
                  label={t(`media.categories.${selectedPhoto.category}`)}
                  color={
                    selectedPhoto.category === 'pre_repair' ? 'primary' :
                    selectedPhoto.category === 'during_repair' ? 'secondary' :
                    selectedPhoto.category === 'post_repair' ? 'success' :
                    'warning'
                  }
                  sx={{ mb: 1 }}
                />
                <Typography variant="h6">{selectedPhoto.description}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {new Date(selectedPhoto.createdAt).toLocaleString()} | {selectedPhoto.createdBy}
                </Typography>
                
                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                  <Button onClick={handleCloseDialog}>
                    {t('common.close')}
                  </Button>
                </Box>
              </Box>
            </>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default PhotoGallery;
