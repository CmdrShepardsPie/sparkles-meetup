import axios from 'axios';
import { auth, toQuery } from './meetup.helper';

export async function groupEvents(accessToken: string, groupName: string) {
  const response = await axios.get(`https://api.meetup.com/${groupName}/events`, auth(accessToken));
  return response.data;
}

export async function getEvent(accessToken: string, groupName: string, eventId: string) {
  const response = await axios.get(`https://api.meetup.com/${groupName}/events/${eventId}`, auth(accessToken));
  return response.data;
}

export async function attendance(accessToken: string, groupName: string, eventId: string) {
  const response = await axios.get(`https://api.meetup.com/${groupName}/events/${eventId}/attendance`, auth(accessToken));
  return response.data;
}

export async function memberCalendar(accessToken: string) {
  const response = await axios.get(`https://api.meetup.com/self/calendar`, auth(accessToken));
  return response.data;
}

export async function memberEvents(accessToken: string) {
  const response = await axios.get(`https://api.meetup.com/self/events`, auth(accessToken));
  return response.data;
}
