import React, { useEffect } from "react";
import TaskList from "./TaskList";
import "./index.css";
import "./App.css";
import Analytics from "analytics";

function App() {
  const analytics = Analytics({
    app: "my-app"
  });

  useEffect(() => {
    analytics.page();
    analytics.track("Task Added", { id: 1 });
  }, []);

  return (
    <div>
      <TaskList analytics={analytics}/>
      
    </div>
  );
}

export default App;
