import { useEffect, useState } from "react";

export default function DataFetching() {
    const [posts, setPosts] = useState([])
    const [timeRemaining, setTimeRemaining] = useState(10);
    const userId = timeRemaining //reload mỗi lần 
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
            const data = await response.json()

            setPosts(data)
        }
        fetchData()
    }, [userId])

    useEffect(() => {
        if (timeRemaining <= 0) {
            return
        }

        const timerId = setInterval(() => {
            setTimeRemaining((preTime) => preTime - 1)
        }, 1000)

        return () => {
            clearInterval(timerId)
        }
    }, [timeRemaining])


    return (
        <div>
            {posts.map((post) => (
                <div key={post.id}>
                    <h3>{post.title}</h3>
                    <p>{post.body}</p>
                </div>
            ))}
            <p>Timer: {timeRemaining}</p>
        </div>
    )
}