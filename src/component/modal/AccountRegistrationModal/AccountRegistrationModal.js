import '../modal.css';
import x_button from '../../../assets/images/x-icon-1.svg';
import { useEffect, useRef, useState } from 'react';
import SelectBox from '../../SelectBox/SelectBox';
import { Navigate, useNavigate } from 'react-router-dom';
import { api } from '../../../api/api';
import { useRecoilState } from 'recoil';
import { accountRegistrationModal, toastState } from '../../../recoil/status';
import ToggleButton from '../../ToggleButton/ToggleButton';

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
                    <div className={`check-box ${customToggle ? 'hidden' : ''}`}>
                      <input id='nm_kr' onChange={e => changeCustomInput(e, 'nm_kr')} defaultChecked={customInput['nm_kr']} className='custom-check-box' type='checkbox' />
                      <label htmlFor='nm_kr' className={`custom-check-box ${customToggle ? 'visible' : ''}`}></label>
                    </div>
                    <input className={`modal-col-box-input ${customInput['nm_kr'] ? '' : 'hidden'}`} placeholder='거래처 명을 입력하세요' value={modalValues['nm_kr']} onChange={e => {
                      handleOnChange(e, 'nm_kr');
                    }} />
                  </div>
                </div>

                <div className='modal-col-box' style={{flexDirection: 'row', gap: '10px'}}>
                  <div className='modal-col-box'>
                    <div className='modal-col-box-title'>
                    <input className={`custom-check-box ${customToggle ? 'nonevisible' : ''}`} type='checkbox' />거래처 코드</div>
                    <div className={`modal-col-box-inner ${customToggle ? 'hidden' : ''}`}>
                      <div className={`check-box ${customToggle ? 'hidden' : ''}`}>
                        <input id='code' onChange={e => changeCustomInput(e, 'code')} defaultChecked={customInput['code']} className='custom-check-box' type='checkbox' />
                        <label htmlFor='code' className={`custom-check-box ${customToggle ? 'visible' : ''}`}></label>
                      </div>
                      <input className={`modal-col-box-input ${customInput['code'] ? '' : 'hidden'}`} value={modalValues['code']} onChange={e => {
                        handleOnChange(e, 'code');
                      }} />
                    </div>
                    
                  </div>
                  <div className='modal-col-box'>
                    <div className='modal-col-box-title'>
                    <input className={`custom-check-box ${customToggle ? 'nonevisible' : ''}`} type='checkbox' />업종 분류</div>
                    <div className={`modal-col-box-inner ${customToggle ? 'hidden' : ''}`}>
                      <div className={`check-box ${customToggle ? 'hidden' : ''}`}>
                        <input id='sector' onChange={e => changeCustomInput(e, 'sector')} defaultChecked={customInput['sector']} className='custom-check-box' type='checkbox' />
                        <label htmlFor='sector' className={`custom-check-box ${customToggle ? 'visible' : ''}`}></label>
                      </div>
                      <select className={`modal-col-box-input box-select ${customInput['sector'] ? '' : 'hidden'}`} ref={select1} value={modalValues['sector']} onChange={e => {changeSelectBox(e, 'sector')}}>
                      <option value="" disabled>업종 선택</option>
                        {
                          sectors.map((e, i) => (
                            <option key={i} className='opt' value={e.value}>{e.name}</option>
                          ))
                        }
                      </select>
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
                    <div className={`check-box ${customToggle ? 'hidden' : ''}`}>
                      <input id='l_address' onChange={e => changeCustomInput(e, 'l_address')} defaultChecked={customInput['l_address']} className='custom-check-box' type='checkbox' />
                      <label htmlFor='l_address' className={`custom-check-box ${customToggle ? 'visible' : ''}`}></label>
                    </div>
                    <input className={`modal-col-box-input ${customInput['l_address'] ? '' : 'hidden'}`} placeholder='입력' value={modalValues['l_address']} onChange={e => {
                      handleOnChange(e, 'l_address');
                    }}/>
                  </div>
                  
                </div>
              </div>

              <div className='modal-col'>
                <div className='modal-col-box'>
                  <div className='modal-col-box-title'>
                  <input className={`custom-check-box  ${customToggle ? 'nonevisible' : ''}`} type='checkbox' />사업자 등록번호</div>
                  <div className={`modal-col-box-inner ${customToggle ? 'hidden' : ''}`}>
                    <div className={`check-box ${customToggle ? 'hidden' : ''}`}>
                      <input id='crn' onChange={e => changeCustomInput(e, 'crn')} defaultChecked={customInput['crn']} className='custom-check-box' type='checkbox' />
                      <label htmlFor='crn' className={`custom-check-box ${customToggle ? 'visible' : ''}`}></label>
                    </div>
                    <input className={`modal-col-box-input ${customInput['crn'] ? '' : 'hidden'}`} placeholder='입력' maxLength='12' value={modalValues['crn']} onChange={e => {
                      handleOnChange(e, 'crn');
                    }}/>
                  </div>
                </div>

                <div className='modal-col-box'>
                  <div className='modal-col-box-title'>
                  <input className={`custom-check-box ${customToggle ? 'nonevisible' : ''}`} type='checkbox' />전화번호</div>
                  <div className={`modal-col-box-inner ${customToggle ? 'hidden' : ''}`}>
                    <div className={`check-box ${customToggle ? 'hidden' : ''}`}>
                      <input id='c_phone' onChange={e => changeCustomInput(e, 'c_phone')} defaultChecked={customInput['c_phone']} className='custom-check-box' type='checkbox' />
                      <label htmlFor='c_phone' className={`custom-check-box ${customToggle ? 'visible' : ''}`}></label>
                    </div>
                    <input className={`modal-col-box-input ${customInput['c_phone'] ? '' : 'hidden'}`} placeholder='숫자만 입력해주세요' value={modalValues['c_phone']} onChange={e => {
                      handleOnChange(e, 'c_phone');
                    }}/>
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
                    <div className={`check-box ${customToggle ? 'hidden' : ''}`}>
                      <input id='c_fax' onChange={e => changeCustomInput(e, 'c_fax')} defaultChecked={customInput['c_fax']} className='custom-check-box' type='checkbox' />
                      <label htmlFor='c_fax' className={`custom-check-box ${customToggle ? 'visible' : ''}`}></label>
                    </div>
                    <input className={`modal-col-box-input ${customInput['c_fax'] ? '' : 'hidden'}`} placeholder='숫자만 입력해주세요' value={modalValues['c_fax']} onChange={e => {
                      handleOnChange(e, 'c_fax');
                    }}/>
                  </div>
                </div>
              </div>

              <div className='modal-col'>
                <div className='modal-col-box'>
                  <div className='modal-col-box-title'>
                  <input className={`custom-check-box ${customToggle ? 'nonevisible' : ''}`} type='checkbox' />지급 방식</div>
                  <div className={`modal-col-box-inner ${customToggle ? 'hidden' : ''}`}>
                    <div className={`check-box ${customToggle ? 'hidden' : ''}`}>
                      <input id='pay_method' onChange={e => changeCustomInput(e, 'pay_method')} defaultChecked={customInput['pay_method']} className='custom-check-box' type='checkbox' />
                      <label htmlFor='pay_method' className={`custom-check-box ${customToggle ? 'visible' : ''}`}></label>
                    </div>
                    <select className={`modal-col-box-input ${customInput['pay_method'] ? '' : 'hidden'}`} style={{color: 'black'}} value={modalValues['pay_method']} onChange={e => {changeSelectBox(e, 'pay_method')}}>
                      <option defaultValue="계좌이체">계좌이체</option>
                    </select>
                  </div>
                </div>

                <div className='modal-col-box'>
                  <div className='modal-col-box-title'>
                  <input className={`custom-check-box ${customToggle ? 'nonevisible' : ''}`} type='checkbox' />현 잔액</div>
                  <div className={`modal-col-box-inner ${customToggle ? 'hidden' : ''}`}>
                    <div className={`check-box ${customToggle ? 'hidden' : ''}`}>
                      <input id='c_account' onChange={e => changeCustomInput(e, 'c_account')} defaultChecked={customInput['c_account']} className='custom-check-box' type='checkbox' />
                      <label htmlFor='c_account' className={`custom-check-box ${customToggle ? 'visible' : ''}`}></label>
                    </div>
                    <input className={`modal-col-box-input ${customInput['c_account'] ? '' : 'hidden'}`} placeholder='숫자만 입력해 주세요' value={modalValues['c_account']} onChange={e => {
                      handleOnChange(e, 'c_account');
                    }}/>
                  </div>
                </div>
              </div>

              <div className='modal-col'>
                <div className='modal-col-box'>
                  <div className='modal-col-box-title'>
                  <input className={`custom-check-box ${customToggle ? 'nonevisible' : ''}`} type='checkbox' />입금 은행</div>
                    <div className={`modal-col-box-inner ${customToggle ? 'hidden' : ''}`}>
                      
                      <div className={`check-box ${customToggle ? 'hidden' : ''}`}>
                        <input id='bank_nm' onChange={e => changeCustomInput(e, 'bank_nm')} defaultChecked={customInput['bank_nm']} className='custom-check-box' type='checkbox' />
                        <label htmlFor='bank_nm' className={`custom-check-box ${customToggle ? 'visible' : ''}`}></label>
                      </div>
                      <select className={`modal-col-box-input box-select ${customInput['c_account'] ? '' : 'hidden'}`} ref={select2} value={modalValues['bank_nm']} onChange={ e => {changeSelectBox(e, 'bank_nm')}}>
                        <option value="" disabled>거래 은행을 선택해 주세요</option>
                          {
                            banks.map((e, i) => (
                              <option key={i} className='opt' value={e.value}>{e.name}</option>
                            ))
                          }
                      </select>
                  </div>
                </div>

                <div className='modal-col-box'>
                  <div className='modal-col-box-title'>
                  <input className={`custom-check-box ${customToggle ? 'nonevisible' : ''}`} type='checkbox' />계좌 번호</div>
                  <div className={`modal-col-box-inner ${customToggle ? 'hidden' : ''}`}>
                    <div className={`check-box ${customToggle ? 'hidden' : ''}`}>
                      <input id='bank_acc' onChange={e => changeCustomInput(e, 'bank_acc')} defaultChecked={customInput['bank_acc']} className='custom-check-box' type='checkbox' />
                      <label htmlFor='bank_acc' className={`custom-check-box ${customToggle ? 'visible' : ''}`}></label>
                    </div>
                    <input className={`modal-col-box-input ${customInput['bank_acc'] ? '' : 'hidden'}`} placeholder='숫자만 입력해 주세요' value={modalValues['bank_acc']} onChange={e => {
                      handleOnChange(e, 'bank_acc');
                    }}/>
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
                    <div className={`check-box ${customToggle ? 'hidden' : ''}`}>
                      <input id='bank_owner' onChange={e => changeCustomInput(e, 'bank_owner')} defaultChecked={customInput['bank_owner']} className='custom-check-box' type='checkbox' />
                      <label htmlFor='bank_owner' className={`custom-check-box ${customToggle ? 'visible' : ''}`}></label>
                    </div>
                    <input className={`modal-col-box-input ${customInput['bank_owner'] ? '' : 'hidden'}`} placeholder='입력' value={modalValues['bank_owner']} onChange={e => {
                      handleOnChange(e, 'bank_owner');
                    }}/>
                  </div>
                </div>
              </div>

              <div className='modal-col'>
                <div className='modal-col-box'>
                  <div className='modal-col-box-title'>
                  <input className={`custom-check-box ${customToggle ? 'nonevisible' : ''}`} type='checkbox' />대표자</div>
                  <div className={`modal-col-box-inner ${customToggle ? 'hidden' : ''}`}>
                    
                    <div className={`check-box ${customToggle ? 'hidden' : ''}`}>
                      <input id='owener' onChange={e => changeCustomInput(e, 'owener')} defaultChecked={customInput['owener']} className='custom-check-box' type='checkbox' />
                      <label htmlFor='owener' className={`custom-check-box ${customToggle ? 'visible' : ''}`}></label>
                    </div>
                    <input className={`modal-col-box-input ${customInput['owener'] ? '' : 'hidden'}`} placeholder='입력' value={modalValues['owener']} onChange={e => {
                      handleOnChange(e, 'owener');
                    }}/>
                  </div>
                </div>

                <div className='modal-col-box'>
                  <div className='modal-col-box-title'>
                  <input className={`custom-check-box ${customToggle ? 'nonevisible' : ''}`} type='checkbox' />대표자 연락처</div>
                  <div className={`modal-col-box-inner ${customToggle ? 'hidden' : ''}`}>                    
                    <div className={`check-box ${customToggle ? 'hidden' : ''}`}>
                      <input id='owener_phone' onChange={e => changeCustomInput(e, 'owener_phone')} defaultChecked={customInput['owener_phone']} className='custom-check-box' type='checkbox' />
                      <label htmlFor='owener_phone' className={`custom-check-box ${customToggle ? 'visible' : ''}`}></label>
                    </div>
                    <input className={`modal-col-box-input ${customInput['owener_phone'] ? '' : 'hidden'}`} placeholder='숫자만 입력해주세요' value={modalValues['owener_phone']} onChange={e => {
                      handleOnChange(e, 'owener_phone');
                    }}/>
                  </div>
                </div>
              </div>

              <div className='modal-col'>
                <div className='modal-col-box'>
                  <div className='modal-col-box-title'>
                  <input className={`custom-check-box ${customToggle ? 'nonevisible' : ''}`} type='checkbox' />담당자</div>
                  <div className={`modal-col-box-inner ${customToggle ? 'hidden' : ''}`}>
                    <div className={`check-box ${customToggle ? 'hidden' : ''}`}>
                      <input id='manager' onChange={e => changeCustomInput(e, 'manager')} defaultChecked={customInput['manager']} className='custom-check-box' type='checkbox' />
                      <label htmlFor='manager' className={`custom-check-box ${customToggle ? 'visible' : ''}`}></label>
                    </div>
                    <input className={`modal-col-box-input ${customInput['manager'] ? '' : 'hidden'}`} placeholder='입력' value={modalValues['manager']} onChange={e => {
                      handleOnChange(e, 'manager');
                    }}/>
                  </div>
                </div>

                <div className='modal-col-box'>
                  <div className='modal-col-box-title'>
                  <input className={`custom-check-box ${customToggle ? 'nonevisible' : ''}`} type='checkbox' />담당자 연락처</div>
                  <div className={`modal-col-box-inner ${customToggle ? 'hidden' : ''}`}>                    
                    <div className={`check-box ${customToggle ? 'hidden' : ''}`}>
                      <input id='manager_phone' onChange={e => changeCustomInput(e, 'manager_phone')} defaultChecked={customInput['manager_phone']} className='custom-check-box' type='checkbox' />
                      <label htmlFor='manager_phone' className={`custom-check-box ${customToggle ? 'visible' : ''}`}></label>
                    </div>
                    <input className={`modal-col-box-input ${customInput['manager_phone'] ? '' : 'hidden'}`} placeholder='숫자만 입력해주세요' value={modalValues['manager_phone']} onChange={e => {
                      handleOnChange(e, 'manager_phone');
                    }}/>
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
                    <div className={`check-box ${customToggle ? 'hidden' : ''}`}>
                      <input id='w_b_phone' onChange={e => changeCustomInput(e, 'w_b_phone')} defaultChecked={customInput['w_b_phone']} className='custom-check-box' type='checkbox' />
                      <label htmlFor='w_b_phone' className={`custom-check-box ${customToggle ? 'visible' : ''}`}></label>
                    </div>
                    <input className={`modal-col-box-input ${customInput['w_b_phone'] ? '' : 'hidden'}`} placeholder='숫자만 입력해주세요' value={modalValues['w_b_phone']} onChange={e => {
                      handleOnChange(e, 'w_b_phone');
                    }}/>
                  </div>
                </div>
              </div>

              <div className='modal-col'>
                <div className='modal-col-box'>
                  <div className='modal-col-box-title'>
                  <input className={`custom-check-box ${customToggle ? 'nonevisible' : ''}`} type='checkbox' />비고</div>
                  <div className={`modal-col-box-inner ${customToggle ? 'hidden' : ''}`}>
                    <div className={`check-box ${customToggle ? 'hidden' : ''}`}>
                      <input id='etc' onChange={e => changeCustomInput(e, 'etc')} defaultChecked={customInput['etc']} className='custom-check-box' type='checkbox' />
                      <label htmlFor='etc' className={`custom-check-box ${customToggle ? 'visible' : ''}`}></label>
                    </div>
                    <input className={`modal-col-box-input ${customInput['etc'] ? '' : 'hidden'}`} placeholder='입력' value={modalValues['etc']} onChange={e => {
                      handleOnChange(e, 'etc');
                    }}/>
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