import { useState } from 'react';
import { FaStar } from 'react-icons/fa';

const Star = ({ selected = false, onSelect = f => f}) => (
    <FaStar color={selected ? 'red' : 'grey'} onClick={onSelect} />
)

// props をそのまま div に渡しているけど、渡される値が分からない場合はイベントハンドラを抜いた方が良い
export default function StarRating({ style = {}, totalStars = 5}, ...props) {
    const [selectedStars, setSelectedStars] = useState(3);

    return(
        <div style={{ padding: "5px", ...style}} {...props}>
            {[...Array(totalStars)].map((n, i) => (
                <Star
                    key={i}
                    selected={selectedStars > i}
                    onSelect={() => setSelectedStars(i + 1)}
                />
            ))}
            <p> {selectedStars} of {totalStars}</p>
        </div>
    )
}