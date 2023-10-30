import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './page/Home/Home';
import Menu from './component/Menu/Menu';
import Navigator from './component/Navigator/Navigator';
import Accounts from './page/Accounts/Accounts';
import Brands from './page/Brands/Brands';
import Goods from './page/Goods/Goods';
import Orders from './page/Orders/Orders';

function App() {
  return (
    <div className="App">

      <Menu />

      <div className="router">
        <Navigator />
    
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/accounts' element={<Accounts/>}/>
          <Route path='/brands' element={<Brands/>}/>
          <Route path='/goods' element={<Goods/>}/>
          <Route path='/orders' element={<Orders/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
