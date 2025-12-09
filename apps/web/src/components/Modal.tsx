import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Card, CardContent, Stack, TextField } from '@mui/material';
import { useState } from 'react';
import { createGuest } from '../api/createGuests';

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

function GuestsModal({ open, onClose, weddingId }: { open: boolean; onClose: () => void; weddingId: string }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [relation, setRelation] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleAddGuest(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      setLoading(true);
      setError(null);
      await createGuest({
        name,
        email: email || undefined,
        relation: relation || undefined,
      }, weddingId);
      setName('');
      setEmail('');
      setRelation('');
      //await loadGuests();
    } catch (err: any) {
      console.error(err);
      setError(err.message ?? 'Error creando invitado');
    } finally {
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
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  <TextField
                    size="small"
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <TextField
                    size="small"
                    label="Relación (familia, amigo, trabajo...)"
                    value={relation}
                    onChange={(e) => setRelation(e.target.value)}
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
