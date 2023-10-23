import BottomNavbar from "../../components/BottomNavbar";
import * as Unicons from "@iconscout/react-unicons";
import {useLocation, useNavigate} from "react-router-dom";
import CardActive from "./CardActive";

const CartPage = () => {
    const location = useLocation()
    const path = location.pathname
    const navigator = useNavigate();

    if (localStorage.getItem('mealsToOrder') === 'deleted') {
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
                    <div className="d-flex justify-content-center align-items-center min-vh-100">
                        <p className="m-0 fw-medium fs-3">Korpa je prazna</p>
                    </div>
                </div>
            </BottomNavbar>
        );
    } else {
        return (<CardActive/>)
    }
}

export default CartPage;