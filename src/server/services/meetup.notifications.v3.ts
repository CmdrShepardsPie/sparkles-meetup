import axios from 'axios';
import { auth, toQuery } from './meetup.helper';

export async function notifications(accessToken: string) {
  const response = await axios.get(`https://api.meetup.com/notifications`, auth(accessToken));
  return response.data;
}
