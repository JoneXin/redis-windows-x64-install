const { zip } = require('compressing');
const fs = require('fs-extra');
const { join } = require('path');
const { exec } = require('shelljs');

const SOURCE_PATH = join(__dirname, './redis.zip');
const TARGET_DIR = require('./install_config.json').taget_path;

function main() {
    try {
        fs.ensureDirSync(TARGET_DIR);
        zip.uncompress(SOURCE_PATH, TARGET_DIR);
        exec(`${TARGET_DIR}/redis-server --service-install ${TARGET_DIR}/redis.windows.conf`);
        exec(`${TARGET_DIR}/redis-server --service-stop`);
        exec(`${TARGET_DIR}/redis-server --service-start`);
    } catch (_) {
        console.log(_);
    }
}

module.exports = main;
