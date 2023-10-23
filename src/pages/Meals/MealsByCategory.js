import {useNavigate, useParams} from "react-router-dom";
import BottomNavbar from "../../components/BottomNavbar";
import {useEffect, useState} from "react";
import ApiRequest from "../../Helpers/ApiRequest";
import * as Unicons from "@iconscout/react-unicons";
import Skeleton from "react-loading-skeleton";
import MealCard from "../../components/MealCard";

const MealsByCategory = () => {
    const navigator = useNavigate()
    const params = useParams()
    const mealsState = useState([]);
    const [meals, setMeals] = mealsState;

    useEffect(() => {
        const apiRequest = new ApiRequest('GET', `${process.env.REACT_APP_API_URL}/categories/${params.id}`)
        apiRequest.sendRequest()
            .then(result => setMeals(() => JSON.parse(result).data))
            .catch(error => console.log('Error@CategoriesPage', error))
    }, []);

    console.log(meals);

    return (
        <BottomNavbar>
            <div className="container px-3 pt-4">
                <div className="d-flex align-items-center">
                    <div onClick={() => navigator(-1)}>
                        <Unicons.UilEstate size="25" color="gray"/>
                    </div>
                    <Unicons.UilAngleRightB size="25" color="gray"/>
                    <p className="text-secondary m-0 fs-5 fw-medium">{meals.category?.name}</p>
                </div>
                <div>
                    <div className="pt-4">
                        {meals.meals?.map(meal =>
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

export default MealsByCategory;