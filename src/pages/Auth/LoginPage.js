import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import Swal from "sweetalert2";
import ApiRequest from "../../Helpers/ApiRequest";

const LoginPage = () => {
    const navigator = useNavigate();

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            navigator('/categories');
        }
    }, []);

    const [userInfo, setUserInfo] = useState({
        email: '',
        password: '',
        device: window.navigator.platform
    })
    const formChangeHandler = evt => {
        const name = evt.target.name
        const value = evt.target.value
        setUserInfo((prevState) => {
            return {...prevState, [name]: value}
        })
    }
    const formSubmitHandler = evt => {
        evt.preventDefault()

        const apiRequest = new ApiRequest('POST', `${process.env.REACT_APP_API_URL}/login`, JSON.stringify(userInfo))
        apiRequest.editHeader("Authorization", `Bearer ${process.env.REACT_APP_API_KEY}`)
        apiRequest.sendRequest()
            .then(result => {
                const parsed = JSON.parse(result)
                console.log(parsed)
                if (parsed.success) {
                    localStorage.setItem('token', parsed.data.token)
                    navigator('/categories');
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
        <main>
            <div className="container-fluid">
                <div className="d-flex align-items-center justify-content-center min-vh-100">
                    <div className="card">
                        <div className="card-header">
                            <div className="d-flex align-items-center justify-content-center">
                                <div className="div w-25">
                                    <img src="/munch.png" className="img-fluid" alt="Logo"/>
                                </div>
                            </div>
                            <h5 className="card-title text-center">Login</h5>
                        </div>
                        <div className="card-body">
                            <form onSubmit={formSubmitHandler}>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">E-mail</label>
                                    <input onChange={formChangeHandler} type="email" name="email"
                                           className="form-control" id="email"
                                           defaultValue={userInfo.email}
                                           placeholder="Unesite E-mail"/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input type="password" className="form-control" id="password"
                                           name="password"
                                           onChange={formChangeHandler}
                                           defaultValue={userInfo.password}
                                           placeholder="Unesite password"/>
                                </div>
                                <div className="d-flex justify-content-between mb-0 mt-2">
                                    <div>
                                        <input id="remember_me" type="checkbox" className="form-check-input"/>
                                        <label htmlFor="remember_me" className="ms-2 fw-medium form-check-label">Zapamti
                                            me</label>
                                    </div>
                                    <Link to="/reset" className="text-primary fw-medium text-decoration-none mb-3">Zaboravili
                                        ste šifru?</Link>
                                </div>

                                <div className="d-flex justify-content-center mb-3">
                                    <button type="submit" className="btn btn-primary w-25">Log In</button>
                                </div>

                                <h6 className="fw-medium">Nemate nalog?
                                    <Link to="/register"
                                          className="text-primary fw-medium text-decoration-none"> Kreirajte ga</Link>
                                </h6>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default LoginPage