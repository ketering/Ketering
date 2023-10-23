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
import SingleOrderPage from "./pages/Orders/SingleOrderPage";
import MealsPage from "./pages/Meals/MealsPage";
import ShowUserPage from "./pages/User/ShowUserPage";
import EditUserPage from "./pages/User/EditUserPage";
import NotFound from "./components/NotFound";

function App() {
    return (
        <SkeletonTheme baseColor={"#ebebeb"} highlightColor={"#f5f5f5"}>
            <BrowserRouter>
                <Routes>
                    <Route index element={<LoginPage/>}/>
                    <Route path={'/categories'} element={<CategoriesPage/>}/>
                    <Route path={'/categories/:id'} element={<MealsByCategory/>}/>

                    <Route path={'/meals'} element={<MealsPage/>}/>
                    <Route path={'/meals/:id'} element={<SingleMealPage/>}/>

                    <Route path={'/orders'} element={<MyOrdersPage/>}/>
                    <Route path={'/orders/:id'} element={<SingleOrderPage/>}/>

                    <Route path={'/cart'} element={<CartPage/>}/>

                    <Route path={'/profile'} element={<ShowUserPage/>}/>
                    <Route path={'/profile/edit'} element={<EditUserPage/>}/>

                    <Route path='*' element={<NotFound/>}/>
                </Routes>
            </BrowserRouter>
        </SkeletonTheme>
    )
}

export default App;
