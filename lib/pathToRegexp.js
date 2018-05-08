var PATH_REGEXP = new RegExp('{\\w+:(.*?)}', 'g');

function parse(path) {
    let res;
    let matches = [];
    let tokens = [];
    while ((res = PATH_REGEXP.exec(path)) !== null) {
        matches.push(res);
    }
    matches.forEach(function (item) {
        tokens.push({name: (/\w+/.exec(item[0]))[0]});
        path = path.replace(item[0], `(${item[1]})`);
    });
    return {path, tokens};
}

function escapeStr(str) {
    return str.replace(/([.*?=^!:${}|/\\])/g, '\\$1');
}

export function pathToRegexp(originPath, keys) {
    let {path, tokens} = parse(originPath);
    let parsed = '^' + escapeStr(path) + '(?:\\/(?=$))?$';

    if (keys) {
        tokens.forEach(item => {
            keys.push(item);
        });
    }

    return new RegExp(parsed, 'i');
}
