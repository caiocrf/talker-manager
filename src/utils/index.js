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

const writeTalker = async (newTalker) => {
 try {
    await fs.writeFile(pathresolveTalker, 
        JSON.stringify(newTalker));
    return JSON.parse(newTalker);
 } catch (error) {
    return null;
 }
};
const getAllTalker = async () => {
    const talkers = await readTalker();
    return talkers;
};

module.exports = {
    getAllTalker,
    writeTalker,
};
