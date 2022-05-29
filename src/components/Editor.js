import React from 'react';
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

const Editor = ({notes}) => {
    let active = notes.notes.find(ele => ele.active === true);

    let [utilsState, setUtilsState] = React.useState({ viewMode: "Project", addTask: false, newTaskName: "" });

    window.onbeforeunload = () => {
        localStorage.removeItem("notes");
        localStorage.setItem("notes", JSON.stringify(notes.notes));
    }
    const handleOnChange = e => {
        notes.setNotes(prevState => prevState.map(ele => ele.id === active.id ? { ...ele, content: e.target.value } : { ...ele }));
    }

    const changeContent = input => notes.setNotes(prevState => prevState.map(ele => ele.id === active.id ? { ...ele, content: ele.content + input } : { ...ele }));

    const handleUtilsOnClick = e => {
        switch(e.target.name) {
            case "heading": {
                changeContent("# ** **\n");
                break;
            }
            case "bold": {
                changeContent("** **");
                break;
            }
            case "italic": {
                changeContent("* *");
                break;
            }
            case "strike": {
                changeContent("~~ ~~");
                break;
            } 
            case "link": {
                changeContent("[Shown Text](Link)");
                break;
            } 
            case "cite": {
                changeContent(">  \n");
                break;
            }
            case "html": {
                changeContent("~~~js ~~~\n");
                break;
            }
            case "image": {
                changeContent("![Text](link)\n");
                break;
            }
            case "ul": {
                changeContent("- element \n");
                break;
            }
            case "ol": {
                changeContent("1. first.\n2. second.\n3. thirdt.\n");
                break;
            }
            case "checkbox": {
                changeContent("* [ ] task \n");
                break;
            }
            default: {
                break;
            }
        }
    }

    const handleViewOnClick = e => setUtilsState(prevState => ({...prevState, viewMode: e.target.name}));

    const handleTaskAdd = () => setUtilsState(prevState => ({...prevState, addTask: !prevState.addTask}));

    const handleSetNewTask = () => {
        setUtilsState(prevState => ({...prevState, newTaskName: "", addTask: false}));
        notes.setNotes(prevState => {
            let newState = prevState.map(ele => ({...ele, active: false}));
            newState.push({title: utilsState.newTaskName, content: "", active: true, id: Math.round(Math.random() * 1000) + utilsState.newTaskName});
            return newState;
        });
    }

    const handleNewTaskNameChange = e => setUtilsState(prevState => ({...prevState, newTaskName: e.target.value}));

    const handleOnClear = (id) => {
        notes.setNotes(prevState => {
            let newState = prevState.map(ele => {
                if(ele.id === id) {
                    return {...ele, content: ""}
                } else {
                    return {...ele}
                }
            });
            return newState;
        })
    }

    return ( 
        <main style={active ? {backgroundColor: "#112f7b", color: "#f8fdfe"} : {}} className="">
            <div className="add">
                <input type="button" value="Add Note" onClick={handleTaskAdd} className="btn" />
                {
                    utilsState.addTask && <div className='addNew'>
                        Title: <input type="text" value={utilsState.newTaskName} onChange={handleNewTaskNameChange} className="newNote"/>
                        <input type="button" value="Save" onClick={handleSetNewTask}  className="btn" />
                    </div>
                }
            </div>
            {
                active && <div className='edit'>
                    <form action="index.html" className="utils">
                        <div className="flex">
                            <div className="view">
                                <input type="button" className='util' name="Project" onClick={handleViewOnClick} value="Project" style={utilsState.viewMode === "Project" ? {backgroundColor: "#e0eff4", color: "#112f7b"} : {}} />
                                <input type="button" className='util' name="Preview" onClick={handleViewOnClick} value="Preview" style={utilsState.viewMode === "Preview" ? {backgroundColor: "#e0eff4", color: "#112f7b"} : {}}/>
                            </div>
                            <div className="text">
                                <input type="button" className='util' name="heading" onClick={handleUtilsOnClick} value="H" />
                                <input type="button" className='util' name="bold" onClick={handleUtilsOnClick} value="B" />
                                <input type="button" className='util' name="italic" onClick={handleUtilsOnClick} value="I" />
                                <input type="button" className='util' name="strike" onClick={handleUtilsOnClick} value="S" />
                            </div>
                            <div className="vendor">
                                <input type="button" className='util' name="link" onClick={handleUtilsOnClick} value="href" />
                                <input type="button" className='util' name="cite" onClick={handleUtilsOnClick} value=",,''" />
                                <input type="button" className='util' name="html" onClick={handleUtilsOnClick} value="</src>" />
                                <input type="button" className='util' name="image" onClick={handleUtilsOnClick} value="img" />
                            </div>
                            <div className="list">
                                <input type="button" className='util' name="ul" onClick={handleUtilsOnClick} value="ul" />
                                <input type="button" className='util' name="ol" onClick={handleUtilsOnClick} value="ol" />
                                <input type="button" className='util' name="checkbox" onClick={handleUtilsOnClick} value="task" />
                            </div>
                        </div>
                        <div className="textContent">
                            {
                                utilsState.viewMode === "Project" && <textarea name="noteContent" id="noteContent"  onChange={handleOnChange} value={active.content} />
                            }
                            {
                                utilsState.viewMode === "Preview" && <ReactMarkdown children={active.content} className="mdPreview" remarkPlugins={[remarkGfm]} />
                            }
                        </div>
                        <div className='clear'>
                            <input type="button" value="Clear" className='btn' onClick={() => handleOnClear(active.id)} />
                        </div>
                    </form>
                </div>
            }
        </main>
        );
}
 
export default Editor;