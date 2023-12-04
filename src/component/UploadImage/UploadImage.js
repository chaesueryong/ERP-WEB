import { useRef, useState } from 'react';
import './UploadImage.css';
import x_icon from '../../assets/images/x-icon.svg';

function UploadImage({base64, leftBox = true, type = 0, setBase64}) {
    const [imageName, setImageName] = useState('');

    const inputFile = useRef(null);
    
    const onUploadImage = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);

        return new Promise((resolve) => { 
            reader.onload = () => {	
                setImageName(file.name);
                setBase64(reader.result || '');
                resolve();
            };
        });
    }

    const deleteImage = (e) => {
        setBase64('');
        setImageName('');
        inputFile.current.value = '';
    }

    return (
        <div className="UploadImage">
            <div className='upload-image-box left-set' style={leftBox ? {display: 'flex'} : {display: 'none'}}>
                <div className='image-text-box'></div>
                <div className='image-name' style={base64 !== '' ?  {display: 'flex'} : {display: 'none'}}>{imageName}
                    <img style={{cursor: 'pointer'}} src={x_icon} onClick={deleteImage} />
                </div>
            </div>
            <div className='upload-image-box'>

                {
                    type === 0 ?
                    <label className='upload-button' htmlFor='upload' style={base64 !== '' ? {display: 'none'} : {display: 'flex'}}>
                        <div>클릭하여</div>
                        <div>이미지 추가하기</div>
                    </label>
                    :
                    <></>
                }

                {
                    type === 1 ?
                    <label className='upload-button product' htmlFor='upload' style={base64 !== '' ? {display: 'none'} : {display: 'flex'}}>
                        <div>클릭하여</div>
                        <div>이미지 추가하기</div>
                    </label>
                    :
                    <></>
                }

                <img className='preview' src={base64} onError={(e) => {
                    setBase64('');
                    e.target.src = '';
                    }}  style={base64 !== '' ? {display: 'inline'} : {display: 'none'}} />

                <input id='upload' className='upload' ref={inputFile} type='file' accept='image/*' onChange={onUploadImage} />
            </div>
        </div>
    );
}

export default UploadImage;
