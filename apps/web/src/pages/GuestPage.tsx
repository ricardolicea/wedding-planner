import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from '@mui/material';
import { Grid } from '@mui/material';

import GuestsModal from '../components/Modal';
import { useGuests } from '../contexts/GuestContext';
import { useAuth } from '../contexts/AuthContext';

export function GuestsPage() {
  const {weddingId} = useAuth();
  const guestsContext = useGuests();
  const guests = guestsContext?.guests ?? [];
  const loading = guestsContext?.loading ?? false;
  const error = guestsContext?.error ?? null;
  const loadGuests = guestsContext?.loadGuests ?? (() => {});
 
/*   async function loadGuests() {
    try {
      setLoading(true);
      setError(null);
      const data = await getGuests(weddingId!);
      setGuests(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message ?? 'Error cargando invitados');
    } finally {
      setLoading(false);
    }
  } */

  useEffect(() => {
    loadGuests();
  }, []);

  const [openModal, setOpenModal] = useState(false);

  function handleModal(flag: boolean) {
    setOpenModal(flag);
    loadGuests();
  }

  return (
    <Box>
      {/* Header */}
      <Box mb={3}>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 0.5 }}>
          Invitados 🧑‍🤝‍🧑
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Administra la lista de invitados, confirma asistencia y registra notas especiales.
        </Typography>
      </Box>
      <GuestsModal open={openModal} onClose={() => handleModal(false)} weddingId={weddingId!} />

      <Grid container spacing={0}>
          <Card elevation={0} sx={{ borderRadius: 3, border: '1px solid #e7dcd2', width: '100%' }}>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  Lista de invitados
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total: {guests.length}
                </Typography>
                <Button onClick={() => handleModal(true)}>Open modal</Button>
              </Box>

              {error ? (
                <Typography variant="body2" color="error">
                  {error}
                </Typography>
              ) : loading && guests.length === 0 ? (
                <Typography variant="body2" color="text.secondary">
                  Cargando invitados...
                </Typography>
              ) : guests.length === 0 ? (
                <Typography variant="body2" color="text.secondary">
                  Aún no hay invitados. Empieza agregando a los primeros 💌
                </Typography>
              ) : (
                <Box sx={{ maxHeight: 420, overflow: 'auto' }}>
                  <Table size="small" stickyHeader>
                    <TableHead>
                      <TableRow>
                        <TableCell>Nombre</TableCell>
                        <TableCell>Apellido</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Teléfono</TableCell>
                        <TableCell>RSVP</TableCell>
                        <TableCell>Plus One</TableCell>
                        <TableCell>Invitado por</TableCell>
                        <TableCell>Tipo de lista</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {guests.map((g) => (
                        <TableRow key={g.id} hover>
                          <TableCell>{g.firstname}</TableCell>
                          <TableCell>{g.lastname}</TableCell>
                          <TableCell>{g.email}</TableCell>
                          <TableCell>{g.phone}</TableCell>
                          <TableCell>
                            <RsvpChip status={g.rsvpStatus} />
                          </TableCell>
                          <TableCell>{g.hasPlusOne ? 'Sí' : 'No'}</TableCell>
                          <TableCell>{g.invitedBy}</TableCell>
                          <TableCell>{g.listtype}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Box>
              )}
            </CardContent>
          </Card>
      </Grid>
    </Box>
  );
}

function RsvpChip({ status }: { status: string }) {
  const normalized = status?.toLowerCase();

  if (normalized === 'attending') {
    return <Chip label="Asistirá" size="small" color="success" />;
  }
  if (normalized === 'declined') {
    return <Chip label="No asistirá" size="small" color="error" />;
  }
  return <Chip label="Pendiente" size="small" color="warning" />;
}
