import '../modal.css';
import x_button from '../../../assets/images/x-icon-1.svg';
import success_icon from '../../../assets/images/success-check-icon.svg';
import extension_icon from '../../../assets/images/extension-icon.svg';
import { useState } from 'react';
import ProductOrderItem from '../../ProductOrderItem/ProductOrderItem';

function ProductOrderModal({isModal, isConfirmModal, closeModal, closeConfirmModal, registrationOrder, orderShortCut}) {
    const [orderList, setOrderList] = useState([]);

    const [extension, setExtension] = useState(false);

    const toggleExtension = () => {
      setExtension(prev => !prev);
    }

    return (
        <div className="ProductOrderModal">
          <div className='modal' style={isModal ? {display: 'block'} : {display: 'none'}}>
            <div className='modal-bg' onClick={closeModal}></div>
            <div className='modal-content-box' style={extension ? {width: '1000px'} : {width: '600px'}}>
              <div className='modal-content'>

                <div className='modal-top-box'>
                  <div className='modal-title'>상품 발주</div>
                  <img style={{cursor: 'pointer'}} src={extension_icon} onClick={toggleExtension} />
                </div>

                <div className='modal-middle-box'>
                  {
                    !extension ? 
                    <>
                      <div className='order-item'>
                        <div>
                          1.상품명상품명상품명상품명상품명상품명상품명상품명
                        </div>
                        <div>black / XL</div>
                      </div>

                      <div className='order-item'>
                        <div>
                          1.상품명상품명상품명상품명상품명상품명상품명상품명
                        </div>
                        <div>black / XL</div>
                      </div>

                      <div className='order-item'>
                        <div>
                          1.상품명상품명상품명상품명상품명상품명상품명상품명
                        </div>
                        <div>black / XL</div>
                      </div>
                    </>
                    :
                    <div className='order-list'>
                      {
                        _orderList.map((e, i) => (
                          <ProductOrderItem key={i} data={e} />
                        ))
                      }
                    </div>
                  }
                  
                </div>

                <div className='modal-bottom-box' style={{height: 'auto'}}>
                  <div style={extension ? {display: 'block'} : {display: 'none'}}>
                    <div className='total-data-box'>
                      <div className='total-text'>총 합계</div>
                      <div className='total-order'>600</div>
                      <div className='total-price'>2001165416843</div>
                    </div>

                    <div className='note-box'>
                      <div className='note-text'>비고</div>
                      <input className='note-input' />
                    </div>
                  </div>

                  <div className='modal-button order-button' onClick={registrationOrder}>발주 등록</div>
                </div>
              </div>
            </div>
          </div>

          <div className='modal' style={isConfirmModal ? {display: 'block'} : {display: 'none'}}>
            <div className='modal-bg' style={{opacity: '0'}}></div>
            <div className='modal-content-box' style={{width: '680px', height: '257px'}}>
              <div className='modal-content' style={{alignItems: 'center', justifyContent: 'center'}}>

                <img className='order-success-image' alt='' src={success_icon} />
                <div className='order-text'>상품 발주가 완료되었습니다.</div>
                <div className='order-button-box'>
                  <div className='order-cancel' onClick={closeConfirmModal}>닫기</div>
                  <div className='order-shortcuts' onClick={orderShortCut}>발주내역 바로가기</div>
                </div>  

              </div>
            </div>
          </div>
        </div>
    );
}

export default ProductOrderModal;


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
    ]
  }
]