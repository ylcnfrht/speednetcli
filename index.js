import { getPingStats, getUploadSpeed, getDownloadSpeed, getInternetProvider } from './common/http-client.js';

async function checkspeed() {
  try {
    const provider = await getInternetProvider();
    const { avg: avgPing, stddev: avgJitter } = await getPingStats();
    const downloadSpeed = await getDownloadSpeed();
    const uploadSpeed = await getUploadSpeed();

    delete provider.readme;

    return JSON.stringify({
      ...provider,
      ping: avgPing + ' ms',
      jitter: avgJitter + ' ms',
      download: downloadSpeed.mbps + ' Mbps',
      upload: uploadSpeed.mbps + ' Mbps',
    });
  } catch (error) {
    throw error;
  }
}

export default checkspeed;
