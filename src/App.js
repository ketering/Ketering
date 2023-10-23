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
import ProtectedRoute from "./middleware/ProtectedRoute";

function App() {
    return (
        <SkeletonTheme baseColor={"#ebebeb"} highlightColor={"#f5f5f5"}>
            <BrowserRouter>
                <Routes>
                    <Route index element={<LoginPage/>}/>
                    <Route path={'/categories'} element={<ProtectedRoute><CategoriesPage/></ProtectedRoute>}/>
                    <Route path={'/categories/:id'} element={<ProtectedRoute><MealsByCategory/></ProtectedRoute>}/>

                    <Route path={'/meals'} element={<ProtectedRoute><MealsPage/></ProtectedRoute>}/>
                    <Route path={'/meals/:id'} element={<ProtectedRoute><SingleMealPage/></ProtectedRoute>}/>

                    <Route path={'/orders'} element={<ProtectedRoute><MyOrdersPage/></ProtectedRoute>}/>
                    <Route path={'/orders/:id'} element={<ProtectedRoute><SingleOrderPage/></ProtectedRoute>}/>

                    <Route path={'/cart'} element={<ProtectedRoute><CartPage/></ProtectedRoute>}/>

                    <Route path={'/profile'} element={<ProtectedRoute><ShowUserPage/></ProtectedRoute>}/>
                    <Route path={'/profile/edit'} element={<ProtectedRoute><EditUserPage/></ProtectedRoute>}/>

                    <Route path='*' element={<NotFound/>}/>
                </Routes>
            </BrowserRouter>
        </SkeletonTheme>
    )
}

export default App;
