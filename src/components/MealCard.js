import * as USolid from "@iconscout/react-unicons-solid";
import * as Unicons from "@iconscout/react-unicons";
import {useNavigate} from "react-router-dom";

const CategoryCard = (p) => {
    const navigator = useNavigate();

    return (
        <div onClick={() => navigator(`/meals/${p.data.id}`)}
             className="bg-body-secondary py-3 ps-2 mb-3 rounded-3 border border-2">
            <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex">
                    {p.data.photoPath ? (
                        <img src={p.data.photoPath} className="img-fluid w-25 rounded-3" alt=""/>) : ''}
                    <div>
                        <p className="fs-3 m-0 ms-1">{p.data.name}</p>
                        <div>
                            <p className="fs-5 m-0 ms-1">{p.data.price}€</p>
                            {p.data.rating ?
                                (<div className="d-flex align-items-center">
                                    <p className="fs-5 m-0 ms-1">
                                        {p.data.rating}
                                    </p>
                                    <USolid.UisStar size="25" color="gold"/>
                                </div>) : ''}


                        </div>
                    </div>
                </div>
                <div className="pe-2">
                    <Unicons.UilAngleRightB size="30" color="gray"/>
                </div>
            </div>
        </div>
    );
}

export default CategoryCard;