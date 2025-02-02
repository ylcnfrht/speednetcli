import chalk from 'chalk';
import spinners from 'cli-spinners';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const animateProcess = (text, frames, color) => {
  const spinner = { frames, interval: 50 };
  let i = 0;
  return setInterval(() => {
    process.stdout.write(chalk[color].bold(`\r${spinner.frames[i]} ${text} `));
    i = (i + 1) % spinner.frames.length;
  }, spinner.interval);
};

async function showInfo(all, option, label, animationColor, getDataFunc, unit) {
  if (all || option) {
    const animation = animateProcess(`${label} :`, spinners.dots12.frames, animationColor);
    const data = await getDataFunc();
    console.log(chalk[animationColor].bold(`${data} ${unit || ''}`));
    clearInterval(animation);
  }
}

export {
  sleep,
  showInfo,
  animateProcess,
};
