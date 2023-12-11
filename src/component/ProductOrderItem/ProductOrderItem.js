import './ProductOrderItem.css';
import down_arrow_icon from '../../assets/images/down-arrow-icon.svg';
import DataGrid, { Column, HeaderFilter, Sorting, Search, ColumnFixing } from 'devextreme-react/data-grid';
import { useState } from 'react';

function ProductOrderItem({data}) {
    const [gridVisible, setGridVisible] = useState(false);

    const toggleGridVisible = () => {
        setGridVisible(prev => !prev);
    }

    return (
        <div className='ProductOrderItem'>
            <div className='top-box'>
                <div className='image-box' onClick={toggleGridVisible}>
                    <img className='image' src={down_arrow_icon} alt='' />
                </div>
                <div className='account-name'>{data.name}</div>
                <div className='amount-box'>
                    <span>잔액:</span>
                    <span>{data.amount}</span>
                </div>
            </div>

            <div className='middle-box' style={gridVisible ? {display: 'block'} : {display: 'none'}}>
                <DataGrid
                    dataSource={data.list}
                    keyExpr="ID"
                    // allowColumnReordering={true}
                    allowColumnResizing={true}
                    columnAutoWidth={true}
                    showColumnLines={false}
                    // showBorders={true}
                    // showRowLines={true}
                    hoverStateEnabled={true}
                    filterBuilder={filterBuilder}
                >

                    <HeaderFilter visible={true} allowSelectAll={true}>
                        <Search enabled={true} editorOptions={searchEditorOptions} />
                    </HeaderFilter>

                    <Sorting mode="multiple" />
                    <ColumnFixing enabled={true} />

                    {
                        filters.map((e, i) => {
                        if(filters[i].checked === false){
                            return;
                        }

                        return (
                            <Column 
                            key={i}
                            caption={e.name}
                            dataField={e.value}
                            alignment='center'
                            
                            >
                            <HeaderFilter visible={true} allowSelectAll={true}>
                                <Search enabled={true} />
                            </HeaderFilter>
                        </Column>
                        )
                        })
                    }
                

                </DataGrid>
            </div>

            <div className='bottom-box'>
                <div className='total-text'>합계</div>
                <div className='total-order'>600</div>
                <div className='total-price'>2001165416843</div>
            </div>    
        </div>
    
    );
}

export default ProductOrderItem;

const filters = [
    {name: '상품 명', value: 'name', checked: true},
    {name: '시즌', value: 'season', checked: true},
    {name: '컬러', value: 'color', checked: true},
    {name: '사이즈', value: 'size', checked: true},
    {name: '공급가', value: 'rhdrmq', checked: true},
    {name: '현재고', value: 'gusworh', checked: true},
    {name: '주문 수량', value: 'orderCount', checked: true},
    {name: '발주금액', value: 'amount', checked: true},
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
  