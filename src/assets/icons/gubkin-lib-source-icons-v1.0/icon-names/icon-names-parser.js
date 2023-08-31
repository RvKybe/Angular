const fs = require('fs');
const path = require('path');

function parse() {
    const iconNamesPath = path.join('./', 'icon-names/');
    const groupNames = fs.readdirSync(iconNamesPath);
    let iconNames = {};
    for (let i in groupNames) {
        iconNames[groupNames[i].slice(0, -4)] = {
            names: fs.readFileSync(iconNamesPath + groupNames[i], 'utf-8').split('\r\n'),
            color: "#" + ("00000" + Math.floor(Math.random() * Math.pow(16, 6)).toString(16)).slice(-6)
        };
    }
    fs.writeFileSync(path.join('./') + 'icon-names.json', JSON.stringify(iconNames));
}

parse();
