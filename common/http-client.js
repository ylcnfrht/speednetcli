import ping from 'ping';
import axios from 'axios';
import NetworkSpeed from 'network-speed';
import { ERRORS } from './constants.js';

import { BASE_URL, DOWNLOAD_BYTES_SIZE, UPLOAD_BYTES_SIZE } from './constants.js';

const networkSpeed = new NetworkSpeed();

async function getDownloadSpeed() {
  try {
    const url = `${BASE_URL}/__down?bytes=${DOWNLOAD_BYTES_SIZE}`;
    return await networkSpeed.checkDownloadSpeed(url, DOWNLOAD_BYTES_SIZE);
  } catch (error) {
    throw ERRORS.DOWNLOAD_SPEED_EXCEPTION;
  }
};

async function getUploadSpeed() {
  try {
    const response = await networkSpeed.checkUploadSpeed(
      {
        hostname: `${BASE_URL.split('//')[1]}`,
        path: '/__up',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength('0'.repeat(UPLOAD_BYTES_SIZE)),
        }
      }
      , UPLOAD_BYTES_SIZE);

    return response;
  } catch (error) {
    throw ERRORS.UPLOAD_SPEED_EXCEPTION;
  }
};

async function getPingStats() {
  try {
    return await ping.promise.probe('www.cloudflare.com', {
      min_reply: 1,
      max_reply: 1,
      extra: ['-c', '3'],
    }).catch(error => {
      throw ERRORS.UPLOAD_SPEED_EXCEPTION;
    });
  } catch (error) {
    throw ERRORS.PING_STATS_EXCEPTION;
  }
};

async function getInternetProvider() {
  try {
    const response = await axios.get('https://ipinfo.io/json');
    return response.data;

  } catch (error) {
    throw ERRORS.PROVIDER_EXCEPTION;
  }
}

export {
  getPingStats,
  getUploadSpeed,
  getDownloadSpeed,
  getInternetProvider,
}
