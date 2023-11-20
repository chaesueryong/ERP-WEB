import { useRef, useState } from 'react';
import './SelectBox.css';

function SelectBox({placeholder, emptyTitle, emptyButton, inputText, handleChange, handleClickButton, handleClickItem, list}) {
    const [inputFocus, setInputFocus] = useState(false);

    const optionBoxRef = useRef(null);

    const handleOnFocus = (e) => {
        setInputFocus(true);
    }

    const handleOnBlur = (e) => {
        if(optionBoxRef.current.className === 'options-box'){
            return;
        }
        setInputFocus(false);
    }

    const handleOnClick = (e) => {
        handleClickItem(e);
        setInputFocus(false);
    }

  return (
    <div className="SelectBox">
        <input className='select-input-box'
            defaultValue={inputText} 
            onBlur={handleOnBlur}
            onFocus={handleOnFocus}
            placeholder={placeholder}
            onChange={handleChange} />
        <div className='options-box' ref={optionBoxRef} style={inputFocus ? {display: 'block'}: {display: 'none'}}>
            <div className='options-inner-box'>
                <div className='empty-box' style={list.length === 0 ? {display: 'flex'} : {display: 'none'}}>
                    <div className='empty-text'>{emptyTitle}</div>
                    <div className='registration-button' onClick={handleClickButton}>{emptyButton}</div>
                </div>

                <div className='options'  style={list.length !== 0 ? {display: 'flex'} : {display: 'none'}}>
                    {
                        list.map((e, i) => (
                            <div key={i} onClick={() => {handleOnClick(e)}}>{e.nm_kr}</div>
                        ))
                    }
                </div>
            </div>
        </div>
    </div>
  );
}

export default SelectBox;
