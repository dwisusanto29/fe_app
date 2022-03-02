import axios from 'axios';
const API_URL = "http://localhost:8000/api/products/";

const getListProduct = async () => {
    const response = await axios.get(API_URL);
    return response.data;
}

const createProduct = async (product) => {
    const response = await axios.post(API_URL + 'create', {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        },
        body: {
            product
        }
    });
    return response.data;
}

const updateProduct = async (product) => {
    const response = await axios.put(API_URL + 'update', product);
    return response.data;
}

const getProduct = async (id) => {
    const response = await axios.get(API_URL + 'get/' + id);
    return response.data;
}

const deleteProduct = async (id) => {
    const response = await axios.delete(API_URL + 'delete/' + id);
    return response.data;
}

const ProductService = {
    getListProduct,
    createProduct,
    updateProduct,
    getProduct,
    deleteProduct
}

export default ProductService;