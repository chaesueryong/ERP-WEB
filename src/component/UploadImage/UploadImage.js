import './UploadImage.css';

function UploadImage({base64, setBase64}) {

    const onUploadImage = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);

        return new Promise((resolve) => { 
            reader.onload = () => {	
                setBase64(reader.result || '');
                resolve();
            };
        });
    }

    return (
        <div className="UploadImage">
            <div className='upload-image-box'>
                <div className='image-text-box'></div>
            </div>
            <div className='upload-image-box'>

                <label className='upload-button' htmlFor='upload' style={base64 !== '' ? {display: 'none'} : {display: 'flex'}}>
                    <div>클릭하여</div>
                    <div>이미지 추가하기</div>
                </label>

                <img className='preview' src={base64}  style={base64 !== '' ? {display: 'inline'} : {display: 'none'}} />

                <input id='upload' className='upload' type='file' accept='image/*' onChange={onUploadImage} />
            </div>
        </div>
    );
}

export default UploadImage;
