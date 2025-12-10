import workInProgressImage from '/work_in_progress.png'
import { Box, Typography } from '@mui/material';
export default function TasksPage() {
  return (
    <Box>
      {/* Header */}
      <Box mb={3}>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 0.5 }}>
          Tareas 📝
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Administra las tareas, asigna responsables y establece fechas límite.
        </Typography>
      </Box>
      <img src={workInProgressImage} alt="Work in progress" />
    </Box>
  );
}
