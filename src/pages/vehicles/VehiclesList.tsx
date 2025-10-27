import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TextField,
  InputAdornment,
  IconButton,
  Button,
  Chip,
  CircularProgress,
  Alert,
  Card,
  CardContent
} from '@mui/material';
import {
  Search as SearchIcon,
  Visibility as VisibilityIcon,
  Edit as EditIcon,
  DirectionsCar as DirectionsCarIcon,
  Add as AddIcon
} from '@mui/icons-material';
import { Vehicle, PaginatedResponse } from '../../types';
import { vehiclesApi } from '../../services/api';

const VehiclesList = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  // State
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);

  // Fetch vehicles
  const fetchVehicles = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const params = {
        page: page + 1, // Backend expects 1-based pagination
        limit: rowsPerPage,
        search: searchTerm || undefined
      };
      
      const response: PaginatedResponse<Vehicle> = await vehiclesApi.getVehicles(params);
      setVehicles(response.data);
      setTotalCount(response.meta.totalCount);
    } catch (err: any) {
      console.error('Error fetching vehicles:', err);
      setError(err.response?.data?.message || 'Failed to fetch vehicles');
    } finally {
      setLoading(false);
    }
  };

  // Effects
  useEffect(() => {
    fetchVehicles();
  }, [page, rowsPerPage, searchTerm]);

  // Search with debounce
  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      if (page === 0) {
        fetchVehicles();
      } else {
        setPage(0); // Reset to first page
      }
    }, 300);

    return () => clearTimeout(delayedSearch);
  }, [searchTerm]);

  // Handlers
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleViewVehicle = (vehicleId: number) => {
    navigate(`/vehicles/${vehicleId}`);
  };

  const handleEditVehicle = (vehicleId: number) => {
    navigate(`/vehicles/${vehicleId}/edit`);
  };

  const handleAddVehicle = () => {
    navigate('/vehicles/new');
  };

  if (loading && vehicles.length === 0) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          {t('vehicles.title')}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleAddVehicle}
        >
          {t('vehicles.newVehicle')}
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Search */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <TextField
            fullWidth
            variant="outlined"
            placeholder={t('vehicles.searchPlaceholder')}
            value={searchTerm}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </CardContent>
      </Card>

      {/* Vehicles Table */}
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer>
          <Table stickyHeader aria-label="vehicles table">
            <TableHead>
              <TableRow>
                <TableCell>{t('vehicles.make')}</TableCell>
                <TableCell>{t('vehicles.model')}</TableCell>
                <TableCell>{t('vehicles.year')}</TableCell>
                <TableCell>{t('vehicles.licensePlate')}</TableCell>
                <TableCell>{t('vehicles.color')}</TableCell>
                <TableCell>{t('vehicles.customer')}</TableCell>
                <TableCell align="center">{t('common.actions')}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    <CircularProgress size={30} />
                  </TableCell>
                </TableRow>
              ) : vehicles.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    <Box sx={{ py: 4 }}>
                      <DirectionsCarIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
                      <Typography variant="h6" color="text.secondary">
                        {searchTerm ? t('vehicles.noSearchResults') : t('vehicles.noVehicles')}
                      </Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              ) : (
                vehicles.map((vehicle) => (
                  <TableRow hover key={vehicle.id}>
                    <TableCell>
                      <Typography variant="body2" fontWeight="medium">
                        {vehicle.make}
                      </Typography>
                    </TableCell>
                    <TableCell>{vehicle.model}</TableCell>
                    <TableCell>{vehicle.year}</TableCell>
                    <TableCell>
                      <Chip 
                        label={vehicle.licensePlate} 
                        variant="outlined" 
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{vehicle.color || '-'}</TableCell>
                    <TableCell>
                      {vehicle.customer ? (
                        <Link 
                          to={`/customers/${vehicle.customer.id}`}
                          style={{ textDecoration: 'none', color: 'inherit' }}
                        >
                          <Typography variant="body2" color="primary" sx={{ cursor: 'pointer' }}>
                            {vehicle.customer.name}
                          </Typography>
                        </Link>
                      ) : (
                        '-'
                      )}
                    </TableCell>
                    <TableCell align="center">
                      <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                        <IconButton
                          size="small"
                          onClick={() => handleViewVehicle(vehicle.id)}
                          title={t('common.view')}
                        >
                          <VisibilityIcon />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleEditVehicle(vehicle.id)}
                          title={t('common.edit')}
                        >
                          <EditIcon />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
        
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50]}
          component="div"
          count={totalCount}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage={t('common.rowsPerPage')}
          labelDisplayedRows={({ from, to, count }) =>
            `${from}-${to} ${t('common.of')} ${count !== -1 ? count : `${t('common.moreThan')} ${to}`}`
          }
        />
      </Paper>
    </Box>
  );
};

export default VehiclesList;