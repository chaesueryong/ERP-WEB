import './HomeLoading.css';
import Logo from '../../assets/images/logo.svg';
import { useEffect, useState } from 'react';

function HomeLoading() {
    const [visible, setVisible] = useState(true);

    useEffect(()=>{
        setTimeout(() => {
            setVisible(false);
        }, 1600);
    })

  return (
    <div className="HomeLoading" style={visible ? {display: 'flex'} : {display: 'none'}}>
        <img className='home-loading-logo' src={Logo} />
        <div className='home-loading-title'>
            쉽고 강력한 관리기능
        </div>
        <div className='progress-box'>
            <div className='progress-bar'>
                <span className='progress-bar-gauge'></span>
            </div>
        </div>
    </div>
  );
}

export default HomeLoading;
