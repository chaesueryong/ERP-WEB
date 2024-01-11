import { useEffect, useRef, useState } from 'react';
import './Accounts.css';
import FilterBox from '../../component/FilterBox/FilterBox';
import ButtonNormal from '../../component/ButtonNormal/ButtonNormal';

import DataGrid, { Column, Selection, HeaderFilter, Paging, Sorting, Search, ColumnFixing } from 'devextreme-react/data-grid';
import { api } from '../../api/api';
import AccountRegistrationModal from '../../component/modal/AccountRegistrationModal/AccountRegistrationModal';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { accountPageState, toastState } from '../../recoil/status';
import { debounce } from 'lodash';

let totalPage = Infinity;

let _isLoading = false;
let _accountList = [];
let _search = '';
let _page = 0;

function Accounts() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [toast, setToast] = useRecoilState(toastState);
  const location = useLocation();
  const navigate = useNavigate();
  const [accountsPage, setAccountsPage] = useRecoilState(accountPageState);
  const [target, setTarget] = useState('');

  const [modalData, setModalData] = useState({});

    // 페이지 데이터
  const [accountList, setAccountList] = useState([]);
  const [search, setSearch] = useState('');
  const [filterList, setFilterList] = useState(filters);
  const [pageSize, setPageSize] = useState(10);
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(0);
  const [data, setData] = useState({});

  const dataGridRef = useRef(null);

  const [isModal, setIsModal] = useState(false);
 
  const getAccountList = async (columns = [], orders = []) => {
    try{
      const result = await api.post(api.get_account_list, {
        search_text : _search, //검색어
        columns : ['nm_kr'], //필터
                    // 업종분류 sector, 브랜드 수 brand_cnt, 
                    // 대표자 owener, 대표자 연락처 owener_phone, 
                    // 담당자 manager, 담당자 연락처 manager_phone, 주소 l_address
                    // 현 잔액 c_account, 팩스 c_fax, 도메주소 w_address, 
                    // 계좌번호 bank_acc, 홈페이지 homepage, 비고 etc, 
                    // 지급방식 pay_method, 등록일자 reg_dt_str
        orders : ["reg_dt_str"], //오름차순- 내림차순 소팅 (컬럼명 적재 시 내림차순 적용)
                    // 업종분류 sector, 브랜드 수 brand_cnt,
                    // 대표자 owener, 대표자 연락처 owener_phone, 
                    // 담당자 manager, 담당자 연락처 manager_phone, 주소 l_address
                    // 거래처코드 code, 거래처 명 nm_kr 
       
        //"all" : "Y" // "all" :"Y" 인경우, 모든 데이터 가져오기
        //"all" : "Y" // 넣지 않은 경우 페이징 처리.
  
        size: pageSize, //페이징 처리시 사이즈 크기
        number: _page, // 페이징 인덱스(최초 0)
        use_yn:"Y"
      })

      const dataList = result.data.data.content;
    
      dataList.map((e,i) => _accountList.push({
        ...e,
        ID: i + _page * pageSize
      }))

      setAccountList([..._accountList]);

      totalPage = result.data.data.totalPages;
  
      _page++;
    }catch(e){
      console.log(e);
    }
  }

  const addAccount = (modalValues) => {
    api.post(api.add_account, modalValues)
    .then(res => {
      if(res.data.status === false){
        throw res.data.error;
      }
      
      setToast({
        visible: true,
        type: 'success',
        text: '거래처 정보가 등록되었습니다.'
      })
      closeModal();
      _page = 0;
      _accountList = [];
      getAccountList();
    }).catch(e => {
      console.log(e)
    })
  }

  const editAccount = (modalValues) => {
    api.post(api.put_account, {
      id : modalValues.id,

      nm_kr : modalValues.nm_kr,
      code : modalValues.code,
      sector: modalValues.sector,
      owener: modalValues.owener,
      owener_phone: modalValues.owener_phone,
      manager: modalValues.manager,
      manager_phone: modalValues.manager_phone,
      crn: modalValues.crn, //사업자번호
      c_phone: modalValues.c_phone,
      c_fax: modalValues.c_fax,
      pay_method_c_id: modalValues.pay_method_c_id, 
      c_account: modalValues.c_account,
      w_phone: modalValues.w_phone,
      w_b_phone: modalValues.w_b_phone,
      w_address: modalValues.w_address,
      bank_nm: modalValues.bank_nm, 
      bank_acc: modalValues.bank_acc,
      bank_owner: modalValues.bank_owner,
      l_address: modalValues.l_address,
      homepage: modalValues.homepage,
      descript: modalValues.descript,
      showOrder: modalValues.showOrder,
      etc: modalValues.etc,
      
      brand: modalValues.brand.map(e => e.id),
      
      use_yn:"Y"
    })
    .then(res => {
      if(res.data.status === false){
        throw res.data.error;
      }
      _page = 0;
      _accountList = [];

      setToast({
        visible: true,
        type: 'success',
        text: '변경 사항이 저장되었습니다.'
      })

      closeModal();
      getAccountList();
    }).catch(e => {
      console.log(e)
    })
  }

  const closeModal = () => {
    document.querySelector('html').style.overflow = 'auto';
    setIsModal(false);
  }

  const openModal = (data = null) => {
    document.querySelector('html').style.overflow = 'hidden';
    setModalData(data);
    setIsModal(true);
  }

  // 페이지 상단 필터 박스 클릭 이벤트
  const handleClickCheckFilter = (e) => {
    for(let i = 0; i < filterList.length; i++){
      if(filterList[i].name === e.target.id){
        filterList[i].checked = e.target.checked;
        break;
      }
    }

    setFilterList([...filterList]);
  }

  const onExporting = (e) => {
    // common.exportExcel(e, dataGridRef);
    api.post(api.account_excel_download, {
      "search_text" : search, //검색어
      "columns" : filterList.filter(e => e.checked).map(e => e.value), //필터
                  // 업종분류 sector, 브랜드 수 brand_cnt, 대표자 owener, 대표자 연락처 owener_phone, 담당자 manager, 담당자 연락처 manager_phone, 주소 l_address
                  // 현 잔액 c_account, 팩스 c_fax, 도메주소 w_address, 계좌번호 bank_acc, 홈페이지 homepage, 비고 etc, 지급방식 pay_method, 등록일자 reg_dt_str
      "orders" : [], //오름차순- 내림차순 소팅 (컬럼명 적재 시 내림차순 적용)
                  // 업종분류 sector, 브랜드 수 brand_cnt, 대표자 owener, 대표자 연락처 owener_phone, 담당자 manager, 담당자 연락처 manager_phone, 주소 l_address
                  // 거래처코드 code, 거래처 명 nm_kr 
      "use_yn":"Y"
    }, {
      responseType: "blob",
    })
    .then(res => {
      if(res.data.status === false){
        throw res.data.error;
      }
  
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", res.headers['excel-name']);
      link.style.cssText = "display:none";
      document.body.appendChild(link);
      link.click();
      link.remove();

    }).catch(e => {
      console.log(e)
    })
  }

  const handleChangeSearch = debounce((e) => {
    setSearch(e.target.value);
    _search = e.target.value;
    _page = 0;
    _accountList = [];
    getAccountList();
  }, 500)

  // // 페이지 네이션
  // const handlePageClick = (number) => {
  //   applyParams({page: number + 1});
  // }  

  // const changePageSize = (e) => {
  //   applyParams({
  //     page: 1,
  //     pagesize: e.target.value
  //   })
  // }

  const onRowDblClick = (e) => {
    openModal(e.data);
  }

  const onCellClick = (e) => {
    console.log(e)
  }

  // const applyParams = (params = {}) => {
  //   // console.log(params);
  //   for (const [key, value] of Object.entries(params)) {
  //     if(value === ''){
  //       searchParams.delete(key);
  //     }else{
  //       searchParams.set(key, value);
  //     }
  //   }

  //   // setSearchParams(searchParams);
  //   const _searchText = params.search || '';
  //   const _filterList = params.filters;
  //   const _pageSize = params.pagesize || pageSize;
  //   const _page = params.page || page + 1;
  //   console.log(__page);
  //   setSearch(_searchText);
  //   setPageSize(_pageSize);
  //   setPage(Number(_page));

  //   setAccountsPage({
  //     ...accountsPage,
  //     searchUrl: '?' + decodeURI(searchParams.toString())
  //   });

  //   getAccountList(_searchText, [], [], page, pageSize);
  // }

  // const getParams = () => {
  //   let searchString;
  //   if(location.search === ''){
  //     searchString = accountsPage.searchUrl.substring(1);
  //   }else {
  //     searchString = location.search.substring(1);
  //   }

  //   const obj = {};
  //   searchString.split('&').map(e => {
  //     const keyValue = e.split('=');
  //     obj[keyValue[0]] = keyValue[1];
  //   });

  //   return obj;
  // }

  const onPositionSortingChanged = (e) => {
    console.log(e)
  }

  const onIntersect = async ([entry], observer) => {
    console.log(entry.isIntersecting)
    if (entry.isIntersecting && !_isLoading && totalPage > _page) {
      observer.unobserve(entry.target);
      
      _isLoading = true;
      // 데이터를 가져오는 부분
      await getAccountList();
      _isLoading = false;
      observer.observe(entry.target);
    }
  };

  const setDefault = () => {
    totalPage = Infinity;

    _isLoading = false;
    _accountList = [];
    _search = '';
    _page = 0;
  }

  useEffect(() => {
    if(search !== ''){
      return;
    }
    let observer;
    if (target) {
      // callback 함수, option
      observer = new IntersectionObserver(onIntersect, {
        threshold: 1,
      });
      observer.observe(target); // 타겟 엘리먼트 지정
    }
    return () => {
      observer && observer.disconnect()
      setDefault();
    };
  }, [target, search]);


  return (
    <div className="Accounts">
      <FilterBox title='거래처 관리' search_title='거래처 찾기' search={search} search_placeholder='거래처명을 입력해 주세요' filter_title='필터' handleChangeSearch={handleChangeSearch} handleClickCheckFilter={handleClickCheckFilter} filterList={filterList} />

      <div className='grid-box'>
        <div className='list-button'>
          <div className='list-button-left'>
            <ButtonNormal name='거래처 등록' bg_color='#E7F5FF' font_weight='400' icon={true} color='#0099FF' handleClick={()=>openModal()} paddingTop='2' />
            {/* <ButtonNormal name='상품 관리 바로가기' bg_color='#E9ECEF' color='black' /> */}
          </div>
          <div className='list-button-right'>
            {/* <div className='render-count-title'>페이지당 항목수</div>
            <select className='render-count' value={pageSize} onChange={changePageSize}>
              <option value='10'>10</option>
              <option value='30'>30</option>
              <option value='50'>50</option>
              <option value='100'>100</option>
            </select> */}
            <ButtonNormal name='인쇄' bg_color='#495057' color='white' />
            <ButtonNormal name='엑셀 내려받기' bg_color='#20C997' color='white' handleClick={onExporting} />
          </div>
        </div>

        <DataGrid
          dataSource={accountList}
          keyExpr="ID"
          allowColumnReordering={true}
          allowColumnResizing={true}
          columnAutoWidth={true}
          showBorders={true}
          showRowLines={true}
          hoverStateEnabled={true}
          onRowDblClick={onRowDblClick}
          onCellClick={onCellClick}
          ref={dataGridRef}
          filterBuilder={filterBuilder}
        >
          {/* <Export enabled={true} /> */}
          <Selection selectAllMod='allpages' showCheckBoxesMode='always' mode='multiple' />
          <HeaderFilter visible={true} allowSelectAll={true}>
            <Search enabled={true} editorOptions={searchEditorOptions} />
          </HeaderFilter>

          <Paging pageSize={accountList.length} />
          <Sorting mode="multiple" />
          <ColumnFixing enabled={true} />

          <Column 
            caption="*거래처명" 
            fixed={true}>
            <Column
              caption="코드"
              dataField="code"
              allowSorting={onPositionSortingChanged}
            >
            </Column>
            <Column
              caption="거래처명"
              dataField="nm_kr"
              allowSorting={onPositionSortingChanged}
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
                allowSorting={onPositionSortingChanged}
              >
                <HeaderFilter visible={true} allowSelectAll={true}>
                  <Search enabled={true} />
                </HeaderFilter>
              </Column>
              )
            })
          }

        </DataGrid>

        {
          !_isLoading ? 
          
          <div>
            {/* <div>loading</div> */}
          </div> : <></>
        }

        <div className='empty-target' ref={setTarget}></div>
        {/* <PageNation first={data.first} last={data.last} empty={data.empty} totalPage={data.totalPages} number={data.number} handlePageClick={handlePageClick} /> */}
      </div>
      {
        isModal && <AccountRegistrationModal isModal={isModal} closeModal={closeModal} addAccount={addAccount} editAccount={editAccount} setData={modalData} />
      }
    </div>
  );
}

export default Accounts;

const filters = [
  {name: '업종 분류', value: 'sector', checked: true},
  {name: '브랜드 수', value: 'brand_cnt', checked: true},
  {name: '대표자', value: 'owener', checked: true},
  {name: '대표자 연락처', value: 'owener_phone', checked: true},
  {name: '담당자', value: 'manager', checked: true},
  {name: '당담자 연락처', value: 'manager_phone', checked: true},
  {name: '주소', value: 'l_address', checked: false},
  {name: '현 잔액', value: 'c_account', checked: false},
  {name: '팩스', value: 'c_fax', checked: false},
  {name: '도매 주소', value: 'w_address', checked: false},
  {name: '계좌 번호', value: 'bank_acc', checked: false},
  {name: '홈페이지', value: 'homepage', checked: false},
  {name: '비고', value: 'etc', checked: false},
  {name: '지급 방식', value: 'pay_method', checked: false},
  {name: '등록 일자', value: 'reg_dt_str', checked: false},
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
