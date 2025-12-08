export interface AdminCreateUserPayload {
  email: string;
  password: string;
  fullName?: string;
  weddingId: string;
}

export async function adminCreateUser(payload: AdminCreateUserPayload) {
  const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/admin/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Error creando usuario (${res.status})`);
  }

  return res.json();
}
