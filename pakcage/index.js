const { zip } = require('compressing');
const fs = require('fs-extra');
const { join } = require('path');
const { exec } = require('shelljs');
const readline = require('readline');
const { taget_path, log_file } = require('./install_config.json');

const SOURCE_PATH = join(__dirname, './redis.zip');
const TARGET_DIR = taget_path;
const REDIS_WINDOWS_CONF_TEMPLATE = join(__dirname, './redis.windows_template.conf');
const REDIS_WINDOWS_CONF_TARGET = join(__dirname, './redis/redis.windows.conf');

function main() {
    try {
        fs.ensureDirSync(TARGET_DIR);
        updateRedisConfig(() => {
            zip.uncompress(SOURCE_PATH, TARGET_DIR);
            exec(`${TARGET_DIR}/redis-server --service-install ${TARGET_DIR}/redis.windows.conf`);
            exec(`${TARGET_DIR}/redis-server --service-stop`);
            exec(`${TARGET_DIR}/redis-server --service-start`);
        });
    } catch (_) {
        console.log(_);
    }
}

function updateRedisConfig(cb) {
    try {
        fs.writeFileSync(REDIS_WINDOWS_CONF_TARGET, '');
    } catch (_) {
        return console.error(_);
    }

    const rl = readline.createInterface({
        input: fs.createReadStream(REDIS_WINDOWS_CONF_TEMPLATE),
        terminal: false,
    });

    rl.on('line', (line) => {
        if (line.startsWith('logfile')) {
            return fs.appendFileSync(REDIS_WINDOWS_CONF_TARGET, `logfile "${log_file}" \n`);
        }
        fs.appendFileSync(REDIS_WINDOWS_CONF_TARGET, `${line} \n`);
    });

    rl.on('close', cb.bind());
}

module.exports = { main, updateRedisConfig };
