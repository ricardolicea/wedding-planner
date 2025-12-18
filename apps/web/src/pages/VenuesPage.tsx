import { Box, Typography } from '@mui/material';
import workInProgressImage from '/work_in_progress.png'

export default function VenuesPage() {
  return (
     <Box>
      {/* Header */}
      <Box mb={3}>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 0.5 }}>
          Salones 🏛️
        </Typography>
        <Typography variant="body2" color="text.secondary">
         Agrega informacion de los salones asi como sus cotizaciones y selecciona el salon escogido.
        </Typography>
      </Box>
      <img src={workInProgressImage} alt="Work in progress" />
    </Box>
  );
}
