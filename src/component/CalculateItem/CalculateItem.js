import { DataGrid } from 'devextreme-react';
import './CalculateItem.css';
import { Column, HeaderFilter, Search } from 'devextreme-react/data-grid';
import { useState } from 'react';
import up_arrow_icon from '../../assets/images/up-arrow-icon.svg';

function CalculateItem() {
    const [filterList, setFilterList] = useState(filters);

  return (
    <div className="CalculateItem">
      
      <div className='ci-left-box'>
        <img src={up_arrow_icon} alt='' />
      </div>
      <div className='ci-right-box'>
        <div className='ci-account-info-box'>
            <div>애프터 컴퍼니</div>
            <div>잔액: {"200,000"}</div>
        </div>
        <DataGrid
              id="gridContainer"
              dataSource={{}}
              keyExpr="ID"
              columnAutoWidth={true}
              showBorders={true}
              rowAlternationEnabled={true}
              hoverStateEnabled={true}
              >
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
    </div>
  );
}

export default CalculateItem;


const filters = [
    {name: '거래 일자', value: 'sector', checked: true},
    {name: '발주 수량', value: 'brand_cnt', checked: true},
    {name: '반품량', value: 'owener', checked: true},
    {name: '미송량', value: 'owener_phone', checked: true},
    {name: '발주 금액', value: 'manager', checked: true},
    {name: '반품 금액', value: 'manager_phone', checked: true},
    {name: '미송 금액', value: 'l_address', checked: true},
    {name: '잔액 사용', value: 'c_account', checked: true},
    {name: '지급 금액', value: 'c_account', checked: true},
    {name: '비고', value: 'c_account', checked: true},
    {name: '작업자', value: 'c_account', checked: true},
    {name: '정산 현황', value: 'c_account', checked: true},
  ];