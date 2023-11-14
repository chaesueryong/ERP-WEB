import '../modal.css';
import x_button from '../../../assets/images/x-icon-1.svg';
import { useState } from 'react';

function ProductOrderModal({isModal, closeModal, addAccount}) {
  const [modalValues, setModalValues] = useState({
      nm_kr: "", // 거래처명
      code: "",  // 거래처 코드
      sector: "", // 업종

      brand: [], //옵션

      l_address: "",  // 주소
      crn: "", //사업자등록번호
      c_phone: "",// 사업자 전화번호
      c_fax: "",  // 사업자 택스번호

      pay_method: "계좌이체",   // 지급방식
      c_account: "",  // 현재잔액
      bank_nm: "",  // 입금은행명
      bank_acc: "",   // 계좌번호
      bank_owner: "",  // 예금주

      owener: "",  // 대표자 명
      owener_phone: "",  // 대표자 연락처
      manager: "",  // 담당자 명
      manager_phone: "", // 담당자 연락처


  //
      w_phone: "",  // 도매 주문폰
      w_b_phone: "", // 도매 계산서 전화번호
      w_address: "",  // 도매주소

      homepage: "",  // 홈페이지
      descript: "",  // 비고
  //

      showOrder: 1,

      etc: "",  // 비고
     use_yn: "Y"
    })

    // 모달 값 변경 이벤트
    const handleOnChange = (e, target) => {
      const values = modalValues;

      values[target] = e.target.value;
      setModalValues({
        ...values,
      })
    }

    // 모달 값 변경 이벤트
    const changeSelectBox = (e, target) => {
      const values = modalValues;

      values[target] = e.target.value;
      setModalValues({
        ...values,
      })

      if(e.target.selectedIndex === 0){
          e.target.style.color = '#C0C7CE';
      }else {
          e.target.style.color = 'black';
      }
    }

    return (
        <div className="ProductOrderModal">
      <div className='modal' style={isModal ? {display: 'block'} : {display: 'none'}}>
        <div className='modal-bg'></div>
        <div className='modal-content-box'>
          <div className='modal-content'>

            <div className='modal-top-box'>
              <div className='modal-title'>상품 발주</div>
              <img style={{cursor: 'pointer'}} src={x_button} onClick={closeModal} />
            </div>

            <div className='modal-middle-box'>


            </div>

            <div className='modal-bottom-box'>
              <div className='modal-button' onClick={()=>{
                addAccount(modalValues);
              }}>발주 등록</div>
            </div>
          </div>
        </div>
      </div>
        </div>
    );
}

export default ProductOrderModal;

const sectors = [
  {name: '도매', value: '도매'},
  {name: '소매', value: '소매'},
  {name: '수입', value: '수입'},
]

const banks = [
  {name: 'NH농협', value: 'NH농협'},
  {name: '카카오뱅크', value: '카카오뱅크'},
  {name: 'KB국민', value: 'KB국민'},
  {name: '신한', value: '신한'},
  {name: '토스뱅크', value: '토스뱅크'},
  {name: '우리', value: '우리'},
  {name: 'IBK기업', value: 'IBK기업'},
  {name: '하나', value: '하나'},
  {name: '새마을', value: '새마을'},
  {name: '케이뱅크', value: '케이뱅크'},
  {name: '신협', value: '신협'},
  {name: '우체국', value: '우체국'},
  {name: 'SC제일', value: 'SC제일'},
  {name: '씨티은행', value: '씨티은행'},
  {name: 'KDB산업은행', value: 'KDB산업은행'},
  {name: 'SBI저축은행', value: 'SBI저축은행'},
]