import './Menu.css';
import Logo from '../../assets/images/logo.svg';
import account_icon from '../../assets/images/account-icon.svg';
import brand_icon from '../../assets/images/brand-icon.svg';
import good_icon from '../../assets/images/good-icon.svg';
import order_icon from '../../assets/images/order-icon.svg';
import { accountPageState, brandsPageState, menuState, ordersPageState, productsPageState } from '../../recoil/status';
import Tab from '../Tab/Tab';
import { useRecoilValue } from 'recoil';

function Menu() {
  const menu = useRecoilValue(menuState);
  const accountsPage = useRecoilValue(accountPageState);
  const brandsPage = useRecoilValue(brandsPageState);
  const productsPage = useRecoilValue(productsPageState);
  const ordersPage = useRecoilValue(ordersPageState);

  return (
    <div className="Menu">
      <div className={`menu-left ${menu ? 'on' : ''}`}>

        <img className={`logo ${menu ? 'on' : ''}`} src={Logo} onClick={() => {
          window.location.href = '/';
        }}/>

        <Tab name="거래처 관리" path='/accounts' search={accountsPage.searchUrl} img={account_icon} />
        <Tab name="브랜드 관리" path='/brands' search={brandsPage.searchUrl} img={brand_icon} />
        <Tab name="상품관리" path='/products' search={productsPage.searchUrl} img={good_icon} />
        <Tab name="발주/반품 내역 조회" path='/orders' search={ordersPage.searchUrl} img={order_icon} />

      </div>
    </div>
  );
}

export default Menu;
