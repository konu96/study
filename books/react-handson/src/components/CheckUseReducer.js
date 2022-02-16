import {useReducer} from "react";

const CheckUseReducer = () => {
    const [number, setNumber] = useReducer((number, newNumber) => number + newNumber, 0)

    return (
        <>
            <h1 onClick={() => setNumber(1)}>{ number }</h1>
        </>
    )
}

export default CheckUseReducer