import { DataGrid } from 'devextreme-react';
import './Product.css';
import { Column, HeaderFilter, Search } from 'devextreme-react/data-grid';
import { useState } from 'react';

function Product() {
    const [filterList, setFilterList] = useState(filters);


  return (
    <div className="Product">
      <DataGrid
            id="gridContainer"
            dataSource={{}}
            keyExpr="ID"
            columnAutoWidth={true}
            showBorders={true}
            rowAlternationEnabled={true}
            hoverStateEnabled={true}
            dataRowRender={DataRow}>

            <Column 
                key={0}
                caption={'No.'}
                dataField={'No.'}
                alignment='left'
              >
                <HeaderFilter visible={false} allowSelectAll={true}>
                  <Search enabled={false} />
                </HeaderFilter>
              </Column>

          {
            filterList.map((e, i) => {
              if(filterList[i].checked === false){
                return;
              }

              return (
                <Column 
                key={i}
                caption={e.name}
                dataField={e.value}
                alignment='left'
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
  );
}

export default Product;


const DataRow = (rowInfo) => (
  <>
    <tr className="main-row">
      <td rowSpan={2}><img src={rowInfo.data.Picture} /></td>
      <td>{rowInfo.data.Prefix}</td>
      <td>{rowInfo.data.FirstName}</td>
      <td>{rowInfo.data.LastName}</td>
      <td>{rowInfo.data.Position}</td>
    </tr>
    <tr className="notes-row">
      <td colSpan={6}><div>{rowInfo.data.Notes}</div></td>
    </tr>
  </>
);


const filters = [
    {name: '상품명', value: 'sector', checked: true},
    {name: '공급가', value: 'brand_cnt', checked: true},
    {name: '판매가', value: 'owener', checked: true},
    {name: '판매량', value: 'owener_phone', checked: true},
    {name: '반품량', value: 'manager', checked: true},
    {name: '현금 매출', value: 'manager_phone', checked: true},
    {name: '카드 매출', value: 'l_address', checked: true},
    {name: '손매출', value: 'c_account', checked: true},
    {name: '순이익', value: 'c_account', checked: true},
    {name: '재고 소진률', value: 'c_account', checked: true},
    {name: '비고', value: 'c_account', checked: true},
  ];