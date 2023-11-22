import { atom } from "recoil";

export const menuState = atom({
    key: 'menuState',
    default: false
})

export const toastState = atom({
    key: 'toastState',
    default: {
        visible: true,
        text: '거래처 정보가 등록되었습니다.',
        type: 0
    }
})

export const accountPageState = atom({
    key: 'accountPageState',
    default: {
        searchUrl: '?page=1&pagesize=50'
    }
})

export const brandsPageState = atom({
    key: 'brandsPageState',
    default: {
        searchUrl: '?page=1&pagesize=10'
    }
})

export const productsPageState = atom({
    key: 'productsPageState',
    default: {
        searchUrl: '?page=1&pagesize=10'
    }
})

export const ordersPageState = atom({
    key: 'ordersPageState',
    default: {
        searchUrl: '?page=1&pagesize=10'
    }
})