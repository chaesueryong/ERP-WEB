import { useState } from 'react';
import './Accounts.css';
import FilterBox from '../../component/FilterBox/FilterBox';
import ButtonNormal from '../../component/ButtonNormal/ButtonNormal';

function Accounts() {
  const [filterList, setFilterList] = useState(filters);
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  }  
  
  const closeModal = () => {
    setModal(false);
  }

  return (
    <div className="Accounts">
      <FilterBox title='거래처 관리' search_title='거래처 찾기' filterList={filterList} />


      <div className='list-button'>
        <div className='list-button-left'>
          <ButtonNormal name='거래처 등록' bg_color='#495057' font_weight='400' icon={true} color='white' handleClick={toggleModal} />
          <ButtonNormal name='상품 관리 바로가기' bg_color='#E9ECEF' color='black' />
        </div>
        <div className='list-button-right'>
          <div className='render-count-title'>페이지당 항목수</div>
          <select className='render-count'>
            <option value='10'>10</option>
            <option value='30'>30</option>
            <option value='50'>50</option>
            <option value='100'>100</option>
          </select>
          <ButtonNormal name='인쇄' bg_color='#E9ECEF' color='black' />
          <ButtonNormal name='엑셀 내려받기' bg_color='#E9ECEF' color='black' />
        </div>
      </div>

      <div className='list'></div>


      <div className='modal' style={modal ? {display: 'block'} : {display: 'none'}}>
        <div className='modal-bg' onClick={closeModal}></div>
        <div className='modal-content-box'>
          <div className='modal-content'>
            <div>거래처 정보</div>
            <div>거래처 정보</div>
            <div>거래처 정보</div>
            <div>거래처 정보</div>
            <div>거래처 정보</div>
            <div>거래처 정보</div>
            <div>거래처 정보</div>
          </div>
          <div className='modal-button'>등록하기</div>
        </div>
      </div>
    </div>
  );
}

export default Accounts;

const filters = [{
  name: '업종 분류'
},{
  name: '브랜드 수'
},{
  name: '대표자'
},{
  name: '대표자 연락처'
},{
  name: '담당자'
},{
  name: '당담자 연락처'
},{
  name: '주소'
}];