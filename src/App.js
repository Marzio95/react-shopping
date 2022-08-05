import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { loadCategories } from './slices/categoriesSlice';
import { Routes, Route } from 'react-router-dom';
import { CategoryView } from './views/CategoryView';
import { CartView } from './views/CartView';
import './App.css';
import { getAllCart, loadCart } from './slices/cartSlice';

function App() {

  const categories = useSelector(state => state.categories.data);
  const cart = useSelector( getAllCart() );

  const dispatch = useDispatch();

  useEffect ( () => {
    dispatch( loadCategories() );
  }, [dispatch]);

  useEffect ( () => {
    dispatch( loadCart() );
  }, [dispatch]);

  return (
    <div className="App">
      <Navbar categories={categories} cart={cart} />
      <Routes>
        <Route path="categories/:category" element={<CategoryView />}></Route>
        <Route path="cart" element={<CartView />}></Route>
      </Routes>
    </div>
  );
}

export default App;
