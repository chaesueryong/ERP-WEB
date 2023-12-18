import './OrderItem.css';
import down_arrow_icon from '../../assets/images/down-arrow-icon.svg';
import blue_plus_icon from '../../assets/images/blue-plus-icon.svg';
import DataGrid, { Column, HeaderFilter, Sorting, Search, ColumnFixing, Selection } from 'devextreme-react/data-grid';
import { useState } from 'react';

function OrderItem({data}) {
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
        <div className="OrderItem">
            <div className='order-top' onClick={toggleVisible}>
                <div className='order-item-date'>2023/11/09</div>
                <div className='order-item-image-box'>
                    <img className='order-item-image' alt='' src={down_arrow_icon} />
                </div>

                <div className='order-item-button-box'>
                    <div className='order-item-button' onClick={tagOutPut}>택 출력</div>
                    <div className='order-item-button' onClick={addOrderProduct}>
                        발주상품 추가
                        <img src={blue_plus_icon} alt='' />
                    </div>
                </div>
            </div>


            <div className='order-bottom' style={isVisible ? {display: 'block'} : {display: 'none'}}>
                <table className='order-table'>
                    <tr className='order-table-header'>
                        <td></td>
                        <td>거래처 코드</td>
                        <td>거래처명</td>
                        <td>발주번호</td>
                        <td>반품수량</td>
                        <td>입고수량</td>
                        <td>구매대금</td>
                        <td>비고</td>
                        <td>입고여부</td>
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

export default OrderItem;

function GridBox({itemData}) {
    const [isVisibleGrid, setIsVisibleGrid] = useState(false);

    const toggleGridBox = () => {
        setIsVisibleGrid(prev => !prev);
    }

    return (
        <>
            <tr className='order-table-body'>
                <td onClick={toggleGridBox}><img className='order-item-image' alt='' src={down_arrow_icon} /></td>
                <td>{itemData.code}</td>
                <td>{itemData.name}</td>
                <td>{itemData.orderNumber}</td>
                <td>{itemData.returnCount}</td>
                <td>{itemData.orderCount}</td>
                <td>{itemData.purchasePrice}</td>
                <td>{itemData.qlrh}</td>
                <td>미확정</td>
            </tr>

            <tr className='order-table-grid'>
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
                                <div className='table-grid-right-button'>전체입고</div>
                            </div>
                            {
                                itemData.list.map((e, i) => (
                                    <div className='table-grid-right-button-box' key={i}>
                                        <div className='table-grid-right-button'>입고</div>
                                    </div>
                                ))
                            }
                    </div>
                    </div>
                </td>
            </tr>
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
    {name: '주문수량', value: 'amount', filter: false, checked: true},
    {name: '입고', value: 'amount', filter: false, checked: true},
    {name: '과송', value: 'amount', filter: false, checked: true},
    {name: '미송', value: 'amount', filter: false, checked: true},
    {name: '반품', value: 'amount', filter: false, checked: true},
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