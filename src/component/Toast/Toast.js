import './Toast.css';
import { useRecoilState } from 'recoil';
import { toastState } from '../../recoil/status';
import success_check_icon from '../../assets/images/success-check-icon.svg';
import error_check_icon from '../../assets/images/error-check-icon.svg';
import { useEffect } from 'react';

function Toast() {
    const [toast, setToast] = useRecoilState(toastState);

    useEffect(() => {
        setTimeout(() => {
            setToast({
                visible: false,
                text: '',
                type: 0
            });
        }, 1000);
    },[])

    return (
        <div className="Toast" style={toast.visible ? {display: 'flex'} : {display: 'none'}}>
            <div className='toast-background'></div>

            {
                toast.type === 'success' ? 
                <div className='toast-box toast-1'>
                    <img src={success_check_icon} />
                    <div>{toast.text}</div>
                </div>
                :
                <></>
            }
            {
                toast.type === 'error' ? 
                <div className='toast-box toast-2'>
                    <img src={error_check_icon} />
                    <div>{toast.text}</div>
                </div>
                :
                <></>
            }       
        </div>
    );
}

export default Toast;
