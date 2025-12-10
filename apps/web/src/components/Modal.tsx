import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { MenuItem, RadioGroup, FormControlLabel, FormLabel } from '@mui/material';
import { Card, CardContent, Radio, Stack, TextField } from '@mui/material';
import { useState } from 'react';
import { createGuest } from '../api/createGuests';
import type { Guest } from '../api/Guest';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function GuestsModal({
  open,
  onClose,
  weddingId,
}: {
  open: boolean;
  onClose: () => void;
  weddingId: string;
}) {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [guest, setGuest] = useState<Guest | null>({
    id: '',
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    relation: '',
    invitedBy: '',
    hasPlusOne: false,
    rsvpStatus: 'pending',
    notes: '',
    dietaryNotes: '',
    createdAt: '',
    updatedAt: '',
    listtype: '',
  });

  async function handleAddGuest(e: React.FormEvent) {
    e.preventDefault();

    try {
      setLoading(true);
      setError(null);
      await createGuest(
        {
          guest,
        },
        weddingId,
      );

      //await loadGuests();
    } catch (err: any) {
      console.error(err);
      setError(err.message ?? 'Error creando invitado');
    } finally {
      setGuest({
        id: '',
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        relation: '',
        invitedBy: '',
        hasPlusOne: false,
        rsvpStatus: 'pending',
        notes: '',
        dietaryNotes: '',
        createdAt: '',
        updatedAt: '',
        listtype: '',
      });
      setLoading(false);
      onClose();
    }
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Card elevation={0} sx={{ borderRadius: 3, border: '1px solid #e7dcd2' }}>
            <CardContent>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                Nuevo invitado
              </Typography>
              <Typography variant="body2" color="text.secondary" mb={2}>
                Agrega personas a la lista de tu boda.
              </Typography>

              <Box component="form" onSubmit={handleAddGuest}>
                <Stack spacing={1.5}>
                  <TextField
                    size="small"
                    label="Nombre"
                    value={guest!.firstname}
                    onChange={(e) =>
                      setGuest(guest ? { ...guest, firstname: e.target.value } : null)
                    }
                    required
                  />
                  <TextField
                    size="small"
                    label="Apellido"
                    value={guest!.lastname}
                    onChange={(e) =>
                      setGuest(guest ? { ...guest, lastname: e.target.value } : null)
                    }
                    required
                  />
                  <TextField
                    size="small"
                    label="Email"
                    type="email"
                    value={guest!.email}
                    onChange={(e) => setGuest(guest ? { ...guest, email: e.target.value } : null)}
                  />
                  <TextField
                    size="small"
                    label="Telefono"
                    value={guest!.phone}
                    onChange={(e) => setGuest(guest ? { ...guest, phone: e.target.value } : null)}
                    required
                  />
                  <TextField
                    size="small"
                    label="Relación (familia, amigo, trabajo...)"
                    value={guest!.relation}
                    onChange={(e) =>
                      setGuest(guest ? { ...guest, relation: e.target.value } : null)
                    }
                    required
                  />

                  <TextField
                    size="small"
                    label="Invitado por (nombre del invitador)"
                    value={guest!.invitedBy}
                    onChange={(e) =>
                      setGuest(guest ? { ...guest, invitedBy: e.target.value } : null)
                    }
                  />

                  <FormLabel component="legend">¿Traerá acompañante?</FormLabel>
                  <RadioGroup
                    row
                    value={guest?.hasPlusOne ? 'yes' : 'no'}
                    onChange={(e) =>
                      setGuest(guest ? { ...guest, hasPlusOne: e.target.value === 'yes' } : null)
                    }
                  >
                    <FormControlLabel value="yes" control={<Radio />} label="Sí" />
                    <FormControlLabel value="no" control={<Radio />} label="No" />
                  </RadioGroup>

                  <TextField
                    select
                    size="small"
                    label="RSVP"
                    value={guest!.rsvpStatus}
                    onChange={(e) =>
                      setGuest(
                        guest
                          ? {
                              ...guest,
                              rsvpStatus: e.target.value as 'pending' | 'accepted' | 'declined',
                            }
                          : null,
                      )
                    }
                    fullWidth
                    sx={{ mt: 1 }}
                  >
                    <MenuItem value="pending">Pendiente</MenuItem>
                    <MenuItem value="accepted">Asistirá</MenuItem>
                    <MenuItem value="declined">No asistirá</MenuItem>
                  </TextField>

                  <TextField
                    select
                    size="small"
                    label="Tipo de Lista"
                    value={guest!.listtype}
                    onChange={(e) =>
                      setGuest(
                        guest
                          ? {
                              ...guest,
                              listtype: e.target.value as 'Lista A' | 'Lista B',
                            }
                          : null,
                      )
                    }
                    fullWidth
                    sx={{ mt: 1 }}
                  >
                    <MenuItem value="Lista A">Lista A</MenuItem>
                    <MenuItem value="Lista B">Lista B</MenuItem>
                  </TextField>

                  <TextField
                    size="small"
                    label="Notas especiales"
                    value={guest!.notes}
                    onChange={(e) => setGuest(guest ? { ...guest, notes: e.target.value } : null)}
                    multiline
                    minRows={2}
                    fullWidth
                  />
                  <TextField
                    size="small"
                    label="Notas de dieta/alergias"
                    value={guest!.dietaryNotes}
                    onChange={(e) =>
                      setGuest(guest ? { ...guest, dietaryNotes: e.target.value } : null)
                    }
                    multiline
                    minRows={2}
                    fullWidth
                  />

                  {error && (
                    <Typography variant="caption" color="error">
                      {error}
                    </Typography>
                  )}

                  <Button type="submit" variant="contained" color="primary" disabled={loading}>
                    Agregar invitado
                  </Button>
                </Stack>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Modal>
    </div>
  );
}
export default GuestsModal;
