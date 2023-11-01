import './Menu.css';
import Logo from '../../assets/images/logo.svg';
import account_icon from '../../assets/images/account-icon.svg';
import brand_icon from '../../assets/images/brand-icon.svg';
import good_icon from '../../assets/images/good-icon.svg';
import order_icon from '../../assets/images/order-icon.svg';
import { menuState } from '../../recoil/status';
import Tab from '../Tab/Tab';
import { useRecoilValue } from 'recoil';

function Menu() {
  const menu = useRecoilValue(menuState);


  return (
    <div className="Menu">
      <div className={`menu-left ${menu ? 'on' : ''}`}>

        <img className={`logo ${menu ? 'on' : ''}`} src={Logo} onClick={() => {
          window.location.href = '/';
        }}/>

        <Tab name="거래처 관리" path='/accounts' img={account_icon} />
        <Tab name="브랜드 관리" path='/brands' img={brand_icon} />
        <Tab name="상품관리" path='/goods' img={good_icon} />
        <Tab name="발주/반품 내역 조회" path='/orders' img={order_icon} />

      </div>
    </div>
  );
}

export default Menu;
