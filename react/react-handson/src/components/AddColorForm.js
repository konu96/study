import { useState } from 'react';

const AddColorForm = ({ onNewColor = f => f }) => {
    const [ title, setTitle ] = useState("")
    const [ color, setColor ] = useState("#000000")

    const submit = e => {
        e.preventDefault()
        onNewColor(title, color);

        setTitle("")
        setColor("")
    }

    const onChangeTitle = event => {
        setTitle(event.target.value)
    }

    const onChangeColor = event => {
        setColor(event.target.value)
    }

    return (
        <form onSubmit={submit}>
            <input
                value={title}
                type="text"
                placeholder="color title..."
                onChange={onChangeTitle}
                required />
            <input
                value={color}
                type="color"
                onChange={onChangeColor}
                required />
            <button> ADD </button>
        </form>
    )
}

export default AddColorForm