import fs from 'fs';

export default (fileName, module, require) => {
    const wrapperSrc = `(function(module, exports, require) {
        ${fs.readFileSync(fileName, 'utf8')}
    })(_module, module.exports, require);`;
    eval(wrapperSrc);
};
