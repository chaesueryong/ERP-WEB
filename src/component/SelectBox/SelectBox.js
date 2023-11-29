import { useEffect, useRef, useState } from 'react';
import './SelectBox.css';
import SelectItem from '../SelectItem/SelectItem';
import gray_plus_icon from '../../assets/images/gray-plus-icon.svg';
import black_plus_icon from '../../assets/images/black-plus-icon.svg';

function SelectBox({placeholder, emptyTitle, selectType, itemType, emptyButton, inputText, handleChange, handleClickButton, handleDeleteItem, handleClickItem, searchList, addList}) {
    const [inputFocus, setInputFocus] = useState(false);

    const [categoryInput, setCategoryInput] = useState('');

    const optionBoxRef = useRef(null);

    const plusImageRef = useRef(null);

    const handleOnFocus = (e) => {
        setInputFocus(true);
    }

    // const handleOnBlur = (e) => {
    //     setInputFocus(false);
    // }

    const handleOnClick = (e) => {
        handleClickItem(e, selectType);
        setInputFocus(false);
    }

    const handleOnDeleteItem = (e) => {
        handleDeleteItem(e, selectType)
    }

    // 카테고리 추가
    const handleRegistryCategory = (e) => {
        console.log(e);
    }

    const onKeyDown = (e) => {
        if(e.key === 'Enter') {
            handleRegistryCategory();
        }
    }

    const handleOnChangeCategory = (e) => {
        if(e.target.value === ''){
            plusImageRef.current.src = gray_plus_icon;
            plusImageRef.current.style.pointerEvents = 'none';
        }else {
            plusImageRef.current.src = black_plus_icon;
            plusImageRef.current.style.pointerEvents = 'auto';
        }
        setCategoryInput(e.target.value);
    }

    const handleClickOutside = (e) => {
        if (optionBoxRef && !optionBoxRef.current.contains(e.target)) {
            setInputFocus(false);
        }else {
            setInputFocus(true);
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);

        return()=>{
          document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [])
  return (
    <div className="SelectBox">
        <div className='select-box-left'>
            <input className='select-input-box'
                defaultValue={inputText} 
                // onBlur={handleOnBlur}
                onFocus={handleOnFocus}
                placeholder={placeholder}
                onChange={handleChange} />
            {
                selectType !== 'category' ?
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
                :
                <div className='options-box' ref={optionBoxRef} style={inputFocus ? {display: 'block'}: {display: 'none'}}>
                    <div className='options-inner-box category'>
                        <div className='category-input-box'>
                            <input className='category-input' onChange={handleOnChangeCategory} onKeyDown={onKeyDown} />    
                            <img className='category-plus-image' ref={plusImageRef} src={gray_plus_icon} onMouseDown={handleRegistryCategory} />
                        </div>

                        <div className='category-bar'></div>

                        <div className='options category'  style={searchList.length !== 0 ? {display: 'flex'} : {display: 'none'}}>
                            {
                                searchList.map((e, i) => (
                                    <div className='item-category' key={i} onMouseDown={()=>handleOnClick(e)}>{e.name}</div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            }

        </div>
        <div className='select-box-right'>
            {
                addList.map((e, i) => 
                (
                    <SelectItem key={i} name={selectType === 'category' ? e.name : e.nm_kr} itemType={itemType} handleDeleteItem={() => handleOnDeleteItem(i)}  />
                ))
            }
        </div>
    </div>
  );
}

export default SelectBox;
