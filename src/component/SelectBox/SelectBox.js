import { useRef, useState } from 'react';
import './SelectBox.css';
import SelectItem from '../SelectItem/SelectItem';

function SelectBox({placeholder, emptyTitle, emptyButton, inputText, handleChange, handleClickButton, handleDeleteItem, handleClickItem, searchList, addList}) {
    const [inputFocus, setInputFocus] = useState(false);

    const optionBoxRef = useRef(null);

    const handleOnFocus = (e) => {
        setInputFocus(true);
    }

    const handleOnBlur = (e) => {
        setInputFocus(false);
    }

    const handleOnClick = (e) => {
        handleClickItem(e);
        setInputFocus(false);
    }

    const handleOnDeleteItem = (e) => {
        handleDeleteItem(e)
    }

  return (
    <div className="SelectBox">
        <div className='select-box-left'>
            <input className='select-input-box'
                defaultValue={inputText} 
                onBlur={handleOnBlur}
                onFocus={handleOnFocus}
                placeholder={placeholder}
                onChange={handleChange} />
            <div className='options-box' ref={optionBoxRef} style={inputFocus ? {display: 'block'}: {display: 'none'}}>
                <div className='options-inner-box'>
                    <div className='empty-box' style={searchList.length === 0 ? {display: 'flex'} : {display: 'none'}}>
                        <div className='empty-text'>{emptyTitle}</div>
                        <div className='registration-button' onMouseDown={handleClickButton}>{emptyButton}</div>
                    </div>

                    <div className='options'  style={searchList.length !== 0 ? {display: 'flex'} : {display: 'none'}}>
                        {
                            searchList.map((e, i) => (
                                <div key={i} onMouseDown={()=>handleOnClick(e)}>{e.nm_kr}</div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
        <div className='select-box-right'>
            {
                addList.map((e, i) => 
                (
                    <SelectItem key={i} name={e.nm_kr} handleDeleteItem={() => handleOnDeleteItem(i)}  />
                ))
            }
        </div>
    </div>
  );
}

export default SelectBox;
