import { useRecoilValue } from 'recoil';
import './Tab.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { menuState } from '../../recoil/status';
import { useState } from 'react';

function Tab({name, path, hover, search, img}) {
  const menu = useRecoilValue(menuState);
  const location = useLocation();
  const navigate = useNavigate();
  const [isHover, setIsHover] = useState(false);

  const handleClick = (path) => {
    if(search === ''){
      navigate(path + search);
    }else{
      navigate(path);
    }
  }

  const handleMouseOver = () => {
    if(!menu){
      return;
    }
    setIsHover(true);
  };

  const handleMouseOut = () => {
    setIsHover(false);
  };

  return (
    <div className="Tab">
        {/* <div className={`tab ${location.pathname === '/' ? 'home' : ''} ${menu ? 'menu' : ''}`} onClick={() => {handleClick(path)}} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}> */}
        <div className={`tab home`} style={menu ?  {width: 'auto'} :  {width: '100%'}} onClick={() => {handleClick(path)}} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
  
          {/* {
            location.pathname === '/' ? 
            <div className='tab-img-home-box' style={!menu ? {width: '60px'} : {width: 'auto'}} >
              <div className={`tab-img-hover ${isHover ? 'hover' : ''}`}>{hover}</div>
              <img src={img} />
            </div> 
            : 
            <div className='tab-img-box'>
              <div className={`tab-img-hover ${isHover ? 'hover' : ''}`}>{hover}</div>
              <img className='tab-img' src={img} style={menu ? {display: 'block'} : {display: 'none'}} />
            </div>
          } */}

            <div className='tab-img-home-box' style={!menu ? {width: '60px'} : {width: 'auto'}} >
              <div className={`tab-img-hover ${isHover ? 'hover' : ''}`}>{hover}</div>
              <img src={img} />
            </div>
          <div className={`tab-text ${location.pathname === '/' ? 'home' : ''} ${location.pathname === path.split('?')[0] ? 'on' : ''}`} style={menu ? {display: 'none'} : {display: 'block'}}>
            {name}
          </div>
        </div>
    </div>
  );
}

export default Tab;
