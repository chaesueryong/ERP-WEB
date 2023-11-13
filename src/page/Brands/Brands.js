import { useState, useRef, useEffect } from 'react';
import FilterBox from '../../component/FilterBox/FilterBox';
import './Brands.css';
import ButtonNormal from '../../component/ButtonNormal/ButtonNormal';

import DataGrid, { Column, Selection, HeaderFilter, Paging, Pager, Sorting, Search, SearchPanel, Export } from 'devextreme-react/data-grid';
import { Workbook } from 'exceljs';
import { saveAs } from 'file-saver-es';
import { exportDataGrid } from 'devextreme/excel_exporter';
import axios from 'axios';
import { api } from '../../api/api';
import PageNation from '../../component/PageNation/PageNation';
import AddBrandModal from '../../component/modal/AddBrandModal/AddBrandModal';

function Brands() {
  const [filterList, setFilterList] = useState(filters);

    // 페이지 데이터
  const [accountList, setAccountList] = useState([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [data, setData] = useState({});

  const dataGridRef = useRef(null);

  const [isModal, setIsModal] = useState(false);
 
  const closeModal = () => {
    setIsModal(false)
  }

  const openModal = () => {
    setIsModal(true)
  }
    const exportExcel = () => {
      onExporting();
    }
  
    const defaultModal = () => {
  
    }
  
    const handleChangeSearch = (e) => {
      setSearch(e.target.value);
      getBrandList(e.target.value, filter, [], 0, pageSize)
    }
  
    // 페이지 상단 필터 박스 클릭 이벤트
    const handleClickCheckFilter = (e) => {

      console.log(e.target.id)

      const arr = filter;
      if(e.target.checked){
        for(let i = 0; i < filterList.length; i++){
          if(filterList[i].name === e.target.id){
            arr.push(filterList[i].name);
            break;
          }
        }
      }else{
        let removeTarget = '';
        for(let i = 0; i < filterList.length; i++){
          if(filterList[i].name === e.target.id ){
            removeTarget = filterList[i].name;
          }
        }
  
        for(let j = 0; j < arr.length; j++){
          if(arr[j] === removeTarget){
            arr.splice(j, 1);
          }
        }
      
      }
      setFilter([...arr]);
      getBrandList(search, arr, [], 0, 10);

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
      getBrandList(search, filter, [], number);
    }
  
    const getBrandList = (search_text = '', categorys = [], orders = [], number = 0, pager = 10) => {
      axios.post(api.get_brand_list, {
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
  
    const addBrand = (modalValues) => {
      axios.post(api.add_brand, modalValues, {
        headers: {
          'jwt_token': 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJyb2RlY2s4MjZAb3ZlcnRoZXdpbmRvdy5uZXQiLCJpYXQiOjE2OTk4NTY1OTAsImV4cCI6MTcwMjQ0ODU5MH0.mYtaQhu_b4jAjn467i1ozS8pohTy0Ws6Q61OxVKJJXI',
        }
      }).then(res => {
        alert('추가 되었습니다');
        closeModal();
        getBrandList();
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
      getBrandList(search, filter, [], 0, e.target.value);
    }

    useEffect(() => {
      getBrandList();
    },[])

  return (
    <div className="Brands">      
      <FilterBox title='브랜드 관리' search_title='브랜드 찾기' search_placeholder='브랜드명을 입력해 주세요' filter_title='검색 필터' handleChangeSearch={handleChangeSearch} handleClickCheckFilter={handleClickCheckFilter} filterList={filterList} filter_box_border={false} check={false} />

      <div className='grid-box'>
        <div className='list-button'>
          <div className='list-button-left'>
            <ButtonNormal name='브랜드 등록' bg_color='#495057' font_weight='400' icon={true} color='white' handleClick={openModal} />
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


          <Column 
            caption="로고"
            dataField="brandImage"
            alignment='left'
          >
            <HeaderFilter visible={true} allowSelectAll={false}>
              <Search enabled={true} />
            </HeaderFilter>
          </Column>

          <Column 
            caption="브랜드 그룹"
            dataField="group_nm"
            alignment='left'
          >
            <HeaderFilter visible={true} allowSelectAll={false}>
              <Search enabled={true} />
            </HeaderFilter>
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

          <Column caption="*거래처명">
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
            alignment='left'
          >
            <HeaderFilter visible={true} allowSelectAll={false}>
              <Search enabled={true} />
            </HeaderFilter>
          </Column>

          <Column 
            caption="제품유형"
            dataField="type"
            alignment='left'
          >
            <HeaderFilter visible={true} allowSelectAll={false}>
              <Search enabled={true} />
            </HeaderFilter>
          </Column>

          <Column 
            caption="등록일자"
            dataField="reg_dt_str"
            alignment='left'
          >
            <HeaderFilter visible={true} allowSelectAll={false}>
              <Search enabled={true} />
            </HeaderFilter>
          </Column>
        

        </DataGrid>

        <PageNation first={data.first} last={data.last} empty={data.empty} totalPage={data.totalPages} number={data.number} handlePageClick={handlePageClick} />
      </div>

      {
        isModal && <AddBrandModal isModal={isModal} closeModal={closeModal} addBrand={addBrand} />
      }

    </div>
  );
}

export default Brands;

const filters = [
  {name: '스포츠웨어'},
  {name: '캐주얼'},
  {name: '아웃도어'},
  {name: '남성의류'},
  {name: '여성의류'},
  {name: '신발'},
  {name: '액세서리'},
  {name: '가방'},
  {name: '일반'},
];
