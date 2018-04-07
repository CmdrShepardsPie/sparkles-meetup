import axios from 'axios';
import { auth, toQuery } from './meetup.helper';

export async function eventCommentsList(accessToken: string, groupName: string, eventId: string) {
  const response = await axios.get(`https://api.meetup.com/${groupName}/events/${eventId}/comments`, auth(accessToken));
  return response.data;
}

export async function eventCommentAndReplyLikes(accessToken: string, groupName: string, eventId: string, commentId: string) {
  const response = await axios.get(`https://api.meetup.com/${groupName}/events/${eventId}/comments/${commentId}/likes`, auth(accessToken));
  return response.data;
}
