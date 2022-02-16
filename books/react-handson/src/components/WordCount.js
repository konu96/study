import {useCallback, useEffect, useMemo, useState} from "react";

const useAnyKeyRender = () => {
    const [, forceRender] = useState()

    useEffect(() => {
        window.addEventListener("keydown", forceRender)
        return () => {
            window.removeEventListener("keydown", forceRender)
        }
    }, [])
}

const WordCount = ({ children = ""}) => {
    useAnyKeyRender()

    const words = useMemo(() => children.split(" "), [children])
    const fn = useCallback(() => {
        console.log('hello');
        console.log('world');
    }, [])

    useEffect(() => {
        console.log("fresh render")
        fn()
    }, [words, fn])

    return(
        <>
            <p>{ children }</p>
            <p>
                <strong>{ words.length } - words</strong>
            </p>
        </>
    )
}

export default WordCount