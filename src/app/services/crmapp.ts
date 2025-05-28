import { FetchApi } from './fetch-api';
import { MeetingsTasksType } from '../models/CRMApp/meetings-tasks-type';

export async function getMeetingsTasksList(): Promise<MeetingsTasksType[]> {
  return await FetchApi.fetchApiResponse<MeetingsTasksType[]>('https://excel2json.io/api/share/2fd4ecd6-da6c-4e37-e666-08dab79fa5b4', []);
}
