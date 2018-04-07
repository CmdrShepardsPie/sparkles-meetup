import axios from 'axios';
import { auth, toQuery } from './meetup.helper';

export async function getGroup(accessToken: string, groupName: string) {
  const response = await axios.get(`https://api.meetup.com/${groupName}`, auth(accessToken));
  return response.data;
}

export async function memberGroups(accessToken: string) {
  const response = await axios.get(`https://api.meetup.com/self/groups`, auth(accessToken));
  return response.data;
}
