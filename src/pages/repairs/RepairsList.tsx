import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';

// Mock data for repairs
const mockRepairs = [
  {
    id: 1,
    vehicleId: 101,
    vehicleMake: 'پژو',
    vehicleModel: '۲۰۶',
    licensePlate: '۱۲ ایران ۳۴۵ ج ۶۷',
    customerName: 'علی رضایی',
    description: 'تعویض روغن و فیلتر',
    status: 'completed',
    estimatedCost: 1500000,
    createdAt: '2025-10-15T08:30:00Z',
    technicianName: 'مهدی احمدی',
  },
  {
    id: 2,
    vehicleId: 102,
    vehicleMake: 'سمند',
    vehicleModel: 'LX',
    licensePlate: '۱۰ ایران ۶۷۸ د ۲۱',
    customerName: 'سارا محمدی',
    description: 'تعمیر سیستم ترمز',
    status: 'in_progress',
    estimatedCost: 3800000,
    createdAt: '2025-10-18T10:15:00Z',
    technicianName: 'حسین کریمی',
  },
  {
    id: 3,
    vehicleId: 103,
    vehicleMake: 'هیوندای',
    vehicleModel: 'سوناتا',
    licensePlate: '۲۲ ایران ۱۲۳ ب ۴۵',
    customerName: 'مریم اکبری',
    description: 'تعویض دمپر عقب و صافکاری درب',
    status: 'waiting_approval',
    estimatedCost: 7500000,
    createdAt: '2025-10-19T14:20:00Z',
    technicianName: 'رضا محمدی',
  },
  {
    id: 4,
    vehicleId: 104,
    vehicleMake: 'کیا',
    vehicleModel: 'سراتو',
    licensePlate: '۶۶ ایران ۹۰۱ ی ۳۴',
    customerName: 'محمد حسینی',
    description: 'سرویس دوره‌ای ۴۰ هزار کیلومتر',
    status: 'registered',
    estimatedCost: 4200000,
    createdAt: '2025-10-20T09:00:00Z',
    technicianName: 'علی اصغری',
  },
];

const RepairsList = () => {
  const { t } = useTranslation();
  const [repairs] = useState(mockRepairs);
  
  // Helper function to render status chip with appropriate color
  const renderStatusChip = (status: string) => {
    let color: 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' = 'default';
    let label = '';
    
    switch (status) {
      case 'registered':
        color = 'info';
        label = t('repairs.statuses.registered');
        break;
      case 'in_progress':
        color = 'warning';
        label = t('repairs.statuses.in_progress');
        break;
      case 'waiting_approval':
        color = 'secondary';
        label = t('repairs.statuses.waiting_approval');
        break;
      case 'approved':
        color = 'primary';
        label = t('repairs.statuses.approved');
        break;
      case 'completed':
        color = 'success';
        label = t('repairs.statuses.completed');
        break;
      case 'cancelled':
        color = 'error';
        label = t('repairs.statuses.cancelled');
        break;
      default:
        label = status;
    }
    
    return <Chip label={label} color={color} size="small" />;
  };
  
  // Format currency function
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fa-IR', {
      style: 'currency',
      currency: 'IRR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };
  
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3, alignItems: 'center' }}>
        <Typography variant="h4" component="h1">
          {t('repairs.title')}
        </Typography>
        
        <Button
          component={Link}
          to="/repairs/new"
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
        >
          {t('repairs.newRepair')}
        </Button>
      </Box>
      
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 'calc(100vh - 250px)' }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>{t('repairs.id')}</TableCell>
                <TableCell>{t('repairs.vehicle')}</TableCell>
                <TableCell>{t('repairs.customer')}</TableCell>
                <TableCell>{t('repairs.description')}</TableCell>
                <TableCell>{t('repairs.status')}</TableCell>
                <TableCell>{t('repairs.estimatedCost')}</TableCell>
                <TableCell>{t('repairs.actions')}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {repairs.map((repair) => (
                <TableRow key={repair.id} hover>
                  <TableCell>{repair.id}</TableCell>
                  <TableCell>
                    <Box>
                      <Typography variant="body2">
                        {repair.vehicleMake} {repair.vehicleModel}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {repair.licensePlate}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{repair.customerName}</TableCell>
                  <TableCell>{repair.description}</TableCell>
                  <TableCell>{renderStatusChip(repair.status)}</TableCell>
                  <TableCell>{formatCurrency(repair.estimatedCost)}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex' }}>
                      <IconButton
                        component={Link}
                        to={`/repairs/${repair.id}`}
                        size="small"
                        title={t('common.view')}
                      >
                        <VisibilityIcon fontSize="small" />
                      </IconButton>
                      
                      <IconButton
                        component={Link}
                        to={`/repairs/${repair.id}/photos`}
                        size="small"
                        title={t('repairs.viewPhotos')}
                      >
                        <PhotoLibraryIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default RepairsList;
