import '../modal.css';
import x_button from '../../../assets/images/x-icon-1.svg';
import { useEffect, useRef, useState } from 'react';
import SelectBox from '../../SelectBox/SelectBox';
import { useRecoilState } from 'recoil';
import { toastState } from '../../../recoil/status';
import { useNavigate } from 'react-router-dom';
import { api } from '../../../api/api';
import UploadImage from '../../UploadImage/UploadImage';

function BrandRegistrationModal({isModal, closeModal, addBrand, editBrand, setData}) {
  const [toast, setToast] = useRecoilState(toastState);
  const navigate = useNavigate();

  const [modalValues, setModalValues] = useState({
      nm_kr: "",
      group_nm: "",
      product_c_id : 28,
      code : "",
      crn : "",
      brandImage: "", //"base64"
      descript: "",
      showOrder: 1, //1
      etc: "",
      vendor: [], // [23,24]
      categorys: [], //[15,16,17],

      use_yn: "Y"
    })

  const [accountList, setAccountList] = useState([]);
  const [accountInputText, setAccountInputText] = useState('');

  const [categoryList, setCategoryList] = useState([]);
  const [categoryInputText, setCategoryInputText] = useState('');

  const [customCategoryList, setCustomCategoryList] = useState([]);

  const button = useRef(null);

  const getBrandList = (categoryText) => {
    api.post(api.get_brand_list, {
      "search_text" : '', //검색어
      "categorys" : [categoryText],
      "orders" : ["reg_dt_str"],

      "size": 10,
      "number": 0,
      "use_yn":"Y"
    })
    .then(res => {
      const _brandList = res.data.data.content;

      let _arr = [];

      for(let i = 0; i < _brandList.length; i++){
        const _categoryList = _brandList[i].categorys.split(',');

        for(let j = 0; j < _categoryList.length; j++){
          if(_categoryList[j].includes(categoryText)){
            _arr.push(_categoryList[j]);
          }
        }
      }

      const uniqueArr = _arr.filter((element, index) => {
        return _arr.indexOf(element) === index;
      });

      if(_brandList.length === 0){
        setCategoryList([]);
      }else{
        const _list = uniqueArr.map(e => ({
          name: e,
          checked: false
        }))

        for(let i = 0; i < _list.length; i++){
          for(let j = 0; j < modalValues['categorys'].length; j++){
            if(_list.name === modalValues['categorys'].name){
              _list.checked = true;
            }
          }
        }
        console.log(modalValues['categorys'], categoryList);
        setCategoryList(_list);
      }

    }).catch(e => {
      alert('네트워크 에러')
      console.log(e)
    })
  }

  const handleOnClickButton = () => {
    if(modalValues.nm_kr === ''){
      setToast({
        visible: true,
        type: 'error',
        text: '필수 입력 항목을 입력해주세요. (* 표시)'
      });

      return;
    }

    if(modalValues.vendor.length === 0){
      setToast({
        visible: true,
        type: 'error',
        text: '필수 입력 항목을 입력해주세요. (* 표시)'
      });

      return;
    }

    if(setData === null) {
      addBrand(modalValues);
    }else{
      editBrand(modalValues);
    }
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
    navigate('/accounts');
  }

  const getAccountList = (text = '', id) => {
    api.post(api.get_account_list, {
        search_text : text, //검색어
        columns : ['nm_kr'], //카테고리
        orders : ["reg_dt_str"], //오름차순- 내림차순 소팅 (컬럼명 적재 시 내림차순 적용)
                    // 브랜드 그룹 group_nm, 브랜드 명 nm_kr, 브랜드 코드 code, 거래처 코드 vendor_code, 거래처명 vendor_nm, 상품 카테고리 categorys
                    // 제품유형 type, 등록일자 reg_dt_str
    
        size: 10, //페이징 처리시 사이즈 크기
        number: 0, // 페이징 인덱스(최초 0)
        use_yn: "Y",

        id: id
    })
    .then(res=>{
      setAccountList(res.data.data.content)
    })
    .catch(e=>{
        console.log(e)
    })
  }

  const getCategoryList = async (list) => {
    const _categoryList = (await api.post(api.get_brand_category_list, {})).data.data;

    const arr = _categoryList.map(e => ({
      name: e,
      checked: false
    }));

    return arr;
  }

  const handleRegistryCategory = async (name) => {
    setCategoryInputText('');

    customCategoryList.push({
      name: name,
      checked: false
    })

    setCustomCategoryList(customCategoryList)

    const _categoryList = await getCategoryList();
    
    const __categoryList = _categoryList.map(e => {
      for(let i = 0; i < setData['categorys'].length; i++){
        if(setData['categorys'][i] === e.name){
          return {
            ...e,
            checked: true
          }
        }
      }

      return {
        ...e,
        checked: false
      }
    })

    setCategoryList([...__categoryList, ...customCategoryList]);
  } 

  const setEditData = async () => {
    if(setData === null){
      const _categoryList = await getCategoryList();
      setCategoryList([..._categoryList, ...customCategoryList]);
      return;
    }

    const brandAccountList = setData.vendor;

    let acList = [];

    for(let i = 0; i < brandAccountList.length; i++){
      const account = await api.post(api.get_account, {
        "use_yn": "Y",
        "size": 10, 
        "number": 0,
        "id": brandAccountList[i].brand_id
      })

      if(account.data.data.content[0] === undefined){
        acList.push({
          nm_kr: '미확인',
          id: brandAccountList[i].brand_id
        })
      }else{
        acList.push(account.data.data.content[0])
      }
    }

    console.log(acList);
    console.log(setData)

    const _categoryList = await getCategoryList();
    
    const __categoryList = _categoryList.map(e => {
      for(let i = 0; i < setData['categorys'].length; i++){
        if(setData['categorys'][i] === e.name){
          return {
            ...e,
            checked: true
          }
        }
      }

      return {
        ...e,
        checked: false
      }
    })

    setCategoryList([...__categoryList, ...customCategoryList]);

    setModalValues({
      ...setData,
      categorys: setData['categorys'].map(e => {
        return {
          name: e,
          checked: false
        }
      }),
      vendor: acList
    });
  }

  const setBase64 = (base64) => {
    setModalValues({
      ...modalValues,
      brandImage: base64
    });
  }

  const handleChange = async (e, selectType) => {

    switch(selectType){
      case 'vendor':
        setAccountInputText(e.target.value)
        if(e.target.value === ''){
          setAccountList([]);
        }else{
          getAccountList(e.target.value);
        }
        break;
      case 'categorys':
        setCategoryInputText(e.target.value)
        if(e.target.value === ''){
          const _categoryList = await getCategoryList();
   
          const __categoryList = _categoryList.map(e => {
            for(let i = 0; i < modalValues['categorys'].length; i++){
              if(modalValues['categorys'][i].name === e.name){
                return {
                  ...e,
                  checked: true
                }
              }
            }
      
            return {
              ...e,
              checked: false
            }
          })
      
          setCategoryList([...__categoryList, ...customCategoryList]);

        }else{
          getBrandList(e.target.value);
        }
        break;  
      default:
        break; 
    }
  }

  const handleClickItem = (e, selectType = null) => {
    switch(selectType){
      case 'vendor':
        if(modalValues['vendor'].length > 0){
          return;
        }


        modalValues['vendor'].push(e);
        setModalValues({
          ...modalValues
        })
        break;
      case 'categorys':
        for(let i = 0; i < modalValues['categorys'].length; i++){
          if(modalValues['categorys'][i].name === e.name){
            return;
          }
        }

        for(let j = 0; j < categoryList.length; j++){
          if(categoryList[j].name === e.name){
            categoryList[j].checked = true;
          }
        }

        modalValues['categorys'].push(e);

        setCategoryList([...categoryList, ...customCategoryList]);

        setModalValues({
          ...modalValues
        })

        break;  
      default:
        break; 
    }
  }

  const handleDeleteItem = (index, selectType = null) => {
    switch(selectType){
      case 'vendor':
        modalValues[selectType].splice(index, 1);
        setModalValues({
          ...modalValues
        })
        break;
      case 'categorys':
        modalValues[selectType].splice(index, 1);

        const _categoryList = categoryList.map(e => {
          for(let i = 0; i < modalValues[selectType].length; i++){
            if(modalValues[selectType][i].name === e.name){
              return {
                ...e,
                checked: true
              }
            }
          }
    
          return {
            ...e,
            checked: false
          }
        })
    
        setCategoryList([..._categoryList, ...customCategoryList]);

        setModalValues({
          ...modalValues
        })
        break;  
      default:
        break; 
    }
  }

  useEffect(() => {
    setEditData();
  },[])

  useEffect(() => {
    if(modalValues.vendor.length === 0){
      button.current.style.backgroundColor = '#F1F3F5';
      button.current.style.color = '#C0C7CE';
      return;
    }else {
      button.current.style.backgroundColor = '#228BE6';
      button.current.style.color = 'white';
    }

    if(modalValues.nm_kr === ''){
      button.current.style.backgroundColor = '#F1F3F5';
      button.current.style.color = '#C0C7CE';
      return;
    }else {
      button.current.style.backgroundColor = '#228BE6';
      button.current.style.color = 'white';
    }
  },[modalValues])

    return (
    <div className="BrandRegistrationModal">
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
                  <SelectBox 
                    placeholder='거래처를 검색해주세요' 
                    emptyTitle='매칭되는 거래처가 없습니다' 
                    emptyButton='거래처 등록하기'
                    inputText={accountInputText}
                    handleChange={handleChange}
                    searchList={accountList}
                    selectType='vendor'
                    itemType={0}
                    addList={modalValues['vendor']}
                    handleClickItem={handleClickItem}
                    handleDeleteItem={handleDeleteItem}
                    handleClickButton={moveTo} />
                </div>
              </div>

              <div className='modal-col'>
                <div className='modal-col-box'>
                  <div className='modal-col-box-title'>사업자 등록번호</div>
                  <input className='modal-col-box-input' placeholder='숫자만 입력해주세요' maxLength='12'  value={modalValues['crn']} onChange={e => {
                    handleOnChange(e, 'crn');
                  }}/>
                </div>

                <div className='modal-col-box'>
                  <div className='modal-col-box-title'>&nbsp;</div>
                  <UploadImage base64={modalValues['brandImage']} leftBox={false} setBase64={setBase64} />
                </div>
              </div>

              <div className='modal-col'>
                <div className='modal-col-box'>
                  <div className='modal-col-box-title'>브랜드 카테고리</div>
                  <SelectBox 
                    placeholder='상품 카테고리를 선택해주세요.' 
                    emptyTitle='매칭되는 카테고리가 없습니다' 
                    emptyButton='거래처 등록하기'
                    inputText={categoryInputText}
                    handleChange={handleChange}
                    searchList={categoryList}
                    selectType='categorys'
                    itemType={1}
                    addList={modalValues['categorys']}
                    handleClickItem={handleClickItem}
                    handleDeleteItem={handleDeleteItem}
                    handleRegistryCategory={handleRegistryCategory}
                    handleClickButton={moveTo} />
                </div>
              </div>

            </div>

            <div className='modal-bottom-box'>
              <div className='modal-button' ref={button} onClick={handleOnClickButton}>
              {
                setData === null ? '등록하기' : '수정하기'
              }</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
}

export default BrandRegistrationModal;

const categories = [
  {name: '선택안함', value: '선택안함'},
  {name: '공급', value: '공급'},
  {name: 'PB', value: 'PB'},
]