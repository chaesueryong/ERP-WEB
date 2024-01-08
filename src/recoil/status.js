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
        nm_kr: true,           // 거래처명
        code: true,            // 거래처 코드
        sector: true,          // 업종
  
        brand: true,           // 옵션
  
        l_address: true,       // 주소
        crn: true,             // 사업자등록번호
        c_phone: true,         // 사업자 전화번호
        c_fax: true,           // 사업자 택스번호
  
        pay_method: true,      // 지급방식
        c_account: true,       // 현재잔액
        bank_nm: true,         // 입금은행명
        bank_acc: true,        // 계좌번호
        bank_owner: true,      // 예금주
  
        owener: true,          // 대표자 명
        owener_phone: true,    // 대표자 연락처
        manager: true,         // 담당자 명
        manager_phone: true,   // 담당자 연락처
  
        w_phone: true,         // 도매 주문폰
        w_b_phone: true,       // 도매 계산서 전화번호
        w_address: true,       // 도매주소
  
        homepage: true,        // 홈페이지
        descript: true,        // 비고
  
        etc: true,             // 비고
    },
    effects_UNSTABLE: [persistAtom]
})