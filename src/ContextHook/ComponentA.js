import { createContext, useState } from "react";
import ComponentB from "./ComponentB";
import ComponentX from "./ComponentX";

// export const booksContext = createContext();

export const book1Context = createContext();
export const book2Context = createContext();


export default function ComponentA() {
    const [book1, setBook1] = useState("Harry Potter")
    const [book2, setBOok2] = useState("Bất hạnh là 1 tài sản")
    return (
        <>
            <div className="box">
                <h1>Context Hook</h1>
                <h1>Component A</h1>
                <h3>Book 1: {book1}</h3>
                <h3>Book 2: {book2}</h3>

                {/*<booksContext.Provider value={{ book1, book2 }}>
                    <ComponentB />
                    <ComponentX />
                </booksContext.Provider>*/}

                <book1Context.Provider value={book1}>
                    <ComponentB/>
                </book1Context.Provider>

                <book2Context.Provider value={book2}>
                    <ComponentX/>
                </book2Context.Provider>
            </div>

        </>
    )
}