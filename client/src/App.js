import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Navbar from './components/Navbar';
import Signin from './pages/Auth/Signin';
import Signup from './pages/Auth/Singup';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Profile from './pages/Profile';
import ProtectedRoute from './pages/ProtectedRoute';
import Basket from './pages/Basket';
import Error404 from './pages/Error404';
import Admin from './pages/Admin';
import AdminHome from './pages/Admin/Home';
import AdminOrders from './pages/Admin/Orders';
import AdminProducts from './pages/Admin/Products';
import AdminProductDetail from './pages/Admin/ProductDetail';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <div id='content'>
          <Routes>
            <Route path='/' exact Component={Products} />
            <Route path='/product/:product_id' Component={ProductDetail} />
            <Route path='/signin' Component={Signin} />
            <Route path='/signup' Component={Signup} />
            <Route path='/basket' Component={Basket} />
            <Route path='/profile' element={<ProtectedRoute admin={false}><Profile /></ProtectedRoute>} />
            <Route path='/admin' element={<ProtectedRoute admin={true}><Admin /></ProtectedRoute>}>
            
              <Route path=''   element={<ProtectedRoute admin={true}><AdminHome /></ProtectedRoute>} />
              <Route path='orders' element={<ProtectedRoute admin={true}><AdminOrders /></ProtectedRoute>} />
              <Route path='products' element={<ProtectedRoute admin={true}><AdminProducts /></ProtectedRoute>} />
              <Route path='products/:product_id' element={<ProtectedRoute admin={true}><AdminProductDetail /></ProtectedRoute>} />

            </Route>

            <Route path='*' Component={Error404} />
          </Routes>
        </div>

      </div>
    </Router>
  );
}


export default App;
