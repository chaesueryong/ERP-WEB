import { useEffect, useRef, useState } from 'react';
import './Products.css';
import FilterBox from '../../component/FilterBox/FilterBox';
import ButtonNormal from '../../component/ButtonNormal/ButtonNormal';

import DataGrid, { Column, Selection, HeaderFilter, Paging, Pager, Sorting, Search } from 'devextreme-react/data-grid';
import { api } from '../../api/api';
import ProductRegistrationModal from '../../component/modal/ProductRegistrationModal/ProductRegistrationModal';
import ProductOrderModal from '../../component/modal/ProductOrderModal/ProductOrderModal';
import { common } from '../../utils/common';
import FetchPanel from '../../component/FetchPanel/FetchPanel';

let totalPage = Infinity;

let _isLoading = false;
let _accountList = [];
let _search = '';
let _page = 0;

function Products() {
  const [filterList, setFilterList] = useState(filters);

    // 페이지 데이터
  const [accountList, setAccountList] = useState([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [data, setData] = useState({});

  const [target, setTarget] = useState('');
  const [fetchType, setFetchType] = useState(0);

  const dataGridRef = useRef(null);

  const [registrationModal, setRegistrationModal] = useState(false);
  const [orderModal, setOrderModal] = useState(false);
  const [isConfirmModal, setIsConfirmModal] = useState(false);
 
  const getAccountList = async(columns = [], orders = []) => {
    try{
      setFetchType(1);
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

      if(dataList.length === 0){
        setFetchType(0);
      }
    }catch(e){
      console.log(e);
      setFetchType(3);
      _page = Infinity;
    }
  }

  const addAccount = (modalValues) => {
    api.post(api.add_account, modalValues)
    .then(res => {
      alert('추가 되었습니다');
      closeModal();
      getAccountList();
    }).catch(e=>{
      alert('네트워크 에러')
      console.log(e)
    })
  }

  const registrationOrder = () => {
    setIsConfirmModal(true);
  }

  
  const closeModal = (type) => {
    switch(type){
      case 'registration':
        setRegistrationModal(false);
        break;
      case 'order':
        setOrderModal(false);
        break;
      case 'orderconfirm':
        setIsConfirmModal(false);
        setOrderModal(false);
        break;
      default:
        break;  
    }
  }

  const orderShortCut = () => {
    setIsConfirmModal(false);
    setOrderModal(false);
  }

  const openModal = (type) => {
    switch(type){
      case 'registration':
        setRegistrationModal(true);
        break;
      case 'order':
        setOrderModal(true);
        break;
      default: 
        break;  
    }
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
    common.exportExcel(e, dataGridRef);
  }

  const onIntersect = async ([entry], observer) => {
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
    <div className="Products">
      <FilterBox title='상품 관리' filter_box_border={false} handleClickCheckFilter={handleClickCheckFilter} filterList={filterList} />

      <div className='grid-box'>
        <div className='list-button'>
          <div className='list-button-left'>
            <ButtonNormal name='상품 등록' bg_color='#E7F5FF' font_weight='400' icon={false} color='#0099FF' handleClick={()=>openModal('registration')} />
            <ButtonNormal name='상품 발주' bg_color='#E7F5FF' font_weight='400' icon={false} color='#0099FF' handleClick={()=>openModal('order')} />
            {/* <ButtonNormal name='상품 관리 바로가기' bg_color='#E9ECEF' color='black' /> */}
          </div>
          <div className='list-button-right'>
            <ButtonNormal name='인쇄' bg_color='#495057' color='white' />
            <ButtonNormal name='엑셀 내려받기' bg_color='#20C997' color='white' handleClick={onExporting} />
          </div>
        </div>

        <DataGrid
          dataSource={accountList}
          keyExpr="ID"
          showBorders={true}
          showRowLines={true}
          ref={dataGridRef}
        >
          <Selection selectAllMod='allpages' showCheckBoxesMode='always' mode='multiple' />
          <HeaderFilter visible={true} allowSelectAll={false}>
            <Search enabled={true} />
          </HeaderFilter>

          <Pager visible={false} />
          <Paging pageSize={accountList.length} />
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
        
        <FetchPanel type={fetchType} />

        <div className='empty-target' ref={setTarget}></div>
      </div>

      {
        registrationModal && <ProductRegistrationModal isModal={registrationModal} closeModal={()=>closeModal('registration')} addAccount={addAccount} />
      }
      {
        orderModal && <ProductOrderModal isModal={orderModal} registrationOrder={registrationOrder} closeModal={()=>closeModal('order')} isConfirmModal={isConfirmModal} closeConfirmModal={()=>closeModal('orderconfirm')} orderShortCut={orderShortCut}  />
      }
    </div>
  );
}

export default Products;

const filters = [
  {name: '제품사진', value: 'sector', checked: true},
  {name: '컬러', value: 'brand_cnt', checked: true},
  {name: '사이즈', value: 'owener', checked: true},
  {name: '시즌', value: 'owener_phone', checked: true},
  {name: '마지막 입고일자', value: 'manager', checked: true},
  {name: '상품 분류', value: 'manager_phone', checked: true},
  {name: '원가', value: 'l_address', checked: false},
  {name: '공급가', value: 'c_account', checked: false},
  {name: '부가세', value: 'c_fax', checked: false},
  {name: '소비자가', value: 'w_address', checked: false},
  {name: '기타', value: 'bank_acc', checked: false},
];