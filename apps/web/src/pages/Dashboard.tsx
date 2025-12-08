import {
  Box,
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Stack,
  Chip,
  Grid,
} from '@mui/material';
import { useGuests } from '../contexts/GuestContext';
import imageBrindis from '../assets/image-brindis.jpeg';

export function DashboardPage() {
  // Más adelante esto vendrá de tu API
  const guestsContext = useGuests();
  const guests = guestsContext?.guests ?? [];
  const totalGuests = guests.length;
  const confirmedGuests = guests.filter((g) => g.rsvpStatus?.toLowerCase() === 'attending').length;
  const pendingGuests = guests.filter(
    (g) => !g.rsvpStatus || g.rsvpStatus.toLowerCase() === 'pending',
  ).length;
  const distinctListTypes = Array.from(new Set(guests.map((g) => g.listtype).filter(Boolean)));

  const distinctListInvitedBy = Array.from(new Set(guests.map((g) => g.invitedBy).filter(Boolean)));
  const tasksDone = 24;
  const tasksTotal = 60;

  const budgetTotal = 250_000;
  const budgetSpent = 80_000;

  const progressTasks = (tasksDone / tasksTotal) * 100;
  const progressGuests = (confirmedGuests / totalGuests) * 100;
  const progressBudget = (budgetSpent / budgetTotal) * 100;

  return (
    <Box>
      {/* Encabezado */}
      <Box mb={3}>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 0.5 }}>
          Resumen de la boda 💍
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Aquí puedes ver el estado general de la planeación.
        </Typography>
      </Box>

      {/* Tarjetas de stats */}
      <Grid container spacing={2} mb={4}>
        {/* <Grid item xs={12} md={4}> */}
        <Card elevation={0} sx={{ borderRadius: 3, border: '1px solid #e7dcd2', width: '100%' }}>
          <CardContent>
            <Typography variant="overline" color="text.secondary">
              Invitados
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              {totalGuests} invitados
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={1}>
              {confirmedGuests} confirmados · {pendingGuests} pendientes
            </Typography>
            <LinearProgress
              variant="determinate"
              value={progressGuests}
              sx={{
                height: 8,
                borderRadius: 5,
                backgroundColor: '#f1e4da',
                '& .MuiLinearProgress-bar': { backgroundColor: '#C4A484' },
              }}
            />
          </CardContent>
        </Card>

        {distinctListInvitedBy.map((invitedBy) => (
          <Card elevation={0} sx={{ borderRadius: 3, border: '1px solid #e7dcd2' }} key={invitedBy}>
          <CardContent>
            <Typography variant="overline" color="text.secondary">
              Invitado por {invitedBy}
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              {guests.filter(g => g.invitedBy === invitedBy).length} invitados
            </Typography>
            
           
          </CardContent>
        </Card>

        ))}


        {/* </Grid> */}

        {/* <Grid item xs={12} md={4}> */}
        {/* <Card elevation={0} sx={{ borderRadius: 3, border: '1px solid #e7dcd2' }}>
          <CardContent>
            <Typography variant="overline" color="text.secondary">
              Presupuesto
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              ${budgetTotal.toLocaleString('es-MX')} MXN
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={1}>
              Llevan gastado ${budgetSpent.toLocaleString('es-MX')} MXN
            </Typography>
            <LinearProgress
              variant="determinate"
              value={progressBudget}
              sx={{
                height: 8,
                borderRadius: 5,
                backgroundColor: '#f1e4da',
                '& .MuiLinearProgress-bar': { backgroundColor: '#E8C5C8' },
              }}
            />
          </CardContent>
        </Card> */}
        {/* </Grid> */}

        {/* <Grid item xs={12} md={4}> */}
       {/*  <Card elevation={0} sx={{ borderRadius: 3, border: '1px solid #e7dcd2' }}>
          <CardContent>
            <Typography variant="overline" color="text.secondary">
              Tareas
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              {tasksDone}/{tasksTotal} completadas
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={1}>
              Checklist al {Math.round(progressTasks)}%
            </Typography>
            <LinearProgress
              variant="determinate"
              value={progressTasks}
              sx={{
                height: 8,
                borderRadius: 5,
                backgroundColor: '#f1e4da',
                '& .MuiLinearProgress-bar': { backgroundColor: '#B69FCC' },
              }}
            />
          </CardContent>
        </Card> */}
      </Grid>
      {/* </Grid> */}

      {/* Sección de próximas cosas importantes */}
      <Grid container spacing={2}>
        {/*   <Grid item xs={12} md={6}> */}
        <Card elevation={0} sx={{ borderRadius: 3, border: '1px solid #e7dcd2', height: '100%' }}>
          <CardContent>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
              Próximas tareas
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={2}>
              Lo que viene pronto en la planeación.
            </Typography>

            <Stack spacing={1.5}>
              <TaskRow title="Definir menú con el catering" due="Próxima semana" />
              <TaskRow title="Probar vestido y traje" due="En 2 semanas" />
              <TaskRow title="Enviar invitaciones formales" due="En 1 mes" />
            </Stack>
          </CardContent>
        </Card>
        {/*  </Grid> */}

        {/* <Grid item xs={12} md={6}> */}
        <Card elevation={0} sx={{ borderRadius: 3, border: '1px solid #e7dcd2', height: '100%' }}>
          <CardContent>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
              Resumen de proveedores
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={2}>
              Estado general de los proveedores clave.
            </Typography>

            <Stack spacing={1.5}>
              <VendorRow name="Salón / venue" status="Confirmado" />
              <VendorRow name="Fotografía y video" status="En cotización" />
              <VendorRow name="Música / DJ" status="Por definir" />
            </Stack>
          </CardContent>
        </Card>
        {/* </Grid> */}
      </Grid>
    </Box>
  );
}

function TaskRow({ title, due }: { title: string; due: string }) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        bgcolor: '#FBF6F1',
        borderRadius: 2,
        px: 2,
        py: 1,
      }}
    >
      <Typography variant="body2">{title}</Typography>
      <Typography variant="caption" color="text.secondary">
        {due}
      </Typography>
    </Box>
  );
}

function VendorRow({ name, status }: { name: string; status: string }) {
  const color =
    status === 'Confirmado' ? 'success' : status === 'En cotización' ? 'warning' : 'default';

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        bgcolor: '#FBF6F1',
        borderRadius: 2,
        px: 2,
        py: 1,
      }}
    >
      <Typography variant="body2">{name}</Typography>
      <Chip label={status} size="small" color={color as any} />
    </Box>
  );
}
