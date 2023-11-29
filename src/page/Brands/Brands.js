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

function Brands() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [toast, setToast] = useRecoilState(toastState);
  const location = useLocation();
  const navigate = useNavigate();
  const [brandsPage, setBrandsPage] = useRecoilState(brandsPageState);
  const [isLoading, setLoading] = useState(false);
  const target = useRef(null);

  const [modalData, setModalData] = useState({});


    // 페이지 데이터
  const [brandList, setBrandList] = useState([]);
  const [search, setSearch] = useState('');
  const [filterList, setFilterList] = useState([]);
  const [pageSize, setPageSize] = useState(30);
  const [page, setPage] = useState(0);
  const [data, setData] = useState({});

  const dataGridRef = useRef(null);

  const [isModal, setIsModal] = useState(false);

  const getBrandList = (search_text = '', categorys = [], orders = [], number = 0, pager = 10) => {
    setLoading(true);
    api.post(api.get_brand_list, {
      "search_text" : search_text, //검색어
      "categorys" : categorys, //카테고리
      "orders" : ["nm_kr"], //오름차순- 내림차순 소팅 (컬럼명 적재 시 내림차순 적용)
      // 브랜드 그룹 group_nm, 브랜드 명 nm_kr, 브랜드 코드 code, 거래처 코드 vendor_code, 거래처명 vendor_nm, 상품 카테고리 categorys
      // 제품유형 type, 등록일자 reg_dt_str
      
      //"all" : "Y" // "all" :"Y" 인경우, 모든 데이터 가져오기
      //"all" : "Y" // 넣지 않은 경우 페이징 처리.

      "size": pager, //페이징 처리시 사이즈 크기
      "number": number, // 페이징 인덱스(최초 0)
      "use_yn":"Y"
    })
    .then(res => {
      setBrandList(res.data.data.content.map((e,i)=>({
        ...e,
        categorys: e.categorys ? e.categorys.split(',').map(e => '#' + e).join(' ') : '',
        brandImage: no_image_icon,
        ID: i
      }))
      
      )
      setData(res.data.data);
    }).catch(e => {
      alert('네트워크 에러')
      console.log(e)
    }).finally(() => {
      setLoading(false);
    })
  }

  const addBrand = (modalValues) => {
    api.post(api.add_brand, modalValues)
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
        getBrandList();
      }).catch(e=>{
        alert('네트워크 에러')
        console.log(e)
      })
  }

  const editBrand = (modalValues) => {
    api.post(api.put_brand, {
      id : modalValues.id,

      // nm_kr : modalValues.nm_kr,
      // code : modalValues.code,
      // sector: modalValues.sector,//공통 테이블 nm_en : 'SECTOR'
      // owener: modalValues.owener,
      // owener_phone: modalValues.owener_phone,
      // manager: modalValues.manager,
      // manager_phone: modalValues.manager_phone,
      // crn: modalValues.crn, //사업자번호
      // c_phone: modalValues.c_phone,
      // c_fax: modalValues.c_fax,
      // pay_method_c_id: modalValues.pay_method_c_id, //공통 테이블 nm_en : 'PAYMETHOD'
      // c_account: modalValues.c_account,
      // w_phone: modalValues.w_phone,
      // w_b_phone: modalValues.w_b_phone,
      // w_address: modalValues.w_address,
      // bank_nm: modalValues.bank_nm, //공통 테이블 nm_en : 'BANK'
      // bank_acc: modalValues.bank_acc,
      // bank_owner: modalValues.bank_owner,
      // l_address: modalValues.l_address,
      // homepage: modalValues.homepage,
      // descript: modalValues.descript,
      // showOrder: modalValues.showOrder,
      // etc: modalValues.etc,
      
      // brand: modalValues.brand.map(e => e.id),
      
      use_yn:"Y"
    })
    .then(res => {
      if(res.data.status === false){
        throw res.data.error;
      }
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

    setFilterList([...filterList]);

    applyParams({
      filters: filterList.filter(e => e.checked)
    });
  }


  const handleChangeSearch = (e) => {
    setSearch(e.target.value);
    getBrandList(e.target.value, filterList, [], 0, pageSize)
  }

  // 페이지 네이션
  const handlePageClick = (number) => {
    getBrandList(search, filterList, [], number);
  }
  
  const onExporting = (e) => {
    common.exportExcel(e, dataGridRef);
  }

  const changePager = (e) => {
    setPageSize(e.target.value);
    getBrandList(search, filterList, [], 0, e.target.value);
  }

  const onRowDblClick = (e) => {
    openModal(e.data);
  }

  const applyParams = (params = {}) => {
    for (const [key, value] of Object.entries(params)) {

      switch(key){
        case 'filters':
          if(value.length === 0){
            searchParams.delete(key);
          }else{
            const _value = value.reduce((a, c, i) => {
              if(i === 0){
                if(c.name === undefined){
                  return c;
                }else {
                  return c.name;
                }
              }else {
                if(c.name === undefined){
                  return a + '_' + c;
                }else {
                  return a + '_' + c.name;
                }
              }
            }, '')

            searchParams.set(key, _value);
          }
          break;
        default:
          if(value === 0){
            searchParams.delete(key);
          }else{
            searchParams.set(key, value);
          }
          break;
      }
    }

    setSearchParams(searchParams);
    const _searchText = params.search || '';
    const _filterList = params.filters === undefined ? [] : params.filters.map(e => {
      if(e != null && e.constructor.name === "Object"){
        return e.name;
      }else {
        return e;
      }
    });
    const _pageSize = params.pagesize || pageSize;
    const _page = params.page || page;

    console.log(filterList)
    setSearch(_searchText);
    setFilterList([...filterList.map((e, i) => {

      for(let j = 0; j < _filterList.length; j++){
        if(_filterList[j] === e.name){
          e.checked = true;
          break;
        }
      }
      return e;
    })])
    setPageSize(_pageSize);
    setPage(_page);

    setBrandsPage({
      ...brandsPage,
      searchUrl: '?' + decodeURI(searchParams.toString())
    });

    getBrandList(_searchText, _filterList, [], _page - 1, _pageSize);
  }

  const getParams = () => {
    let searchString;
    if(location.search === ''){
      searchString = brandsPage.searchUrl.substring(1);
    }else {
      searchString = location.search.substring(1);
    }

    const obj = {};

    searchString.split('&').map(e => {
      const keyValue = e.split('=');
      switch(keyValue[0]){
        case 'filters':
          obj[keyValue[0]] = decodeURI(keyValue[1]).split('_');
          break;
        default:
          obj[keyValue[0]] = keyValue[1];
          break;  
      }
      return; 
    });

    console.log(obj)
    return obj;
  }

  const options = {
    threshold: 1.0,
  };

  const callback = () => {
    // if(isLoading) return;

    console.log('관측되었습니다')
    // applyParams({
    //   page: Number(_page) + 1
    // });
  };

  const observer = new IntersectionObserver(callback, options);

  const cellRender = (data) => {
    return <img src={data.value} />;
  }

  const getCategory = async () => {
    const categoryList = (await api.post(api.get_brand_category_list, {})).data.data;

    const arr = categoryList.map(e => ({
      name: e,
      checked: false
    }));

    setFilterList(arr)
  }

  const init = async () => {
    observer.observe(target.current);
    getCategory();
    applyParams(getParams());
  }

  useEffect(() => {
    init();
  },[])

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
          dataSource={brandList}
          keyExpr="ID"
          allowColumnReordering={true}
          allowColumnResizing={true}
          columnAutoWidth={true}
          showBorders={true}
          showRowLines={true}
          hoverStateEnabled={true}
          onRowDblClick={onRowDblClick}
          ref={dataGridRef}
          filterBuilder={filterBuilder}
        >

          {/* <Export enabled={true} /> */}
          <Selection selectAllMod='allpages' showCheckBoxesMode='always' mode='multiple' />
          <HeaderFilter visible={true} allowSelectAll={true}>
            <Search enabled={true} editorOptions={searchEditorOptions} />
          </HeaderFilter>

          <Pager visible={false} />
          <Paging pageSize={pageSize} />
          <Sorting mode="multiple" />
          <ColumnFixing enabled={true} />

          <Column 
            caption="로고"
            dataField="brandImage"
            fixed={true}
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
            fixed={true}
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
          !isLoading ? 
          
          <div>
            {/* <div>loading</div> */}
          </div> : <></>
        }
        <div className='empty-target' ref={target}></div>
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