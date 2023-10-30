import './Navigator.css';
import NavTab from '../NavTab/NavTab';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Navigator() {
  const navigate = useNavigate();
  const [navList, setNavList] = useState(list);

  const deleteNavTab = (index) => {
    setNavList(navList.filter((e, i) => index !== i))
  }

  const moveTab = (path) => {
    navigate(path);
  }

  return (
    <div className="Navigator">
      <div className='navbar'>
        {
          navList.map((e, i)=>(
            <NavTab key={i} index={i} name={e.name} path={e.path} moveTab={moveTab} deleteNavTab={deleteNavTab} />
          ))
        }
      </div>
    </div>
  );
}

export default Navigator;


const list = [{
  name: '거래처 관리',
  path: '/accounts'
},{
  name: '브랜드 관리',
  path: '/brands'
},{
  name: '상품관리',
  path: '/goods'
},{
  name: '발주/반품 내역 조회',
  path: '/orders'
},]