import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import BuildIcon from '@mui/icons-material/Build';
import SettingsIcon from '@mui/icons-material/Settings';

interface SidebarProps {
  open: boolean;
}

const drawerWidth = 240;

const Sidebar = ({ open }: SidebarProps) => {
  const { t } = useTranslation();
  
  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={open}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          top: '64px',
          height: 'calc(100% - 64px)',
        },
      }}
    >
      <Box sx={{ overflow: 'auto' }}>
        <List>
          <ListItem button component={NavLink} to="/">
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary={t('nav.dashboard')} />
          </ListItem>
          
          <ListItem button component={NavLink} to="/customers">
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary={t('nav.customers')} />
          </ListItem>
          
          <ListItem button component={NavLink} to="/vehicles">
            <ListItemIcon>
              <DirectionsCarIcon />
            </ListItemIcon>
            <ListItemText primary={t('nav.vehicles')} />
          </ListItem>
          
          <ListItem button component={NavLink} to="/repairs">
            <ListItemIcon>
              <BuildIcon />
            </ListItemIcon>
            <ListItemText primary={t('nav.repairs')} />
          </ListItem>
        </List>
        
        <Divider />
        
        <List>
          <ListItem button component={NavLink} to="/settings">
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary={t('nav.settings')} />
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
