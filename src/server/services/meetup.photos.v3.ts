import axios from 'axios';
import { auth, toQuery } from './meetup.helper';

export async function eventPhotos(accessToken: string, groupName: string, eventId: string) {
  const response = await axios.get(`https://api.meetup.com/${groupName}/events/${eventId}/photos`, auth(accessToken));
  return response.data;
}

export async function eventPhoto(accessToken: string, groupName: string, eventId: string, photoId: string) {
  const response = await axios.get(`https://api.meetup.com/${groupName}/events/${eventId}/photos/${photoId}`, auth(accessToken));
  return response.data;
}

export async function photoComments(accessToken: string, groupName: string, eventId: string, photoId: string) {
  const response = await axios.get(`https://api.meetup.com/${groupName}/events/${eventId}/photos/${photoId}/comments`, auth(accessToken));
  return response.data;
}

export async function photoAlbumList(accessToken: string, groupName: string) {
  const response = await axios.get(`https://api.meetup.com/${groupName}/photo_albums`, auth(accessToken));
  return response.data;
}

export async function photoAlbum(accessToken: string, groupName: string, albumId: string) {
  const response = await axios.get(`https://api.meetup.com/${groupName}/photo_albums/${albumId}`, auth(accessToken));
  return response.data;
}

export async function albumPhotos(accessToken: string, groupName: string, albumId: string) {
  const response = await axios.get(`https://api.meetup.com/${groupName}/photo_albums/${albumId}/photos`, auth(accessToken));
  return response.data;
}

export async function groupPhotos(accessToken: string, groupName: string) {
  const response = await axios.get(`https://api.meetup.com/${groupName}/photos`, auth(accessToken));
  return response.data;
}
