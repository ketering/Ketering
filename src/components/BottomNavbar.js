import {useLocation, useNavigate} from "react-router-dom";
import * as Unicons from '@iconscout/react-unicons';

const BottomNavbar = (p) => {
    const location = useLocation()
    const path = location.pathname

    const labelStyles = {
        fontSize: "12px"
    }

    console.log(path)

    const navigator = useNavigate()

    return (
        <div className="min-vh-100 p-0 m-0 row bg-body">
            { p.children }
            <div className="d-flex d-sm-flex fixed-bottom bg-body d-flex justify-content-between text-center pb-2 pt-3 column-gap-2">

                <div onClick={() => navigator('/categories')}
                     className="row m-0 cursor-pointer">

                    {path.includes('/categories') ?
                        <Unicons.UilCommentsAlt className="text-primary-emphasis" size="25"/> :
                        <Unicons.UilCommentsAlt size="25" color="gray"/>}

                    <span className={path.includes('/categories') ? 'text-primary-emphasis' : 'text-secondary'}
                          style={labelStyles}>Kategorije</span>
                </div>

                <div onClick={() => navigator('/meals')}
                     className="row m-0 cursor-pointer">

                    {path.includes('/meals') ?
                        <Unicons.UilPizzaSlice className="text-primary-emphasis" size="25"/> :
                        <Unicons.UilPizzaSlice size="25" color="gray"/>}

                    <span className={path.includes('/meals') ? 'text-primary-emphasis' : 'text-secondary'}
                          style={labelStyles}>Obroci</span>
                </div>

                <div onClick={() => navigator('/orders')}
                     className="row m-0 cursor-pointer">

                    {path.includes('/orders') ?
                        <Unicons.UilPackage className="text-primary-emphasis" size="25"/> :
                        <Unicons.UilPackage size="25" color="gray"/>}

                    <span className={path.includes('/orders') ? 'text-primary-emphasis' : 'text-secondary'}
                          style={labelStyles}>Narudžbine</span>
                </div>

                <div onClick={() => navigator('/profile')}
                     className="row m-0 cursor-pointer">

                    {path === '/profile' ?
                        <Unicons.UilUser className="text-primary-emphasis" size="25"/> :
                        <Unicons.UilUser size="25" color="gray"/>}

                    <span className={path === '/profile' ? 'text-primary-emphasis' : 'text-secondary'}
                          style={labelStyles}>Nalog</span>
                </div>
            </div>
        </div>
    )
}

export default BottomNavbar;