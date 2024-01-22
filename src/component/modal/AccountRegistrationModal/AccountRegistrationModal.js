import '../modal.css';
import x_button from '../../../assets/images/x-icon-1.svg';
import { useEffect, useRef, useState } from 'react';
import SelectBox from '../../SelectBox/SelectBox';
import { Navigate, useNavigate } from 'react-router-dom';
import { api } from '../../../api/api';
import { useRecoilState } from 'recoil';
import { accountRegistrationModal, toastState } from '../../../recoil/status';
import ToggleButton from '../../ToggleButton/ToggleButton';
import { functionsIn } from 'lodash';

function AccountRegistrationModal({isModal, closeModal, addAccount, editAccount, setData}) {
  const [toast, setToast] = useRecoilState(toastState);
  const navigate = useNavigate();

  const [customToggle, setCustomToggle] = useState(false);

  const [customInput, setCustomInput] = useRecoilState(accountRegistrationModal);

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
    });

    const [brandList, setBrandList] = useState([]);
    const [brandInputText, setBrandInputText] = useState('');

    const select1 = useRef(null);
    const select2 = useRef(null);

    const button = useRef(null);

    const handleOnClickButton = () => {
      if(modalValues.nm_kr === ''){
        setToast({
          visible: true,
          type: 'error',
          text: '필수 입력 항목을 입력해주세요. (* 표시)'
        });

        return;
      }

      if(setData === null) {
        addAccount(modalValues);
      }else{
        editAccount(modalValues);
      }
    }

    // 모달 값 변경 이벤트
    const handleOnChange = (e, target) => {
      const values = modalValues;

      if(target === 'crn'){
        values[target] = licenseNum(e.target.value);
      }else{
        values[target] = e.target.value;
      }
      setModalValues({
        ...values,
      })
    }

    const licenseNum = (str) => {
      str = str.replace(/[^0-9]/g, '');
      let tmp = '';
      if(str.length < 4){
        return str;
      }else if(str.length < 7){
        tmp += str.substr(0, 3);
        tmp += '-';
        tmp += str.substr(3);
        return tmp;
      }else{ 
        tmp += str.substr(0, 3);
        tmp += '-';
        tmp += str.substr(1, 2);
        tmp += '-';
        tmp += str.substr(5);
        return tmp;
      }
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

    const moveTo = () => {
      navigate('/brands');
    }

    const getList = (text = '', id) => {
      api.post(api.get_brand_list, {
          "search_text" : text, //검색어
          "categorys" : [], //카테고리
          "orders" : ["reg_dt_str"], //오름차순- 내림차순 소팅 (컬럼명 적재 시 내림차순 적용)
                      // 브랜드 그룹 group_nm, 브랜드 명 nm_kr, 브랜드 코드 code, 거래처 코드 vendor_code, 거래처명 vendor_nm, 상품 카테고리 categorys
                      // 제품유형 type, 등록일자 reg_dt_str
      
          "size":10, //페이징 처리시 사이즈 크기
          "number":0, // 페이징 인덱스(최초 0)
          "use_yn":"Y",

          "id": id
      })
      .then(res=>{
        setBrandList(res.data.data.content)
      })
      .catch(e=>{
          console.log(e)
      })
  }

  const setEditData = async () => {
    if(setData === null){
      return;
    }

    const accountBrandList = setData.brand;

    let brList = [];

    for(let i = 0; i < accountBrandList.length; i++){
      const brand = await api.post(api.get_brand, {
        use_yn: "Y",
        size: 10, 
        number: 0,
        id: accountBrandList[i].brand_id
      })

      if(brand.data.data.content[0] === undefined){
        brList.push({
          nm_kr: '미확인',
          id: accountBrandList[i].brand_id
        })
      }else{
        brList.push(brand.data.data.content[0])
        
      }
    }

    setModalValues({
      ...setData,
      brand: brList
    });
  }
  
  const handleChange = (e) => {
    setBrandInputText(e.target.value);
    if(e.target.value === ''){
      setBrandInputText([]);
    }else{
      getList(e.target.value);
    }
  }

  const handleClickItem = (e) => {
    setBrandInputText(e.nm_kr);

    // for(let i = 0; i < modalValues['brand'].length; i++){
    //   if(modalValues['brand'][i].brand_id === e.brand_id){
    //     alert('추가된 브랜드 입니다');
    //     return;
    //   }
    // }

    modalValues['brand'].push(e);
    console.log(modalValues['brand'])
    setModalValues({
      ...modalValues
    })
  }

  const handleDeleteItem = (index) => {
    // for(let i = 0; i < modalValues['brand'].length; i++){
    //   if(modalValues['brand'][i].brand_id === e.brand_id){
    //     modalValues['brand'].splice(i, 1);
    //     break;
    //   }
    // }
    modalValues['brand'].splice(index, 1);
    setModalValues({
      ...modalValues
    })
  }

  const handleChangeToggleButton = (e) => {
    setCustomToggle(e.target.checked);
  }

  const changeCustomInput = (e, target) => {
    const value = {...customInput};

    value[target] = e.target.checked;
    setCustomInput({
      ...value
    })
  }

  useEffect(() => {
    setEditData();
  },[])

  useEffect(() => {
    if(select1.current.selectedIndex === 0){
      select1.current.style.color = '#C0C7CE';
    }else {
      select1.current.style.color = 'black';
    }

    if(select2.current.selectedIndex === 0){
      select2.current.style.color = '#C0C7CE';
    }else {
      select2.current.style.color = 'black';
    }

    if(modalValues.nm_kr === ''){
      button.current.style.backgroundColor = '#F1F3F5';
      button.current.style.color = '#C0C7CE';
    }else {
      button.current.style.backgroundColor = '#228BE6';
      button.current.style.color = 'white';
    }
  },[modalValues])

    return (
    <div className="AccountRegistrationModal">
      <div className='modal' style={isModal ? {display: 'block'} : {display: 'none'}}>
        <div className='modal-bg'></div>
        <div className='modal-content-box'>
          <div className='modal-content'>

            <div className='modal-top-box'>
              <div className='modal-title'>거래처 정보</div>
              <img style={{cursor: 'pointer'}} src={x_button} onClick={closeModal} />
            </div>

            <div className='modal-middle-box'>
              <div className='toggle-box'>
                <div>입력 항목 선택</div>
                <ToggleButton handleChange={handleChangeToggleButton} />
              </div>

              <div className='modal-col'>
                <div className='modal-col-box'>
                  <div className='modal-col-box-title'>
                  <input className={`custom-check-box ${customToggle ? 'nonevisible' : ''}`} type='checkbox' />*거래처 명</div>
                  <div className={`modal-col-box-inner ${customToggle ? 'hidden' : ''}`}>
                    <InputBox 
                        _customToggle={customToggle}
                        _changeCustomInput={changeCustomInput}
                        _handleOnChange={handleOnChange} 
                        _customInput={customInput}
                        _modalValues={modalValues}
                        _target={'nm_kr'}
                      />
                  </div>
                </div>

                <div className='modal-col-box' style={{flexDirection: 'row', gap: '10px'}}>
                  <div className='modal-col-box'>
                    <div className='modal-col-box-title'>
                    <input className={`custom-check-box ${customToggle ? 'nonevisible' : ''}`} type='checkbox' />거래처 코드</div>
                    <div className={`modal-col-box-inner ${customToggle ? 'hidden' : ''}`}>
                      <InputBox 
                        _customToggle={customToggle}
                        _changeCustomInput={changeCustomInput}
                        _handleOnChange={handleOnChange} 
                        _customInput={customInput}
                        _modalValues={modalValues}
                        _target={'code'}
                      />
                    </div>
                    
                  </div>
                  <div className='modal-col-box'>
                    <div className='modal-col-box-title'>
                    <input className={`custom-check-box ${customToggle ? 'nonevisible' : ''}`} type='checkbox' />업종 분류</div>
                    <div className={`modal-col-box-inner ${customToggle ? 'hidden' : ''}`}>
                      <InputSelectBox 
                        _customToggle={customToggle}
                        _changeCustomInput={changeCustomInput}
                        _changeSelectBox={changeSelectBox} 
                        _customInput={customInput}
                        _modalValues={modalValues}
                        _target={'sector'}
                        _ref={select1}
                        _selectObject={{
                          disabled: '업종 선택',
                          list: sectors
                        }}
                      />
                    </div>
                  </div>

                </div>
              </div>

              <div className='modal-col'>
                <div className='modal-col-box'>
                  <div className='modal-col-box-title'>
                  <input className={`custom-check-box ${customToggle ? 'nonevisible' : ''}`} type='checkbox' />브랜드 명</div>
                  <div className={`modal-col-box-inner ${customToggle ? 'hidden' : ''}`}>
                    <div className={`check-box ${customToggle ? 'hidden' : ''}`}>
                      <input id='brand' onChange={e => changeCustomInput(e, 'brand')} defaultChecked={customInput['brand']} className='custom-check-box' type='checkbox' />
                      <label htmlFor='brand' className={`custom-check-box ${customToggle ? 'visible' : ''}`}></label>
                    </div>
                    <SelectBox 
                    placeholder='브랜드 명을 검색하세요' 
                    emptyTitle='매칭되는 브랜드가 없습니다' 
                    emptyButton='브랜드 등록하기'
                    inputText={brandInputText}
                    handleChange={handleChange}
                    searchList={brandList}
                    itemType={0}
                    customInputToggle={customToggle}
                    disabledBox={customInput['brand']}
                    addList={modalValues['brand']}
                    handleClickItem={handleClickItem}
                    handleDeleteItem={handleDeleteItem}
                    handleClickButton={moveTo} />
                  </div>
                </div>

              </div>

              <div className='modal-col'>
                <div className='modal-col-box'>
                  <div className='modal-col-box-title'>
                  <input className={`custom-check-box ${customToggle ? 'nonevisible' : ''}`} type='checkbox' />주소</div>
                  <div className={`modal-col-box-inner ${customToggle ? 'hidden' : ''}`}>
                    <InputBox 
                      _customToggle={customToggle}
                      _changeCustomInput={changeCustomInput}
                      _handleOnChange={handleOnChange} 
                      _customInput={customInput}
                      _modalValues={modalValues}
                      _target={'l_address'}
                    />
                  </div>
                  
                </div>
              </div>

              <div className='modal-col'>
                <div className='modal-col-box'>
                  <div className='modal-col-box-title'>
                  <input className={`custom-check-box  ${customToggle ? 'nonevisible' : ''}`} type='checkbox' />사업자 등록번호</div>
                  <div className={`modal-col-box-inner ${customToggle ? 'hidden' : ''}`}>
                    <InputBox 
                      _customToggle={customToggle}
                      _changeCustomInput={changeCustomInput}
                      _handleOnChange={handleOnChange} 
                      _customInput={customInput}
                      _modalValues={modalValues}
                      _target={'crn'}
                    />
                  </div>
                </div>

                <div className='modal-col-box'>
                  <div className='modal-col-box-title'>
                  <input className={`custom-check-box ${customToggle ? 'nonevisible' : ''}`} type='checkbox' />전화번호</div>
                  <div className={`modal-col-box-inner ${customToggle ? 'hidden' : ''}`}>
                    <InputBox 
                      _customToggle={customToggle}
                      _changeCustomInput={changeCustomInput}
                      _handleOnChange={handleOnChange} 
                      _customInput={customInput}
                      _modalValues={modalValues}
                      _target={'c_phone'}
                    />
                  </div>
                </div>
              </div>

              <div className='modal-col'>
                <div className='modal-col-box'>
                </div>

                <div className='modal-col-box'>
                  <div className='modal-col-box-title'>
                  <input className={`custom-check-box ${customToggle ? 'nonevisible' : ''}`} type='checkbox' />팩스 번호</div>
                  <div className={`modal-col-box-inner ${customToggle ? 'hidden' : ''}`}>
                    <InputBox 
                      _customToggle={customToggle}
                      _changeCustomInput={changeCustomInput}
                      _handleOnChange={handleOnChange} 
                      _customInput={customInput}
                      _modalValues={modalValues}
                      _target={'c_fax'}
                    />
                  </div>
                </div>
              </div>

              <div className='modal-col'>
                <div className='modal-col-box'>
                  <div className='modal-col-box-title'>
                  <input className={`custom-check-box ${customToggle ? 'nonevisible' : ''}`} type='checkbox' />지급 방식</div>
                  <div className={`modal-col-box-inner ${customToggle ? 'hidden' : ''}`}>
                    <InputSelectBox 
                        _customToggle={customToggle}
                        _changeCustomInput={changeCustomInput}
                        _changeSelectBox={changeSelectBox} 
                        _customInput={customInput}
                        _modalValues={modalValues}
                        _target={'pay_method'}
                        _selectObject={{
                          default: '계좌이체',
                          list: []
                        }}
                      />
                  </div>
                </div>

                <div className='modal-col-box'>
                  <div className='modal-col-box-title'>
                  <input className={`custom-check-box ${customToggle ? 'nonevisible' : ''}`} type='checkbox' />현 잔액</div>
                  <div className={`modal-col-box-inner ${customToggle ? 'hidden' : ''}`}>
                    <InputBox 
                      _customToggle={customToggle}
                      _changeCustomInput={changeCustomInput}
                      _handleOnChange={handleOnChange} 
                      _customInput={customInput}
                      _modalValues={modalValues}
                      _target={'c_account'}
                    />
                  </div>
                </div>
              </div>

              <div className='modal-col'>
                <div className='modal-col-box'>
                  <div className='modal-col-box-title'>
                  <input className={`custom-check-box ${customToggle ? 'nonevisible' : ''}`} type='checkbox' />입금 은행</div>
                    <div className={`modal-col-box-inner ${customToggle ? 'hidden' : ''}`}>
                      <InputSelectBox 
                        _customToggle={customToggle}
                        _changeCustomInput={changeCustomInput}
                        _changeSelectBox={changeSelectBox} 
                        _customInput={customInput}
                        _modalValues={modalValues}
                        _target={'bank_nm'}
                        _ref={select2}
                        _selectObject={{
                          disabled: '거래 은행을 선택해 주세요',
                          list: banks
                        }}
                      />
                  </div>
                </div>

                <div className='modal-col-box'>
                  <div className='modal-col-box-title'>
                  <input className={`custom-check-box ${customToggle ? 'nonevisible' : ''}`} type='checkbox' />계좌 번호</div>
                  <div className={`modal-col-box-inner ${customToggle ? 'hidden' : ''}`}>
                    <InputBox 
                      _customToggle={customToggle}
                      _changeCustomInput={changeCustomInput}
                      _handleOnChange={handleOnChange} 
                      _customInput={customInput}
                      _modalValues={modalValues}
                      _target={'bank_acc'}
                    />
                  </div>
                </div>
              </div>

              <div className='modal-col'>
                <div className='modal-col-box'>
                </div>

                <div className='modal-col-box'>
                  <div className='modal-col-box-title'>
                  <input className={`custom-check-box ${customToggle ? 'nonevisible' : ''}`} type='checkbox' />예금주</div>
                  <div className={`modal-col-box-inner ${customToggle ? 'hidden' : ''}`}>
                    <InputBox 
                      _customToggle={customToggle}
                      _changeCustomInput={changeCustomInput}
                      _handleOnChange={handleOnChange} 
                      _customInput={customInput}
                      _modalValues={modalValues}
                      _target={'bank_owner'}
                    />
                  </div>
                </div>
              </div>

              <div className='modal-col'>
                <div className='modal-col-box'>
                  <div className='modal-col-box-title'>
                  <input className={`custom-check-box ${customToggle ? 'nonevisible' : ''}`} type='checkbox' />대표자</div>
                  <div className={`modal-col-box-inner ${customToggle ? 'hidden' : ''}`}>
                    <InputBox 
                      _customToggle={customToggle}
                      _changeCustomInput={changeCustomInput}
                      _handleOnChange={handleOnChange} 
                      _customInput={customInput}
                      _modalValues={modalValues}
                      _target={'owener'}
                    />
                  </div>
                </div>

                <div className='modal-col-box'>
                  <div className='modal-col-box-title'>
                  <input className={`custom-check-box ${customToggle ? 'nonevisible' : ''}`} type='checkbox' />대표자 연락처</div>
                  <div className={`modal-col-box-inner ${customToggle ? 'hidden' : ''}`}>                    
                    <InputBox 
                      _customToggle={customToggle}
                      _changeCustomInput={changeCustomInput}
                      _handleOnChange={handleOnChange} 
                      _customInput={customInput}
                      _modalValues={modalValues}
                      _target={'owener_phone'}
                    />
                  </div>
                </div>
              </div>

              <div className='modal-col'>
                <div className='modal-col-box'>
                  <div className='modal-col-box-title'>
                  <input className={`custom-check-box ${customToggle ? 'nonevisible' : ''}`} type='checkbox' />담당자</div>
                  <div className={`modal-col-box-inner ${customToggle ? 'hidden' : ''}`}>
                    <InputBox 
                      _customToggle={customToggle}
                      _changeCustomInput={changeCustomInput}
                      _handleOnChange={handleOnChange} 
                      _customInput={customInput}
                      _modalValues={modalValues}
                      _target={'manager'}
                    />
                  </div>
                </div>

                <div className='modal-col-box'>
                  <div className='modal-col-box-title'>
                  <input className={`custom-check-box ${customToggle ? 'nonevisible' : ''}`} type='checkbox' />담당자 연락처</div>
                  <div className={`modal-col-box-inner ${customToggle ? 'hidden' : ''}`}>                    
                    <InputBox 
                      _customToggle={customToggle}
                      _changeCustomInput={changeCustomInput}
                      _handleOnChange={handleOnChange} 
                      _customInput={customInput}
                      _modalValues={modalValues}
                      _target={'manager_phone'}
                    />
                  </div>
                </div>
              </div>

              <div className='modal-col'>
                <div className='modal-col-box'>
                </div>

                <div className='modal-col-box'>
                  <div className='modal-col-box-title'>
                  <input className={`custom-check-box ${customToggle ? 'nonevisible' : ''}`} type='checkbox' />계산서 전화번호</div>
                  <div className={`modal-col-box-inner ${customToggle ? 'hidden' : ''}`}>
                    <InputBox 
                      _customToggle={customToggle}
                      _changeCustomInput={changeCustomInput}
                      _handleOnChange={handleOnChange} 
                      _customInput={customInput}
                      _modalValues={modalValues}
                      _target={'w_b_phone'}
                    />
                  </div>
                </div>
              </div>

              <div className='modal-col'>
                <div className='modal-col-box'>
                  <div className='modal-col-box-title'>
                  <input className={`custom-check-box ${customToggle ? 'nonevisible' : ''}`} type='checkbox' />비고</div>
                  <div className={`modal-col-box-inner ${customToggle ? 'hidden' : ''}`}>
                    <InputBox 
                      _customToggle={customToggle}
                      _changeCustomInput={changeCustomInput}
                      _handleOnChange={handleOnChange} 
                      _customInput={customInput}
                      _modalValues={modalValues}
                      _target={'etc'}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className='modal-bottom-box'>
              <div className='modal-button' ref={button} onClick={handleOnClickButton}>{
                setData === null ? '등록하기' : '수정하기'
              }</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
}

export default AccountRegistrationModal;

function InputBox({_customToggle, _changeCustomInput, _select, _handleOnChange, _customInput, _modalValues, _target}) {
  return (
    <>
      <div className={`check-box ${_customToggle ? 'hidden' : ''}`}>
        <input id={_target} onChange={e => _changeCustomInput(e, _target)} defaultChecked={_customInput[_target]} className='custom-check-box' type='checkbox' />
        <label htmlFor={_target} className={`custom-check-box ${_customToggle ? 'visible' : ''}`}></label>
      </div>
      <input disabled={!_customInput[_target]} className={`modal-col-box-input ${_customInput[_target] ? '' : 'hidden'}`} placeholder='입력' value={_modalValues[_target]} onChange={e => {
        _handleOnChange(e, _target);
      }}/>
    </>
  )
}

function InputSelectBox({_customToggle, _changeCustomInput, _selectObject, _ref = undefined, _changeSelectBox, _customInput, _modalValues, _target}) {
  return (
    <>
      <div className={`check-box ${_customToggle ? 'hidden' : ''}`}>
        <input id={_target} onChange={e => _changeCustomInput(e, _target)} defaultChecked={_customInput[_target]} className='custom-check-box' type='checkbox' />
        <label htmlFor={_target} className={`custom-check-box ${_customToggle ? 'visible' : ''}`}></label>
      </div>
      <select disabled={!_customInput[_target]} className={`modal-col-box-input box-select ${_customInput[_target] ? '' : 'hidden'}`} style={_selectObject.default ? {color: 'black'} : {}} ref={_ref} value={_modalValues[_target]} onChange={ e => {_changeSelectBox(e, _target)}}>
        {
          _selectObject.disabled ? <option value="" disabled>{_selectObject.disabled}</option> : <></>
        }
        {
          _selectObject.default ? <option defaultValue={_selectObject.default}>{_selectObject.default}</option> : <></>
        }
        {
          _selectObject.list.map((e, i) => (
            <option key={i} className='opt' value={e.value}>{e.name}</option>
          ))
        }
      </select>
    </>
  )
}

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