import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAppSelector } from './store';
import { CircularProgress, Box } from '@mui/material';

// Layout
import AppLayout from './components/layout/AppLayout';

// Lazy loaded pages
const Login = lazy(() => import('./pages/auth/Login'));
const Dashboard = lazy(() => import('./pages/dashboard/Dashboard'));
const CustomersList = lazy(() => import('./pages/customers/CustomersList'));
const CustomerDetail = lazy(() => import('./pages/customers/CustomerDetail'));
const VehiclesList = lazy(() => import('./pages/vehicles/VehiclesList'));
const VehicleDetail = lazy(() => import('./pages/vehicles/VehicleDetail'));
const RepairsList = lazy(() => import('./pages/repairs/RepairsList'));
const RepairDetail = lazy(() => import('./pages/repairs/RepairDetail'));
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
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

const AppRoutes = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        
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
            <Route path=":id" element={<CustomerDetail />} />
          </Route>
          <Route path="vehicles">
            <Route index element={<VehiclesList />} />
            <Route path=":id" element={<VehicleDetail />} />
          </Route>
          <Route path="repairs">
            <Route index element={<RepairsList />} />
            <Route path=":id" element={<RepairDetail />} />
          </Route>
        </Route>
        
        {/* 404 route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
