import {useLocation, useNavigate, useParams} from "react-router-dom";
import BottomNavbar from "../../components/BottomNavbar";
import * as Unicons from "@iconscout/react-unicons";
import * as USolid from "@iconscout/react-unicons-solid";
import {useEffect, useState} from "react";
import ApiRequest from "../../Helpers/ApiRequest";
import MealCartCard from "../../components/MealCartCard";

const SingleOrderPage = () => {
    const params = useParams();
    const navigator = useNavigate();
    const location = useLocation()
    const path = location.pathname

    const [order, setOrder] = useState([])

    useEffect(() => {
        const apiRequest = new ApiRequest('GET', `${process.env.REACT_APP_API_URL}/orders/${params.id}`)
        apiRequest.sendRequest()
            .then(result => setOrder(() => JSON.parse(result).data))
            .catch(error => console.log('Error@CategoriesPage', error))
    }, []);

    console.log(order)

    return (
        <BottomNavbar>
            <div className="container px-3 pt-4">
                <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                        <div onClick={() => navigator(`/orders`)}>
                            <Unicons.UilEstate size="25" color="gray"/>
                        </div>
                        <Unicons.UilAngleRightB size="25" color="gray"/>
                        <p className="text-secondary m-0 fs-5 fw-medium">Narudžbina {order?.id}</p>
                    </div>
                    <div onClick={() => navigator('/cart')}>
                        {path.includes('/cart') ?
                            <Unicons.UilShoppingCart className="text-primary-emphasis" size="25"/> :
                            <Unicons.UilShoppingCart size="25" color="gray"/>}
                    </div>
                </div>
                <div className='mt-3'>
                    <div className="card">
                        <div className="card-body">
                            <div className="d-flex justify-content-between">
                                <p className='m-0 fw-bold'>Status</p>
                                <p className="m-0">{order.status}</p>
                            </div>

                            <hr/>

                            <div className="d-flex justify-content-between">
                                <p className='m-0 fw-bold'>Za datum</p>
                                <p className="m-0">{order.forDate}</p>
                            </div>

                            <hr/>

                            <div className="d-flex justify-content-between">
                                <p className='m-0 fw-bold'>Cijena</p>
                                <p className="m-0">{order.totalPrice}€</p>
                            </div>

                            <hr/>
                        </div>
                    </div>
                    <div className="mt-2">
                        {order.meals?.map((meal) =>
                            <div key={meal.id}>
                                <MealCartCard data={meal} amt={meal.amount}/>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </BottomNavbar>
    );
}

export default SingleOrderPage;