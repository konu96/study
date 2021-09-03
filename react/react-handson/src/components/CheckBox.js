import { useState,useEffect } from "react";

const CheckBox = () => {
    const [checked, setChecked] = useState(false)

    // 描画された後に実行したい処理を記述
    useEffect(() => {
        alert(`checked: ${checked.toString()}`)
    })

    return (
        <>
            <input
                type="checkbox"
                value={checked}
                onChange={() => setChecked(checked => !checked)}
            />
            { checked ? "checked" : "not checked" }
        </>
    )
}

export default CheckBox