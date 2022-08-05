import axios from 'axios';
import { httpService } from './httpService';

export const cartService = {

    instance: axios.create({
        baseURL: process.env.REACT_APP_BASEURL,
    }),

    async load() {
        const url = '/cart';
        return await this.instance.get(url);
    },

    async del(id) {
        const url = 'http://localhost:4000/cart/' + id;
        return await httpService.del(url);
    },

    async add(product) {
        const url = 'http://localhost:4000/cart';
        return await axios.post(url, product);
    },

    async update(product) {
        const url = 'http://localhost:4000/cart/' + product.id;
        return await axios.put(url, product);
    }

}