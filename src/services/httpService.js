import axios from 'axios';

export const httpService = {

    instance: axios.create({
        baseURL: process.env.REACT_APP_BASEURL,
    }),

    async load(url) {
        return await this.instance.get(url);
    },

    async del(url) {
        return await this.instance.delete(url);
    },

    async add(url, payload) {
        return await this.instance.post(url, payload);
    },

    async update(url, payload) {
        return await this.instance.put(url, payload);
    }

}