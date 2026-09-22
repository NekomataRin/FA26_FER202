import { useEffect, useState } from "react"

export default function OnlineStatus() {
    const [isOnline, setIsOnline] = useState(navigator.onLine)
    console.log(isOnline)

    const updateOnlineStatus = () => {
        setIsOnline(navigator.onLine)
    }

    useEffect(() => {
        window.addEventListener("online", updateOnlineStatus())
        window.addEventListener("offline", updateOnlineStatus())
    }, [])

    return (
        <>
            <h1>Online Status Checking</h1>
            <h2>{isOnline ? 'Online' : 'Offline'}</h2>
        </>
    )
}