import { lazy, Suspense, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from './store';
import { CircularProgress, Box } from '@mui/material';

// Layout
import AppLayout from './components/layout/AppLayout';

// Lazy loaded pages
const Login = lazy(() => import('./pages/auth/Login'));
const Dashboard = lazy(() => import('./pages/dashboard/Dashboard'));

// Customer pages
const CustomersList = lazy(() => import('./pages/customers/CustomersList'));
const CustomerCreate = lazy(() => import('./pages/customers/CustomerCreate'));
const CustomerEdit = lazy(() => import('./pages/customers/CustomerEdit'));
const CustomerDetail = lazy(() => import('./pages/customers/CustomerDetail'));

// Vehicle pages
const VehiclesList = lazy(() => import('./pages/vehicles/VehiclesList'));
const VehicleDetail = lazy(() => import('./pages/vehicles/VehicleDetail'));
const NewVehicle = lazy(() => import('./pages/vehicles/NewVehicle')); // New "New Vehicle" page

// Repair pages
const RepairsList = lazy(() => import('./pages/repairs/RepairsList'));
const RepairDetail = lazy(() => import('./pages/repairs/RepairDetail'));
const RepairPhotosList = lazy(() => import('./pages/repairs/photos/RepairPhotosList'));
const RepairPhotoCapture = lazy(() => import('./pages/repairs/photos/RepairPhotoCapture'));

// Error pages
const NotFound = lazy(() => import('./pages/NotFound'));

// Loading fallback
const LoadingFallback = () => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
    }}
  >
    <CircularProgress />
  </Box>
);

// Auth guard for protected routes
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const location = useLocation();
  
  if (!isAuthenticated) {
    // Redirect to login but remember where the user was trying to go
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  return children;
};

const AppRoutes = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const location = useLocation();
  
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={
          isAuthenticated ? <Navigate to="/" replace /> : <Login />
        } />
        
        {/* Protected routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          
          <Route path="customers">
            <Route index element={<CustomersList />} />
            <Route path="new" element={<CustomerCreate />} />
            <Route path=":id" element={<CustomerDetail />} />
            <Route path=":id/edit" element={<CustomerEdit />} />
          </Route>
          
          <Route path="vehicles">
            <Route index element={<VehiclesList />} />
            <Route path="new" element={<NewVehicle />} /> {/* Add New Vehicle route */}
            <Route path=":id" element={<VehicleDetail />} />
          </Route>
          
          <Route path="repairs">
            <Route index element={<RepairsList />} />
            <Route path=":id" element={<RepairDetail />} />
            <Route path=":id/photos">
              <Route index element={<RepairPhotosList />} />
              <Route path="new" element={<RepairPhotoCapture />} />
            </Route>
          </Route>
        </Route>
        
        {/* 404 route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
