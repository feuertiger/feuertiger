const fs = require('fs');
const { getPackages } = require('@lerna/project');

const linkscript = `module.exports = require("../src/index");`;
const linktypesscript = `export * from "../src/index";`;

const getPackagePath = (name) => {
    const packageJsonPath = require.resolve(`${name}/package.json`);
    return packageJsonPath.split('package.json')[0];
};

const cwd = process.cwd();

getPackages(cwd).then((pkgs) =>
    [...pkgs].forEach((pkg) => {
        const path = getPackagePath(pkg.name);
        const distpath = `${path}dist`;
        const distpathindex = `${distpath}/index.js`;
        const distpathindextypes = `${distpath}/index.d.ts`;

        const hasIndexJs =
            fs.existsSync(`${path}src/index.ts`) ||
            fs.existsSync(`${path}src/index.js`);

        if (!hasIndexJs) {
            return;
        }

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
    })
);
