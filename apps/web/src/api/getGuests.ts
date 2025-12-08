import { apiGet } from './httpClient';
import { type Guest } from './Guest';


export async function getGuests(weddingId: string): Promise<Guest[]> {
    const response = await apiGet<Guest[]>(`/wedding/${weddingId}/guests`);
    return response;
}