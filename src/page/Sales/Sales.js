import './Sales.css';
import { useState } from 'react';
import { common } from '../../utils/common';
import OrderFilterBox from '../../component/FilterBox/OrderFilterBox';
import Summary from './subpage/Summary/Summary';

function Sales() {
  const [modal, setModal] = useState(false);

  const [tapList, setTapList] = useState([
    {name: '요약', checked: true},
    {name: '거래처 별', checked: false},
    {name: '상품 별', checked: false},
    {name: '상품(상세) 별', checked: false},
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
    common.exportExcel(e)
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
    <div className="Sales">
      <OrderFilterBox filterTitle="매출관리" tapList={tapList} dateType={dateType} selectTitle='매장 선택' handleClickTap={handleClickTap} />
          {
            tapList[0].checked ? <Summary /> : <></>
          }
          {
            tapList[1].checked ? <Summary /> : <></>
          }
    </div>
  );
}

export default Sales;