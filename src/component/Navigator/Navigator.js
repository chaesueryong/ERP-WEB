import './Navigator.css';
import NavTab from '../NavTab/NavTab';
import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import hamburger_menu from '../../assets/images/hamburger-icon.svg';
import { useRecoilState } from 'recoil';
import { accountPageState, brandsPageState, menuState, ordersPageState, productsPageState } from '../../recoil/status';
import { useRecoilValue } from 'recoil';


function Navigator() {
  const [menu, setMenu] = useRecoilState(menuState);
  const accountsPage = useRecoilValue(accountPageState);
  const brandsPage = useRecoilValue(brandsPageState);
  const productsPage = useRecoilValue(productsPageState);
  const ordersPage = useRecoilValue(ordersPageState);


  const navigate = useNavigate();
  const location= useLocation();
  const [navList, setNavList] = useState([]);
  const inputRef = useRef(null);

  const deleteNavTab = (index) => {
    const list = navList.filter((e, i) => index !== i);
    if(list.length !== 0){
      if(index === 0){
        setNavList([...list]);
        moveTab(list[index].pathname);
      }else{
        setNavList([...list]);
        moveTab(list[index-1].pathname);
      }
    }else{
      setNavList([]);
      moveTab('/');
    }    
  }

  const moveTab = (path) => {
    inputRef.current.focus();
    console.log(path)
    switch(path){
      case '/accounts':
        navigate(path + accountsPage.searchUrl);       
        break;
      case '/brands':
        navigate(path + brandsPage.searchUrl);       
        break;
      case '/products':
        navigate(path + productsPage.searchUrl);      
        break;
      case '/orders':
        navigate(path + ordersPage.searchUrl);      
        break;
      case '/sales':
        navigate(path + ordersPage.searchUrl);    
        break;
      case '/calculate':
        navigate(path + ordersPage.searchUrl);    
        break;
      case '/inventory_management':
        navigate(path + ordersPage.searchUrl);    
        break;
      default:
        return;
    }
  }

  const addNavTab = (current) => {
    switch(current.pathname){
      case '/accounts':
        current.name = '거래처 관리';
        break;
      case '/brands':
      current.name = '브랜드 관리';
        break;
      case '/products':
        current.name = '상품관리';
        break;
      case '/orders':
        current.name = '발주/반품 내역 조회';
        break;
      case '/sales':
        current.name = '매출 관리';
        break;
      case '/calculate':
        current.name = '정산 관리';
        break;
      case '/inventory_management':
        current.name = '재고 관리';
        break;
      default:
        return;
    }

    const isTab = navList.filter((e)=>e.pathname === current.pathname).length;
    if(!isTab){
      navList.push(current);
    }

    setNavList([...navList]);
  }

  const handleKeyDown = (e) => {
    if(e.key === 'Tab'){
      e.preventDefault();
      const currentPathName = location.pathname;
      let currentIndex;
      
      for(let i = 0; i < navList.length; i++){
        if(navList[i].pathname === currentPathName){
          currentIndex = i;
        }
      }
      if(currentIndex === navList.length - 1){
        navigate(navList[0].pathname);
      }else {
        navigate(navList[currentIndex + 1].pathname);
      }
    }
  }

  const toggleMenu = () => {
    setMenu(!menu);
  }

  useEffect(()=>{
    addNavTab(location);
  },[location.pathname])

  return (
    <div className="Navigator">
      <input className='focus-input' ref={inputRef} onKeyDown={handleKeyDown} />
      <div className='navbar-left'>
        <img src={hamburger_menu} onClick={toggleMenu} />
      </div>
      <div className='navbar' style={location.pathname === '/' ? {backgroundColor : '#F8F9FA', border: 'none'} : {backgroundColor : 'white', borderLeft: '2px solid #C0C7CE', borderRight: '2px solid #C0C7CE'}}>
        {
          navList.map((e, i)=>(
            <NavTab key={i} index={i} name={e.name} pathname={e.pathname} currentPathName={location.pathname} moveTab={moveTab} deleteNavTab={deleteNavTab} />
          ))
        }
      </div>
    </div>
  );
}

export default Navigator;