import {useEffect, useLayoutEffect} from "react";

const CheckUseLayoutEffect = () => {
    // useLayoutEffect は実際に Paint 処理が走る前に実行される
    useLayoutEffect(() => {
        console.log('useLayoutEffect');

    })

    useEffect(() => {
        console.log('useEffect');
    })

    return (
        <>
            <p> CheckUseLayoutEffect </p>
        </>
    )
}

export default CheckUseLayoutEffect;