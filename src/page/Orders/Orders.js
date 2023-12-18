import './Orders.css';
import ButtonNormal from '../../component/ButtonNormal/ButtonNormal';
import { useState } from 'react';
import OrderItem from '../../component/OrderItem/OrderItem';
import OrderFilterBox from '../../component/FilterBox/OrderFilterBox';
import ConfirmModal from '../../component/modal/ConfirmModal/ConfirmModal';

function Orders() {
  const [modal, setModal] = useState(false);
  const [orderCancelModal, setOrderCancelModal] = useState(false);

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

  const openModal = () => {
    setOrderCancelModal(true);
  }  

  const closeModal = () => {
    setOrderCancelModal(false);
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

  const orderCancel = () => {
    alert('주문취소');
    closeModal('ordercancel');
  }

  return (
    <div className="Orders">
      <OrderFilterBox filterTitle="발주/반품 내역 조회" tapList={tapList} dateType={dateType} selectTitle='거래처 선택' handleClickTap={handleClickTap} />

      <div className='grid-box'>
        <div className='list-button'>
          <div className='list-button-left'>
            <div className='grid-title'>          
            {
              tapList.filter(e => e.checked)[0].name + ' 내역'
            }
            </div>
            {/* <ButtonNormal name='거래처 등록' bg_color='#E7F5FF' font_weight='400' icon={true} color='#0099FF' handleClick={()=>openModal()} paddingTop='2' /> */}
            {/* <ButtonNormal name='상품 관리 바로가기' bg_color='#E9ECEF' color='black' /> */}
          </div>
          <div className='list-button-right'>
            <ButtonNormal name='주문 취소' bg_color='#DEE2E6' color='#495057' handleClick={()=>openModal('ordercancel')} />
            {/* <ButtonNormal name='인쇄' bg_color='#E9ECEF' color='black' /> */}
            <ButtonNormal name='엑셀 내려받기' bg_color='#20C997' color='white' handleClick={onExporting} />
          </div>
        </div>

        <div className='grid-list'>
          {
            tapList[0].checked ? _orderList.map((e,i) => (
              <OrderItem key={i} data={e} />
            ))
            :
            <></>
          }
          {
            tapList[1].checked ? _orderList.map((e,i) => (
              <OrderItem key={i} data={e} />
            ))
            :
            <></>
          }
        </div>
      </div>

      {
        orderCancelModal ? 
        <ConfirmModal 
          isConfirmModal={orderCancelModal} 
          text_1='주문 취소시 등록된 정보는 모두 사라집니다.' 
          text_2='정말 주문을 취소하시겠습니까?' 
          closeModal={()=>closeModal('ordercancel')}
          handleConfirm={orderCancel}
        /> : <></>
      }
    </div>
  );
}

export default Orders;

const _orderList = [
  {
    code: '001-01',
    name: '애프터',
    orderNumber: '100',
    orderCount: 10,
    returnCount: 10,
    purchasePrice: 38000,
    qlrh: '비고내용',
    list: [
      {
        ID: 1,
        code: '001-01',
        name: '상품명품명품명품명',
        season: 'SS',
        color: 'Black',
        size: 'Free',
        rhdrmq: '30000',
        gusworh: '0',
        orderCount: 100,
        amount: 38000000
      },
      {
        ID: 1,
        code: '001-01',
        name: '상품명품명품명품명',
        season: 'SS',
        color: 'Black',
        size: 'Free',
        rhdrmq: '30000',
        gusworh: '0',
        orderCount: 100,
        amount: 38000000
      },
      {
        ID: 1,
        code: '001-01',
        name: '상품명품명품명품명',
        season: 'SS',
        color: 'Black',
        size: 'Free',
        rhdrmq: '30000',
        gusworh: '0',
        orderCount: 100,
        amount: 38000000
      },
      {
        ID: 1,
        code: '001-01',
        name: '상품명품명품명품명',
        season: 'SS',
        color: 'Black',
        size: 'Free',
        rhdrmq: '30000',
        gusworh: '0',
        orderCount: 100,
        amount: 38000000
      },
    ]
  },
  {
    name: '애프터 컴퍼니',
    amount: '261,100',
    list: [
      {
        ID: 1,
        code: '001-01',
        name: '상품명품명품명품명',
        season: 'SS',
        color: 'Black',
        size: 'Free',
        rhdrmq: '30000',
        gusworh: '0',
        orderCount: 100,
        amount: 38000000
      },
      {
        ID: 1,
        code: '001-01',
        name: '상품명품명품명품명',
        season: 'SS',
        color: 'Black',
        size: 'Free',
        rhdrmq: '30000',
        gusworh: '0',
        orderCount: 100,
        amount: 38000000
      },
    ]
  },
  {
    name: '애프터 컴퍼니',
    amount: '261,100',
    list: [
      {
        ID: 1,
        code: '001-01',
        name: '상품명품명품명품명',
        season: 'SS',
        color: 'Black',
        size: 'Free',
        rhdrmq: '30000',
        gusworh: '0',
        orderCount: 100,
        amount: 38000000
      },
      {
        ID: 1,
        code: '001-01',
        name: '상품명품명품명품명',
        season: 'SS',
        color: 'Black',
        size: 'Free',
        rhdrmq: '30000',
        gusworh: '0',
        orderCount: 100,
        amount: 38000000
      },
    ]
  },
  {
    name: '애프터 컴퍼니',
    amount: '261,100',
    list: [
      {
        ID: 1,
        code: '001-01',
        name: '상품명품명품명품명',
        season: 'SS',
        color: 'Black',
        size: 'Free',
        rhdrmq: '30000',
        gusworh: '0',
        orderCount: 100,
        amount: 38000000
      },
      {
        ID: 1,
        code: '001-01',
        name: '상품명품명품명품명',
        season: 'SS',
        color: 'Black',
        size: 'Free',
        rhdrmq: '30000',
        gusworh: '0',
        orderCount: 100,
        amount: 38000000
      },
    ]
  }
]