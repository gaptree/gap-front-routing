import {pathToRegexp} from './pathToRegexp';

export class Router {
    constructor() {
        this.routes = [];
    }

    add(pattern, handler) {
        this.routes.push(new Route(pattern, handler));
        return this;
    }

    url(pattern, params) {
        for (let key in params) {
            let reg = new RegExp('\\{(' + key + ')(?:.*?)?\\}');
            let result = reg.exec(pattern);
            if(!result) continue;

            pattern = pattern.replace(result[0], params[key]);
        }

        return pattern;
    }

    match(path) {
        const handler = null;
        const params = {};

        return this.routes.reduce((result, route) => {
            if (result.route) {
                return result;
            }

            const params = route.match(path);
            if (!params) {
                return result;
            }

            return Object.assign(result, {handler: route.handler, params});
        }, {handler, params});
    }
}

class Route {
    constructor(pattern, handler) {
        this.pattern = pattern;
        this.keys = [];
        this.handler = handler;
        this.regex = pathToRegexp(this.pattern, this.keys);
    }

    match(path) {
        const values = this.regex.exec(path);
        if (values) {
            return this.valuesToParams(values.slice(1));
        }
    }

    valuesToParams(values) {
        return values.reduce((params, val, i) => {
            if (val === undefined) {
                return params;
            }
            return Object.assign(params, {
                [this.keys[i].name]: decodeURIComponent(val)
            });
        }, {});
    }
}
