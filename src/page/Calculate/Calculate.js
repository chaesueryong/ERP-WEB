import './Calculate.css';
import FilterBox from '../../component/FilterBox/FilterBox';
import ButtonNormal from '../../component/ButtonNormal/ButtonNormal';
import DataGrid, { Column, Selection, HeaderFilter, Paging, Pager, Sorting, Search } from 'devextreme-react/data-grid';
import { useState } from 'react';
import { common } from '../../utils/common';
import OrderFilterBox from '../../component/FilterBox/OrderFilterBox';
import Calculation from './subPage/Calculation/Calculation';
import Payment from './subPage/Payment/Payment';

function Calculate() {
  const [modal, setModal] = useState(false);

  const [tapList, setTapList] = useState([
    {name: '정산', checked: true},
    {name: '정산내역', checked: false},
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
    <div className="Calculate">
      <OrderFilterBox filterTitle="정산" tapList={tapList} dateType={dateType} selectTitle='거래처 선택' handleClickTap={handleClickTap} />
        {
            tapList[0].checked ? <Calculation /> : <></>
          }
          {
            tapList[1].checked ? <Payment /> : <></>
          }
    </div>
  );
}

export default Calculate;