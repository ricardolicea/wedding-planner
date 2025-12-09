import {  apiPost } from './httpClient';
import { type Guest } from './Guest';



export async function createGuest(body: {}, weddingId: string): Promise<Guest[]> {
    const response = await apiPost<Guest[]>(`/wedding/${weddingId}/guests`, body);
    return response;
}