import './App.css';
import 'devextreme/dist/css/dx.light.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './page/Home/Home';
import Menu from './component/Menu/Menu';
import Navigator from './component/Navigator/Navigator';
import Accounts from './page/Accounts/Accounts';
import Brands from './page/Brands/Brands';
import Products from './page/Products/Products';
import Orders from './page/Orders/Orders';
import HomeLoading from './component/HomeLoading/HomeLoading';
import Toast from './component/Toast/Toast';
import { useRecoilValue } from 'recoil';
import { toastState } from './recoil/status';
import Sales from './page/Sales/Sales';
import Calculate from './page/Calculate/Calculate';
import AddAccountsInfo from './page/AddAccountsInfo/AddAccountsInfo';
import InventoryManagement from './page/InventoryManagement/InventoryManagement';

function App() {
  const toast = useRecoilValue(toastState);
  const location = useLocation();

  return (
    <div className="App">
      {
        location.pathname === '/' ? <HomeLoading /> : <></>
      }
      {
        toast.visible ? <Toast /> : <></>
      }

      <Menu />

      <div className="router">
        <Navigator />
    
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/accounts?' element={<Accounts/>}/>
          <Route path='/brands?' element={<Brands/>}/>
          <Route path='/products?' element={<Products/>}/>
          <Route path='/orders?' element={<Orders/>}/>
          <Route path='/sales?' element={<Sales/>}/>
          <Route path='/calculate?' element={<Calculate/>}/>
          <Route path='/inventory_management?' element={<InventoryManagement/>}/>
          <Route path='/addaccountinfo?' element={<AddAccountsInfo/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
