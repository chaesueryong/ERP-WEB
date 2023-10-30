import './NavTab.css';
import x_icon from '../../assets/images/x-icon.svg';
import { useLocation } from 'react-router-dom';

function NavTab({index, name, path, moveTab, deleteNavTab}) {
    const location = useLocation();
    
    return (
        <div className="NavTab">
            <div className='nav-tap' style={location.pathname === path ? {backgroundColor: '#7B61FF1A'} : {}} onClick={() => {
                moveTab(path);
            }}> 
            <div style={{overflow: 'hidden', whiteSpace: 'nowrap'}}>
                {name}
            </div>

            <img style={{width: '8px', cursor: 'pointer'}} src={x_icon} onClick={() => {
                deleteNavTab(index);
            }}/>
            </div>
        </div>
    );
}

export default NavTab;
