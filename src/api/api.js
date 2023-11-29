import axios from "axios";

const baseUrl = 'https://dev-erp.aftercompany.co.kr/';
const jwt_token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJyb2RlY2s4MjZAb3ZlcnRoZXdpbmRvdy5uZXQiLCJpYXQiOjE2OTk4NTY1OTAsImV4cCI6MTcwMjQ0ODU5MH0.mYtaQhu_b4jAjn467i1ozS8pohTy0Ws6Q61OxVKJJXI';

export const api = {
    get_account_list: 'vendor/page/get',
    get_account: 'vendor/get',
    add_account: 'vendor/addVendor',
    put_account: 'vendor/updateVendor',
    delete_account: 'vendor/deleteVendor',

    get_brand_list: 'brand/page/get',
    get_brand: 'brand/get',
    add_brand: 'vendor/addBrand',
    put_brand: 'vendor/updateBrand',
    delete_brand: 'vendor/deleteBrand',

    get_brand_category_list: 'brand/getCategory',

    get_goods_list: 'brand/page/get',
    add_goods: 'vendor/addBrand',
    put_goods: 'vendor/updateBrand',
    delete_goods: 'vendor/deleteBrand',

    post: (url, data, config) => {
        return axios.post(baseUrl + url, data, {
            headers: {
                jwt_token
            }
          });
    }
}

