import React from "react";

const SideBar = ({notes}) => {

    const handleOnClick = num => notes.setNotes(prevState => prevState.map(ele => ele.id === notes.notes[num].id ? { ...ele, active: !ele.active } : { ...ele, active: false }));

    const handleOnItemReset = id => notes.setNotes(prevState => prevState.filter(ele => ele.id !== id && ele));

    return ( 
        <nav>
            <header>
                <h1 className="HeaderTop">Notes</h1>
                {notes.notes.length > 1 && <input type="button" value="Reset All" onClick={() => notes.setNotes([])} className="btn"/>}
            </header>
            <article className="menu">
                {notes.notes.length !== 0 && notes.notes.map((ele, i) => <section className="note" style={ele.active ? {backgroundColor: "#112f7b", color: "#e0eff4"} : {}} key={i} onClick={() => handleOnClick(i)}>{ele.title ? ele.title : ""}<input type="button" value="X" onClick={() => handleOnItemReset(ele.id)} className="btn" /></section>)}
            </article>
        </nav>
     );
}
 
export default SideBar;