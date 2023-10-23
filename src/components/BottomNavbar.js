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

                    {path === '/categories' ?
                        <Unicons.UilCommentsAlt className="text-primary-emphasis" size="25"/> :
                        <Unicons.UilCommentsAlt size="25" color="gray"/>}

                    <span className={path === '/categories' ? 'text-primary-emphasis' : 'text-secondary'}
                          style={labelStyles}>Kategorije</span>
                </div>

                <div onClick={() => navigator('/resources')}
                     className="row m-0 cursor-pointer">

                    {path === '/resources' ?
                        <Unicons.UilNotebooks className="text-primary-emphasis" size="25"/> :
                        <Unicons.UilNotebooks size="25" color="gray"/>}

                    <span className={path === '/resources' ? 'text-primary-emphasis' : 'text-secondary'}
                          style={labelStyles}>Resursi</span>
                </div>

                <div onClick={() => navigator('/reports')}
                     className="row m-0 cursor-pointer">

                    {path === '/reports' ?
                        <Unicons.UilExclamationOctagon className="text-primary-emphasis" size="25"/> :
                        <Unicons.UilExclamationOctagon size="25" color="gray"/>}

                    <span className={path === '/reports' ? 'text-primary-emphasis' : 'text-secondary'}
                          style={labelStyles}>Prijave</span>
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