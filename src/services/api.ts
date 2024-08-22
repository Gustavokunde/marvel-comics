import axios from 'axios';

import CryptoJS from 'crypto-js';

const BASE_URL = import.meta.env.VITE_API_URL;
const PUBLIC_KEY = import.meta.env.VITE_MARVEL_PUBLIC_KEY;
const PRIVATE_KEY = import.meta.env.VITE_MARVEL_PRIVATE_KEY;

const ts = new Date().getTime();
const publicKey = PUBLIC_KEY;
const privateKey = PRIVATE_KEY
  ? CryptoJS.MD5(ts + PRIVATE_KEY + publicKey).toString()
  : '';

const api = axios.create({
  baseURL: BASE_URL,
  params: { apikey: publicKey, hash: privateKey },
});

export default api;
