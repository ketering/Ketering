import BottomNavbar from "../../components/BottomNavbar";
import * as Unicons from "@iconscout/react-unicons";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import ApiRequest from "../../Helpers/ApiRequest";
import * as USolid from "@iconscout/react-unicons-solid";
import Swal from "sweetalert2";

const SingleMealPage = () => {
    const navigator = useNavigate();
    const params = useParams()
    const mealState = useState([]);
    const [meal, setMeal] = mealState;

    const [orderInfo, setOrderInfo] = useState([`${params.id}`, 1])

    useEffect(() => {
        const apiRequest = new ApiRequest('GET', `${process.env.REACT_APP_API_URL}/meals/${params.id}`)
        apiRequest.sendRequest()
            .then(result => setMeal(() => JSON.parse(result).data))
            .catch(error => console.log('Error@CategoriesPage', error))
    }, []);

    const formChangeHandler = evt => {
        const value = evt.target.value
        setOrderInfo([`${meal.id}`, value])
    }

    const formSubmitHandler = evt => {
        evt.preventDefault();
        const prev = localStorage.getItem('mealsToOrder').trim();
        if (prev === 'deleted') {
            localStorage.setItem('mealsToOrder', orderInfo);
        } else {
            localStorage.setItem('mealsToOrder', `${prev}/` + orderInfo);
        }
        console.log(localStorage.getItem('mealsToOrder').trim())
        Swal.fire({
                icon: 'success',
                title: 'Uspješno dodato u korpu'
            }
        )
    }


    return (
        <BottomNavbar>
            <div className="container px-3 pt-4">
                <div className="d-flex align-items-center">
                    <div onClick={() => navigator(`/categories/${meal.category?.id}`)}>
                        <Unicons.UilEstate size="25" color="gray"/>
                    </div>
                    <Unicons.UilAngleRightB size="25" color="gray"/>
                    <p className="text-secondary m-0 fs-5 fw-medium">{meal?.name}</p>
                </div>
                <div className='mt-3'>
                    <div className="card">
                        <div className="card-body">
                            <div className="d-flex justify-content-center">
                                {meal.photoPath ? (
                                    <img src={meal.photoPath} className="img-fluid rounded-3" alt=""/>) : ''}
                            </div>
                            <hr/>
                            <div>
                                <div className="d-flex justify-content-between">
                                    <p className='fw-bold'>Cijena</p>
                                    <p>{meal.price}€</p>
                                </div>

                                <hr/>

                                <div className="d-flex justify-content-between">
                                    <p className='fw-bold'>Ocjena</p>
                                    {meal.rating ?
                                        (<div className="d-flex align-items-center">
                                            <p className="fs-5 m-0 ms-1">
                                                {meal.rating}
                                            </p>
                                            <USolid.UisStar size="25" color="gold"/>
                                        </div>) : 'Nema ocjene'}
                                </div>

                                <hr/>

                                <div className="d-flex justify-content-between">
                                    <p className='fw-bold'>Kategorija</p>
                                    <p onClick={() => {
                                        navigator(`/categories/${meal.category?.id}`)
                                    }}>{meal.category?.name}</p>
                                </div>

                                <hr/>

                                <div className="d-flex justify-content-center">
                                    {meal.types?.map((type) => {
                                        return (
                                            <p key={type.id}>{type.name},&nbsp;</p>
                                        )
                                    })}
                                </div>

                                <hr/>

                                <div className="d-flex justify-content-center">
                                    <p>{meal.description}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card mt-2">
                        <div className="card-body">
                            <div className="d-flex">
                                <form onSubmit={formSubmitHandler}>
                                    <div className="input-group">
                                        <input onChange={formChangeHandler} defaultValue={orderInfo[1]} type="number"
                                               min={1} name="amount" className="form-control"/>
                                        <button type="submit" className="btn btn-outline-primary">Dodaj u korpu</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </BottomNavbar>
    );
}

export default SingleMealPage;