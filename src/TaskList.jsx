import React,{ useState, useEffect } from 'react';

function TaskList({ analytics }) {
    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState("");
    const [toggle, setToggle] = useState([]);

    // 🔥 Sync toggle array whenever tasks change
    useEffect(() => {
        setToggle(prev => {
            const newToggle = [...prev];
            // Add false for new tasks
            while (newToggle.length < tasks.length) {
                newToggle.push(false);
            }
            // Trim if tasks are deleted
            return newToggle.slice(0, tasks.length);
        });
    }, [tasks]);

    const completedTasks = toggle.filter((t) => t).length;
    const totalTasks = tasks.length;
    const percentage = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;

    function handleInputChange(event) {
        setTask(event.target.value);
    }

    function addTask() {
        if (task.trim() !== "") {
            setTasks(t => [...t, task]);
            analytics.track("Task Added", {
            taskName: task,
            totalTasks: tasks.length + 1
        });
            setTask("");
        }
    }

    function deleteTask(index) {
        setTasks(tasks.filter((_, i) => i !== index));
    }

    function moveUpTask(index) {
        if (index > 0) {
            const updated = [...tasks];
            [updated[index], updated[index - 1]] = [updated[index - 1], updated[index]];
            setTasks(updated);
        }
    }

    function moveDownTask(index) {
        if (index < tasks.length - 1) {
            const updated = [...tasks];
            [updated[index], updated[index + 1]] = [updated[index + 1], updated[index]];
            setTasks(updated);
        }
    }

    function toggleTask(index) {
        const updated = [...toggle];
        updated[index] = !updated[index];
        setToggle(updated);
    }

    return (
        <div className="to-do-list">
            <h1>TaskBuddy</h1>

            <input 
                type="text" 
                placeholder="Enter Your Routine" 
                onChange={handleInputChange} 
                value={task}
            />
            <button onClick={addTask} className="add-button">Add to List</button>

            <ol>
                {tasks.map((task, index) => (
                    <li key={index}>
                        <span className="text">{task}</span>

                        <button onClick={() => moveUpTask(index)} className="move-button">👆</button>
                        <button onClick={() => moveDownTask(index)} className="move-button">👇</button>

                        <button onClick={() => deleteTask(index)} className="delete-button">Delete</button>

                        <button 
                            className={toggle[index] ? "complete" : "undo"} 
                            onClick={() => toggleTask(index)}
                        >
                            {toggle[index] ? "Complete" : "Undo"}
                        </button>
                    </li>
                ))}
            </ol>

            <div className="progress-tracker">
                <p>{completedTasks} out of {totalTasks} tasks completed</p>

                <div className="progress-bar">
                    <div className="progress" style={{ width: `${percentage}%` }}></div>
                </div>
            </div>
        </div>
    );
}

export default TaskList;
