import {useState, useEffect, useReducer} from "react";

const CheckBox = () => {
    const [checked, toggle] = useReducer(checked => !checked, false)

    // 描画された後に実行したい処理を記述
    useEffect(() => {
        alert(`checked: ${checked.toString()}`)
    })

    return (
        <>
            <input
                type="checkbox"
                value={checked}
                onChange={toggle}
            />
            { checked ? "checked" : "not checked" }
        </>
    )
}

export default CheckBox