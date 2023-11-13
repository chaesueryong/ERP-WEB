import './Navigator.css';
import NavTab from '../NavTab/NavTab';
import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import hamburger_menu from '../../assets/images/hamburger-icon.svg';
import { useRecoilState } from 'recoil';
import { menuState } from '../../recoil/status';

function Navigator() {
  const [menu, setMenu] = useRecoilState(menuState);
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
    navigate(path);
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
      <div className='navbar'>
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