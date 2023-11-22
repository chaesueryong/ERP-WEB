import './Toast.css';
import { useRecoilState } from 'recoil';
import { toastState } from '../../recoil/status';
import success_check_icon from '../../assets/images/success-check-icon.svg';
import error_check_icon from '../../assets/images/error-check-icon.svg';
import { useEffect } from 'react';

function Toast() {
    const [toast, setToast] = useRecoilState(toastState);

    useEffect(() => {
        document.querySelector('html').style.overflow = 'hidden';
        setTimeout(() => {
            document.querySelector('html').style.overflow = 'auto';

            setToast({
                visible: false,
                text: '거래처 정보가 등록되었습니다.',
                type: 0
            });
        }, 1000);
    },[])

    return (
        <div className="Toast" style={toast.visible ? {display: 'flex'} : {display: 'none'}}>
            <div className='toast-background'></div>

            <div className='toast-box toast-1'>
                <img src={success_check_icon} />
                <div>{toast.text}</div>
            </div>

            <div className='toast-box toast-2'>
                <img src={error_check_icon} />
                <div>{toast.text}</div>
            </div>
        </div>
    );
}

export default Toast;
