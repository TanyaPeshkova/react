import { BaseModel } from "../models/BaseModel";

export interface BaseApiInterface {

    request(): Promise<any>;

    getFilterParams(): {}

    filter(): this;
}

export interface BaseApiOrmInterface {
    all(): Promise<any>;

    first(): any;

    getModel(): {};
}


export class BaseApi implements BaseApiInterface, BaseApiOrmInterface {
    private filterParams: {};
    protected model: {};

    path = '';
    base_url = '';

    searchParams() {
        return new URLSearchParams(this.getFilterParams())
    };

    getUrl() {
        return this.base_url + this.path + '?' + this.searchParams();
    }


    getModel(): BaseModel {
        if (typeof this.model === 'function') {
            // @ts-ignore
            let m = new this.model();

            if (typeof m.build === 'function')
                return m;

            throw new Error('Model not has Build method');
        }

        throw new Error('Undefined Model');
    }

    async request() {
        const customHeaders = new Headers({
            "Content-Type": "application/json",
            "Accept": "application/json",
            'Access-Control-Allow-Origin':'*'
        });

        const response = await fetch(this.getUrl(), {
            headers: customHeaders,
            
        });
        if (response.ok) {
            return await response;
            
        } else {
            throw new Error(`Request error status: ${response.status}`);
        }
    }

    async getJson() {
        const response = await this.request();
            
        return await response.json();
    }

    getFilterParams(): {} {
        return this.filterParams;
    }

    filter(params: {} = {}) {
        this.filterParams = params;

        return this;
    }

    async first() {
        const response = await this.all();

        if (response.length > 0)
            return response[0]

        throw new Error('BaseApi: not found');
    }

    async all(): Promise<any> {
        const result = await this.getJson();
        const items = [];
        for (const ind in result.response) {
            items.push(this.getModel().build(result.response[ind]));

        }

        return items;
    }

}