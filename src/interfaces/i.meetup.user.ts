import IMeetupPhoto from '@interfaces/i.meetup.photo';

export default interface IMeetupUser {
  id: number;
  name: string;
  email: string;
  status: string;
  joined: number;
  city: string;
  country: string;
  localized_country_name: string;
  state: string;
  lat: number;
  lon: number;
  photo: IMeetupPhoto;
}
