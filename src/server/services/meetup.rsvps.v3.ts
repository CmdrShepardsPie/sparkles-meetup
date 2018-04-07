import axios from 'axios';
import { auth, toQuery } from './meetup.helper';

export async function eventRsvpList(accessToken: string, groupName: string, eventId: string) {
  const response = await axios.get(`https://api.meetup.com/${groupName}/events/${eventId}/rsvps`, auth(accessToken));
  return response.data;
}
