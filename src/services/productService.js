import axios from 'axios';

export const productService = {

    instance: axios.create({
        baseURL: process.env.REACT_APP_BASEURL,
    }),

    async load(category_id) {
        const url = '/products?category_id=' + category_id;
        return await this.instance.get(url);
    }

}