import FilterBox from '../../component/FilterBox/FilterBox';
import './Brands.css';
import ButtonNormal from '../../component/ButtonNormal/ButtonNormal';

function Brands() {
  return (
    <div className="Brands">
      <FilterBox title='브랜드 관리' search_title='브랜드 찾기' />
      
      <div className='list-button'>
        <div className='list-button-left'>
          <ButtonNormal name='브랜드 등록' bg_color='#495057' font_weight='400' icon={true} color='white' />
          <ButtonNormal name='상품 관리 바로가기' bg_color='#E9ECEF' color='black' />
        </div>
        <div className='list-button-right'>
          <div className='render-count-title'>페이지당 항목수</div>
          <select className='render-count'>
            <option value='10'>10</option>
          </select>
          <ButtonNormal name='인쇄' bg_color='#E9ECEF' color='black' />
          <ButtonNormal name='엑셀 내려받기' bg_color='#E9ECEF' color='black' />
        </div>
      </div>

      <div className='list'></div>

    </div>
  );
}

export default Brands;