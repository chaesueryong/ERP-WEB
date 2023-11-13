import './AddBrandModal.css';
import '../modal.css';
import x_button from '../../../assets/images/x-icon-1.svg';
import { useState } from 'react';

function AddBrandModal({isModal, closeModal, addBrand}) {
  const [modalValues, setModalValues] = useState({
      "nm_kr":"브랜드이름1",
      "group_nm":"after",
      "product_c_id" : 28,
      "code" : "code",
      "crn" : "crn",
      "brandImage":"base64",
      "descript" : "code",
      "showOrder":1,
      "etc":"owener",
      "vendor" :[23,24],
      "category" :[15,16,17],

      "use_yn":"Y"
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
        <div className="AddAccountModal">
      <div className='modal' style={isModal ? {display: 'block'} : {display: 'none'}}>
        <div className='modal-bg'></div>
        <div className='modal-content-box'>
          <div className='modal-content'>

            <div className='modal-top-box'>
              <div className='modal-title'>거래처 정보</div>
              <img style={{cursor: 'pointer'}} src={x_button} onClick={closeModal} />
            </div>

            <div className='modal-middle-box'>

              <div className='modal-col'>
                <div className='modal-col-box'>
                  <div className='modal-col-box-title'>*브랜드 명</div>
                  <input className='modal-col-box-input' placeholder='브랜드 명을 입력하세요' value={modalValues['nm_kr']} onChange={e => {
                    handleOnChange(e, 'nm_kr');
                  }}/>
                </div>

                <div className='modal-col-box'>
                    <div className='modal-col-box-title'>제품 유형</div>
                    <select className='modal-col-box-input box-select' value={modalValues['sector']} onChange={e => {changeSelectBox(e, 'sector')}}>
                    <option value="" disabled>제품유형을 선택하세요</option>
                      {
                        categories.map((e, i) => (
                          <option key={i} className='opt' value={e.value}>{e.name}</option>
                        ))
                      }
                    </select>
                  </div>
              </div>

              <div className='modal-col'>
                <div className='modal-col-box'>
                  <div className='modal-col-box-title'>*거래처</div>
                  <input className='modal-col-box-input' placeholder='거래처를 검색해주세요' value={modalValues['brand']} onChange={e => {
                    handleOnChange(e, 'brand');
                  }}/>
                </div>

                <div className='modal-col-box' style={{flexDirection: 'row', gap: '15px'}}>

                </div>
              </div>

              <div className='modal-col'>
                <div className='modal-col-box'>
                  <div className='modal-col-box-title'>사업자 등록번호</div>
                  <input className='modal-col-box-input' placeholder='숫자만 입력해주세요' value={modalValues['brand']} onChange={e => {
                    handleOnChange(e, 'brand');
                  }}/>
                </div>

                <div className='modal-col-box' style={{flexDirection: 'row', gap: '15px'}}>

                </div>
              </div>

              <div className='modal-col'>
                <div className='modal-col-box'>
                  <div className='modal-col-box-title'>브랜드 카테고리</div>
                  <input className='modal-col-box-input' placeholder='상품 카테고리를 선택해주세요' value={modalValues['brand']} onChange={e => {
                    handleOnChange(e, 'brand');
                  }}/>
                </div>

                <div className='modal-col-box' style={{flexDirection: 'row', gap: '15px'}}>

                </div>
              </div>


            </div>

            <div className='modal-bottom-box'>
              <div className='modal-button' onClick={()=>{
                addBrand(modalValues);
              }}>등록하기</div>
            </div>
          </div>
        </div>
      </div>
        </div>
    );
}

export default AddBrandModal;

const categories = [
  {name: '선택안함', value: '선택안함'},
  {name: '공급', value: '공급'},
  {name: 'PB', value: 'PB'},
]