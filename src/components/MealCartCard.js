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
                        </div>
                    </div>
                </div>
                <div className="pe-2">
                    <p className='m-0 fw-bold fs-2'>x{p.amt}</p>
                </div>
            </div>
        </div>
    );
}

export default CategoryCard;