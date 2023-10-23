import {BrowserRouter, Routes, Route} from "react-router-dom";
import './assets/bootstrap/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import {SkeletonTheme} from 'react-loading-skeleton';

import LoginPage from "./pages/Auth/LoginPage";
import CategoriesPage from "./pages/Categories/CategoriesPage";
import MealsByCategory from "./pages/Meals/MealsByCategory";
import SingleMealPage from "./pages/Meals/SingleMealPage";
import CartPage from "./pages/Cart/CartPage";
import MyOrdersPage from "./pages/Orders/MyOrdersPage";

function App() {
    return (
        <SkeletonTheme baseColor={"#ebebeb"} highlightColor={"#f5f5f5"}>
            <BrowserRouter>
                <Routes>
                    <Route index element={<LoginPage/>}/>
                    <Route path={'/categories'} element={<CategoriesPage/>}/>
                    <Route path={'/categories/:id'} element={<MealsByCategory/>}/>

                    <Route path={'/meals/:id'} element={<SingleMealPage/>}/>

                    <Route path={'/orders'} element={<MyOrdersPage/>}/>

                    <Route path={'/cart'} element={<CartPage/>}/>
                </Routes>
            </BrowserRouter>
        </SkeletonTheme>
    )
}

export default App;
