import './Home.css';
import refresh_icon from '../../assets/images/refresh-icon.svg';
import { useNavigate } from 'react-router-dom';
import ConfirmModal from '../../component/modal/ConfirmModal/ConfirmModal';
import { useState } from 'react';

function Home() {
  const navigate = useNavigate();

  const [confirmModal, setConfirmModal] = useState(false);

  const openModal = () => {
    setConfirmModal(true);
  }  
  
  const closeModal = () => {
    setConfirmModal(false);
  }

  const confirm = () => {
    closeModal();
  }

  const moveTab = (path) => {
    navigate(path);       
  }

  return (
    <div className="Home">
      <div className='home-title-box'>
        <div className='home-title-1'>브랜드 성공 관리의 시작</div>
        <div className='home-title-1'>애프티 ERP</div>
      </div>

      <div className='home-sub-title-1'>애프티 Admin과 데이터 연동을 통해 옴니채널의 압도적인 효율을 경험해보세요!</div>


      <div className='home-box'>
        <div className='home-box-title'>최근 열어본 페이지</div>
        <div>
          <div className='home-data-box-1'>

          </div>
        </div>
      </div>
    
      <div className='home-box'>
        <div className='home-box-title'>어드민 데이터 연동하기</div>

        <div className='home-data-box-2'>
          <div className='data-box'>  
            <div className='data-box-1' onClick={openModal}>
              <div>데이터 가져오기</div>
              <img src={refresh_icon} alt='' />
            </div>
            <div className='data-box-2'>
              <div className='data-box-2-text-1'>마지막 업데이트</div>
              <div className='data-box-2-text-2'>2023.12.15</div>
            </div>
          </div>

          <div className='data-box'>  
            <div className='data-box-1' onClick={() => moveTab('/addaccountinfo')}>
              <div>거래처 정보 추가하기</div>
            </div>
            <div className='data-box-2'>
              <div className='data-box-2-text-1'>거래처 정보 없는 상품</div>
              <div className='data-box-2-text-2'>10</div>
            </div>
          </div>
        </div>
      </div>

      <ConfirmModal handleConfirm={confirm} isConfirmModal={confirmModal} closeModal={closeModal} text_1={'이미 등록되어 있는 상품이 포함되 있어요<br/>asdf'} />
    </div>
  );
}

export default Home;
