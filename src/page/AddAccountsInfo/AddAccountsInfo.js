import { useEffect, useRef, useState } from 'react';
import './AddAccountsInfo.css';
import DataGrid, { Column, Selection, HeaderFilter, Paging, Sorting, Search, ColumnFixing } from 'devextreme-react/data-grid';
import { api } from '../../api/api';
import { useRecoilState } from 'recoil';
import { toastState } from '../../recoil/status';
import { debounce } from 'lodash';
import long_back_icon from '../../assets/images/long-back-icon.svg';
import { useNavigate } from 'react-router-dom';
import FetchPanel from '../../component/FetchPanel/FetchPanel';

let totalPage = Infinity;

let _isLoading = false;
let _accountList = [];
let _search = '';
let _page = 0;

function AddAccountsInfo() {
    const navigate = useNavigate();

  const [toast, setToast] = useRecoilState(toastState);
  const [target, setTarget] = useState('');
  const [selectionArr, setSelectionArr] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState('');

  const [modalData, setModalData] = useState({});
  const [fetchType, setFetchType] = useState(0);

    // 페이지 데이터
  const [accountList, setAccountList] = useState([]);
  const [search, setSearch] = useState('');
  const [filterList, setFilterList] = useState(filters);
  const [pageSize, setPageSize] = useState(10);

  const dataGridRef = useRef(null);
  const buttonRef = useRef(null);

  const [isModal, setIsModal] = useState(false);
 
  const getAccountList = async (columns = [], orders = []) => {
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

  const openModal = (data = null) => {
    document.querySelector('html').style.overflow = 'hidden';
    setModalData(data);
    setIsModal(true);
  }

  const onRowDblClick = (e) => {
    // openModal(e.data);
  }

  const onCellClick = (e) => {
    console.log(e)
  }

  const onPositionSortingChanged = (e) => {
    console.log(e)
  }

  const goBack = () => {
    navigate(-1);
  }


  const onSelectionChanged = ({selectedRowKeys}) => {
    console.log(selectedRowKeys);
    if(selectedRowKeys.length === 0){
      buttonRef.current.style.color = '#ADB5BD';
      buttonRef.current.style.backgroundColor = '#E9ECEF';
    }else {
      if(selectedAccount !== ''){
        buttonRef.current.style.color = 'white';
        buttonRef.current.style.backgroundColor = '#20C997';
      }
    }
    setSelectionArr(selectedRowKeys);
  }

  const changeSelectBox = (e) => {
    setSelectedAccount(e.target.value)

    if(e.target.selectedIndex === 0){
        e.target.style.color = '#C0C7CE';
    }else {
        e.target.style.color = 'black';
        buttonRef.current.style.color = 'white';
        buttonRef.current.style.backgroundColor = '#20C997';
    }
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
    <div className="AddAccountsInfo">
        <div className="FilterBox" style={{border: 'none'}}>
            <div className='filter-back-box' onClick={() => goBack()}>
                <img src={long_back_icon} alt='' />
                <div>뒤로가기</div>
            </div>
            <div className='filter-title'>
                거래처 정보 추가하기
            </div>

            <div className='filter-select-box' style={selectionArr.length === 0 ? {pointerEvents: 'none'} : {pointerEvents: 'auto'}}>
                <select className='filter-select' value={selectedAccount} onChange={changeSelectBox}>
                    <option value='' disabled>거래처 선택</option>
                    <option className='opt' value='1'>asdf</option>
                </select>
                <div ref={buttonRef}>
                    거래처 정보 일괄 등록
                </div>
            </div>
        </div>
      <div className='grid-box'>

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
          onSelectionChanged={onSelectionChanged}
          ref={dataGridRef}
          filterBuilder={filterBuilder}
        >

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

    </div>
  );
}

export default AddAccountsInfo;

const filters = [
  {name: '제품사진', value: 'sector', checked: true},
  {name: '*상품 명', value: 'brand_cnt', checked: true},
  {name: '상품 분류', value: 'owener', checked: true},
  {name: '컬러', value: 'owener_phone', checked: true},
  {name: '사이즈', value: 'manager', checked: true},
  {name: '상품 분류', value: 'manager_phone', checked: true},
  {name: '시즌', value: 'l_address', checked: true},
  {name: '입고 수량', value: 'c_account', checked: true},
  {name: '판매 수량', value: 'c_fax', checked: true},
  {name: '현재 재고', value: 'w_address', checked: true},
  {name: '중복 여부', value: 'bank_acc', checked: true},
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
