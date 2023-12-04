import './Orders.css';
import FilterBox from '../../component/FilterBox/FilterBox';
import ButtonNormal from '../../component/ButtonNormal/ButtonNormal';
import DataGrid, { Column, Selection, HeaderFilter, Paging, Pager, Sorting, Search } from 'devextreme-react/data-grid';
import { useState } from 'react';
import { common } from '../../utils/common';
import OrderItem from '../../component/OrderItem/OrderItem';
import OrderFilterBox from '../../component/FilterBox/OrderFilterBox';

function Orders() {
  const [modal, setModal] = useState(false);

  const [tapList, setTapList] = useState([
    {name: '발주', checked: true},
    {name: '반품', checked: false},
  ]);

  const [dateType, setDateType] = useState([
    {name: '금일', checked: true},
    {name: '금주', checked: false},
    {name: '당월', checked: false},
    {name: '당기', checked: false},
    {name: '당년', checked: false},
  ]);

  const toggleModal = () => {
    setModal(!modal);
  }  

  const closeModal = () => {
    setModal(false);
  }

  const exportExcel = () => {
    onExporting();
  }

  const onExporting = (e) => {
    // common.exportExcel(e)
  }

  const handleClickTap = (index, type) => {
    switch(type){
      case 'tap':
        setTapList(tapList.map((e, i) => {
          if(i === index){
            return {
              ...e,
              checked: true
            }
          }else{
            return {
              ...e,
              checked: false
            }
          }
        }))
        break;
      case 'date': 
        setDateType(dateType.map((e, i) => {
          if(i === index){
            return {
              ...e,
              checked: true
            }
          }else{
            return {
              ...e,
              checked: false
            }
          }
        }))
        break;  
        default:
          break;
    }
  }

  return (
    <div className="Orders">
      <OrderFilterBox filterTitle="발주/반품 내역 조회" tapList={tapList} dateType={dateType} selectTitle='거래처 선택' handleClickTap={handleClickTap} />

      <div className='grid-box'>
        <div className='list-button'>
          <div className='list-button-left'>
            <div className='grid-title'>발주내역</div>
            {/* <ButtonNormal name='거래처 등록' bg_color='#E7F5FF' font_weight='400' icon={true} color='#0099FF' handleClick={()=>openModal()} paddingTop='2' /> */}
            {/* <ButtonNormal name='상품 관리 바로가기' bg_color='#E9ECEF' color='black' /> */}
          </div>
          <div className='list-button-right'>
            <ButtonNormal name='주문 취소' bg_color='#DEE2E6' color='#495057' />
            {/* <ButtonNormal name='인쇄' bg_color='#E9ECEF' color='black' /> */}
            <ButtonNormal name='엑셀 내려받기' bg_color='#20C997' color='white' handleClick={onExporting} />
          </div>
        </div>

        <div className='grid-list'>
          {
            list.map((e,i) => (
              <OrderItem key={i} />
            ))
          }
          
        </div>
      </div>

      {

      }
    </div>
  );
}

export default Orders;

const list = [
  0,1,2,3,4,5
]