import SideBar from './components/SideBar';
import Editor from './components/Editor';
import React from 'react';

const App = () => {
  const [notes, setNotes] = React.useState([]);

  React.useEffect(() => setNotes(JSON.parse(localStorage.getItem("notes"))), []);

  return (
    <>
      <SideBar notes={{notes, setNotes}}></SideBar>
      <Editor notes={{notes, setNotes}}></Editor>
    </>
  );
}

export default App;
