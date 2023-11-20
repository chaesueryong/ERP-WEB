import { atom } from "recoil";

export const menuState = atom({
    key: 'menuState',
    default: false
})

export const accountPageState = atom({
    key: 'accountPageState',
    default: {
        searchUrl: '?page=1&pagesize=10'
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