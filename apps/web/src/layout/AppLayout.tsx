import { type PropsWithChildren, useState } from 'react';
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Avatar,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import GroupIcon from '@mui/icons-material/Group';
import ChecklistIcon from '@mui/icons-material/Checklist';
import PaymentsIcon from '@mui/icons-material/Payments';
import BusinessIcon from '@mui/icons-material/Business';
import EventIcon from '@mui/icons-material/Event';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import LogoutIcon from '@mui/icons-material/Logout';
import imageBrindis from '/image-brindis.jpeg'
const drawerWidth = 260;

interface AppLayoutProps extends PropsWithChildren {
  onSelectNav?: (id: string) => void;
  activeNavId?: string;
  isAdmin?: boolean;
}

export function AppLayout({
  children,
  onSelectNav,
  activeNavId = 'dashboard',
  isAdmin = false,
}: AppLayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <HomeIcon /> },
    { id: 'guests', label: 'Invitados', icon: <GroupIcon /> },
    { id: 'venues', label: 'Salones', icon: <BusinessIcon /> },
    { id: 'budget', label: 'Presupuesto', icon: <PaymentsIcon /> },
    { id: 'tasks', label: 'Tareas', icon: <ChecklistIcon /> },
    { id: 'vendors', label: 'Proveedores', icon: <BusinessIcon /> },
    { id: 'events', label: 'Eventos', icon: <EventIcon /> },
    ...(isAdmin
      ? [{ id: 'admin-users', label: 'Admin usuarios', icon: <AdminPanelSettingsIcon /> }]
      : []),
    { id: 'logout', label: 'Cerrar Sesión', icon: <LogoutIcon /> },
  ];

  const drawer = (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: '#F9F5F2',
      }}
    >
      <Box sx={{ flex: 1, overflowY: 'auto' }}>
        <List>
          {navItems.map((item) => (
            <ListItem key={item.id} disablePadding>
              <ListItemButton
                selected={activeNavId === item.id}
                onClick={() => onSelectNav?.(item.id)}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 36,
                    color: activeNavId === item.id ? 'primary.main' : 'text.secondary',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <CssBaseline />

      {/* NAV LATERAL */}
      <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
        {/* Drawer mobile */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>

        {/* Drawer desktop */}
        <Drawer
          variant="permanent"
          open
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
              bgcolor: '#F9F5F2',
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>

      {/* COLUMNA DERECHA: HEADER + CONTENIDO */}
      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          minWidth: 0, // evita overflow horizontal
        }}
      >
        {/* Header */}
        <AppBar
          position="static"
          sx={{
            bgcolor: '#F9F5F2',
            color: 'text.primary',
            boxShadow: 'none',
            borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <Box sx={{ p: 2, pb: 1, textAlign: 'center', width: '20%' }}>
              <Avatar
                src="./../assets/image-brindis.png"
                alt="Ricardo & Sofy"
                sx={{
                  width: 96,
                  height: 96,
                  mx: 'auto',
                  mb: 1,
                  border: '3px solid',
                  borderColor: 'secondary.main',
                }}
              />
              <Typography
                variant="overline"
                sx={{ letterSpacing: '0.25em', color: 'text.secondary' }}
              >
                Nuestra boda
              </Typography>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                Ricardo & Sofy
              </Typography>
              <Typography variant="caption" color="text.secondary">
                21 Marzo 2026
              </Typography>
            </Box>
            <Toolbar
              sx={{
                flexDirection: 'column',
                alignItems: 'flex-start',
                px: 0,
                py: 1,
                width: '80%',
              }}
            >
              <Box sx={{ width: '100%' }}>
                <img
                  src={imageBrindis}
                  alt="Banner boda"
                  style={{
                    width: '100%',
                    height: '200px',
                    objectFit: 'cover',
                    objectPosition: '50% 35%',
                    borderRadius: '12px',
                  }}
                />
              </Box>
            </Toolbar>
          </div>
        </AppBar>

        {/* Contenido principal */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            minWidth: 0, // importante para que no se genere scroll horizontal
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}
