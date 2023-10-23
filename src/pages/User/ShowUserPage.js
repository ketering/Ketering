import BottomNavbar from "../../components/BottomNavbar";
import * as Unicons from "@iconscout/react-unicons";
import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import ApiRequest from "../../Helpers/ApiRequest";

const ShowUserPage = () => {
    const navigator = useNavigate();
    const location = useLocation()
    const path = location.pathname

    const [user, setUser] = useState([]);
    useEffect(() => {
        const apiRequest = new ApiRequest('GET', `${process.env.REACT_APP_API_URL}/me`)
        apiRequest.sendRequest()
            .then(result => setUser(() => JSON.parse(result).data))
            .catch(error => console.log('Error@CategoriesPage', error))
    }, []);

    console.log(user);

    return (
        <BottomNavbar>
            <div className="container px-3 pt-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <div className="d-flex align-items-center">
                        <Unicons.UilEstate size="25" color="gray"/>
                        <Unicons.UilAngleRightB size="25" color="gray"/>
                        <p className="text-secondary m-0 fs-5 fw-medium">Moj profil</p>
                    </div>
                    <div onClick={() => navigator('/cart')}>
                        {path.includes('/cart') ?
                            <Unicons.UilShoppingCart className="text-primary-emphasis" size="25"/> :
                            <Unicons.UilShoppingCart size="25" color="gray"/>}
                    </div>
                </div>
                <div>
                    <div className="card">
                        <div className="card-body">

                            <div className="d-flex justify-content-between">
                                <p className='m-0 fw-bold'>Ime</p>
                                <p className="m-0">{user.name} {user.surname}</p>
                            </div>

                            <hr/>

                            <div className="d-flex justify-content-between">
                                <p className='m-0 fw-bold'>Tip korisnika</p>
                                <p className="m-0">{user.role}</p>
                            </div>

                            <hr/>

                            <div className="d-flex justify-content-between">
                                <p className='m-0 fw-bold'>Kompanija</p>
                                <p className="m-0">{user.company}</p>
                            </div>

                            <hr/>

                            <div className="d-flex justify-content-between">
                                <p className='m-0 fw-bold'>E-mail</p>
                                <p className="m-0">{user.email}</p>
                            </div>

                        </div>
                    </div>
                    <div className="d-flex mt-2">
                        <button onClick={() => navigator('/profile/edit')} className="btn btn-outline-primary w-100">Uredi profil</button>
                    </div>
                </div>
            </div>
        </BottomNavbar>
    );
}

export default ShowUserPage;