import { DataGrid } from 'devextreme-react';
import './Payment.css';
import { Column, HeaderFilter, Search } from 'devextreme-react/data-grid';
import { useState } from 'react';

function Payment() {
    const [filterList, setFilterList] = useState(filters);

  return (
    <div className="Payment">
      
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
                caption={'정산일'}
                dataField={'No.'}
                alignment='left'
              >
                <HeaderFilter visible={false} allowSelectAll={true}>
                  <Search enabled={false} />
                </HeaderFilter>
              </Column>

            <Column 
                caption="*거래처명" 
                fixed={false}>
                <Column
                caption="코드"
                dataField="code"
                >
                </Column>
                <Column
                caption="거래처명"
                dataField="nm_kr"
                >
                <HeaderFilter visible={true} allowSelectAll={true}>
                    <Search enabled={true} />
                </HeaderFilter>
                </Column>
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

export default Payment;


const DataRow = (rowInfo) => (
  <>
    <tr className="main-row">
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
    {name: '지급금액', value: 'sector', checked: true},
    {name: '입금은행', value: 'brand_cnt', checked: true},
    {name: '계좌번호', value: 'owener', checked: true},
    {name: '예금주', value: 'owener_phone', checked: true},
    {name: '지금처리', value: 'manager', checked: true},
    {name: '작업자', value: 'manager_phone', checked: true},
  ];