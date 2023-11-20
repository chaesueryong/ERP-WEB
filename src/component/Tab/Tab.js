import { useRecoilValue } from 'recoil';
import './Tab.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { menuState } from '../../recoil/status';

function Tab({name, path, search, img}) {
  const menu = useRecoilValue(menuState);
  const location = useLocation();
  const navigate = useNavigate();

  function handleClick(path){
    navigate(path + search);
  }

  return (
    <div className="Tab">
        <div className="tab" onClick={() => {handleClick(path)}}>
          <div className={`tab-text ${location.pathname === path ? 'on' : ''}`} style={menu ? {display: 'none'} : {display: 'block'}}>
            {name}
          </div>
          <img className='tab-img' src={img} style={menu ? {display: 'block'} : {display: 'none'}} />
        </div>
    </div>
  );
}

export default Tab;
