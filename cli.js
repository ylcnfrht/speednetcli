#!/usr/bin/env node
import chalk from 'chalk';
import { Command } from 'commander';
import spinners from 'cli-spinners';
import { COLORS } from './common/constants.js';
import { sleep, showInfo } from './common/utils.js';

import {
  getPingStats,
  getUploadSpeed,
  getDownloadSpeed,
  getInternetProvider
} from './common/http-client.js';

const { GREY, GREEN, YELLOW, MAGENTA, CYAN } = COLORS;

async function main() {
  try {
    const program = new Command();
    program
      .option('-d, --download', 'Check download speed')
      .option('-u, --upload', 'Check upload speed')
      .option('-p, --ping', 'Check ping')
      .option('-j, --jitter', 'Check jitter')
      .option('-net, --net', 'Get network information')
      .parse(process.argv);

    const all = !Object.keys(program.opts()).length;
    const { download, upload, ping, jitter, net } = program.opts();

    let i = 0;
    const animation = setInterval(() => {
      process.stdout.write(chalk.yellow(`\r${spinners.aesthetic.frames[i]} ${"SPEEDTEST STARTED"} ${spinners.aesthetic.frames.reverse()[i]}`));
      i = (i + 1) % spinners.aesthetic.frames.length;
    }, 50);

    const provider = await getInternetProvider();

    const { avg: avgPing, stddev: avgJitter } = await getPingStats();
    console.log();
    clearInterval(animation);

    if (provider.timezone) await showInfo(all, net, 'Timezone ', GREY, async () => { await sleep(50); return `${provider.timezone}`; });
    if (provider.org) await showInfo(all, net, 'Provider ', GREY, async () => { await sleep(50); return `${provider.org}`; });
    if (provider.hostname) await showInfo(all, net, 'Hostname ', GREY, async () => { await sleep(50); return `${provider.hostname}`; });
    if (provider.ip) await showInfo(all, net, 'IP       ', GREY, async () => { await sleep(50); return `${provider.ip}`; });
    if (provider.city) await showInfo(all, net, 'City     ', GREY, async () => { await sleep(50); return `${provider.city}`; });
    if (provider.region) await showInfo(all, net, 'Region   ', GREY, async () => { await sleep(50); return `${provider.region}`; });
    if (provider.postal) await showInfo(all, net, 'Postal   ', GREY, async () => { await sleep(50); return `${provider.postal}`; });
    if (provider.loc) await showInfo(all, net, 'Location ', GREY, async () => { await sleep(50); return `${provider.loc}`; });
    if (provider.country) await showInfo(all, net, 'Country  ', GREY, async () => { await sleep(50); return `${provider.country}`; });

    await showInfo(all, net, 'Timestamp', GREY, async () => { await sleep(50); return new Date().toISOString(); });
    await showInfo(all, ping, 'Ping     ', MAGENTA, async () => { await sleep(50); return avgPing }, ' ms');
    await showInfo(all, jitter, 'Jitter   ', CYAN, async () => { await sleep(50); return avgJitter }, ' ms');
    await showInfo(all, download, 'Download ', GREEN, async () => (await getDownloadSpeed()).mbps, ' Mbps');
    await showInfo(all, upload, 'Upload   ', YELLOW, async () => (await getUploadSpeed()).mbps, ' Mbps');
    console.log(chalk.green('▰▰▰▰▰▰▰ SPEEDTEST COMPLETED ▰▰▰▰▰▰▰'));
  } catch (error) {
    console.error(chalk.red('Exception during speed test', JSON.stringify(error)));
    process.exit(0);
  }
};

main();

process.on('SIGINT', () => { console.log(" SIGINT called"); process.exit(); });
process.on('uncaughtException', (error) => {
  console.error(chalk.red('An unhandled error occured: ', JSON.stringify(error)));
});
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit();
});
