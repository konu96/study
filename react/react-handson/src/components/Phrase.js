import {useEffect, useState} from "react";

const Phrase = () => {
    const [ value, setValue ] = useState("")
    const [ phrase, setPhrase ] = useState("initial phrase")

    const createPhrase = () => {
        setPhrase(value)
        setValue("")
    }

    useEffect(() => {
        console.log(`typing: ${value}`)
    }, [value])

    useEffect(() => {
        console.log(`saved phrase: ${phrase}`)
    }, [phrase])

    useEffect(() => {
        console.log("useEffect の第二引数に空配列を渡すと、初回描画時のみ実行される。そのため、変数の初期化や開始処理を記述する")
        console.log("useEffect に渡すコールバック関数で関数を return すると、コンポーネントがアンマウントされたときに実行される")

        return () => console.log("unmount")
    }, [])

    return (
        <>
            <label> Favorite phrase:</label>
            <input
                value={value}
                placeholder={phrase}
                onChange={event => setValue(event.target.value)}
            />
            <button onClick={createPhrase}> send </button>
        </>
    )
}

export default Phrase