const fs = require('fs');
const ffmpeg = require("fluent-ffmpeg");
const logger = console;

const options = {
  timeout: 60, // seconds
  logger
};

async function main() {
  await new Promise((resolve, reject) => {
    ffmpeg(fs.createReadStream('assets/video.webm'), options)
      .output('assets/transcode-video.mp4')
      .on('error', reject)
      .on('end', () => {
        resolve();
      })
      .run();
  });

  await new Promise(((resolve, reject) => {
    ffmpeg(('assets/transcode-video.mp4'), options)
      .on('error', reject)
      .on('end', resolve)
      .takeScreenshots({count: 1, timemarks: ['00:00:01.000'], size: '320x200'}, "assets/")
  }));

  console.log('finished');
  process.exit();
}

main().then();

