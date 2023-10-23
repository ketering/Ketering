import BottomNavbar from "../../components/BottomNavbar";
import * as Unicons from "@iconscout/react-unicons";
import {useLocation, useNavigate} from "react-router-dom";
import MealCard from "../../components/MealCard";
import Skeleton from "react-loading-skeleton";
import {useEffect, useState} from "react";
import ApiRequest from "../../Helpers/ApiRequest";

const MealsPage = () => {
    const navigator = useNavigate();
    const location = useLocation()
    const path = location.pathname

    const mealsState = useState([]);
    const [meals, setMeals] = mealsState;

    const [search, setSearch] = useState('')
    const formChangeHandler = evt => {
        const value = evt.target.value
        setSearch(value);
    }

    useEffect(() => {
        if (search || search === '') {
            const apiRequest = new ApiRequest('POST', `${process.env.REACT_APP_API_URL}/meals`, JSON.stringify({'search': search}))
            apiRequest.sendRequest()
                .then(result => setMeals(() => JSON.parse(result).data))
                .catch(error => console.log('Error@CategoriesPage', error))
        }
    }, [search]);

    console.log(meals);


    return (
        <BottomNavbar>
            <div className="container px-3 pt-4">
                <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                        <div onClick={() => navigator()}>
                            <Unicons.UilEstate size="25" color="gray"/>
                        </div>
                        <Unicons.UilAngleRightB size="25" color="gray"/>
                        <p className="text-secondary m-0 fs-5 fw-medium">Svi obroci</p>
                    </div>
                    <div onClick={() => navigator('/cart')}>
                        {path.includes('/cart') ?
                            <Unicons.UilShoppingCart className="text-primary-emphasis" size="25"/> :
                            <Unicons.UilShoppingCart size="25" color="gray"/>}
                    </div>
                </div>
                <div className="mt-3">
                    <form>
                        <input onChange={formChangeHandler} defaultValue={search} type="text" className="form-control"
                               placeholder="search"/>
                    </form>
                </div>
                <div className="mt-2" style={{maxHeight: 'calc(100vh - 150px)', overflowY: 'auto'}}>
                    <div className="pb-4">
                        {meals?.map(meal =>
                            <div key={meal.id}>
                                <MealCard data={meal}/>
                            </div>
                        ) || <Skeleton height={250} count={5}/>}
                    </div>
                </div>
            </div>
        </BottomNavbar>
    );
}

export default MealsPage;