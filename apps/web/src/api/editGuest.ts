import { apiPut } from './httpClient';
import type { Guest } from '../api/Guest';

export async function editGuest(weddingId: string, guestId: string, updatedData: Guest): Promise<Guest> {
    const response = await apiPut<Guest>(`/wedding/${weddingId}/guests/${guestId}`, updatedData);
    return response;
}