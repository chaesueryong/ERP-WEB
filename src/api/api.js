import axios from "axios";

const baseUrl = 'https://dev-erp.aftercompany.co.kr/';
const jwt_token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJyb2RlY2s4MjZAb3ZlcnRoZXdpbmRvdy5uZXQiLCJpYXQiOjE3MDI0NTg1MzcsImV4cCI6MTcwNTA1MDUzN30.Ud6soq8aSSImAhV2v6B1g3v_wBmzi5Nk4d4D0Eu8Nog'

export const api = {
    get_account_list: 'vendor/page/get',
    get_account: 'vendor/get',
    add_account: 'vendor/addVendor',
    put_account: 'vendor/updateVendor',
    delete_account: 'vendor/deleteVendor',
    account_excel_download: '/vendor/excel/download',

    get_brand_list: 'brand/page/get',
    get_brand: 'brand/get',
    add_brand: 'brand/addBrand',
    put_brand: 'brand/updateBrand',
    delete_brand: 'brand/deleteBrand',
    brand_excel_download: '/brand/excel/download',

    get_brand_category_list: 'brand/getCategory',

    get_goods_list: 'brand/page/get',
    add_goods: 'vendor/addBrand',
    put_goods: 'vendor/updateBrand',
    delete_goods: 'vendor/deleteBrand',

    post: (url, data, config) => {
        return axios.post(baseUrl + url, data, {
            headers: {
                jwt_token,
            },
            ...config
          });
    }
}

