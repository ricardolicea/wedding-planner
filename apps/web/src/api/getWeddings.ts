import { apiGet } from './httpClient';
import { type Wedding } from './Wedding';


export async function getWeddings(): Promise<Wedding[]> {
    const response = await apiGet<Wedding[]>(`/weddings`);
    return response;
}