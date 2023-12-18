import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
    key: 'localStorage',
    storage: localStorage,
})

// example
export const filterState = atom({
    key: "filterState",
    default: [],
    effects_UNSTABLE: [persistAtom]
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
        searchUrl: ''
    }
})

export const productsPageState = atom({
    key: 'productsPageState',
    default: {
        searchUrl: ''
    }
})

export const ordersPageState = atom({
    key: 'ordersPageState',
    default: {
        searchUrl: ''
    }
})


export const accountRegistrationModal = atom({
    key: "accountRegistrationModal",
    default: {
        nm_kr: false,           // 거래처명
        code: false,            // 거래처 코드
        sector: false,          // 업종
  
        brand: false,           // 옵션
  
        l_address: false,       // 주소
        crn: false,             // 사업자등록번호
        c_phone: false,         // 사업자 전화번호
        c_fax: false,           // 사업자 택스번호
  
        pay_method: false,      // 지급방식
        c_account: false,       // 현재잔액
        bank_nm: false,         // 입금은행명
        bank_acc: false,        // 계좌번호
        bank_owner: false,      // 예금주
  
        owener: false,          // 대표자 명
        owener_phone: false,    // 대표자 연락처
        manager: false,         // 담당자 명
        manager_phone: false,   // 담당자 연락처
  
        w_phone: false,         // 도매 주문폰
        w_b_phone: false,       // 도매 계산서 전화번호
        w_address: false,       // 도매주소
  
        homepage: false,        // 홈페이지
        descript: false,        // 비고
  
        etc: false,             // 비고
    },
    effects_UNSTABLE: [persistAtom]
})