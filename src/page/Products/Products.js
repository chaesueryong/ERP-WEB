import { useEffect, useRef, useState } from 'react';
import './Products';
import FilterBox from '../../component/FilterBox/FilterBox';
import ButtonNormal from '../../component/ButtonNormal/ButtonNormal';

import DataGrid, { Column, Selection, HeaderFilter, Paging, Pager, Sorting, Search, SearchPanel, Export } from 'devextreme-react/data-grid';
import { Workbook } from 'exceljs';
import { saveAs } from 'file-saver-es';
import { exportDataGrid } from 'devextreme/excel_exporter';
import axios from 'axios';
import { api } from '../../api/api';
import PageNation from '../../component/PageNation/PageNation';
import ProductRegistrationModal from '../../component/modal/ProductRegistrationModal/ProductRegistrationModal';
import ProductOrderModal from '../../component/modal/ProductOrderModal/ProductOrderModal';

function Products() {
  const [filterList, setFilterList] = useState(filters);

    // 페이지 데이터
  const [accountList, setAccountList] = useState([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [data, setData] = useState({});

  const dataGridRef = useRef(null);

  const [registrationModal, setRegistrationModal] = useState(false);
  const [orderModal, setOrderModal] = useState(false);
 
  const closeModal = (type) => {
    switch(type){
      case 'registration':
        setRegistrationModal(false);
        break;
      case 'order':
        setOrderModal(false);
        break;
    }
  }

  const openModal = (type) => {
    switch(type){
      case 'registration':
        setRegistrationModal(true);
        break;
      case 'order':
        setOrderModal(true);
        break;
    }
  }

  const exportExcel = () => {
    onExporting();
  }

  const defaultModal = () => {

  }

  const handleChangeSearch = (e) => {
    setSearch(e.target.value);
    getAccountList(e.target.value, filter, [], 0, pageSize)
  }

  // 페이지 상단 필터 박스 클릭 이벤트
  const handleClickCheckFilter = (e) => {
    const arr = filter;
    if(e.target.checked){
      for(let i = 0; i < filterList.length; i++){
        if(filterList[i].name === e.target.id){
          arr.push(filterList[i].value);
          break;
        }
      }
    }else{
      let removeTarget = '';
      for(let i = 0; i < filterList.length; i++){
        if(filterList[i].name === e.target.id ){
          removeTarget = filterList[i].value;
        }
      }

      for(let j = 0; j < arr.length; j++){
        if(arr[j] === removeTarget){
          arr.splice(j, 1);
        }
      }
    
    }
    setFilter([...arr]);
    console.log(arr)
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

  // 페이지 네이션
  const handlePageClick = (number) => {
    getAccountList(search, filter, [], number);
  }

  const getAccountList = (search_text = '', columns = [], orders = [], number = 0, pager = 10) => {
    axios.post(api.get_account_list, {
      "search_text" : search_text, //검색어
      "columns" : ['nm_kr'], //필터
                  // 업종분류 sector, 브랜드 수 brand_cnt, 
                  // 대표자 owener, 대표자 연락처 owener_phone, 
                  // 담당자 manager, 담당자 연락처 manager_phone, 주소 l_address
                  // 현 잔액 c_account, 팩스 c_fax, 도메주소 w_address, 
                  // 계좌번호 bank_acc, 홈페이지 homepage, 비고 etc, 
                  // 지급방식 pay_method, 등록일자 reg_dt_str
      "orders" : ["manager"], //오름차순- 내림차순 소팅 (컬럼명 적재 시 내림차순 적용)
                  // 업종분류 sector, 브랜드 수 brand_cnt,
                  // 대표자 owener, 대표자 연락처 owener_phone, 
                  // 담당자 manager, 담당자 연락처 manager_phone, 주소 l_address
                  // 거래처코드 code, 거래처 명 nm_kr 
     
      //"all" : "Y" // "all" :"Y" 인경우, 모든 데이터 가져오기
      //"all" : "Y" // 넣지 않은 경우 페이징 처리.

      "size": pager, //페이징 처리시 사이즈 크기
      "number": number, // 페이징 인덱스(최초 0)
      "use_yn":"Y"
    }, {
      headers: {
        'jwt_token': 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJyb2RlY2s4MjZAb3ZlcnRoZXdpbmRvdy5uZXQiLCJpYXQiOjE2OTk4NTY1OTAsImV4cCI6MTcwMjQ0ODU5MH0.mYtaQhu_b4jAjn467i1ozS8pohTy0Ws6Q61OxVKJJXI',
      }
    }).then(res => {
      setAccountList(res.data.data.content.map((e,i)=>({
        ...e,
        ID: i
      }))
      
      )
      setData(res.data.data);
      // console.log(res.data.data)
    }).catch(e => {
      alert('네트워크 에러')
      console.log(e)
    })
  }

  const addAccount = (modalValues) => {
    axios.post(api.add_account, modalValues, {
      headers: {
        'jwt_token': 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJyb2RlY2s4MjZAb3ZlcnRoZXdpbmRvdy5uZXQiLCJpYXQiOjE2OTk4NTY1OTAsImV4cCI6MTcwMjQ0ODU5MH0.mYtaQhu_b4jAjn467i1ozS8pohTy0Ws6Q61OxVKJJXI',
      }
    }).then(res => {
      alert('추가 되었습니다');
      closeModal();
      getAccountList();
    }).catch(e=>{
      alert('네트워크 에러')
      console.log(e)
    })
  }
  

  const onExporting = (e) => {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('CountriesPopulation');

    const dataGrid = dataGridRef.current.instance;

    exportDataGrid({
      component: dataGrid,
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

  const changePager = (e) => {
    setPageSize(e.target.value);
    getAccountList(search, filter, [], 0, e.target.value);
  }

  const defaultColumn = () => {
    const arr = [];
    for(let i = 0; i < filterList.length; i++){
      if(filterList[i].default){
        arr.push(filterList[i].value);
      }
    }
    setFilter([...arr]);
  }

  useEffect(() => {
    getAccountList();
    defaultColumn();
  },[])

  return (
    <div className="Products">
      <FilterBox title='상품 관리' filter_box_border={false} handleChangeSearch={handleChangeSearch} handleClickCheckFilter={handleClickCheckFilter} filterList={filterList} />


      <div className='grid-box'>
        <div className='list-button'>
          <div className='list-button-left'>
            <ButtonNormal name='상품 등록' bg_color='#495057' font_weight='400' icon={true} color='white' handleClick={()=>openModal('registration')} />
            <ButtonNormal name='상품 발주' bg_color='#495057' font_weight='400' icon={true} color='white' handleClick={()=>openModal('order')} />
            {/* <ButtonNormal name='상품 관리 바로가기' bg_color='#E9ECEF' color='black' /> */}
          </div>
          <div className='list-button-right'>
            <div className='render-count-title'>페이지당 항목수</div>
            <select className='render-count' onChange={changePager}>
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
          dataSource={accountList}
          keyExpr="ID"
          showBorders={true}
          showRowLines={true}
          ref={dataGridRef}
          onExporting={exportExcel}
        >

          {/* <Export enabled={true} /> */}
          <Selection selectAllMod='allpages' showCheckBoxesMode='always' mode='multiple' />
          <HeaderFilter visible={true} allowSelectAll={false}>
            <Search enabled={true} />
          </HeaderFilter>

          <Pager visible={false} />
          <Paging pageSize={pageSize} />
          <Sorting mode="multiple" />


          <Column caption="*거래처명">
            <Column
              caption="코드"
              dataField="code"
              sortOrder=""
            >
            </Column>
            <Column
              caption="거래처명"
              dataField="nm_kr"
              sortOrder=""
            >
              <HeaderFilter visible={true} allowSelectAll={false}>
                <Search enabled={true} />
              </HeaderFilter>
            </Column>
          </Column>

          
          <Column caption="*브랜드명">
            <Column
              caption="코드"
              dataField="code"
              sortOrder=""
            >
            </Column>
            <Column
              caption="브랜드명"
              dataField="nm_kr"
              sortOrder=""
            >
              <HeaderFilter visible={true} allowSelectAll={false}>
                <Search enabled={true} />
              </HeaderFilter>
            </Column>
          </Column>

          <Column 
            caption="*상품 명"
            dataField="categorys"
            alignment='left'
          >
            <HeaderFilter visible={true} allowSelectAll={false}>
              <Search enabled={true} />
            </HeaderFilter>
          </Column>

          
          {
            filter.map((e, i) => {
              let caption = '';
              for(let i = 0; i < filterList.length; i++){
                if(filterList[i].value === e){
                  caption = filterList[i].name;
                }
              }

              return (
                <Column 
                key={i}
                caption={caption}
                dataField={e}
                alignment='left'
              >
                <HeaderFilter visible={true} allowSelectAll={false}>
                  <Search enabled={true} />
                </HeaderFilter>
              </Column>
              )
            })
          }

        </DataGrid>

        <PageNation first={data.first} last={data.last} empty={data.empty} totalPage={data.totalPages} number={data.number} handlePageClick={handlePageClick} />
      </div>

      {
        registrationModal && <ProductRegistrationModal isModal={registrationModal} closeModal={()=>closeModal('registration')} addAccount={addAccount} />
      }
      {
        orderModal && <ProductOrderModal isModal={orderModal} closeModal={()=>closeModal('order')} addAccount={addAccount} />
      }
    </div>
  );
}

export default Products;

const filters = [
  {name: '제품사진', value: 'sector', default: true},
  {name: '컬러', value: 'brand_cnt', default: true},
  {name: '사이즈', value: 'owener', default: true},
  {name: '시즌', value: 'owener_phone', default: true},
  {name: '마지막 입고일자', value: 'manager', default: true},
  {name: '상품 분류', value: 'manager_phone', default: true},
  {name: '원가', value: 'l_address'},
  {name: '공급가', value: 'c_account'},
  {name: '부가세', value: 'c_fax'},
  {name: '소비자가', value: 'w_address'},
  {name: '기타', value: 'bank_acc'},
];