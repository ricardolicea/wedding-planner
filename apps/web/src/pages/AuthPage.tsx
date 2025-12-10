import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  Alert,
} from '@mui/material';
import { useAuth } from '../contexts/AuthContext';

export function AuthPage() {
  const { signIn, loading , setLoading} = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { error } = await signIn(email, password);
      if (error) {
        if (error.status === 429) {
          setError(
            'Demasiados intentos. Espera unos segundos e inténtalo de nuevo.'
          );
        } else {
          setError(error.message);
        }
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: '#F9F5F2',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
      }}
    >
      <Card sx={{ maxWidth: 400, width: '100%', borderRadius: 3 }}>
        <CardContent>
          <Typography
            variant="h6"
            sx={{ fontWeight: 600, textAlign: 'center', mb: 0.5 }}
          >
            Wedding Planner 💍
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ textAlign: 'center', mb: 2 }}
          >
            Inicia sesión para seguir planeando tu boda.
          </Typography>

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              label="Email"
              type="email"
              fullWidth
              margin="dense"
              size="small"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <TextField
              label="Contraseña"
              type="password"
              fullWidth
              margin="dense"
              size="small"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />

            {error && (
              <Alert severity="error" sx={{ mt: 1, mb: 1 }}>
                {error}
              </Alert>
            )}

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
              disabled={loading}
            >
              Iniciar sesión
            </Button>
          </Box>

          {/* Aquí luego podemos poner un texto tipo:
             "Si eres admin, usa el panel para crear nuevos usuarios" */}
        </CardContent>
      </Card>
    </Box>
  );
}
