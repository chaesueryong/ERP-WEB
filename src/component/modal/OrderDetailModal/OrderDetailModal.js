import OrderItem from '../../OrderItem/OrderItem';
import '../modal.css';
import './OrderDetailModal.css';
import { useState } from 'react';

function OrderDetailModal({isModal, closeModal, registrationOrder}) {
    const [orderList, setOrderList] = useState([]);

    const [extension, setExtension] = useState(false);


    return (
        <div className="OrderDetailModal">
          <div className='modal' style={isModal ? {display: 'block'} : {display: 'none'}}>
            <div className='modal-bg' onClick={closeModal}></div>
            <div className='modal-content-box' style={{width: '1607px'}}>
              <div className='modal-content'>

                <div className='modal-top-box'>
                  <div className='modal-title'>주문정보</div>
                </div>

                <div className='modal-middle-box'>
                    <OrderItem data={_orderList[0]} />
                </div>

                <div className='odm-bottom-box'>

                  <div className='odm-button cancel' onClick={closeModal}>닫기</div>
                  <div className='odm-button shortcut' onClick={closeModal}>발주 내역 바로가기</div>
                </div>
              </div>
            </div>
          </div>
        </div>
    );
}

export default OrderDetailModal;


const _orderList = [
  {
    name: '애프터 컴퍼니',
    amount: '261,100',
    list: [
      {
        ID: 1,
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
        ID: 2,
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
        ID: 3,
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
        ID: 4,
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
        ID: 2,
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
        ID: 3,
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
        ID: 4,
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
        ID: 2,
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