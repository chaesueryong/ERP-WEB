import '../modal.css';

function ConfirmModal({isConfirmModal, text_1, text_2, closeModal, handleConfirm}) {
    return (
        <div className="ConfirmModal">
          <div className='modal' style={isConfirmModal ? {display: 'block'} : {display: 'none'}}>
            <div className='modal-bg' style={{opacity: '0'}}></div>
            <div className='modal-content-box' style={{width: '680px', height: '257px'}}>
              <div className='modal-content' style={{alignItems: 'center', justifyContent: 'center'}}>

                <div className='order-text-1'>{
                  text_1.split('\n').map( line => {
                    return (<span>{line}<br/></span>)
                  })
                }</div>
                <div className='order-text-2'>{text_2}</div>
                <div className='order-button-box'>
                  <div className='order-cancel' onClick={closeModal}>닫기</div>
                  <div className='order-shortcuts' onClick={handleConfirm}>확인</div>
                </div>  

              </div>
            </div>
          </div>
        </div>
    );
}

export default ConfirmModal;