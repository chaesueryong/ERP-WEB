import './FetchPanel.css';
import loading_icon from '../../assets/images/loading-icon.svg';
import no_search_icon from '../../assets/images/no-search-icon.svg';
import error_icon from '../../assets/images/error-icon.svg';
import add_icon from '../../assets/images/add-icon.svg';

function FetchPanel({type = 0}) {

  return (
    <div className="FetchPanel">
      {
        type === 0 ? <></> : <></>
      }
      {
        type === 1 ? 
        <>
          <div className='fp-box'>
            <img src={loading_icon} alt='' />
          </div>
        </> 
        : <></>
      }
      {
        type === 2 ? 
        <>
          <div className='fp-box'>
            <img src={add_icon} alt='' />
            <div className='type-2-text-1'>등록된 거래처가 없습니다</div>
            <div className='type-2-text-2'>거래처를 등록해주세요</div>
          </div>
        </> 
        : <></>
      }
      {
        type === 3 ? 
        <>
          <div className='fp-box'>
            <img src={error_icon} alt='' />
            <div className='type-3-text-1'>데이터를 불러오는데 실패했습니다</div>
            <div className='type-3-text-2'>고객센터를 통해 문의해주세요</div>
            <div className='type-3-text-3'>문의번호 <span>000-0000</span></div>
          </div>
        </>
        : <></>
      }
      {
        type === 4 ? 
        <>
          <div className='fp-box'>
            <img src={no_search_icon} alt='' />
            <div className='type-4-text-1'>조건에 해당하는 정보가 없습니다</div>
          </div>
        </>
        : <></>
      }
    </div>
  );
}

export default FetchPanel;
