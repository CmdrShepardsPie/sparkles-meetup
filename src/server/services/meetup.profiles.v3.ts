import axios from 'axios';
import { auth, toQuery } from './meetup.helper';

export async function groupProfileList(accessToken: string, groupName: string) {
  const response = await axios.get(`https://api.meetup.com/${groupName}/members`, auth(accessToken));
  return response.data;
}

export async function getGroupMemberProfile(accessToken: string, groupName: string, memberId: string) {
  const response = await axios.get(`https://api.meetup.com/${groupName}/members/${memberId}`, auth(accessToken));
  return response.data;
}

export async function getMemberProfile(accessToken: string, memberId: string) {
  const response = await axios.get(`https://api.meetup.com/members/${memberId}`, auth(accessToken));
  return response.data;
}
