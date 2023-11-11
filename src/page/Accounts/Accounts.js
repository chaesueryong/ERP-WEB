import { useEffect, useRef, useState } from 'react';
import './Accounts.css';
import FilterBox from '../../component/FilterBox/FilterBox';
import ButtonNormal from '../../component/ButtonNormal/ButtonNormal';
import x_button from '../../assets/images/x-icon-1.svg';

import DataGrid, { Column, Selection, HeaderFilter, Paging, Pager, Sorting, Search, SearchPanel, Export } from 'devextreme-react/data-grid';
import { Workbook } from 'exceljs';
import { saveAs } from 'file-saver-es';
import { exportDataGrid } from 'devextreme/excel_exporter';
import axios from 'axios';
import { api } from '../../api/api';
import PageNation from '../../component/PageNation/PageNation';

function Accounts() {
  const [filterList, setFilterList] = useState(filters);

    // 페이지 데이터
  const [accountList, setAccountList] = useState([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [data, setData] = useState({});



  const dataGridRef = useRef(null);
  const [modal, setModal] = useState(false);

  const [modalValues, setModalValues] = useState({
    nm_kr : "nm_kr", // 거래처명
    code : "code",  // 거래처 코드
    sector:"select value", // 업종

    brand :[], //옵션

    l_address:"l_address",  // 주소
    crn:"crn", //사업자등록번호
    c_phone:"c_phone",// 사업자 전화번호
    c_fax:"c_fax",  // 사업자 택스번호

    pay_method:"select",   // 지급방식
    c_account:"c_account",  // 현재잔액
    bank_nm:"select value",  // 입금은행명
    bank_acc:"bank_acc",   // 계좌번호
    bank_owner:"bank_owner",  // 예금주

    owener:"owener",  // 대표자 명
    owener_phone:"owener_phone",  // 대표자 연락처
    manager:"manager",  // 담당자 명
    manager_phone:"manager_phone", // 담당자 연락처


//
    w_phone:"w_phone",  // 도매 주문폰
    w_b_phone:"w_b_phone", // 도매 계산서 전화번호
    w_address:"w_address",  // 도매주소

    homepage:"homepage",  // 홈페이지
    descript:"descript",  // 비고
//

    showOrder: 1,

    etc:"etc",  // 비고
         
 
     "use_yn":"Y"
    })

  const toggleModal = () => {
    setModal(!modal);
  }  
  
  const closeModal = () => {
    setModal(false);
  }

  const exportExcel = () => {
    onExporting();
  }

  const defaultModal = () => {

  }

  const handleChangeSearch = (e) => {
    setSearch(e.target.value);
    console.log(e.target.value)
    getAccounts(e.target.value, filter, [], 0, pageSize)
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

  // 모달 값 변경 이벤트
  const handleOnChange = (e) => {
    console.log(e.target);
  }

  // 모달 값 변경 이벤트
  const changeSelectBox = (e) => {
    if(e.target.selectedIndex === 0){
      e.target.style.color = '#C0C7CE';
    }else {
      e.target.style.color = 'black';
    }
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
    getAccounts(search, filter, [], number);
  }

  const getAccounts = (search_text = '', columns = [], orders = [], number = 0, pager = 10) => {
    axios.post(api.get_accounts, {
      "search_text" : search_text, //검색어
      "columns" : columns, //필터
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
        'jwt_token': 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJicmFuZEBhZnRlcnNwYWNlLmNvLmtyIiwiaWF0IjoxNjk3MDg5ODUwLCJleHAiOjE2OTk2ODE4NTB9.UzruqCKTg-dVcqNm-vKpRf-LB7_RxR1WvoDDv_udayU',
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

  const addAccount = () => {
    axios.post(api.add_accounts, modalValues, {
      headers: {
        'jwt_token': 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJicmFuZEBhZnRlcnNwYWNlLmNvLmtyIiwiaWF0IjoxNjk3MDg5ODUwLCJleHAiOjE2OTk2ODE4NTB9.UzruqCKTg-dVcqNm-vKpRf-LB7_RxR1WvoDDv_udayU',
      }
    }).then(res => {
      alert('추가 되었습니다');
      closeModal();
      getAccounts();
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
    getAccounts(search, filter, [], 0, e.target.value);
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
    getAccounts();
    defaultColumn();
  },[])

  return (
    <div className="Accounts">
      <FilterBox title='거래처 관리' search_title='거래처 찾기' filter_title='필터' handleChangeSearch={handleChangeSearch} handleClickCheckFilter={handleClickCheckFilter} filterList={filterList} />


      <div className='grid-box'>
        <div className='list-button'>
          <div className='list-button-left'>
            <ButtonNormal name='거래처 등록' bg_color='#495057' font_weight='400' icon={true} color='white' handleClick={toggleModal} />
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

      <div className='modal' style={modal ? {display: 'block'} : {display: 'none'}}>
        <div className='modal-bg'></div>
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
                  <input className='modal-col-box-input' placeholder='거래처 명을 입력하세요' onChange={e => {
                    handleOnChange(e, 'nm_kr');
                  }}/>
                </div>

                <div className='modal-col-box' style={{flexDirection: 'row', gap: '10px'}}>
                  <div className='modal-col-box'>
                    <div className='modal-col-box-title'>거래처 코드</div>
                    <input className='modal-col-box-input' onChange={e => {
                    handleOnChange(e, 'code');
                  }} />
                  </div>
                  <div className='modal-col-box'>
                    <div className='modal-col-box-title'>업종 분류</div>
                    <select className='modal-col-box-input' onChange={e => {changeSelectBox(e, 'select')}}>
                    <option value="" disabled selected>업종 선택</option>
                      {
                        sectors.map((e, i) => (
                          <option className='opt' value={e.value}>{e.name}</option>
                        ))
                      }
                    </select>
                  </div>

                </div>
              </div>

              <div className='modal-col'>
                <div className='modal-col-box'>
                  <div className='modal-col-box-title'>브랜드 명</div>
                  <input className='modal-col-box-input' placeholder='브랜드 명을 입력하세요' onChange={e => {
                    handleOnChange(e, 'brand');
                  }}/>
                </div>

                <div className='modal-col-box' style={{flexDirection: 'row', gap: '15px'}}>

                </div>
              </div>

              <div className='modal-col'>
                <div className='modal-col-box'>
                  <div className='modal-col-box-title'>주소</div>
                  <input className='modal-col-box-input' placeholder='입력' onChange={e => {
                    handleOnChange(e, 'l_address');
                  }}/>
                </div>
              </div>

              <div className='modal-col'>
                <div className='modal-col-box'>
                  <div className='modal-col-box-title'>사업자 등록번호</div>
                  <input className='modal-col-box-input' placeholder='입력' onChange={e => {
                    handleOnChange(e, 'crn');
                  }}/>
                </div>

                <div className='modal-col-box'>
                  <div className='modal-col-box-title'>전화번호</div>
                  <input className='modal-col-box-input' placeholder='숫자만 입력해주세요' onChange={e => {
                    handleOnChange(e, 'c_phone');
                  }}/>
                </div>
              </div>

              <div className='modal-col'>
                <div className='modal-col-box'>
                </div>

                <div className='modal-col-box'>
                  <div className='modal-col-box-title'>팩스 번호</div>
                  <input className='modal-col-box-input' placeholder='숫자만 입력해주세요' onChange={e => {
                    handleOnChange(e, 'c_fax');
                  }}/>
                </div>
              </div>

              <div className='modal-col'>
                <div className='modal-col-box'>
                  <div className='modal-col-box-title'>지급 방식</div>
                  <select className='modal-col-box-input' style={{color: 'black'}} onChange={e => {changeSelectBox(e, 'pay_method')}}>
                    <option value="계좌이체" selected>계좌이체</option>
                  </select>
                </div>

                <div className='modal-col-box'>
                  <div className='modal-col-box-title'>현 잔액</div>
                  <input className='modal-col-box-input' placeholder='숫자만 입력해 주세요' onChange={e => {
                    handleOnChange(e, 'c_account');
                  }}/>
                </div>
              </div>

              <div className='modal-col'>
                <div className='modal-col-box'>
                  <div className='modal-col-box-title'>입금 은행</div>
                    <select className='modal-col-box-input' onChange={ e => {changeSelectBox(e, 'bank_nm')}}>
                    <option value="" disabled selected>거래 은행을 선택해 주세요</option>
                    {
                        banks.map((e, i) => (
                          <option className='opt' value={e.value}>{e.name}</option>
                        ))
                      }
                  </select>
                </div>

                <div className='modal-col-box'>
                  <div className='modal-col-box-title'>계좌 번호</div>
                  <input className='modal-col-box-input' placeholder='숫자만 입력해 주세요' onChange={e => {
                    handleOnChange(e, 'bank_acc');
                  }}/>
                </div>
              </div>

              <div className='modal-col'>
                <div className='modal-col-box'>
                </div>

                <div className='modal-col-box'>
                  <div className='modal-col-box-title'>예금주</div>
                  <input className='modal-col-box-input' placeholder='입력' onChange={e => {
                    handleOnChange(e, 'bank_owner');
                  }}/>
                </div>
              </div>

              <div className='modal-col'>
                <div className='modal-col-box'>
                  <div className='modal-col-box-title'>대표자</div>
                  <input className='modal-col-box-input' placeholder='입력' onChange={e => {
                    handleOnChange(e, 'owener');
                  }}/>
                </div>

                <div className='modal-col-box'>
                  <div className='modal-col-box-title'>대표자 연락처</div>
                  <input className='modal-col-box-input' placeholder='숫자만 입력해주세요' onChange={e => {
                    handleOnChange(e, 'owener_phone');
                  }}/>
                </div>
              </div>

              <div className='modal-col'>
                <div className='modal-col-box'>
                  <div className='modal-col-box-title'>담당자</div>
                  <input className='modal-col-box-input' placeholder='입력' onChange={e => {
                    handleOnChange(e, 'manager');
                  }}/>
                </div>

                <div className='modal-col-box'>
                  <div className='modal-col-box-title'>담당자 연락처</div>
                  <input className='modal-col-box-input' placeholder='숫자만 입력해주세요' onChange={e => {
                    handleOnChange(e, 'manager_phone');
                  }}/>
                </div>
              </div>

              <div className='modal-col'>
                <div className='modal-col-box'>
                </div>

                <div className='modal-col-box'>
                  <div className='modal-col-box-title'>계산서 전화번호</div>
                  <input className='modal-col-box-input' placeholder='숫자만 입력해주세요' onChange={e => {
                    handleOnChange(e, 'w_b_phone');
                  }}/>
                </div>
              </div>

              <div className='modal-col'>
                <div className='modal-col-box'>
                  <div className='modal-col-box-title'>비고</div>
                  <input className='modal-col-box-input' placeholder='입력' onChange={e => {
                    handleOnChange(e, 'etc');
                  }}/>
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
  {name: '업종 분류', value: 'sector', default: true},
  {name: '브랜드 수', value: 'brand_cnt', default: true},
  {name: '대표자', value: 'owener', default: true},
  {name: '대표자 연락처', value: 'owener_phone', default: true},
  {name: '담당자', value: 'manager', default: true},
  {name: '당담자 연락처', value: 'manager_phone', default: true},
  {name: '주소', value: 'l_address'},
  {name: '현 잔액', value: 'c_account'},
  {name: '팩스', value: 'c_fax'},
  {name: '도매 주소', value: 'w_address'},
  {name: '계좌 번호', value: 'bank_acc'},
  {name: '홈페이지', value: 'homepage'},
  {name: '비고', value: 'etc'},
  {name: '지급 방식', value: 'pay_method'},
  {name: '등록 일자', value: 'reg_dt_str'},
];

const sectors = [
  {name: '도매', value: '도매'},
  {name: '소매', value: '소매'},
  {name: '수입', value: '수입'},
]

const banks = [
  {name: 'NH농협', value: 'NH농협'},
  {name: '카카오뱅크', value: '카카오뱅크'},
  {name: 'KB국민', value: 'KB국민'},
  {name: '신한', value: '신한'},
  {name: '토스뱅크', value: '토스뱅크'},
  {name: '우리', value: '우리'},
  {name: 'IBK기업', value: 'IBK기업'},
  {name: '하나', value: '하나'},
  {name: '새마을', value: '새마을'},
  {name: '케이뱅크', value: '케이뱅크'},
  {name: '신협', value: '신협'},
  {name: '우체국', value: '우체국'},
  {name: 'SC제일', value: 'SC제일'},
  {name: '씨티은행', value: '씨티은행'},
  {name: 'KDB산업은행', value: 'KDB산업은행'},
  {name: 'SBI저축은행', value: 'SBI저축은행'},
]