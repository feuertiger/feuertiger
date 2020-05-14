const fs = require('fs');
const { getPackages } = require('@lerna/project');

const linkscript = `module.exports = require("../src/index");`;
const linktypesscript = `export * from "../src/index";`;

const getPackagePath = (name) => {
    const packageJsonPath = require.resolve(`${name}/package.json`);
    return packageJsonPath.split('package.json')[0];
};

(async () => {
    const cwd = process.cwd();
    const pkgs = await getPackages(cwd);

    [...pkgs].forEach((pkg) => {
        const path = getPackagePath(pkg.name);
        const distpath = `${path}dist`;
        const distpathindex = `${distpath}/index.js`;
        const distpathindextypes = `${distpath}/index.d.ts`;

        if (!fs.existsSync(distpath)) {
            fs.mkdirSync(distpath);
        }
        fs.writeFileSync(distpathindex, linkscript, {
            encoding: 'utf8',
            flag: 'w'
        });
        fs.writeFileSync(distpathindextypes, linktypesscript, {
            encoding: 'utf8',
            flag: 'w'
        });

        // eslint-disable-next-line no-console
        console.log(`linked "${distpathindex}" to "../src/index.ts"`);
    });
})();
