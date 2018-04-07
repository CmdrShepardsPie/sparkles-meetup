import axios from 'axios';
import { auth, toQuery } from './meetup.helper';

export async function discussionBoards(accessToken: string, groupName: string) {
  const response = await axios.get(`https://api.meetup.com/${groupName}/boards`, auth(accessToken));
  return response.data;
}

export async function discussions(accessToken: string, groupName: string, boardId: string) {
  const response = await axios.get(`https://api.meetup.com/${groupName}/boards/${boardId}/discussions`, auth(accessToken));
  return response.data;
}

export async function discussionPosts(accessToken: string, groupName: string, boardId: string, discussionId: string) {
  const response = await axios.get(`https://api.meetup.com/${groupName}/boards/${boardId}/discussions/${discussionId}`, auth(accessToken));
  return response.data;
}
