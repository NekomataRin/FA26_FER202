import { useContext } from "react";
import ComponentC from "./ComponentC";
import { book1Context } from "./ComponentA";

export default function ComponentB() {
    const book = useContext(book1Context)
    console.log(book)
    return (
        <>
            <div className="box child-component">
                <h1>Component B</h1>
                Book: {book}
                <ComponentC/>
            </div>
        </>
    )
}