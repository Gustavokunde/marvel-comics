import axios from 'axios';

import CryptoJS from 'crypto-js';

const MARVEL_API_URL = import.meta.env.VITE_MARVEL_API_URL;
const USER_API_URL = import.meta.env.VITE_USER_API_URL;
const PUBLIC_KEY = import.meta.env.VITE_MARVEL_PUBLIC_KEY;
const PRIVATE_KEY = import.meta.env.VITE_MARVEL_PRIVATE_KEY;

const ts = new Date().getTime();
const publicKey = PUBLIC_KEY;
const privateKey = PRIVATE_KEY
  ? CryptoJS.MD5(ts + PRIVATE_KEY + publicKey).toString()
  : '';

export const marvelApi = axios.create({
  baseURL: MARVEL_API_URL,
  params: { apikey: publicKey, hash: privateKey },
});

export const userApi = axios.create({
  baseURL: USER_API_URL,
});

export default marvelApi;
