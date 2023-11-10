import { useEffect, useRef, useState } from 'react';
import './Accounts.css';
import FilterBox from '../../component/FilterBox/FilterBox';
import ButtonNormal from '../../component/ButtonNormal/ButtonNormal';
import x_button from '../../assets/images/x-icon-1.svg';

import DataGrid, { Column, Selection, HeaderFilter, Paging, Pager, Sorting, Search, Export } from 'devextreme-react/data-grid';
import { Workbook } from 'exceljs';
import { saveAs } from 'file-saver-es';
import { exportDataGrid } from 'devextreme/excel_exporter';
import axios from 'axios';
import { api } from '../../api/api';
import PageNation from '../../component/PageNation/PageNation';

function Accounts() {
  const [filterList, setFilterList] = useState(filters);
  const [accountList, setAccountList] = useState([]);

  const [pageSize, setPageSize] = useState(10);

  const [data, setData] = useState({});

  const dataGridRef = useRef(null);
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

  const changeSelectBox = (e) => {
    if(e.target.selectedIndex === 0){
      e.target.style.color = '#C0C7CE';
    }else {
      e.target.style.color = 'black';
    }
  }

  const defaultModal = () => {

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

  const handlePageClick = (number) => {
    getAccounts(number);
  }

  const getAccounts = (number = 0, pager = 10) => {
    axios.post(api.get_accounts, {
      "use_yn": "Y", // 페이징 인덱스(최초 0)
      "size": pager, //페이징 처리시 사이즈 크기
      "number": number // 페이징 인덱스(최초 0)
      
      //"all" : "Y" // "all" :"Y" 인경우, 모든 데이터 가져오기
      //"all" : "Y" // 넣지 않은 경우 페이징 처리.
    }, {
      headers: {
        'jwt_token': 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJicmFuZEBhZnRlcnNwYWNlLmNvLmtyIiwiaWF0IjoxNjk3MDg5ODUwLCJleHAiOjE2OTk2ODE4NTB9.UzruqCKTg-dVcqNm-vKpRf-LB7_RxR1WvoDDv_udayU',
      }
    }).then(res => {
      setAccountList(res.data.data.content.map((e,i)=>({
        ...e,
        ID: i
      })))    
        setData(res.data.data);
      console.log(res.data.data)
    })
  }

  const addAccount = () => {
    axios.post(api.add_accounts, {
      nm_kr : "nm_kr",
      code : "code",
      sector:"select value",
      owener:"owener",
      owener_phone:"owener_phone",
      manager:"manager",
      manager_phone:"manager_phone",
      crn:"crn", //사업자번호
      c_phone:"c_phone",
      c_fax:"c_fax",
      pay_method:"select",
      c_account:"c_account",
      w_phone:"w_phone",
      w_b_phone:"w_b_phone",
      w_address:"w_address",
      bank_nm:"select value",
      bank_acc:"bank_acc", 
      bank_owner:"bank_owner",
      l_address:"l_address",
      homepage:"homepage",
      descript:"descript",
      showOrder:1,
      etc:"etc",
      
      brand :[], //옵션
      
   
       "use_yn":"Y"
   }, {
      headers: {
        'jwt_token': 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJicmFuZEBhZnRlcnNwYWNlLmNvLmtyIiwiaWF0IjoxNjk3MDg5ODUwLCJleHAiOjE2OTk2ODE4NTB9.UzruqCKTg-dVcqNm-vKpRf-LB7_RxR1WvoDDv_udayU',
      }
    }).then(res => {
      alert('추가 되었습니다');
      closeModal();
      getAccounts();
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
    getAccounts(0, e.target.value);
  }

  useEffect(() => {
    getAccounts();
  },[])

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
          <HeaderFilter visible={true} />

          <Pager visible={false} />
          <Paging pageSize={pageSize} />
          <Sorting mode="multiple" />


          <Column caption="*거래처명">
            <Column
              caption="코드"
              dataField="code"
              sortOrder=""
            />
            <Column
              caption="거래처명"
              dataField="bank_acc"
              sortOrder=""
            />
          </Column>

          <Column 
            caption="업종분류"
            dataField="sector_c_nm"
          >
            {/* <HeaderFilter visible={true} allowSelectAll={false}>
              <Search enabled={true} />
            </HeaderFilter> */}
          </Column>
          <Column 
            caption="브랜드수"
            dataField="brand_cnt" 
            alignment='left'
          />
          <Column 
            caption="대표자"
            dataField="owener" 
          />
          <Column 
            caption="대표자 연락처"  
            dataField="owener_phone" 
          />
          <Column 
            caption="주소"
            dataField="l_address"
          />
        </DataGrid>

        <PageNation first={data.first} last={data.last} empty={data.empty} totalPage={data.totalPages} number={data.number} handlePageClick={handlePageClick} />
      </div>

      <div className='modal' style={modal ? {display: 'block'} : {display: 'none'}}>
        <div className='modal-bg' onClick={closeModal}></div>
        <div className='modal-content-box'>
          <div className='modal-content'>

            <div className='modal-top-box'>
              <div className='modal-title'>거래처 정보</div>
              <img style={{cursor: 'pointer'}} src={x_button} onClick={closeModal} />
            </div>

            <div className='modal-middle-box'>

              <div className='modal-col'>
                <div className='modal-col-box'>
                  <div className='modal-col-box-title'>*거래처 명</div>
                  <input className='modal-col-box-input' placeholder='거래처 명을 입력하세요'/>
                </div>

                <div className='modal-col-box' style={{flexDirection: 'row', gap: '10px'}}>
                  <div className='modal-col-box'>
                    <div className='modal-col-box-title'>거래처 코드</div>
                    <input className='modal-col-box-input' />
                  </div>
                  <div className='modal-col-box'>
                    <div className='modal-col-box-title'>업종 분류</div>
                    <select className='modal-col-box-input' onChange={changeSelectBox}>
                      <option value="" disabled selected>업종 선택</option>
                    </select>
                  </div>

                </div>
              </div>

              <div className='modal-col'>
                <div className='modal-col-box'>
                  <div className='modal-col-box-title'>브랜드 명</div>
                  <input className='modal-col-box-input' placeholder='브랜드 명을 입력하세요'/>
                </div>

                <div className='modal-col-box' style={{flexDirection: 'row', gap: '15px'}}>

                </div>
              </div>

              <div className='modal-col'>
                <div className='modal-col-box'>
                  <div className='modal-col-box-title'>주소</div>
                  <input className='modal-col-box-input' placeholder='입력'/>
                </div>
              </div>

              <div className='modal-col'>
                <div className='modal-col-box'>
                  <div className='modal-col-box-title'>사업자 등록번호</div>
                  <input className='modal-col-box-input' placeholder='입력'/>
                </div>

                <div className='modal-col-box'>
                  <div className='modal-col-box-title'>전화번호</div>
                  <input className='modal-col-box-input' placeholder='숫자만 입력해주세요'/>
                </div>
              </div>

              <div className='modal-col'>
                <div className='modal-col-box'>
                </div>

                <div className='modal-col-box'>
                  <div className='modal-col-box-title'>팩스 번호</div>
                  <input className='modal-col-box-input' placeholder='숫자만 입력해주세요'/>
                </div>
              </div>

              <div className='modal-col'>
                <div className='modal-col-box'>
                  <div className='modal-col-box-title'>지급 방식</div>
                  <select className='modal-col-box-input' onChange={changeSelectBox}>
                    <option value="" disabled selected>거래금 지급방식을 선택해주세요</option>
                    <option className='opt' value="df">거래금요</option>
                  </select>
                </div>

                <div className='modal-col-box'>
                  <div className='modal-col-box-title'>현 잔액</div>
                  <input className='modal-col-box-input' placeholder='숫자만 입력해 주세요'/>
                </div>
              </div>

              <div className='modal-col'>
                <div className='modal-col-box'>
                  <div className='modal-col-box-title'>입금 은행</div>
                    <select className='modal-col-box-input' onChange={changeSelectBox}>
                    <option value="" disabled selected>거래 은행을 선택해 주세요</option>
                  </select>
                </div>

                <div className='modal-col-box'>
                  <div className='modal-col-box-title'>계좌 번호</div>
                  <input className='modal-col-box-input' placeholder='숫자만 입력해 주세요'/>
                </div>
              </div>

              <div className='modal-col'>
                <div className='modal-col-box'>
                </div>

                <div className='modal-col-box'>
                  <div className='modal-col-box-title'>예금주</div>
                  <input className='modal-col-box-input' placeholder='입력'/>
                </div>
              </div>

              <div className='modal-col'>
                <div className='modal-col-box'>
                  <div className='modal-col-box-title'>대표자</div>
                  <input className='modal-col-box-input' placeholder='입력'/>
                </div>

                <div className='modal-col-box'>
                  <div className='modal-col-box-title'>대표자 연락처</div>
                  <input className='modal-col-box-input' placeholder='숫자만 입력해주세요'/>
                </div>
              </div>

              <div className='modal-col'>
                <div className='modal-col-box'>
                  <div className='modal-col-box-title'>담당자</div>
                  <input className='modal-col-box-input' placeholder='입력'/>
                </div>

                <div className='modal-col-box'>
                  <div className='modal-col-box-title'>담당자 연락처</div>
                  <input className='modal-col-box-input' placeholder='숫자만 입력해주세요'/>
                </div>
              </div>

              <div className='modal-col'>
                <div className='modal-col-box'>
                </div>

                <div className='modal-col-box'>
                  <div className='modal-col-box-title'>계산서 전화번호</div>
                  <input className='modal-col-box-input' placeholder='숫자만 입력해주세요'/>
                </div>
              </div>

              <div className='modal-col'>
                <div className='modal-col-box'>
                  <div className='modal-col-box-title'>비고</div>
                  <input className='modal-col-box-input' placeholder='입력'/>
                </div>
              </div>
            </div>

            <div className='modal-bottom-box'>
              <div className='modal-button' onClick={addAccount}>등록하기</div>
            </div>
          </div>
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