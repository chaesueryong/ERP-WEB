import './ReturnItem.css';
import down_arrow_icon from '../../assets/images/down-arrow-icon.svg';
import blue_plus_icon from '../../assets/images/blue-plus-icon.svg';
import right_arrow_gray_icon from '../../assets/images/right-arrow-gray-icon.svg';
import DataGrid, { Column, HeaderFilter, Sorting, Search, ColumnFixing, Selection } from 'devextreme-react/data-grid';
import { useState } from 'react';
import OrderDetailModal from '../modal/OrderDetailModal/OrderDetailModal';

function ReturnItem({data}) {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisible = (e) => {
        setIsVisible(prev => !prev);
    }

    const tagOutPut = (e) => {
        e.stopPropagation();
        alert('택 출력');
    }

    const addOrderProduct = (e) => {
        e.stopPropagation();
        alert('발주상품 추가');
    }

    return (
        <div className="ReturnItem">
            <div className='return-top' onClick={toggleVisible}>
                <div className='return-item-date'>2023/11/09</div>
                <div className='return-item-image-box'>
                    <img className='return-item-image' alt='' src={down_arrow_icon} />
                </div>

                <div className='return-item-button-box'>

                </div>
            </div>


            <div className='return-bottom' style={isVisible ? {display: 'block'} : {display: 'none'}}>
                <table className='return-table'>
                    <tr className='return-table-header'>
                        <td></td>
                        <td>거래처 코드</td>
                        <td>거래처명</td>
                        <td>발주수량</td>
                        <td>반품수량</td>
                        <td>반품금액</td>
                        <td>현 잔금</td>
                        <td>확정후 잔금</td>
                        <td>비고</td>
                    </tr>
                    {
                        arr.map((e, i) => (
                            <GridBox key={i} itemData={
                                {...data}
                            } />
                        )) 
                    }
                </table>
            </div>
        </div>
    );
}

export default ReturnItem;

function GridBox({itemData}) {
    const [isVisibleGrid, setIsVisibleGrid] = useState(false);
    const [detailModal, setDetailModal] = useState(false);

    const toggleGridBox = () => {
        setIsVisibleGrid(prev => !prev);
    }

    const openDetailModal = () => {
        setDetailModal(true);
    }

    const closeDetailModal = () => {
        setDetailModal(false);
    }

    return (
        <>
            <tr className='return-table-body'>
                <td onClick={toggleGridBox}><img className='return-item-image' alt='' src={down_arrow_icon} /></td>
                <td>{itemData.code}</td>
                <td>{itemData.name}</td>
                <td>{itemData.orderNumber}</td>
                <td>{itemData.returnCount}</td>
                <td>{itemData.orderCount}</td>
                <td>{itemData.purchasePrice}</td>
                <td>{itemData.qlrh}</td>
                <td>미확정</td>
            </tr>

            <tr className='return-table-grid'>
                <td colSpan={9}>
                    <div className='table-grid' style={isVisibleGrid ? {display: 'flex'} : {display: 'none'}}>
                        <div className='table-grid-left'>
                            <DataGrid
                                dataSource={itemData.list}
                                keyExpr="ID"
                                // allowColumnReordering={true}
                                allowColumnResizing={true}
                                columnAutoWidth={true}
                                showColumnLines={false}
                                showBorders={false}
                                showRowLines={false}
                                hoverStateEnabled={true}
                                // filterBuilder={filterBuilder}
                            >
                                <Selection showCheckBoxesMode='always' mode='multiple' />
                                {/* <HeaderFilter visible={true} allowSelectAll={true}>
                                    <Search enabled={true} editorOptions={searchEditorOptions} />
                                </HeaderFilter> */}

                                <Sorting mode="multiple" />
                                <ColumnFixing enabled={true} />

                                {
                                    filters.map((e, i) => {
                                    return (
                                        <Column 
                                        key={i}
                                        caption={e.name}
                                        dataField={e.value}
                                        alignment='center'
                                        
                                        >
                                            {
                                                e.filter ? 
                                                <HeaderFilter visible={e.filter}>
                                                    <Search enabled={true} />
                                                </HeaderFilter> : <></>
                                            }
                                            
                                    </Column>
                                    )
                                    })
                                }
                            

                            </DataGrid>
                        </div>

                        <div className='table-grid-right'>
                            <div className='table-grid-right-button-box'>
                                <div className='table-grid-right-button'></div>
                            </div>
                            {
                                itemData.list.map((e, i) => (
                                    <div className='table-grid-right-button-box' key={i} onClick={openDetailModal}>
                                        <div className='table-grid-right-button'>주문정보보기</div>
                                        <img src={right_arrow_gray_icon} alt='' />
                                    </div>
                                ))
                            }
                    </div>
                    </div>
                </td>
            </tr>

            <OrderDetailModal isModal={detailModal} closeModal={closeDetailModal} />
        </>
    )
}


const arr = [1,2,3,4,5];

const filters = [
    {name: '품번', value: 'code', filter: false, checked: true},
    {name: '*상품 명', value: 'name', filter: false, checked: true},
    {name: '컬러', value: 'color', filter: false, checked: true},
    {name: '사이즈', value: 'size', filter: false, checked: true},
    {name: '시즌', value: 'season', filter: false, checked: true},
    {name: '출하가', value: 'gusworh', filter: false, checked: true},
    {name: '공급가', value: 'orderCount', filter: false, checked: true},
    {name: '반품수량', value: 'amount', filter: false, checked: true},
    {name: '반품금액', value: 'amount', filter: false, checked: true},
    {name: '작업자', value: 'amount', filter: false, checked: true},
  ];

const filterBuilder = {
    customOperations: [{
      name: 'weekends',
      caption: 'Weekends',
      dataTypes: ['date'],
      icon: 'check',
      hasValue: false,
    }],
    allowHierarchicalFields: true,
  };
  
  const searchEditorOptions = { placeholder: '' };