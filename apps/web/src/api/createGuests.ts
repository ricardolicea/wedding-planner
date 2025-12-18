import {  apiPost } from './httpClient';
import { type Guest } from './Guest';



export async function createGuest(body: Guest, weddingId: string): Promise<Guest[]> {
    console.log('createGuest called with:', body);
    const response = await apiPost<Guest[]>(`/wedding/${weddingId}/guests`, body);
    return response;
}