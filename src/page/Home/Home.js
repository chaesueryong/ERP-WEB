import './Home.css';

function Home() {
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
        <div className='home-box-title'>데이터 연동 현황</div>

        <div className='home-data-box-2'>

        </div>
      </div>
    </div>
  );
}

export default Home;
