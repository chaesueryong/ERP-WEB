import '../modal.css';
import x_button from '../../../assets/images/x-icon-1.svg';
import { useState } from 'react';
import SelectBox from '../../SelectBox/SelectBox';
import { useNavigate } from 'react-router-dom';
import UploadImage from '../../UploadImage/UploadImage';

function ProductRegistrationModal({isModal, closeModal, addAccount}) {
  const navigate = useNavigate();

  const [modalValues, setModalValues] = useState({
      nm_kr: "", // 거래처명
      code: "",  // 거래처 코드
      sector: "", // 업종

      brand: [], //옵션
      vendor: [],

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
      brandImage: '',

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

    const [accountInputText, setAccountInputText] = useState('');
    const [accountList, setAccountList] = useState([]);

    const [brandInputText, setBrandInputText] = useState('');
    const [brandList, setBrandList] = useState([]); 

    // 모달 값 변경 이벤트
    const handleOnChange = (e, target) => {
      const values = modalValues;

      values[target] = e.target.value;
      setModalValues({
        ...values,
      })
    }

    const moveTo = () => {
      navigate('/accounts');
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

    const setBase64 = (base64) => {
      setModalValues({
        ...modalValues,
        brandImage: base64
      });
    }

    return (
        <div className="ProductRegistrationModal">
      <div className='modal' style={isModal ? {display: 'block'} : {display: 'none'}}>
        <div className='modal-bg'></div>
        <div className='modal-content-box'>
          <div className='modal-content'>

            <div className='modal-top-box'>
              <div className='modal-title'>상품 정보</div>
              <img style={{cursor: 'pointer'}} src={x_button} onClick={closeModal} />
            </div>

            <div className='modal-middle-box'>

              <div className='section-box'>
                <span className='section-title'>기본 정보</span>
              </div>

              <div className='modal-col'>
                <div className='modal-col-box'>
                  <div className='modal-col-box-title'>*거래처</div>
                  <SelectBox 
                    placeholder='거래처 명을 검색하세요' 
                    emptyTitle='매칭되는 거래처가 없습니다' 
                    emptyButton='거래처 등록하기'
                    inputText={accountInputText}
                    // handleChange={handleChange}
                    searchList={accountList}
                    selectType='vendor'
                    itemType={0}
                    addList={modalValues['vendor']}
                    // handleClickItem={handleClickItem}
                    // handleDeleteItem={handleDeleteItem}
                    handleClickButton={moveTo} />
                </div>
              </div>

              <div className='modal-col'>
                <div className='modal-col-box'>
                  <div className='modal-col-box-title'>*브랜드</div>
                  <SelectBox 
                    placeholder='브랜드 명을 검색하세요' 
                    emptyTitle='매칭되는 브랜드가 없습니다' 
                    emptyButton='브랜드 등록하기'
                    inputText={brandInputText}
                    // handleChange={handleChange}
                    searchList={brandList}
                    selectType='brand'
                    itemType={0}
                    addList={modalValues['brand']}
                    // handleClickItem={handleClickItem}
                    // handleDeleteItem={handleDeleteItem}
                    handleClickButton={moveTo} />
                </div>
              </div>

              <div className='modal-col'>
                <div className='modal-col-box' style={{flexDirection: 'row', gap: '10px'}}>
                  <div className='modal-col-box'>
                    <div className='modal-col-box-title'>상품분류</div>
                    <select className='modal-col-box-input box-select' value={modalValues['sector']} onChange={e => {changeSelectBox(e, 'sector')}}>
                    <option value="" disabled>상품 분류 선택</option>
                      {
                        categories.map((e, i) => (
                          <option key={i} className='opt' value={e.value}>{e.name}</option>
                        ))
                      }
                    </select>
                  </div>
                  <div className='modal-col-box'>
                    <div className='modal-col-box-title'>품번</div>
                    <input className='modal-col-box-input' placeholder='품번 입력' value={modalValues['code']} onChange={e => {
                    handleOnChange(e, 'code');
                  }} />
                  </div>

                </div>

                <div className='modal-col-box'>
                  <div className='modal-col-box-title'>품명</div>
                  <input className='modal-col-box-input' placeholder='품명을 입력해주세요' value={modalValues['nm_kr']} onChange={e => {
                    handleOnChange(e, 'nm_kr');
                  }}/>
                </div>
              </div>

              <div className='modal-col'>
                <div className='modal-col-box'>
                  <div className='modal-col-box-title'>제품사진</div>
                  <UploadImage base64={modalValues['brandImage']} type={1}  setBase64={setBase64} />
                </div>
              </div>

              <div className='section-box'>
                <span className='section-title'>상품 속성</span>
                <span>"</span>
                <span style={{fontSize: '24px', fontWeight: 600, color: 'black'}}> , </span>
                <span>"  </span>
                <span>를 통해 복수의 입력값 입력</span>
              </div>

              <div className='modal-col'>
                <div className='modal-col-box'>
                  <div className='modal-col-box-title'>*컬러</div>
                  <input className='modal-col-box-input' value={modalValues['nm_kr']} onChange={e => {
                    handleOnChange(e, 'nm_kr');
                  }}/>
                </div>

                <div className='modal-col-box' style={{flexDirection: 'row', gap: '10px'}}>
                  <div className='modal-col-box'>
                    <div className='modal-col-box-title'>시즌구분</div>
                    <select className='modal-col-box-input box-select' value={modalValues['sector']} onChange={e => {changeSelectBox(e, 'sector')}}>
                    <option value="" disabled>시즌 선택</option>
                      {
                        seasons.map((e, i) => (
                          <option key={i} className='opt' value={e.value}>{e.name}</option>
                        ))
                      }
                    </select>
                  </div>
                  <div className='modal-col-box'>
                    <div className='modal-col-box-title'>성별</div>
                    <input className='modal-col-box-input' placeholder='성별 입력' value={modalValues['code']} onChange={e => {
                    handleOnChange(e, 'code');
                  }} />
                  </div>

                </div>

              </div>

              <div className='modal-col'>
                <div className='modal-col-box'>
                  <div className='modal-col-box-title'>*사이즈</div>
                  <input className='modal-col-box-input' value={modalValues['nm_kr']} onChange={e => {
                    handleOnChange(e, 'nm_kr');
                  }}/>
                </div>

                <div className='modal-col-box' style={{flexDirection: 'row', gap: '10px'}}>
                  <div className='modal-col-box'>
                    <div className='modal-col-box-title'>구매 속성</div>
                    <select className='modal-col-box-input box-select' value={modalValues['sector']} onChange={e => {changeSelectBox(e, 'sector')}}>
                    <option value="" disabled>선택</option>
                      {
                        properties.map((e, i) => (
                          <option key={i} className='opt' value={e.value}>{e.name}</option>
                        ))
                      }
                    </select>
                  </div>
                  <div className='modal-col-box'>

                  </div>

                </div>

              </div>

              <div className='section-box'>
                <span className='section-title'>운영 속성</span>
              </div>

              <div className='modal-col'>
                <div className='modal-col-box' style={{flexDirection: 'row', gap: '10px'}}>
                  <div className='modal-col-box'>
                    <div className='modal-col-box-title'>*입고</div>
                    <input className='modal-col-box-input' placeholder='EA' value={modalValues['code']} onChange={e => {
                    handleOnChange(e, 'code');
                  }} />
                  </div>

                  <div className='modal-col-box'>
                    <div className='modal-col-box-title'>*할인 여부</div>
                    <select className='modal-col-box-input box-select' value={modalValues['sector']} onChange={e => {changeSelectBox(e, 'sector')}}>
                      {
                        discountWhether.map((e, i) => (
                          <option key={i} className='opt' value={e.value}>{e.name}</option>
                        ))
                      }
                    </select>
                  </div>

                </div>

                <div className='modal-col-box'>
                  <div className='modal-col-box-title'>할인율 / 할인금액(% = 할인율 / 숫자만 = 금액)</div>
                  <input className='modal-col-box-input' placeholder='입력' value={modalValues['nm_kr']} onChange={e => {
                    handleOnChange(e, 'nm_kr');
                  }}/>
                </div>
              </div>

              <div className='section-box'>
                <span className='section-title'>가격</span>
              </div>

              <div className='modal-col'>
                <div className='modal-col-box' style={{flexDirection: 'row', gap: '10px'}}>
                  <div className='modal-col-box'>
                    <div className='modal-col-box-title'>*출하가</div>
                    <input className='modal-col-box-input' placeholder='출하가 입력' value={modalValues['code']} onChange={e => {
                    handleOnChange(e, 'code');
                  }} />
                  </div>
                  
                  <div className='modal-col-box'>
                    <div className='modal-col-box-title'>*공급가</div>
                    <input className='modal-col-box-input' placeholder='공급가 입력' value={modalValues['code']} onChange={e => {
                    handleOnChange(e, 'code');
                  }} />
                  </div>


                </div>

                <div className='modal-col-box' style={{flexDirection: 'row', gap: '10px'}}>
                  <div className='modal-col-box'>
                    <div className='modal-col-box-title'>*소비자가</div>
                    <input className='modal-col-box-input' placeholder='소비자가 입력' value={modalValues['code']} onChange={e => {
                    handleOnChange(e, 'code');
                  }} />
                  </div>
                  
                  <div className='modal-col-box'>
                    <div className='modal-col-box-title'>부가세</div>
                    <input className='modal-col-box-input' value={modalValues['code']} onChange={e => {
                    handleOnChange(e, 'code');
                  }} />
                  </div>


                </div>
              </div>

              <div className='modal-col'>
                <div className='modal-col-box' style={{flexDirection: 'row', gap: '10px'}}>
                  <div className='modal-col-box'>
                    <div className='modal-col-box-title'>마진</div>
                    <input className='modal-col-box-input' value={modalValues['code']} onChange={e => {
                    handleOnChange(e, 'code');
                  }} />
                  </div>
                  
                  <div className='modal-col-box'>
                
                  </div>


                </div>

                <div className='modal-col-box' style={{flexDirection: 'row', gap: '10px'}}>
                  <div className='modal-col-box'>

                  </div>
                  
                  <div className='modal-col-box'>
    
                  </div>

                </div>
              </div>

              <div className='modal-col'>
                <div className='modal-col-box'>
                  <div className='modal-col-box-title'>기타</div>
                  <input className='modal-col-box-input' placeholder='입력' value={modalValues['etc']} onChange={e => {
                    handleOnChange(e, 'etc');
                  }}/>
                </div>
              </div>
            </div>

            <div className='modal-bottom-box'>
              <div className='modal-button' onClick={()=>{
                addAccount(modalValues);
              }}>등록하기</div>
            </div>
          </div>
        </div>
      </div>
        </div>
    );
}

export default ProductRegistrationModal;

const categories = [
  {name: '상의', value: '상의'},
  {name: '하의', value: '하의'},
  {name: '아우터', value: '아우터'},
  {name: '신발', value: '신발'},
  {name: '스니커즈', value: '스니커즈'},
  {name: '가방', value: '가방'},
  {name: '스포츠용품', value: '스포츠용품'},
  {name: '모자', value: '모자'},
  {name: '양말/레그웨어', value: '양말/레그웨어'},
  {name: '속옷', value: '속옷'},
]

const seasons = [
  {name: 'SS', value: 'SS'},
  {name: 'FW', value: 'FW'},
]

const properties = [
  {name: '공급', value: '공급'},
  {name: '수입', value: '수입'},
]

const discountWhether = [
  {name: '미사용', value: ''},  // 기본속성
  {name: '사용', value: '사용'},
]