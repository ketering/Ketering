import BottomNavbar from "../../components/BottomNavbar";
import * as Unicons from "@iconscout/react-unicons";
import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import ApiRequest from "../../Helpers/ApiRequest";
import CategoryCard from "../../components/CategoryCard";
import Skeleton from "react-loading-skeleton";

const MyOrdersPage = () => {
    const location = useLocation()
    const path = location.pathname

    const [orders, setOrders] = useState();

    useEffect(() => {
        const apiRequest = new ApiRequest('GET', `${process.env.REACT_APP_API_URL}/orders`)
        apiRequest.sendRequest()
            .then(result => setOrders(() => JSON.parse(result).data))
            .catch(error => console.log('Error@CategoriesPage', error))
    }, []);

    console.log(orders)

    const navigator = useNavigate();
    return (
        <BottomNavbar>
            <div className="container px-3 pt-4">
                <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                        <Unicons.UilEstate size="25" color="gray"/>
                        <Unicons.UilAngleRightB size="25" color="gray"/>
                        <p className="text-secondary m-0 fs-5 fw-medium">Moje narudžbine</p>
                    </div>
                    <div onClick={() => navigator('/cart')}>
                        {path.includes('/cart') ?
                            <Unicons.UilShoppingCart className="text-primary-emphasis" size="25"/> :
                            <Unicons.UilShoppingCart size="25" color="gray"/>}
                    </div>
                </div>
                <div>
                    <div className="pt-4">
                        {orders?.map(order =>
                            <div key={order.id}>
                                <div onClick={() => navigator(`/orders/${order.id}`)}
                                     className="bg-body-secondary py-3 ps-2 mb-3 rounded-3 border border-2">
                                    <div className="d-flex align-items-center justify-content-between">
                                        <div>
                                            <p className="fs-5 m-0">Narudžbina</p>
                                            <p className="fs-5 m-0">Za datum {order.forDate}</p>
                                            <p className="fs-5 m-0 fw-bold">{order.status}</p>
                                        </div>
                                        <div className="pe-2">
                                            <Unicons.UilAngleRightB size="30" color="gray"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) || <Skeleton height={250} count={5}/>}
                    </div>
                </div>
            </div>
        </BottomNavbar>
    );
}

export default MyOrdersPage;