export interface BaseModelInterface {
    build(...args): this;

    first(): this;

    all(): [this];

    create(): this;

    update(): this;

    destroy(): any;
}

export class BaseModel implements BaseModelInterface {
    constructor(...props) {
        // super(props);
    }


    all(): [this] {
        throw new Error('Implement method')
    }

    build(...args): this {
        throw new Error('Implement method')
    }

    create(): this {
        throw new Error('Implement method')
    }

    destroy(): any {
        throw new Error('Implement method')
    }

    first(): this {
        throw new Error('Implement method')
    }

    update(): this {
        throw new Error('Implement method')
    }
}