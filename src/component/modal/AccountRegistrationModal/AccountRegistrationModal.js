import '../modal.css';
import x_button from '../../../assets/images/x-icon-1.svg';
import { useEffect, useState } from 'react';
import SelectBox from '../../SelectBox/SelectBox';
import { Navigate, useNavigate } from 'react-router-dom';
import { api } from '../../../api/api';

function AccountRegistrationModal({isModal, closeModal, addAccount, editAccount, setData}) {
  const navigate = useNavigate();

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

    const handleOnClickButton = () => {
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
      console.log(e.target.value);
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
      navigate('/brands?modal=open');
    }

    const getList = (text = '', id) => {
      api.post(api.get_brand_list, {
          "search_text" : text, //검색어
          "categorys" : [], //카테고리
          "orders" : ["nm_kr"], //오름차순- 내림차순 소팅 (컬럼명 적재 시 내림차순 적용)
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
    
    const account = await api.post(api.get_account, {
        "use_yn": "Y",
        "size":10, 
        "number":0, 
        "id": setData.id

    })

    const accountBrandList = account.data.data.content[0].brand;

    let brList = [];

    for(let i = 0; i < accountBrandList.length; i++){
      const brand = await api.post(api.get_brand, {
        "use_yn":"Y",
        "size":10, 
        "number":0,
        "id": accountBrandList[i].brand_id
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

    // const brands = await Promise.all(accountBrandList.map( e=>
    //    api.post(api.get_brand, {
    //     "use_yn":"Y",
    //     "size":10, 
    //     "number":0,
    //     "id": accountBrandList[i].brand_id
    //   })
    // ))

    console.log(brList);
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

  useEffect(() => {
    setEditData();
  },[])

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

              <div className='modal-col'>
                <div className='modal-col-box'>
                  <div className='modal-col-box-title'>*거래처 명</div>
                  <input className='modal-col-box-input' placeholder='거래처 명을 입력하세요' value={modalValues['nm_kr']} onChange={e => {
                    handleOnChange(e, 'nm_kr');
                  }}/>
                </div>

                <div className='modal-col-box' style={{flexDirection: 'row', gap: '10px'}}>
                  <div className='modal-col-box'>
                    <div className='modal-col-box-title'>거래처 코드</div>
                    <input className='modal-col-box-input' value={modalValues['code']} onChange={e => {
                    handleOnChange(e, 'code');
                  }} />
                  </div>
                  <div className='modal-col-box'>
                    <div className='modal-col-box-title'>업종 분류</div>
                    <select className='modal-col-box-input box-select' value={modalValues['sector']} onChange={e => {changeSelectBox(e, 'sector')}}>
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

              <div className='modal-col'>
                <div className='modal-col-box'>
                  <div className='modal-col-box-title'>브랜드 명</div>
                  <SelectBox 
                    placeholder='브랜드 명을 검색하세요' 
                    emptyTitle='매칭되는 브랜드가 없습니다' 
                    emptyButton='브랜드 등록하기'
                    inputText={brandInputText}
                    handleChange={handleChange}
                    searchList={brandList}
                    addList={modalValues['brand']}
                    handleClickItem={handleClickItem}
                    handleDeleteItem={handleDeleteItem}
                    handleClickButton={moveTo} />
                </div>

              </div>

              <div className='modal-col'>
                <div className='modal-col-box'>
                  <div className='modal-col-box-title'>주소</div>
                  <input className='modal-col-box-input' placeholder='입력' value={modalValues['l_address']} onChange={e => {
                    handleOnChange(e, 'l_address');
                  }}/>
                </div>
              </div>

              <div className='modal-col'>
                <div className='modal-col-box'>
                  <div className='modal-col-box-title'>사업자 등록번호</div>
                  <input className='modal-col-box-input' placeholder='입력' maxLength='12' value={modalValues['crn']} onChange={e => {
                    handleOnChange(e, 'crn');
                  }}/>
                </div>

                <div className='modal-col-box'>
                  <div className='modal-col-box-title'>전화번호</div>
                  <input className='modal-col-box-input' placeholder='숫자만 입력해주세요' value={modalValues['c_phone']} onChange={e => {
                    handleOnChange(e, 'c_phone');
                  }}/>
                </div>
              </div>

              <div className='modal-col'>
                <div className='modal-col-box'>
                </div>

                <div className='modal-col-box'>
                  <div className='modal-col-box-title'>팩스 번호</div>
                  <input className='modal-col-box-input' placeholder='숫자만 입력해주세요' value={modalValues['c_fax']} onChange={e => {
                    handleOnChange(e, 'c_fax');
                  }}/>
                </div>
              </div>

              <div className='modal-col'>
                <div className='modal-col-box'>
                  <div className='modal-col-box-title'>지급 방식</div>
                  <select className='modal-col-box-input' style={{color: 'black'}} value={modalValues['pay_method']} onChange={e => {changeSelectBox(e, 'pay_method')}}>
                    <option defaultValue="계좌이체">계좌이체</option>
                  </select>
                </div>

                <div className='modal-col-box'>
                  <div className='modal-col-box-title'>현 잔액</div>
                  <input className='modal-col-box-input' placeholder='숫자만 입력해 주세요' value={modalValues['c_account']} onChange={e => {
                    handleOnChange(e, 'c_account');
                  }}/>
                </div>
              </div>

              <div className='modal-col'>
                <div className='modal-col-box'>
                  <div className='modal-col-box-title'>입금 은행</div>
                    <select className='modal-col-box-input box-select' value={modalValues['bank_nm']} onChange={ e => {changeSelectBox(e, 'bank_nm')}}>
                    <option value="" disabled>거래 은행을 선택해 주세요</option>
                      {
                        banks.map((e, i) => (
                          <option key={i} className='opt' value={e.value}>{e.name}</option>
                        ))
                      }
                  </select>
                </div>

                <div className='modal-col-box'>
                  <div className='modal-col-box-title'>계좌 번호</div>
                  <input className='modal-col-box-input' placeholder='숫자만 입력해 주세요' value={modalValues['bank_acc']} onChange={e => {
                    handleOnChange(e, 'bank_acc');
                  }}/>
                </div>
              </div>

              <div className='modal-col'>
                <div className='modal-col-box'>
                </div>

                <div className='modal-col-box'>
                  <div className='modal-col-box-title'>예금주</div>
                  <input className='modal-col-box-input' placeholder='입력' value={modalValues['bank_owner']} onChange={e => {
                    handleOnChange(e, 'bank_owner');
                  }}/>
                </div>
              </div>

              <div className='modal-col'>
                <div className='modal-col-box'>
                  <div className='modal-col-box-title'>대표자</div>
                  <input className='modal-col-box-input' placeholder='입력' value={modalValues['owener']} onChange={e => {
                    handleOnChange(e, 'owener');
                  }}/>
                </div>

                <div className='modal-col-box'>
                  <div className='modal-col-box-title'>대표자 연락처</div>
                  <input className='modal-col-box-input' placeholder='숫자만 입력해주세요' value={modalValues['owener_phone']} onChange={e => {
                    handleOnChange(e, 'owener_phone');
                  }}/>
                </div>
              </div>

              <div className='modal-col'>
                <div className='modal-col-box'>
                  <div className='modal-col-box-title'>담당자</div>
                  <input className='modal-col-box-input' placeholder='입력' value={modalValues['manager']} onChange={e => {
                    handleOnChange(e, 'manager');
                  }}/>
                </div>

                <div className='modal-col-box'>
                  <div className='modal-col-box-title'>담당자 연락처</div>
                  <input className='modal-col-box-input' placeholder='숫자만 입력해주세요' value={modalValues['manager_phone']} onChange={e => {
                    handleOnChange(e, 'manager_phone');
                  }}/>
                </div>
              </div>

              <div className='modal-col'>
                <div className='modal-col-box'>
                </div>

                <div className='modal-col-box'>
                  <div className='modal-col-box-title'>계산서 전화번호</div>
                  <input className='modal-col-box-input' placeholder='숫자만 입력해주세요' value={modalValues['w_b_phone']} onChange={e => {
                    handleOnChange(e, 'w_b_phone');
                  }}/>
                </div>
              </div>

              <div className='modal-col'>
                <div className='modal-col-box'>
                  <div className='modal-col-box-title'>비고</div>
                  <input className='modal-col-box-input' placeholder='입력' value={modalValues['etc']} onChange={e => {
                    handleOnChange(e, 'etc');
                  }}/>
                </div>
              </div>
            </div>

            <div className='modal-bottom-box'>
              <div className='modal-button' onClick={handleOnClickButton}>등록하기</div>
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