const fs = require('fs').promises;

const path = require('path');

const pathresolveTalker = path.resolve(__dirname, '../talker.json');

const readTalker = async () => {
 try {
    const readTalkerFile = await fs.readFile(pathresolveTalker, 'utf-8');
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
