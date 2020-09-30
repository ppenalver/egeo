const {execSync} = require('child_process');

compileMainTheme();

function compileMainTheme() {
    const pathFrom = `../egeo/src`;
    const pathTo = `dist/helpers`;

    execSync(`mkdir ${pathTo}`);
    execSync(`node-sass ${pathFrom}/theme/global-vars.scss ${pathTo}/main-theme.css`);
}
