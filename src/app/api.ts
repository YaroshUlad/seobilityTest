// так как апишка была не дана имитирую отправку данных из формы на сервер
import axios, { AxiosInstance } from 'axios';

const instance: AxiosInstance = axios.create({
  baseURL: 'https://worldtimeapi.org/api/timezone/Europe/',
});

export const appApi = {
  getAnyResponseFromApi() {
    return instance.get<ResponseType>('Minsk');
  },
};

export type ResponseType = {
  abbreviation: string;
  client_ip: string;
  datetime: string;
  day_of_week: number;
  day_of_year: number;
  dst: boolean;
  dst_from?: any;
  dst_offset: number;
  dst_until?: any;
  raw_offset: number;
  timezone: string;
  unixtime: number;
  utc_datetime: string;
  utc_offset: string;
  week_number: number;
};
