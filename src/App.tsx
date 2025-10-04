import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

type taskData = {
    id: number;
    title: string;
    created_at: string;
    description: string;
};

const App = () => {
    const [task, setTask] = useState({ title: "", desc: "" });
    const [tasksData, setTasksData] = useState<taskData[]>([]);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const response = await supabase
            .from("tasks")
            .insert({
                title: task.title,
                description: task.desc,
            })
            .single();
        console.log(response);
    }

    async function deleteTask(id: number) {
        const response = await supabase.from("tasks").delete().eq("id", id);
        console.log(response);
    }

    useEffect(() => {
        (async function () {
            const response = await supabase
                .from("tasks")
                .select("*")
                .order("created_at", { ascending: true });

            setTasksData(response.data as taskData[]);
        })();
    }, []);

    return (
        <div className="container">
            <h1>Task manager CRUD</h1>
            <form onSubmit={handleSubmit}>
                <input
                    value={task.title}
                    onChange={(e) =>
                        setTask((prev) => ({ ...prev, title: e.target.value }))
                    }
                    type="text"
                    placeholder="Task title"
                />
                <input
                    value={task.desc}
                    onChange={(e) =>
                        setTask((prev) => ({ ...prev, desc: e.target.value }))
                    }
                    type="text"
                    placeholder="Task description"
                />
                <button>Add Task</button>
            </form>

            <div>
                {tasksData.map((item) => (
                    <div key={item.id} className="task">
                        <span>Title: {item.title}</span>
                        <span>Description: {item.description}</span>
                        <span>created at: {item.created_at}</span>
                        <button>Edit</button>
                        <button onClick={() => deleteTask(item.id)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default App;
