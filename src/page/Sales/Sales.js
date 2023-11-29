import './Sales.css';
import FilterBox from '../../component/FilterBox/FilterBox';
import ButtonNormal from '../../component/ButtonNormal/ButtonNormal';
import DataGrid, { Column, Selection, HeaderFilter, Paging, Pager, Sorting, Search } from 'devextreme-react/data-grid';
import { useState } from 'react';
import { common } from '../../utils/common';

function Sales() {
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

  const onExporting = (e) => {
    common.exportExcel(e)
  }

  return (
    <div className="Sales">
sales

    </div>
  );
}

export default Sales;