import { useState } from 'react';
import { FaStar } from 'react-icons/fa';

const Star = ({ selected = false, onSelect = f => f}) => (
    <FaStar color={selected ? 'red' : 'grey'} onClick={onSelect} />
)

// props をそのまま div に渡しているけど、渡される値が分からない場合はイベントハンドラを抜いた方が良い
export default function StarRating({ totalStars = 5, selectedStars = 0 }) {
    return(
        <>
            {[...Array(totalStars)].map((n, i) => (
                <Star
                    key={i}
                    selected={selectedStars > i}
                />
            ))}
            <p> {selectedStars} of {totalStars}</p>
        </>
    )
}