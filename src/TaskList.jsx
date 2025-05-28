import { useState} from 'react';

function TaskList() {
        const [tasks, setTasks] = useState([]);
        const [task,setTask] = useState("");
        const [toggle, setToggle] = useState(new Array(tasks.length).fill(false))
        const completedTasks = toggle.filter((t)=>t).length
        const totaltasks = tasks.length;
        const percenteage = totaltasks == 0 ? 0: (completedTasks/totaltasks) * 100;
        function handleInputChange(event) {
            setTask(event.target.value);
        }
        function addTask() {
            if(task.trim() !== "") {
                setTasks(t => [...t, task]);
                setTask("");
            }
        }
        function deleteTask(index) {
            const upDatedTask = tasks.filter((_, i) => i !== index);
            setTasks(upDatedTask);
        }
        function moveUpTask(index) {
            if(index > 0)
                {
                    const upDatedTask = [...tasks];
                    [upDatedTask[index], upDatedTask[index - 1]] = [upDatedTask[index - 1], upDatedTask[index]];
                    setTasks(upDatedTask);
                }
        }
        function moveDownTask(index) {
            if(index < tasks.length - 1)
                {
                    const upDatedTask = [...tasks];
                    [upDatedTask[index], upDatedTask[index + 1]] = [upDatedTask[index + 1], upDatedTask[index]];
                    setTasks(upDatedTask);
                }
            }
        function toggleTask(index) {
            const updatedTask = [...toggle];
            updatedTask[index] = !updatedTask[index];
            setToggle(updatedTask);
        }
        
        return (<div className="to-do-list" >
            <h1>TaskBuddy</h1>
            <input type="text" placeholder="Enter Your Routine" onChange={(event) => handleInputChange(event)} value={task}/>
            <button onClick={addTask} className="add-button">Add to List</button>
            <ol>
                {tasks.map((task, index) => <li key={index}><span className="text">{task}</span><button onClick={() => moveUpTask(index)} className="move-button">👆</button><button onClick={() => moveDownTask(index)} className="move-button">👇</button><button onClick={() => deleteTask(index)} className="delete-button">Delete</button><button className={toggle[index]? "Complete":"Undo"} onClick={() =>toggleTask(index)}>{toggle[index]? "Complete":"Undo"}</button></li>)}
            </ol>
            <div className='progress-tracker'>
        <p>
            {completedTasks} out of {totaltasks} tasks Completed
        </p>
        <div className='progress-bar'>
            <div className='progress'style={{width: `${percenteage}%`}}>
            </div>
        </div>
    </div>
        </div>);
}

export default TaskList;