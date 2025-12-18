import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
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
  TableBody,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';
import { Grid } from '@mui/material';

import GuestsModal from '../components/Modal';
import { useGuests } from '../contexts/GuestContext';
import { useAuth } from '../contexts/AuthContext';
import type { Guest } from '../api/Guest';
import { editGuest } from '../api/editGuest';

export function GuestsPage() {
  const { weddingId } = useAuth();
  const guestsContext = useGuests();
  const guests = guestsContext?.guests ?? [];
  const loading = guestsContext?.loading ?? false;
  const error = guestsContext?.error ?? null;
  const loadGuests = guestsContext?.loadGuests ?? (() => {});
  const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null);
  // Estado para edición en línea
  const [editCell, setEditCell] = useState<{ id: string; field: string } | null>(null);
  const [editValue, setEditValue] = useState<string>('');

  // Filtros para columnas
  const [filters, setFilters] = useState({
    firstname: '',
    lastname: '',
    invitedBy: '',
    listtype: '',
    rsvpStatus: '',
  });

  // Filtrado de invitados
  const filteredGuests = guests.filter((g) =>
    (g.firstname || '').toLowerCase().includes(filters.firstname.toLowerCase()) &&
    (g.lastname || '').toLowerCase().includes(filters.lastname.toLowerCase()) &&
    (g.invitedBy || '').toLowerCase().includes(filters.invitedBy.toLowerCase()) &&
    (g.listtype || '').toLowerCase().includes(filters.listtype.toLowerCase()) &&
    (filters.rsvpStatus === '' || (g.rsvpStatus || '') === filters.rsvpStatus)
  );

  const totalPlusOnes = filteredGuests.reduce((sum, g) => sum + (g.hasPlusOne ? 1 : 0), 0);
  const totalConfirmedPlusOnes = guests.reduce((sum, g) => sum + (g.rsvpStatus === 'accepted' && g.hasPlusOne ? 1 : 0), 0);


  useEffect(() => {
    loadGuests();
  }, []);

  const [openModal, setOpenModal] = useState(false);

  function handleModal(flag: boolean) {
    setOpenModal(flag);
    loadGuests();
  }

  function handleCellEdit(id: string, field: string, value: string | boolean) {
    setSelectedGuest({ ...selectedGuest, [field]: value } as Guest);

    const updatedGuest = { ...selectedGuest, [field]: value } as Guest;
    

    editGuest(weddingId!, id, updatedGuest)
      .then((updatedGuest) => {
        // Actualiza el estado local si es necesario
        setSelectedGuest(updatedGuest);
        loadGuests();
      })
      .catch((error) => {
        console.error('Error al actualizar el invitado:', error);
        // Maneja el error según sea necesario
      });
  }

  console.log('guests', guests);
  console.log('total: ', guests.length + guests.reduce((sum, g) => sum + (g.hasPlusOne ? 1 : 0), 0));

  return (
    <Box>
      {/* Header */}
      <Box mb={3}>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 0.5 }}>
          Invitados 🧑‍🤝‍🧑
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Administra la lista de invitados, confirma asistencia y registra notas especiales.
          <br/>
          Para editar un campo, haz doble clic sobre él.
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
                Total: {filteredGuests.length + totalPlusOnes} invitados 
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total confirmados: {guests.reduce((sum, g) => sum + (g.rsvpStatus == 'accepted' ? 1 : 0), 0) + totalConfirmedPlusOnes} invitados 
              </Typography>
              <Box display="flex" gap={1}>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => setFilters({ firstname: '', lastname: '', invitedBy: '', listtype: '', rsvpStatus: '' })}
                  sx={{
                    backgroundColor: '#9b8f86ff',
                    '&:hover': { backgroundColor: '#6B4F3A' },
                    color: 'white',
                  }}
                >
                  Limpiar filtros
                </Button>
                <Button
                  onClick={() => handleModal(true)}
                  sx={{
                    backgroundColor: '#9b8f86ff',
                    '&:hover': { backgroundColor: '#6B4F3A' },
                    color: 'white',
                  }}
                >
                  Añadir Invitado
                </Button>
              </Box>
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
                    <TableRow>
                      <TableCell>
                        <TextField
                          value={filters.firstname}
                          onChange={e => setFilters(f => ({ ...f, firstname: e.target.value }))}
                          placeholder="Buscar..."
                          size="small"
                          variant="standard"
                          fullWidth
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          value={filters.lastname}
                          onChange={e => setFilters(f => ({ ...f, lastname: e.target.value }))}
                          placeholder="Buscar..."
                          size="small"
                          variant="standard"
                          fullWidth
                        />
                      </TableCell>
                      <TableCell />
                      <TableCell />
                      <TableCell>
                        <TextField
                          select
                          value={filters.rsvpStatus}
                          onChange={e => setFilters(f => ({ ...f, rsvpStatus: e.target.value }))}
                          size="small"
                          variant="standard"
                          fullWidth
                        >
                          <MenuItem value="">Todos</MenuItem>
                          <MenuItem value="pending">Pendiente</MenuItem>
                          <MenuItem value="accepted">Asistirá</MenuItem>
                          <MenuItem value="declined">No asistirá</MenuItem>
                        </TextField>
                      </TableCell>
                      <TableCell />
                      <TableCell>
                        <TextField
                          value={filters.invitedBy}
                          onChange={e => setFilters(f => ({ ...f, invitedBy: e.target.value }))}
                          placeholder="Buscar..."
                          size="small"
                          variant="standard"
                          fullWidth
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          value={filters.listtype}
                          onChange={e => setFilters(f => ({ ...f, listtype: e.target.value }))}
                          placeholder="Buscar..."
                          size="small"
                          variant="standard"
                          fullWidth
                        />
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredGuests.map((g) => (
                      <TableRow
                        key={g.id}
                        hover
                        onClick={() => {
                          setSelectedGuest(g);
                        }}
                        selected={selectedGuest?.id === g.id}
                        sx={{
                          cursor: 'pointer',
                          ...(selectedGuest?.id === g.id && {
                            backgroundColor: '#F5E6DA',
                            '&:hover': { backgroundColor: '#dea67cff' },
                          }),
                        }}
                      >
                        {/* Nombre editable */}
                        <TableCell
                          onDoubleClick={() => {
                            setEditCell({ id: g.id, field: 'firstname' });
                            setEditValue(g.firstname);
                          }}
                        >
                          {editCell && editCell.id === g.id && editCell.field === 'firstname' ? (
                            <TextField
                              value={editValue}
                              size="small"
                              autoFocus
                              onChange={(e) => setEditValue(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  if (editValue !== g.firstname) {
                                    handleCellEdit(g.id, 'firstname', editValue);
                                  }

                                  setEditCell(null);
                                } else if (e.key === 'Escape') {
                                  setEditCell(null);
                                }
                              }}
                              onBlur={() => setEditCell(null)}
                            />
                          ) : (
                            g.firstname
                          )}
                        </TableCell>
                        {/* Apellido editable */}
                        <TableCell
                          onDoubleClick={() => {
                            setEditCell({ id: g.id, field: 'lastname' });
                            setEditValue(g.lastname!);
                          }}
                        >
                          {editCell && editCell.id === g.id && editCell.field === 'lastname' ? (
                            <TextField
                              value={editValue}
                              size="small"
                              autoFocus
                              onChange={(e) => setEditValue(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  if (editValue !== g.lastname) {
                                    handleCellEdit(g.id, 'lastname', editValue);
                                  }
                                  setEditCell(null);
                                } else if (e.key === 'Escape') {
                                  setEditCell(null);
                                }
                              }}
                              onBlur={() => setEditCell(null)}
                            />
                          ) : (
                            g.lastname
                          )}
                        </TableCell>
                        <TableCell
                          onDoubleClick={() => {
                            setEditCell({ id: g.id, field: 'email' });
                            setEditValue(g.email!);
                          }}
                        >
                          {editCell && editCell.id === g.id && editCell.field === 'email' ? (
                            <TextField
                              value={editValue}
                              size="small"
                              autoFocus
                              onChange={(e) => setEditValue(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  if (editValue !== g.email) {
                                    handleCellEdit(g.id, 'email', editValue);
                                  }
                                  setEditCell(null);
                                } else if (e.key === 'Escape') {
                                  setEditCell(null);
                                }
                              }}
                              onBlur={() => setEditCell(null)}
                            />
                          ) : (
                            g.email
                          )}
                        </TableCell>
                        <TableCell
                          onDoubleClick={() => {
                            setEditCell({ id: g.id, field: 'phone' });
                            setEditValue(g.phone!);
                          }}
                        >
                          {editCell && editCell.id === g.id && editCell.field === 'phone' ? (
                            <TextField
                              value={editValue}
                              size="small"
                              autoFocus
                              onChange={(e) => setEditValue(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  if (editValue !== g.phone) {
                                    handleCellEdit(g.id, 'phone', editValue);
                                  }
                                  setEditCell(null);
                                } else if (e.key === 'Escape') {
                                  setEditCell(null);
                                }
                              }}
                              onBlur={() => setEditCell(null)}
                            />
                          ) : (
                            g.phone
                          )}
                        </TableCell>
                        <TableCell
                          onDoubleClick={() => {
                            setEditCell({ id: g.id, field: 'rsvpStatus' });
                            setEditValue(g.rsvpStatus!);
                          }}
                        >
                          {editCell && editCell.id === g.id && editCell.field === 'rsvpStatus' ? (
                            <TextField
                              select
                              size="small"
                              label="RSVP"
                              value={editValue}
                              onChange={(e) => setEditValue(e.target.value)}
                              fullWidth
                              sx={{ mt: 1 }}
                              
                            >
                              <MenuItem
                              value="cancel"
                              onClick={() => {
                                setEditCell(null);
                              }}
                            >
                              Cancelar
                            </MenuItem>
                              <MenuItem
                                value="pending"
                                onClick={() => {
                                  handleCellEdit(g.id, 'rsvpStatus', 'pending');

                                  setEditCell(null);
                                }}
                              >
                                Pendiente
                              </MenuItem>
                              <MenuItem
                                value="accepted"
                                onClick={() => {
                                  handleCellEdit(g.id, 'rsvpStatus', 'accepted');

                                  setEditCell(null);
                                }}
                              >
                                Asistirá
                              </MenuItem>
                              <MenuItem
                                value="declined"
                                onClick={() => {
                                  handleCellEdit(g.id, 'rsvpStatus', 'declined');

                                  setEditCell(null);
                                }}
                              >
                                No asistirá
                              </MenuItem>
                            </TextField>
                          ) : (
                            <RsvpChip status={g.rsvpStatus}></RsvpChip>
                          )}
                        </TableCell>

                        <TableCell
                          onDoubleClick={() => {
                            setEditCell({ id: g.id, field: 'hasPlusOne' });
                            setEditValue(g.hasPlusOne ? 'yes' : 'no');
                          }}
                        >
                          {editCell && editCell.id === g.id && editCell.field === 'hasPlusOne' ? (
                            <>
                              <RadioGroup
                                row
                                value={editValue}
                                onChange={(e) =>
                                  setEditValue(e.target.value === 'yes' ? 'yes' : 'no')
                                }
                                onBlur={() => setEditCell(null)}
                              >
                                <FormControlLabel
                                  value="yes"
                                  control={<Radio />}
                                  label="Sí"
                                  onClick={() => {
                                    setEditValue('yes');
                                    handleCellEdit(g.id, 'hasPlusOne', true);
                                    setEditCell(null);
                                  }}
                                />
                                <FormControlLabel
                                  value="no"
                                  control={<Radio />}
                                  label="No"
                                  onClick={() => {
                                    setEditValue('no');
                                    handleCellEdit(g.id, 'hasPlusOne', false);
                                    setEditCell(null);
                                  }}
                                />
                              </RadioGroup>
                            </>
                          ) : (
                            <>{g.hasPlusOne ? 'Sí' : 'No'}</>
                          )}
                        </TableCell>

                        <TableCell
                          onDoubleClick={() => {
                            setEditCell({ id: g.id, field: 'invitedBy' });
                            setEditValue(g.invitedBy!);
                          }}
                        >
                          {editCell && editCell.id === g.id && editCell.field === 'invitedBy' ? (
                            <TextField
                              value={editValue}
                              size="small"
                              autoFocus
                              onChange={(e) => setEditValue(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  if (editValue !== g.invitedBy) {
                                    handleCellEdit(g.id, 'invitedBy', editValue);
                                  }
                                  setEditCell(null);
                                } else if (e.key === 'Escape') {
                                  setEditCell(null);
                                }
                              }}
                              onBlur={() => setEditCell(null)}
                            />
                          ) : (
                            g.invitedBy
                          )}
                        </TableCell>
                        <TableCell
                          onDoubleClick={() => {
                            setEditCell({ id: g.id, field: 'listtype' });
                            setEditValue(g.listtype!);
                          }}
                        >
                          {editCell && editCell.id === g.id && editCell.field === 'listtype' ? (
                            <TextField
                              select
                              size="small"
                              label="List Type"
                              value={editValue}
                              onChange={(e) => setEditValue(e.target.value)}
                              fullWidth
                              sx={{ mt: 1 }}
                              onBlur={() => setEditCell(null)}
                            >
                              <MenuItem
                              value="cancel"
                              onClick={() => {
                                setEditCell(null);
                              }}
                            >Cancelar </MenuItem>
                              <MenuItem
                                value="Lista A"
                                onClick={() => {
                                  handleCellEdit(g.id, 'listtype', 'Lista A');

                                  setEditCell(null);
                                }}
                              >
                                Lista A
                              </MenuItem>
                              <MenuItem
                                value="Lista B"
                                onClick={() => {
                                  handleCellEdit(g.id, 'listtype', 'Lista B');

                                  setEditCell(null);
                                }}
                              >
                                Lista B
                              </MenuItem>
                            </TextField>
                          ) : (
                            g.listtype
                          )}
                        </TableCell>
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

  if (normalized === 'accepted') {
    return <Chip label="Asistirá" size="small" color="success" />;
  }
  if (normalized === 'declined') {
    return <Chip label="No asistirá" size="small" color="error" />;
  }
  return <Chip label="Pendiente" size="small" color="warning" />;
}
