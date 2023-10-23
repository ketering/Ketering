import * as Unicons from "@iconscout/react-unicons";
import {useNavigate} from "react-router-dom";

const CategoryCard = (p) => {
    const navigator = useNavigate();

    return (
        <div onClick={() => navigator(`/categories/${p.data.id}`)} className="bg-body-secondary py-3 ps-2 mb-3 rounded-3 border border-2">
            <div className="d-flex align-items-center justify-content-between">
                <p className="fs-3 m-0">{p.data.name}</p>
                <div className="pe-2">
                    <Unicons.UilAngleRightB size="30" color="gray"/>
                </div>
            </div>
        </div>
    );
}

export default CategoryCard;