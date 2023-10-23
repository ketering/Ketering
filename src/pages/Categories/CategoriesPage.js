import BottomNavbar from "../../components/BottomNavbar";
import {useEffect, useState} from "react";
import ApiRequest from "../../Helpers/ApiRequest";
import * as Unicons from '@iconscout/react-unicons';
import Skeleton from "react-loading-skeleton";
import CategoryCard from "../../components/CategoryCard";
import {useLocation, useNavigate} from "react-router-dom";

const CategoriesPage = () => {
    const location = useLocation()
    const path = location.pathname

    const navigator = useNavigate();

    const categoriesState = useState([]);
    const [categories, setCategories] = categoriesState;

    useEffect(() => {
        const apiRequest = new ApiRequest('GET', `${process.env.REACT_APP_API_URL}/categories`)
        apiRequest.sendRequest()
            .then(result => setCategories(() => JSON.parse(result).data))
            .catch(error => console.log('Error@CategoriesPage', error))
    }, []);

    console.log(categories);

    return (
        <BottomNavbar>
            <div className="container px-3 pt-4">
                <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                        <Unicons.UilEstate size="25" color="gray"/>
                        <Unicons.UilAngleRightB size="25" color="gray"/>
                        <p className="text-secondary m-0 fs-5 fw-medium">Kategorije</p>
                    </div>
                    <div onClick={() => navigator('/cart')}>
                        {path.includes('/cart') ?
                            <Unicons.UilShoppingCart className="text-primary-emphasis" size="25"/> :
                            <Unicons.UilShoppingCart size="25" color="gray"/>}
                    </div>
                </div>
                <div>
                    <div className="pt-4">
                        {categories?.map(category =>
                            <div key={category.id}>
                                <CategoryCard data={category}/>
                            </div>
                        ) || <Skeleton height={250} count={5}/>}
                    </div>
                </div>
            </div>
        </BottomNavbar>
    );
}

export default CategoriesPage;