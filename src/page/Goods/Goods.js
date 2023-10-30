import './Goods.css';
import FilterBox from '../../component/FilterBox/FilterBox';
import ButtonNormal from '../../component/ButtonNormal/ButtonNormal';

function Goods() {
  return (
    <div className="Goods">
      <FilterBox title='상품 관리' />

      <div className='list-button'>
        <div className='list-button-left'>
          <ButtonNormal name='상품 등록' bg_color='#495057' font_weight="400" color='white' />
          <ButtonNormal name='상품 발주/반품' bg_color='#495057' font_weight="400" color='white' />
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

export default Goods;
