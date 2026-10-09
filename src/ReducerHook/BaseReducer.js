import { useReducer, useState } from "react"

export default function BaseReducer() {
    //useState

    //const [age, setAge] = useState(18)
    const [profile, setProfile] = useState({ age: 20 })

    /**
     * use Reducer
     * const [state, dispatch] = useReducer(reducer, initArg, init?)
     * 1. State: Giá trị của đối tượng cần quản lí trạng thái
     * 2. initArg: Giá trị mặc định dầu tiên của state
     * 3. reducer: Hàm/FUnction xử lí cạp nahạt giá trị của state
     * - Hàm reducer nhận vào 2 đối số được nhận từ dispatch:
     *  i. currentState
     *  ii. objectAction
     * - Hàm reducer luôn trả về 1 state mới
     * 4. dispatch là hàm kích hoạt/yêu cầu hàm reducer xử lí, cập nhật giá trị cho state
     * - dispatch khi gọi reducer sẽ truyền objectAction cho reducer
     * - objectAction gồm:
     *  i. type: hành động muốn xử lí
     *  ii. payload: giá trị tương ứng với hành động 
     */

    const [profile2, dispatch] = useReducer(reducer, { age2: 5 })

    function reducer(state, action) {
        //logic xử lí để cập nhật giá trị state (Object profile2)
        const validTypes = ["increase"]
        if (validTypes.includes(action.type)) {
            return { age2: action.payload }
        }
        
        throw Error("Unknown Type: " + action.type)
    }
    return (
        <>
            <h1>Base Reducer</h1>
            <h3>Age: {profile.age}</h3>
            <button onClick={() => setProfile({ age: profile.age + 1 })}>Increase Age</button>
            <hr />
            <h3>Age2: {profile2.age2}</h3 >
            <button onClick={() => dispatch({ type: "test", payload: 18 })}>Setup Age (18)</button>
        </>
    )
}