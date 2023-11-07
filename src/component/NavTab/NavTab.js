import './NavTab.css';
import x_icon from '../../assets/images/x-icon.svg';

function NavTab({index, name, pathname, currentPathName, moveTab, deleteNavTab}) {
    return (
        <div className="NavTab">
            <div className='nav-tap' style={currentPathName === pathname ? {backgroundColor: '#F1F3F5'} : {}} onClick={() => {
                moveTab(pathname);
            }}> 
            <div style={{overflow: 'hidden', whiteSpace: 'nowrap'}}>
                {name}
            </div>

            <img style={{width: '8px', cursor: 'pointer'}} src={x_icon} onClick={(e) => {
                e.stopPropagation();
                deleteNavTab(index);
            }}/>
            </div>
        </div>
    );
}

export default NavTab;
