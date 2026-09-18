import { useState } from "react"

export default function BaseUseState() {
    const [count, setCount] = useState(0)
    return (
        <>
        <h1>Base useState</h1>
        Counting: {count}
        <br/>
        <button onClick={() => setCount(count+1)}>Increase</button>
        <br/>
        <button onClick={() => setCount(0)}>reset</button>
        </>
    )
}