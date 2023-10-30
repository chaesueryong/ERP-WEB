import './Orders.css';
import FilterBox from '../../component/FilterBox/FilterBox';
import ButtonNormal from '../../component/ButtonNormal/ButtonNormal';

function Orders() {
  return (
    <div className="Orders">
      <FilterBox title='발주/반품 내역 조회' />

      <div className='list-button'>
        <div className='list-button-left'>
          <ButtonNormal name='주문 취소' bg_color='#DEE2E6' color='#495057' />
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

export default Orders;
