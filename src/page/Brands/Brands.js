import { useState, useRef, useEffect } from 'react';
import FilterBox from '../../component/FilterBox/FilterBox';
import './Brands.css';
import ButtonNormal from '../../component/ButtonNormal/ButtonNormal';

import DataGrid, { Column, Selection, HeaderFilter, Paging, Pager, Sorting, Search, SearchPanel, Export, ColumnFixing } from 'devextreme-react/data-grid';
import { api } from '../../api/api';
import PageNation from '../../component/PageNation/PageNation';
import BrandRegistrationModal from '../../component/modal/BrandRegistrationModal/BrandRegistrationModal';
import { common } from '../../utils/common';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { brandsPageState, toastState } from '../../recoil/status';

import no_image_icon from '../../assets/images/no-image-icon.svg';
import { debounce } from 'lodash';


let totalPage = Infinity;

let _isLoading = false;
let _brandList = [];
let _search = '';
let _page = 0;

function Brands() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [toast, setToast] = useRecoilState(toastState);
  const location = useLocation();
  const navigate = useNavigate();
  const [brandsPage, setBrandsPage] = useRecoilState(brandsPageState);

  const [target, setTarget] = useState('');

  const [modalData, setModalData] = useState({});


    // 페이지 데이터
  const [brandList, setBrandList] = useState([]);
  const [search, setSearch] = useState('');
  const [filterList, setFilterList] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(0);
  const [data, setData] = useState({});

  const dataGridRef = useRef(null);

  const [isModal, setIsModal] = useState(false);

  const getBrandList = async (orders = []) => {
    try{
      const result = await api.post(api.get_brand_list, {
        "search_text" : _search, //검색어
        "categorys" : filterList.filter(e => e.checked).map(e => e.name), //카테고리
        "orders" : ["reg_dt_str"], //오름차순- 내림차순 소팅 (컬럼명 적재 시 내림차순 적용)
        // 브랜드 그룹 group_nm, 브랜드 명 nm_kr, 브랜드 코드 code, 거래처 코드 vendor_code, 거래처명 vendor_nm, 상품 카테고리 categorys
        // 제품유형 type, 등록일자 reg_dt_str
        
        //"all" : "Y" // "all" :"Y" 인경우, 모든 데이터 가져오기
        //"all" : "Y" // 넣지 않은 경우 페이징 처리.
  
        "size": pageSize, //페이징 처리시 사이즈 크기
        "number": _page, // 페이징 인덱스(최초 0)
        "use_yn":"Y"
      })
      const dataList = result.data.data.content;
    
      dataList.map((e,i) => _brandList.push({
        ...e,
        ID: i + _page * pageSize,
        categorys: e.categorys ? e.categorys.split(',') : [],
        vendor: e.vendor ? e.vendor : [],
      }))

      setBrandList([..._brandList]);

      totalPage = result.data.data.totalPages;
  
      _page++;
    }catch(e) {
      console.log(e);
    }

  }

  const addBrand = (modalValues) => {
    api.post(api.add_brand, {
      ...modalValues,
      categorys: modalValues['categorys'].map(e => e.name).join(","),
      vendor: modalValues['vendor'].map(e => e.id),
    })
    .then(res => {
      if(res.data.status === false){
        throw res.data.error;
      }

      setToast({
        visible: true,
        type: 'success',
        text: '브랜드 정보가 등록되었습니다.'
      })

      closeModal();

      _page = 0;
      _brandList = [];
      getBrandList();
    }).catch(e=>{
      console.log(e)
    })
  }

  const editBrand = (modalValues) => {
    api.post(api.put_brand, {
      id: modalValues.id,
      ...modalValues,
      categorys: modalValues['categorys'].map(e => e.name).join(","),
      vendor: modalValues['vendor'].map(e => e.id)
    })
    .then(res => {
      if(res.data.status === false){
        throw res.data.error;
      }

      _page = 0;
      _brandList = [];

      setToast({
        visible: true,
        type: 'success',
        text: '변경 사항이 저장되었습니다.'
      })

      closeModal();
      getBrandList();
    }).catch(e => {
      console.log(e)
    })
  }
 
  const closeModal = () => {
    document.querySelector('html').style.overflow = 'auto';
    setIsModal(false)
  }

  const openModal = (data = null) => {
    document.querySelector('html').style.overflow = 'hidden';
    setModalData(data);
    setIsModal(true)
  }
  
  // 페이지 상단 필터 박스 클릭 이벤트
  const handleClickCheckFilter = (e) => {
    for(let i = 0; i < filterList.length; i++){
      if(filterList[i].name === e.target.id){
        filterList[i].checked = e.target.checked;
        break;
      }
    }

    _page = 0;
    _brandList = [];

    setFilterList(prev => [...filterList]);

    getBrandList();
  }

  const onExporting = (e) => {
    // common.exportExcel(e, dataGridRef);
    api.post(api.brand_excel_download, {
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
    _brandList = [];
    getBrandList();
  }, 500)


  const onRowDblClick = (target) => {
    openModal(brandList.filter(e => e.id === target.data.id)[0]);
  }

  const onCellClick = (e) => {
    console.log(e)
  }


  const cellRender = (data) => {
    return <img style={{width: '100%', height: '85px', objectFit: 'contain'}} src={data.value} onError={(e) => {
      e.target.src = no_image_icon;
    }} />;
  }

  const getCategory = async () => {
    const categoryList = (await api.post(api.get_brand_category_list, {})).data.data;

    const arr = categoryList.map(e => ({
      name: e,
      checked: false
    }));

    setFilterList([...arr])
  }

  const onIntersect = async ([entry], observer) => {
    if (entry.isIntersecting && !_isLoading && totalPage > _page) {
      observer.unobserve(entry.target);
      _isLoading = true;
      // 데이터를 가져오는 부분
      await getBrandList();
      _isLoading = false;
      observer.observe(entry.target);
    }
  };

  const setDefault = () => {
    totalPage = Infinity;

    _isLoading = false;
    _brandList = [];
    _search = '';
    _page = 0;
  }

  useEffect(() => {
    getCategory();
  }, []);

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
  }, [target, search, filterList]);

  return (
    <div className="Brands">      
      <FilterBox title='브랜드 관리' search_title='브랜드 찾기' search_placeholder='브랜드명을 입력해 주세요' filter_title='검색 필터' handleChangeSearch={handleChangeSearch} handleClickCheckFilter={handleClickCheckFilter} filterList={filterList} filter_box_border={false} isCheckButton={false} />

      <div className='grid-box'>
        <div className='list-button'>
          <div className='list-button-left'>
            <ButtonNormal name='브랜드 등록' bg_color='#E7F5FF' font_weight='400' icon={true} color='#0099FF' handleClick={()=>openModal()} />
            {/* <ButtonNormal name='상품 관리 바로가기' bg_color='#E9ECEF' color='black' /> */}
          </div>
          <div className='list-button-right'>
            {/* <div className='render-count-title'>페이지당 항목수</div>
            <select className='render-count' onChange={changePager}>
              <option value='10'>10</option>
              <option value='30'>30</option>
              <option value='50'>50</option>
              <option value='100'>100</option>
            </select> */}
            {/* <ButtonNormal name='인쇄' bg_color='#E9ECEF' color='black' /> */}
            <ButtonNormal name='엑셀 내려받기' bg_color='#20C997' color='white' handleClick={onExporting} />
          </div>
        </div>

        <DataGrid
          dataSource={brandList.map((e,i)=>({
            ...e,
            categorys: e.categorys ? e.categorys.map(e => '#' + e).join(' ') : '',
            ID: i
          }))}
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

          <Pager visible={false} />
          <Paging pageSize={brandList.length} />
          <Sorting mode="multiple" />
          <ColumnFixing enabled={true} />

          <Column 
            caption="로고"
            dataField="brandImage"
            width={100}
            cellRender={cellRender}
          >
            <HeaderFilter visible={true} allowSelectAll={false}>
              <Search enabled={true} />
            </HeaderFilter>
          </Column>

          <Column 
            caption="브랜드 그룹"
            dataField="group_nm"
          >
            <HeaderFilter visible={true} allowSelectAll={false}>
              <Search enabled={true} />
            </HeaderFilter>
          </Column>

          <Column 
            caption="*브랜드명"
            fixed={true}>
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
            caption="*거래처명"
            fixed={true}>
            <Column
              caption="코드"
              dataField="vendor_code"
              sortOrder=""
            >
            </Column>
            <Column
              caption="거래처명"
              dataField="vendor_nm"
              sortOrder=""
            >
              <HeaderFilter visible={true} allowSelectAll={false}>
                <Search enabled={true} />
              </HeaderFilter>
            </Column>
          </Column>

          <Column 
            caption="상품 카테고리"
            dataField="categorys"
          >
            <HeaderFilter visible={true} allowSelectAll={false}>
              <Search enabled={true} />
            </HeaderFilter>
          </Column>

          <Column 
            caption="제품유형"
            dataField="type"
          >
            <HeaderFilter visible={true} allowSelectAll={false}>
              <Search enabled={true} />
            </HeaderFilter>
          </Column>

          <Column 
            caption="등록일자"
            dataField="reg_dt_str"
          >
            <HeaderFilter visible={true} allowSelectAll={false}>
              <Search enabled={true} />
            </HeaderFilter>
          </Column>
        

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
        isModal && <BrandRegistrationModal isModal={isModal} closeModal={closeModal} addBrand={addBrand} editBrand={editBrand} setData={modalData} />
      }

    </div>
  );
}

export default Brands;

const filters = [
  {name: '스포츠웨어', checked: false},
  {name: '캐주얼', checked: false},
  {name: '아웃도어', checked: false},
  {name: '남성의류', checked: false},
  {name: '여성의류', checked: false},
  {name: '신발', checked: false},
  {name: '액세서리', checked: false},
  {name: '가방', checked: false},
  {name: '일반', checked: false},
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

const searchEditorOptions = { placeholder: ''};