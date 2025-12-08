import { useState, useEffect } from 'react';
import { Alert, Box, Button, Card, CardContent, Grid, TextField, Typography, InputLabel, Select, MenuItem, type SelectChangeEvent } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import { adminCreateUser } from '../api/adminApi';
import type { Wedding } from '../api/Wedding';
import { getWeddings } from '../api/getWeddings';

export function CreateUserPage() {
  const { user } = useAuth();

  // 👇 Aquí defines quién es admin
  const isAdmin = user?.email === 'ricardo.liceamata@gmail.com';
  

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [weddingId, setWeddingId] = useState<string>('');
  const [weddings, setWeddings] = useState<Wedding[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function loadWeddings() {
    const loadedWeddings = await getWeddings();
    setWeddings(loadedWeddings as Wedding[]);
  }

  useEffect(() => {
    loadWeddings();
  }, []);

   const handleChange = (event: SelectChangeEvent) => {
    setWeddingId(event.target.value as string);
  }; 


  if (!isAdmin) {
    return (
      <Box>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
          No autorizado
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Esta sección solo está disponible para el administrador de la aplicación.
        </Typography>
      </Box>
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      await adminCreateUser({
        email,
        password,
        fullName: fullName || undefined,
        weddingId: weddingId,
      });

      setSuccess(`Usuario ${email} creado correctamente.`);
      setFullName('');
      setEmail('');
      setPassword('');
    } catch (err: any) {
      console.error(err);
      setError(err.message ?? 'Error creando usuario');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Box>
      <Box mb={3}>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 0.5 }}>
          Crear usuario 👤
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Como administrador, aquí puedes crear usuarios que luego podrán iniciar sesión en la app.
        </Typography>
      </Box>

      <Grid container spacing={2}>
        <Card elevation={0} sx={{ borderRadius: 3, border: '1px solid #e7dcd2' }}>
          <CardContent>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
              Datos del usuario
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={2}>
              Ingresa el nombre, correo y una contraseña temporal. Luego podrás asignarle una boda
              específica.
            </Typography>

            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                label="Nombre completo"
                fullWidth
                margin="dense"
                size="small"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
              <TextField
                label="Email"
                type="email"
                fullWidth
                margin="dense"
                size="small"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <TextField
                label="Contraseña"
                type="password"
                fullWidth
                margin="dense"
                size="small"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                helperText="Puede cambiarla más adelante, por ahora es una contraseña inicial."
                required
              />
              <InputLabel id="wedding-select-label">Wedding</InputLabel>
              <Select
                labelId="wedding-select-label"
                fullWidth
                margin="dense"
                size="small"
                id="wedding-select"
                value={weddingId}
                label="Wedding"
                onChange={handleChange}
              >
                {weddings.map((w) => (
                  <MenuItem key={w.id} value={w.id}>
                    {w.name || w.id}
                  </MenuItem>
                ))}
              </Select> 

              {error && (
                <Alert severity="error" sx={{ mt: 2 }}>
                  {error}
                </Alert>
              )}

              {success && (
                <Alert severity="success" sx={{ mt: 2 }}>
                  {success}
                </Alert>
              )}

              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
                disabled={loading}
              >
                {loading ? 'Creando...' : 'Crear usuario'}
              </Button>
            </Box>
          </CardContent>
        </Card>

        <Card elevation={0} sx={{ borderRadius: 3, border: '1px solid #e7dcd2', height: '100%' }}>
          <CardContent>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
              Cómo funciona
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Cuando creas un usuario:
            </Typography>
            <Typography variant="body2" color="text.secondary" component="ul">
              <li>Se crea un usuario en Supabase Auth con ese email.</li>
              <li>
                Se registra también en <code>public.users</code> gracias al trigger.
              </li>
              <li>
                Luego podrás asignarle una boda específica (desde SQL o en una futura pantalla de
                administración).
              </li>
            </Typography>
            <Typography variant="body2" color="text.secondary" mt={2}>
              Comparte con la persona el correo y la contraseña para que pueda iniciar sesión en la
              app desde la pantalla principal.
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Box>
  );
}
