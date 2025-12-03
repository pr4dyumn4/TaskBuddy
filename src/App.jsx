import React from "react";
import TaskList from "./TaskList";
import './index.css'
import './App.css'
import { Analytics } from "@vercel/analytics/next"
function App() {
  return (
    <div>
      <TaskList/>
      <Analytics />
    </div>
  );
}
export default App;
