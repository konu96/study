import {useEffect, useState} from "react";

const GithubUser = ({ login }) => {
    const [data, setData] = useState()

    const token = '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'
    useEffect(() => {
        if (!login) {
            return
        }

        fetch(`https://api.github.com/users/${login}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(setData)
    }, [login])

    if (!data) {
        return null
    }

    return (
        <>
            <pre>{ JSON.stringify(data, null, 2) }</pre>
        </>
    )
}

export default GithubUser