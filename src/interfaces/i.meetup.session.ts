import IMeetupUser from '@interfaces/i.meetup.user';

export default interface IMeetupSession {
  profile: IMeetupUser;
  accessToken: string;
  refreshToken: string;
}
