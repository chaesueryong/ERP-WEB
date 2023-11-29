import './SelectItem.css';
import x_icon from '../../assets/images/x-icon.svg';
import white_x_icon from '../../assets/images/white-x-icon.svg';

function SelectItem({name, itemType, handleDeleteItem}) {
    return (
        <>
            {
                itemType === 0 ? 
                <div className="SelectItem">
                    {name}
                    <img className='select-item-x-button' src={x_icon} onClick={handleDeleteItem}/>
                </div>
                :
                <></>
            }
            {
                itemType === 1 ? 
                <div className="SelectItem" style={{color: '#F8F9FA', backgroundColor: '#495057', borderRadius: '31px'}}>
                    {name}
                    <img className='select-item-x-button' src={white_x_icon} onClick={handleDeleteItem}/>
                </div>
                :
                <></>
            }
        </>
    
    );
}

export default SelectItem;
