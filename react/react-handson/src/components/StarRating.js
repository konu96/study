import { FaStar } from 'react-icons/fa';

const Star = ({ selected = false, onClick = f => f}) => (
    <FaStar color={selected ? 'red' : 'grey'} onClick={onClick} />
)

// props をそのまま div に渡しているけど、渡される値が分からない場合はイベントハンドラを抜いた方が良い
export default function StarRating({ totalStars = 5, selectedStars = 0, onClick = f => f }) {
    return(
        <>
            {[...Array(totalStars)].map((n, i) => (
                <Star
                    key={i}
                    selected={selectedStars > i}
                    onClick={() => onClick(i + 1)}
                />
            ))}
            <p> {selectedStars} of {totalStars}</p>
        </>
    )
}