import {  apiPost } from './httpClient';
import { type Guest } from './Guest';
const WEDDING_ID = import.meta.env.VITE_WEDDING_ID;


export async function createGuest(body: {}): Promise<Guest[]> {
    const response = await apiPost<Guest[]>(`/wedding/${WEDDING_ID}/guests`, body);
    return response;
}