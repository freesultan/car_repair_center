import { useTranslation } from 'react-i18next';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Box,
  Avatar,
  Menu,
  MenuItem,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { logout } from '../../store/slices/authSlice';
import { setDirection } from '../../store/slices/uiSlice';

interface HeaderProps {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}

const Header = ({ sidebarOpen, toggleSidebar }: HeaderProps) => {
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  
  // User menu state
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  
  const toggleLanguage = () => {
    const newLang = i18n.language === 'fa' ? 'en' : 'fa';
    i18n.changeLanguage(newLang);
    dispatch(setDirection(newLang === 'fa' ? 'rtl' : 'ltr'));
  };
  
  const handleUserMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleUserMenuClose = () => {
    setAnchorEl(null);
  };
  
  const handleLogout = () => {
    handleUserMenuClose();
    dispatch(logout());
  };
  
  return (
    <AppBar position="fixed">
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="toggle sidebar"
          edge="start"
          onClick={toggleSidebar}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {t('app.title')}
        </Typography>
        
        <Button 
          color="inherit" 
          onClick={toggleLanguage}
          sx={{ mx: 1 }}
        >
          {i18n.language === 'fa' ? 'English' : 'فارسی'}
        </Button>
        
        {user && (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              onClick={handleUserMenuClick}
              size="small"
              sx={{ ml: 1 }}
              aria-controls={open ? 'user-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
            >
              <Avatar sx={{ width: 32, height: 32, bgcolor: 'secondary.main' }}>
                <AccountCircleIcon />
              </Avatar>
            </IconButton>
            
            <Typography 
              variant="body2" 
              sx={{ 
                ml: 1, 
                display: { xs: 'none', sm: 'block' } 
              }}
            >
              {user.fullName}
            </Typography>
            
            <Menu
              id="user-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleUserMenuClose}
              MenuListProps={{
                'aria-labelledby': 'user-button',
              }}
            >
              <MenuItem onClick={handleUserMenuClose}>
                {t('user.profile')}
              </MenuItem>
              <MenuItem onClick={handleUserMenuClose}>
                {t('user.settings')}
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                {t('auth.logout')}
              </MenuItem>
            </Menu>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
