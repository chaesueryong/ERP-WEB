import { useEffect, useRef, useState } from 'react';
import './SelectBox.css';
import SelectItem from '../SelectItem/SelectItem';
import gray_plus_icon from '../../assets/images/gray-plus-icon.svg';
import black_plus_icon from '../../assets/images/black-plus-icon.svg';

function SelectBox({placeholder, emptyTitle, selectType, itemType, emptyButton, inputText, customCategoryInputText, handleChange, handleRegistryCategory, handleClickButton, handleDeleteItem, handleClickItem, searchList, addList}) {
    const [inputFocus, setInputFocus] = useState(false);

    const [categoryInput, setCategoryInput] = useState('');
    const [focusIndex, setFocusIndex] = useState(-1);

    const inputRef = useRef(null);

    const optionBoxRef = useRef(null);

    const plusImageRef = useRef(null);

    const handleOnFocus = (e) => {
        setInputFocus(true);
        console.log(e);
    }

    // const handleOnBlur = (e) => {
    //     setInputFocus(false);
    // }

    const handleOnClick = (e) => {
        inputRef.current.blur();
        setInputFocus(false);
        handleClickItem(e, selectType);
    }

    const handleOnChange = (e) => {
        handleChange(e, selectType);
        console.log(e.key);

        if(e.key === 'Enter'){
            handleOnClick(searchList[focusIndex]);
        }

        if(e.key === 'ArrowUp'){
            setFocusIndex(prev => {
                if(prev <= 0){
                    return searchList.length - 1;
                }else{
                    return prev - 1;
                }
            });
        }

        if(e.key === 'ArrowDown'){
            setFocusIndex(prev => {
                if(prev >= searchList.length - 1){
                    return 0;
                }else{
                    return prev + 1;
                }
            });
        }
    }

    const handleOnDeleteItem = (e) => {
        handleDeleteItem(e, selectType)
    }

    // 카테고리 추가
    const handleOnRegistryCategory = () => {
        console.log('등록')
        
        setCategoryInput('');
        plusImageRef.current.src = gray_plus_icon;
        plusImageRef.current.style.pointerEvents = 'none';
        handleRegistryCategory(categoryInput);
    }

    const onKeyDown = (e) => {
        console.log(e.key)
        if(e.key === 'Enter') {
            handleOnRegistryCategory();
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

        if(e.target.id === 'option'){
            return;
        }

        if(e.target.className === 'select-input-box'){
            return;
        }

        if (optionBoxRef && !optionBoxRef.current.contains(e.target)) {
            setInputFocus(false);
        }else {
            setInputFocus(true);
            console.log(true)
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
                ref={inputRef}
                placeholder={placeholder}
                onKeyUp={handleOnChange} />
            {
                selectType !== 'categorys' ?
                <div className='options-box' ref={optionBoxRef} style={inputFocus ? {display: 'block'}: {display: 'none'}}>
                    <div className='options-inner-box'>
                        <div className='empty-box' style={searchList.length === 0 ? {display: 'flex'} : {display: 'none'}}>
                            <div className='empty-text'>{emptyTitle}</div>
                            <div className='registration-button' onMouseDown={handleClickButton}>{emptyButton}</div>
                        </div>

                        <div className='options'  style={searchList.length !== 0 ? {display: 'flex'} : {display: 'none'}}>
                            {
                                searchList.map((e, i) => (
                                    <div id='option' className={`option ${focusIndex === i ? 'focus': ''}`} key={i} onMouseDown={()=>handleOnClick(e)}>{e.nm_kr}</div>
                                ))
                            }
                        </div>
                    </div>
                </div>
                :
                <div className='options-box' ref={optionBoxRef} style={inputFocus ? {display: 'block'}: {display: 'none'}}>
                    <div className='options-inner-box category'>
                        <div className='category-input-box'>
                            <input className='category-input' value={categoryInput} onChange={handleOnChangeCategory} onKeyDown={onKeyDown} />    
                            <img className='category-plus-image' ref={plusImageRef} src={gray_plus_icon} onMouseDown={handleOnRegistryCategory} />
                        </div>

                        <div className='category-bar'></div>

                        <div className='options category'  style={searchList.length !== 0 ? {display: 'flex'} : {display: 'none'}}>
                            {
                                searchList.filter(e => e.name !== '').map((e, i) => (
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
                    <SelectItem key={i} name={selectType === 'categorys' ? e.name : e.nm_kr} itemType={itemType} handleDeleteItem={() => handleOnDeleteItem(i)}  />
                ))
            }
        </div>
    </div>
  );
}

export default SelectBox;
