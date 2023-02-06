const fs = require('fs').promises;
const { join } = require('path');

const readTalker = async () => {
 try {
    const readTalkerFile = await fs.readFile(join(__dirname, '../talker.json'),
    'utf-8');
    return JSON.parse(readTalkerFile);
} catch (error) {
   return error.message;
}
};

const getAllTalker = async () => {
    const talkers = await readTalker();
    return talkers;
};

module.exports = {
    getAllTalker,
};
