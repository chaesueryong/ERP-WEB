import './OrderItem.css';
import down_arrow_icon from '../../assets/images/down-arrow-icon.svg';

function OrderItem() {
    return (
        <div className="OrderItem">
            <div className='order-item-date'>2023/11/09</div>
            <div className='order-item-image-box'>
                <img className='order-item-image' src={down_arrow_icon} />
            </div>

            <div className='order-item-button-box'>
                <div className='order-item-button'>택 출력</div>
                <div className='order-item-button'>발주상품 추가</div>
            </div>
        </div>
    );
}

export default OrderItem;
