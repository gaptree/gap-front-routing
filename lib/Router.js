import pathToRegexp from 'path-to-regexp';

export class Router {
    constructor() {
        this.routes = [];
    }

    add(pattern, action) {
        this.routes.push(new Route(pattern, action));
        return this;
    }

    dispatch(path) {
        const action = null;
        const params = {};

        return this.routes.reduce((result, route) => {
            if (result.route) {
                return result;
            }

            const params = route.match(path);
            if (!params) {
                return result;
            }

            return Object.assign(result, {action: route.action, params});
        }, {action, params});
    }
}

class Route {
    constructor(pattern, action) {
        this.pattern = pattern;
        this.keys = [];
        this.action = action;
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
