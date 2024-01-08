import './InventoryManagement.css';
import { useState } from 'react';
import OrderFilterBox from '../../component/FilterBox/OrderFilterBox';
import ConfirmModal from '../../component/modal/ConfirmModal/ConfirmModal';

function InventoryManagement() {
  const [modal, setModal] = useState(false);
  const [orderCancelModal, setOrderCancelModal] = useState(false);

  const [tapList, setTapList] = useState([
    {name: '출고', checked: true},
    {name: '이고', checked: false},
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
    <div className="InventoryManagement">
    <div className="OrderFilterBox">
        <div className='order-filter-title'>
          재고관리
        </div>

        <div className='order-filter-switch-box'>
            {
                tapList.map((e, i) => (
                    <div key={i} className='of-switch' onClick={() => handleClickTap(i, 'tap')}>
                        <div className='of-switch-title' style={e.checked ? { color: 'black'} : { color: '#ADB5BD'}}>{e.name}</div>
                        <div className='of-switch-under-bar' style={e.checked ? {backgroundColor: 'black'} : {backgroundColor: 'white'}}></div>
                    </div>
                ))
            }
        </div>

        <div className='of-bottom-box'>
          <div className='ofbr-date-box'>
            <div className='ofbr-date-box-1'>

                <div className='ofbr-date-set-box'>
                <input value={'2023.23.12'} />
                <span>~</span>
                <input value={'2023.23.12'} />
                </div>
            </div>
          </div>
        </div>
    </div>
      <div className='grid-box'>
        <div className='list-button'>
          <div className='list-button-left'>
            <div className='grid-title'>          
            </div>
          </div>
          <div className='list-button-right'>

          </div>
        </div>

        <div className='grid-list'>
          {/* {
            tapList[0].checked ? _orderList.map((e,i) => (
              <OrderItem key={i} data={e} />
            ))
            :
            <></>
          }
          {
            tapList[1].checked 
            :
            <></>
          } */}
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

export default InventoryManagement;
