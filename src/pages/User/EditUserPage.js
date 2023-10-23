import BottomNavbar from "../../components/BottomNavbar";
import * as Unicons from "@iconscout/react-unicons";
import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import ApiRequest from "../../Helpers/ApiRequest";
import Swal from "sweetalert2";

const EditUserPage = () => {
    const navigator = useNavigate();
    const location = useLocation()
    const path = location.pathname

    const [userInfo, setUserInfo] = useState([]);
    const [userData, setUserData] = useState({
        name: '',
        surname: '',
        email: ''
    });

    useEffect(() => {
        const apiRequest = new ApiRequest('GET', `${process.env.REACT_APP_API_URL}/me`)
        apiRequest.sendRequest()
            .then(result => {
                setUserInfo(() => JSON.parse(result).data);
                setUserData({
                    name: JSON.parse(result).data.name,
                    surname: JSON.parse(result).data.surname,
                    email: JSON.parse(result).data.email
                })
            })
            .catch(error => console.log('Error@CategoriesPage', error))
    }, []);

    const formChangeHandler = evt => {
        const name = evt.target.name
        const value = evt.target.value
        setUserData((prevState) => {
            return {...prevState, [name]: value}
        })
    }

    const formSubmitHandler = evt => {
        evt.preventDefault();
        const apiRequest = new ApiRequest('POST', `${process.env.REACT_APP_API_URL}/me/update`, JSON.stringify(userData))
        apiRequest.sendRequest()
            .then(result => {
                const parsed = JSON.parse(result)
                console.log(parsed)
                if (parsed.success) {
                    Swal.fire({
                        icon: 'success',
                        title: parsed.message,
                    })
                    navigator('/profile');
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
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <div onClick={() => navigator('/profile')} className="d-flex align-items-center">
                        <Unicons.UilEstate size="25" color="gray"/>
                        <Unicons.UilAngleRightB size="25" color="gray"/>
                        <p className="text-secondary m-0 fs-5 fw-medium">Uredi profil</p>
                    </div>
                    <div onClick={() => navigator('/cart')}>
                        {path.includes('/cart') ?
                            <Unicons.UilShoppingCart className="text-primary-emphasis" size="25"/> :
                            <Unicons.UilShoppingCart size="25" color="gray"/>}
                    </div>
                </div>
                <div>
                    <form onSubmit={formSubmitHandler}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label fw-bold">Name</label>
                            <input type="text" onChange={formChangeHandler} defaultValue={userInfo?.name} name="name" className="form-control" placeholder="Name"/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="surname" className="form-label fw-bold">Surname</label>
                            <input type="text" onChange={formChangeHandler} defaultValue={userInfo?.surname} name="surname" className="form-control" placeholder="Surname"/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label fw-bold">E-mail</label>
                            <input type="email" onChange={formChangeHandler} defaultValue={userInfo?.email} name="email" className="form-control" placeholder="E-mail"/>
                        </div>
                        <hr/>
                        <div className="d-flex">
                            <button type="submit" className="btn btn-outline-primary w-100">Ažuriraj</button>
                        </div>
                    </form>
                </div>
            </div>
        </BottomNavbar>
    );
}

export default EditUserPage;