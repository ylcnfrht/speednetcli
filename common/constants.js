const UPLOAD_BYTES_SIZE = 2_000_000; // 2 MB
const DOWNLOAD_BYTES_SIZE = 4_000_000; // 4 MB
const BASE_URL = 'https://speed.cloudflare.com';

const COLORS = {
  GREY: 'grey',
  CYAN: 'cyan',
  GREEN: 'green',
  YELLOW: 'yellow',
  MAGENTA: 'magenta',
};

const ERRORS = {
  PROVIDER_EXCEPTION: {
    code: 100,
    error: 'PROVIDER_EXCEPTION',
    message: 'Failed to fetch provider data'
  },
  DOWNLOAD_SPEED_EXCEPTION: {
    code: 102,
    error: 'DOWNLOAD_SPEED_EXCEPTION',
    message: 'Failed to fetch download speed'
  },
  UPLOAD_SPEED_EXCEPTION: {
    code: 102,
    error: 'UPLOAD_SPEED_EXCEPTION',
    message: 'Failed to fetch upload speed'
  },
  PING_STATS_EXCEPTION: {
    code: 103,
    error: 'PING_STATS_EXCEPTION',
    message: 'Failed to fetch network ping stats'
  },
}

export {
  BASE_URL,
  COLORS,
  ERRORS,
  UPLOAD_BYTES_SIZE,
  DOWNLOAD_BYTES_SIZE,
};
