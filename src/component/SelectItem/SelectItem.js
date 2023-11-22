import './SelectItem.css';
import x_icon from '../../assets/images/x-icon.svg';

function SelectItem({name, handleDeleteItem}) {
    return (
        <div className="SelectItem">
            {name}
            <img className='select-item-x-button' src={x_icon} onClick={handleDeleteItem}/>
        </div>
    );
}

export default SelectItem;
