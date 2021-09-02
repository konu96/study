import StarRating from "./StarRating";
import { FaTrash } from "react-icons/fa";
import { useContext } from "react";
import { ColorContext } from "../index";

const Color = ({ id, title, color, rating, onRemove = f => f, onRate = f => f }) => {
    return (
        <section>
            <h1> { title } </h1>
            <button onClick={() => onRemove(id)}><FaTrash /></button>
            <div style={{ height: 50, backgroundColor: color }} />
            <StarRating
                selectedStars={rating}
                onClick={rating => onRate(id, rating)}
            />
        </section>
    )
}

const ColorList = () => {
    const { colors } = useContext(ColorContext)
    if (!colors.length) {
        return <div> No Colors Listed. </div>
    }

    return (
        <div className="color-list">
            {
                colors.map(color => <Color key={color.id} {...color} />)
            }
        </div>
    )
}

export default ColorList