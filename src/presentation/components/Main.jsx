import { Routes ,Route } from 'react-router-dom';
import Buy from '../pages/Buy';
import Home from '../pages/Home';
import Order from '../pages/Order';
import Return from '../pages/Return';

const Main = () => {
    return (
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/buy' element={<Buy/>}/>
            <Route path='/return' element={<Return/>}/>
            <Route path='/order' element={<Order/>}/>
        </Routes>
    );
};

export default Main;