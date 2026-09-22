import { useContext } from "react";
import { book2Context } from "./ComponentA";
import ComponentY from "./ComponentY";

export default function ComponentX() {
    const book = useContext(book2Context)
    console.log(book)
    return(
        <>
            <div className="box child-component">
                <h1>Component X</h1>
                <ComponentY/>
            </div>
        </>
    )
}