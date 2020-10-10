const fs = require('fs');
const ffmpeg = require("fluent-ffmpeg");
const logger = console;

const options = {
  timeout: 60, // seconds
  logger
};

ffmpeg(fs.createReadStream('assets/video.webm'), options)
  .output(fs.createWriteStream('assets/transcode-video.mp4'), {end: true})
  .on('end', () => console.log('Finished processing'))
  .run();