import { useState } from 'react';
import './Accounts.css';
import FilterBox from '../../component/FilterBox/FilterBox';
import ButtonNormal from '../../component/ButtonNormal/ButtonNormal';

import DataGrid, { Column, Selection, HeaderFilter, Paging, Pager, Sorting, Search } from 'devextreme-react/data-grid';
import { Workbook } from 'exceljs';
import { saveAs } from 'file-saver-es';
import { exportDataGrid } from 'devextreme/excel_exporter';

function Accounts() {
  const [filterList, setFilterList] = useState(filters);
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  }  
  
  const closeModal = () => {
    setModal(false);
  }

  const exportExcel = () => {
    onExporting();
  }


  const cellTemplate = (container, options) => {
    const noBreakSpace = '\u00A0';
    const text = (options.value || []).map((element) => options.column.lookup.calculateCellValue(element)).join(', ');
    container.textContent = text || noBreakSpace;
    container.title = text;
  }

  const calculateFilterExpression = (filterValue, selectedFilterOperation, target) => {
    if (target === 'search' && typeof (filterValue) === 'string') {
      return [this.dataField, 'contains', filterValue];
    }
    return function(data) {
      return (data.AssignedEmployee || []).indexOf(filterValue) !== -1;
    };
  }



  const itemRender = (data) => {
    const imageSource = `images/icons/status-${data.id}.svg`;
    if (data != null) {
      return <div>
        <img src={imageSource} className="status-icon middle"></img>
        <span className="middle">{data.name}</span>
      </div>;
    }
    return <span>(All)</span>;
  }

  

  const onExporting = (e) => {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('CountriesPopulation');

    exportDataGrid({
      component: e.component,
      worksheet,
      topLeftCell: { row: 4, column: 1 },
    }).then((cellRange) => {
      // header
      const headerRow = worksheet.getRow(2);
      headerRow.height = 30;
      worksheet.mergeCells(2, 1, 2, 8);

      headerRow.getCell(1).value = 'Country Area, Population, and GDP Structure';
      headerRow.getCell(1).font = { name: 'Segoe UI Light', size: 22 };
      headerRow.getCell(1).alignment = { horizontal: 'center' };

      // footer
      const footerRowIndex = cellRange.to.row + 2;
      const footerRow = worksheet.getRow(footerRowIndex);
      worksheet.mergeCells(footerRowIndex, 1, footerRowIndex, 8);

      footerRow.getCell(1).value = 'www.wikipedia.org';
      footerRow.getCell(1).font = { color: { argb: 'BFBFBF' }, italic: true };
      footerRow.getCell(1).alignment = { horizontal: 'right' };
    }).then(() => {
      workbook.xlsx.writeBuffer().then((buffer) => {
        saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'CountriesPopulation.xlsx');
      });
    });
  }


  return (
    <div className="Accounts">
      <FilterBox title='거래처 관리' search_title='거래처 찾기' filter_title='필터' filterList={filterList} />


      <div className='grid-box'>
        <div className='list-button'>
          <div className='list-button-left'>
            <ButtonNormal name='거래처 등록' bg_color='#495057' font_weight='400' icon={true} color='white' handleClick={toggleModal} />
            <ButtonNormal name='상품 관리 바로가기' bg_color='#E9ECEF' color='black' />
          </div>
          <div className='list-button-right'>
            <div className='render-count-title'>페이지당 항목수</div>
            <select className='render-count'>
              <option value='10'>10</option>
              <option value='30'>30</option>
              <option value='50'>50</option>
              <option value='100'>100</option>
            </select>
            <ButtonNormal name='인쇄' bg_color='#E9ECEF' color='black' />
            <ButtonNormal name='엑셀 내려받기' bg_color='#E9ECEF' color='black' handleClick={exportExcel} />
          </div>
        </div>

        <DataGrid
          dataSource={countries}
          keyExpr="ID"
          showBorders={true}
          showRowLines={true}
          onExporting={exportExcel}
        >

          {/* <Export enabled={true} /> */}
          <Selection selectAllMod='allpages' showCheckBoxesMode='always' mode='multiple' />
          {/* <HeaderFilter visible={true} /> */}

          <Pager allowedPageSizes={5} />
          <Paging defaultPageSize={15} />
          <Sorting mode="multiple" />


          <Column caption="*거래처명">
            <Column
              dataField=""
              caption="코드"
              format="fixedPoint"
              alignment='left'
            />
            <Column
              dataField=""
              caption="거래처명"
              format="percent"
              alignment='left'
            />
          </Column>

          <Column dataField="업종분류">
            <HeaderFilter visible={true} allowSelectAll={false}>
              <Search enabled={true} />
            </HeaderFilter>
          </Column>
          <Column dataField="브랜드수" />
          <Column dataField="대표자" />
          <Column dataField="대표자 연락처" />
          <Column dataField="주소" />
        </DataGrid>
      </div>

      <div className='modal' style={modal ? {display: 'block'} : {display: 'none'}}>
        <div className='modal-bg' onClick={closeModal}></div>
        <div className='modal-content-box'>
          <div className='modal-content'>


          </div>
          <div className='modal-button'>등록하기</div>
        </div>
      </div>


    </div>
  );
}

export default Accounts;

const filters = [
  {name: '업종 분류'},
  {name: '브랜드 수'},
  {name: '대표자'},
  {name: '대표자 연락처'},
  {name: '담당자'},
  {name: '당담자 연락처'},
  {name: '주소'},
  {name: '현 잔액'},
  {name: '팩스'},
  {name: '도매 주소'},
  {name: '계좌 번호'},
  {name: '홈페이지'},
  {name: '비고'},
  {name: '지급 방식'},
  {name: '등록 일자'},
];


const countries = [{
  ID: 1,
  Country: 'Brazil',
  Area: 8515767,
  Population_Urban: 0.85,
  Population_Rural: 0.15,
  Population_Total: 205809000,
  GDP_Agriculture: 0.054,
  GDP_Industry: 0.274,
  GDP_Services: 0.672,
  GDP_Total: 2353025,
}, {
  ID: 2,
  Country: 'China',
  Area: 9388211,
  Population_Urban: 0.54,
  Population_Rural: 0.46,
  Population_Total: 1375530000,
  GDP_Agriculture: 0.091,
  GDP_Industry: 0.426,
  GDP_Services: 0.483,
  GDP_Total: 10380380,
}, {
  ID: 3,
  Country: 'France',
  Area: 675417,
  Population_Urban: 0.79,
  Population_Rural: 0.21,
  Population_Total: 64529000,
  GDP_Agriculture: 0.019,
  GDP_Industry: 0.183,
  GDP_Services: 0.798,
  GDP_Total: 2846889,
}, {
  ID: 4,
  Country: 'Germany',
  Area: 357021,
  Population_Urban: 0.75,
  Population_Rural: 0.25,
  Population_Total: 81459000,
  GDP_Agriculture: 0.008,
  GDP_Industry: 0.281,
  GDP_Services: 0.711,
  GDP_Total: 3859547,
}, {
  ID: 5,
  Country: 'India',
  Area: 3287590,
  Population_Urban: 0.32,
  Population_Rural: 0.68,
  Population_Total: 1286260000,
  GDP_Agriculture: 0.174,
  GDP_Industry: 0.258,
  GDP_Services: 0.569,
  GDP_Total: 2047811,
}, {
  ID: 6,
  Country: 'Italy',
  Area: 301230,
  Population_Urban: 0.69,
  Population_Rural: 0.31,
  Population_Total: 60676361,
  GDP_Agriculture: 0.02,
  GDP_Industry: 0.242,
  GDP_Services: 0.738,
  GDP_Total: 2147952,
}, {
  ID: 7,
  Country: 'Japan',
  Area: 377835,
  Population_Urban: 0.93,
  Population_Rural: 0.07,
  Population_Total: 126920000,
  GDP_Agriculture: 0.012,
  GDP_Industry: 0.275,
  GDP_Services: 0.714,
  GDP_Total: 4616335,
}, {
  ID: 8,
  Country: 'Russia',
  Area: 17098242,
  Population_Urban: 0.74,
  Population_Rural: 0.26,
  Population_Total: 146544710,
  GDP_Agriculture: 0.039,
  GDP_Industry: 0.36,
  GDP_Services: 0.601,
  GDP_Total: 1857461,
}, {
  ID: 9,
  Country: 'United States',
  Area: 9147420,
  Population_Urban: 0.81,
  Population_Rural: 0.19,
  Population_Total: 323097000,
  GDP_Agriculture: 0.0112,
  GDP_Industry: 0.191,
  GDP_Services: 0.797,
  GDP_Total: 17418925,
}, {
  ID: 10,
  Country: 'United Kingdom',
  Area: 244820,
  Population_Urban: 0.82,
  Population_Rural: 0.18,
  Population_Total: 65097000,
  GDP_Agriculture: 0.007,
  GDP_Industry: 0.21,
  GDP_Services: 0.783,
  GDP_Total: 2945146,
}];