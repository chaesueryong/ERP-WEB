import { atom } from "recoil";
// import { recoilPersist } from "recoil-persist";

// const { persistAtom } = recoilPersist({
//     key: 'localStorage',
//     storage: localStorage,
// })

// example
export const filterState = atom({
    key: "filterState",
    default: [],
    // effects_UNSTABLE: [persistAtom]
  })

export const menuState = atom({
    key: 'menuState',
    default: false
})

export const toastState = atom({
    key: 'toastState',
    default: {
        visible: false,
        text: '',
        type: 0
    }
})

export const accountPageState = atom({
    key: 'accountPageState',
    default: {
        searchUrl: ''
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