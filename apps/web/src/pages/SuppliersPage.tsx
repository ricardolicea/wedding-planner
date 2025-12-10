import { Box, Typography } from '@mui/material';
import workInProgressImage from '/work_in_progress.png'

export default function SuppliersPage() {
  return (
    <Box>
      {/* Header */}
      <Box mb={3}>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 0.5 }}>
          Proveedores 🛒
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Administra los proveedores, sus servicios y detalles de contacto.
        </Typography>
      </Box>
      <img src={workInProgressImage} alt="Work in progress" />
    </Box>
  );
}
