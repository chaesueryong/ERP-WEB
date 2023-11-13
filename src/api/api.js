const url = 'https://dev-erp.aftercompany.co.kr/';

export const api = {
    get_account_list: `${url}vendor/page/get`,
    add_account: `${url}vendor/addVendor`,
    put_account: `${url}vendor/updateVendor`,
    delete_account: `${url}vendor/deleteVendor`,

    get_brand_list: `${url}brand/page/get`,
    add_brand: `${url}vendor/addBrand`,
    put_brand: `${url}vendor/updateBrand`,
    delete_brand: `${url}vendor/deleteBrand`,

    get_goods_list: `${url}brand/page/get`,
    add_goods: `${url}vendor/addBrand`,
    put_goods: `${url}vendor/updateBrand`,
    delete_goods: `${url}vendor/deleteBrand`,
}