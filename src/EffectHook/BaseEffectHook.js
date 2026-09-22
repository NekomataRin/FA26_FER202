import { useEffect, useState } from "react"

/**
 * Effect hook
 * useEffect CHỈ ĐƯỢC GỌI sau khi Component đã được render
 */


export default function BaseEffectHook() {
    const [count, setCount] = useState(0)
    const [label, setLabel] = useState("Hello, guys!")
    /* Effect usages 
    * 1. useEffect(callback)
    * useEffect luôn luôn được gọi mỗi khi Component được render/re-render
     useEffect(() => {
        console.log("useEffect (Chỉ có hàm callback) here!")
     })
    */


    /*
    * 2. useEffect(callback, [])
    * useEffect sẽ được gọi đúng 1 lần duy nhất sau khi Component render lần đầu tiên
    *
     useEffect(() => {
        console.log("useEffect (Trường hợp có []) here!")
     }, [])
    */

    /* 
    * 3. useEffect(callback, [dependencies])
    * 
    */
    useEffect(() => {
        console.log(`useEffect (trường hợp có dependencies [count: ${count}]) here!`)
    }, [count])
    return (
        <>
            {console.log("Component rendered here!")}
            <h1>Base Effect Hook</h1>
            Counting: {count}
            <br />
            <button onClick={() => setCount(count + 1)}>Increase</button>
            <button onClick={() => setCount(0)}>Reset</button>
            <br />
            <h2>Label: {label}</h2>
            <p>
                <input value={label} onChange={(e) => setLabel(e.target.value)}/>
            </p>
        </>
    )
}