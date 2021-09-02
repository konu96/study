import StarRating from "./StarRating";

const Color = ({ title, color, rating }) => {
    return (
        <section>
            <h1> { title } </h1>
            <div style={{ height: 50, backgroundColor: color }} />
            <StarRating selectedStars={rating} />
        </section>
    )
}

const ColorList = ({ colors = []}) => {
    if (!colors.length) {
        return <div> No Colors Listed. </div>
    }

    return (
        <div>
            {
                colors.map(color => <Color key={color.id} {...color} />)
            }
        </div>
    )
}

export default ColorList