import React from "react";
import TaskList from "./TaskList";
import './index.css'
import './App.css'
import { Analytics } from "analytics"
function App() {
  return (
    <div>
      <TaskList/>
      <Analytics />
    </div>
  );
}
export default App;
