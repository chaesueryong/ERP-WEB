import './ReturnItem.css';
import down_arrow_icon from '../../assets/images/down-arrow-icon.svg';
import { useState } from 'react';

function ReturnItem() {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisible = () => {
        setIsVisible(prev => !prev);
    }

    return (
        <div className="ReturnItem">
            <div className='order-top'>
                <div className='order-item-date'>2023/11/09</div>
                <div className='order-item-image-box'>
                    <img className='order-item-image' alt='' src={down_arrow_icon} onClick={toggleVisible} />
                </div>

                <div className='order-item-button-box'>
                    <div className='order-item-button'>택 출력</div>
                    <div className='order-item-button'>발주상품 추가</div>
                </div>
            </div>


            <div className='order-bottom' style={isVisible ? {display: 'block'} : {display: 'none'}}>
                <table>
                    <tr>
                        <td></td>
                        <td>거래처 코드</td>
                        <td></td>
                    </tr>
                </table>
            </div>
        </div>
    );
}

export default ReturnItem;
