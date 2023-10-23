import {useEffect, useState} from "react";
import ApiRequest from "../../Helpers/ApiRequest";
import Swal from "sweetalert2";
import BottomNavbar from "../../components/BottomNavbar";
import * as Unicons from "@iconscout/react-unicons";
import MealCartCard from "../../components/MealCartCard";
import Skeleton from "react-loading-skeleton";
import {useLocation} from "react-router-dom";

const CardActive = () => {
    const location = useLocation()
    const path = location.pathname

    const mealsToOrder = localStorage.getItem('mealsToOrder').trim()
        .split('/')
        .map((el) => {
            return el.split(',')
        });
    const sumObject = {};

    mealsToOrder.forEach(subarray => {
        const key = parseInt(subarray[0]);
        const value = parseInt(subarray[1]);
        if (sumObject.hasOwnProperty(key)) {
            sumObject[key] += value;
        } else {
            sumObject[key] = value;
        }
    });

    const ordered = Object.entries(sumObject).map(([key, value]) => [parseInt(key), value]);

    const [meals, setMeals] = useState([]);

    useEffect(() => {
        ordered.map((el) => {
            const apiRequest = new ApiRequest('GET', `${process.env.REACT_APP_API_URL}/meals/${el[0]}`)
            apiRequest.sendRequest()
                .then(result =>
                    setMeals((prevState) => {
                        return prevState.concat([JSON.parse(result).data])
                    })
                )
                .catch(error => console.log('Error@CategoriesPage', error))
        })
    }, []);

    const priceMap = new Map(meals?.map(item => [item.id, item.price]));
    const amtMap = new Map(ordered.map(item => [item[0], item[1]]))

    const totalPrice = ordered.reduce((total, [id, quantity]) => {
        if (priceMap.has(id)) {
            return total + priceMap.get(id) * quantity;
        }
        return total;
    }, 0);


    const [orderInfo, setOrderInfo] = useState({
        meals: ordered,
        description: '',
        inAdvance: ''
    })
    const formChangeHandler = evt => {
        const name = evt.target.name
        const value = evt.target.value
        setOrderInfo((prevState) => {
            return {...prevState, [name]: value}
        })
    }

    const formSubmitHandler = evt => {
        evt.preventDefault();
        const apiRequest = new ApiRequest('POST', `${process.env.REACT_APP_API_URL}/orders/store`, JSON.stringify(orderInfo))
        apiRequest.editHeader("Authorization", `Bearer ${localStorage.getItem('token')}`)
        apiRequest.sendRequest()
            .then(result => {
                const parsed = JSON.parse(result)
                console.log(parsed)
                if (parsed.success) {
                    Swal.fire({
                        icon:'success',
                        title: "Narudžbina uspješno kreirana"
                    })
                    localStorage.setItem('mealsToOrder', 'deleted')
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: parsed.message,
                    })
                }
            })
            .catch(error => null);
    }

    return (
        <BottomNavbar>
            <div className="container px-3 pt-4">
                <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                        <div onClick={() => navigator(`/categories`)}>
                            <Unicons.UilEstate size="25" color="gray"/>
                        </div>
                        <Unicons.UilAngleRightB size="25" color="gray"/>
                        <p className="text-secondary m-0 fs-5 fw-medium">Korpa</p>
                    </div>
                    <div onClick={() => navigator('/cart')}>
                        {path.includes('/cart') ?
                            <Unicons.UilShoppingCart className="text-primary-emphasis" size="25"/> :
                            <Unicons.UilShoppingCart size="25" color="gray"/>}
                    </div>
                </div>
                <div className="mt-3">
                    {meals?.map(meal =>
                        <div key={meals.indexOf(meal)}>
                            <MealCartCard data={meal} amt={amtMap.get(meal.id)}/>
                        </div>
                    ) || <Skeleton height={250} count={5}/>}
                </div>
                <div className="d-flex justify-content-between">
                    <p className='m-0 fs-3'>Cijena:</p>
                    <p className='m-0 fs-3'>{totalPrice}€</p>
                </div>
                <hr/>
                <div>
                    <form onSubmit={formSubmitHandler}>
                        <textarea onChange={formChangeHandler} className="form-control mb-2" name="description" rows={5}
                                  placeholder="Napomena"></textarea>
                        <input onChange={formChangeHandler} defaultValue={orderInfo.inAdvance} type="number"
                               className="form-control mb-2" placeholder={'Naruči unaprijed (broj dana)'}
                               min={0}
                               max={7} name="inAdvance"/>
                        <button type="submit" className="btn btn-outline-primary w-100 mt-3">Naruči</button>
                    </form>
                </div>
            </div>
        </BottomNavbar>
    )
}

export default CardActive;