
export default function MyProfile({ textInfo, imgInfo }) {
    //de-structuring
    return (
        <div>
            <h1>{textInfo}</h1>
            <img
                width={100}
                height={100}
                alt={imgInfo.alt}
                src={imgInfo.src}
            />
        </div>
    )
}

export function MySubjects() {
    const subjects = [
        { id: 1, name: "ReactJS", cate: "js" },
        { id: 2, name: "NodeJs", cate: "js" },
        { id: 3, name: "Jsava", cate: "oop" },
    ]

    const jsSubjects = subjects.filter(s => s.cate.toLowerCase() === "js");

    return (
        <div>
            <h2>My Subjects</h2>
            <ul>
                {jsSubjects.map((s, index) => <li> {s.name}</li>)}
            </ul>
        </div>
    )
}