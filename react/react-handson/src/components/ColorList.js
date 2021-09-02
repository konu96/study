import StarRating from "./StarRating";
import { FaTrash } from "react-icons/fa";

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

const ColorList = ({ colors = [], onRemoveColor = f => f, onRateColor = f => f}) => {
    if (!colors.length) {
        return <div> No Colors Listed. </div>
    }

    return (
        <div className="color-list">
            {
                colors.map(color => <Color key={color.id} onRemove={onRemoveColor} onRate={onRateColor} {...color} />)
            }
        </div>
    )
}

export default ColorList