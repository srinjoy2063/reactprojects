import { useState } from "react";

import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Navigate,
  Outlet,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";

import "./App.css";


// =====================================================
// INITIAL TASKS
// =====================================================

const initialTasks = [
  {
    id: 1,
    description: "Complete React assignment",
    priority: "High",
    category: "College",
    due: "2026-08-28",
    status: "Pending",
  },
  {
    id: 2,
    description: "Study JavaScript",
    priority: "Medium",
    category: "Study",
    due: "2026-08-30",
    status: "Pending",
  },
  {
    id: 3,
    description: "Submit project report",
    priority: "High",
    category: "College",
    due: "2026-08-25",
    status: "Completed",
  },
];


// =====================================================
// PROTECTED ROUTE
// =====================================================

function ProtectedRoute({ isLoggedIn }) {
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}


// =====================================================
// MAIN LAYOUT
// =====================================================

function Layout({ setIsLoggedIn }) {
  const navigate = useNavigate();

  function logout() {
    setIsLoggedIn(false);
    navigate("/login");
  }

  return (
    <div className="app">

      <header className="header">

        <div className="logo">
          <span>✓</span>
          TaskFlow
        </div>

        <nav className="navbar">

          <Link to="/dashboard">
            Dashboard
          </Link>

          <Link to="/tasks">
            Tasks
          </Link>

          <Link to="/tasks/completed">
            Completed
          </Link>

          <Link to="/add-task">
            Add Task
          </Link>

        </nav>

        <button
          className="logout-button"
          onClick={logout}
        >
          Logout
        </button>

      </header>


      <main>
        <Outlet />
      </main>


      <footer className="footer">
        TaskFlow • React Task Manager
      </footer>

    </div>
  );
}


// =====================================================
// LOGIN PAGE
// =====================================================

function Login({ setIsLoggedIn }) {
  const navigate = useNavigate();

  function handleLogin() {
    setIsLoggedIn(true);
    navigate("/dashboard");
  }

  return (
    <div className="login-page">

      <div className="login-card">

        <div className="login-icon">
          ✓
        </div>

        <h1>TaskFlow</h1>

        <p>
          Simple and powerful task management
        </p>

        <button
          className="login-button"
          onClick={handleLogin}
        >
          Login to Dashboard
        </button>

      </div>

    </div>
  );
}


// =====================================================
// DASHBOARD
// =====================================================

function Dashboard({ tasks }) {

  const totalTasks = tasks.length;

  const pendingTasks = tasks.filter(
    (task) => task.status === "Pending"
  ).length;

  const completedTasks = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

  const highPriorityTasks = tasks.filter(
    (task) => task.priority === "High"
  ).length;


  return (
    <div className="page">

      <div className="page-heading">

        <div>
          <h1>Dashboard</h1>

          <p>
            Here's an overview of your tasks.
          </p>
        </div>

        <Link
          to="/add-task"
          className="primary-button"
        >
          + Add Task
        </Link>

      </div>


      <div className="stats-grid">


        {/* TOTAL TASKS */}

        <Link
          to="/tasks"
          className="stat-card total-card"
        >

          <div className="card-glow"></div>

          <div className="stat-icon">
            📋
          </div>

          <h2>
            Total Tasks
          </h2>

          <strong>
            {totalTasks}
          </strong>

          <span>
            View all tasks →
          </span>

        </Link>


        {/* PENDING */}

        <Link
          to="/tasks?status=Pending"
          className="stat-card pending-card"
        >

          <div className="card-glow"></div>

          <div className="stat-icon">
            ⏳
          </div>

          <h2>
            Pending
          </h2>

          <strong>
            {pendingTasks}
          </strong>

          <span>
            View pending →
          </span>

        </Link>


        {/* COMPLETED */}

        <Link
          to="/tasks/completed"
          className="stat-card completed-card"
        >

          <div className="card-glow"></div>

          <div className="stat-icon">
            ✅
          </div>

          <h2>
            Completed
          </h2>

          <strong>
            {completedTasks}
          </strong>

          <span>
            View completed →
          </span>

        </Link>


        {/* HIGH PRIORITY */}

        <Link
          to="/tasks?priority=High"
          className="stat-card high-card"
        >

          <div className="card-glow"></div>

          <div className="stat-icon">
            🔥
          </div>

          <h2>
            High Priority
          </h2>

          <strong>
            {highPriorityTasks}
          </strong>

          <span>
            View high priority →
          </span>

        </Link>

      </div>


      {/* QUICK ACTIONS */}

      <div className="dashboard-section">

        <h2>
          Quick Actions
        </h2>

        <div className="quick-actions">

          <Link to="/add-task">
            <span>➕</span>
            Add New Task
          </Link>

          <Link to="/tasks">
            <span>📋</span>
            View All Tasks
          </Link>

          <Link to="/tasks/completed">
            <span>✅</span>
            Completed Tasks
          </Link>

        </div>

      </div>

    </div>
  );
}


// =====================================================
// TASKS LAYOUT - NESTED ROUTES
// =====================================================

function TasksLayout() {

  return (
    <div className="page">

      <div className="page-heading">

        <div>
          <h1>Tasks</h1>

          <p>
            Manage all your tasks from here.
          </p>
        </div>

        <Link
          to="/add-task"
          className="primary-button"
        >
          + Add Task
        </Link>

      </div>


      <div className="task-tabs">

        <Link to="/tasks">
          All Tasks
        </Link>

        <Link to="/tasks/completed">
          Completed Tasks
        </Link>

      </div>


      <Outlet />

    </div>
  );
}


// =====================================================
// ALL TASKS
// =====================================================

function AllTasks({
  tasks,
  completeTask,
  deleteTask,
}) {

  const [filter, setFilter] = useState("All");

  const [searchParams] = useSearchParams();

  const statusFilter =
    searchParams.get("status");

  const priorityFilter =
    searchParams.get("priority");


  let filteredTasks = [...tasks];


  // URL STATUS FILTER

  if (statusFilter) {

    filteredTasks =
      filteredTasks.filter(
        (task) =>
          task.status === statusFilter
      );

  }


  // URL PRIORITY FILTER

  if (priorityFilter) {

    filteredTasks =
      filteredTasks.filter(
        (task) =>
          task.priority === priorityFilter
      );

  }


  // BUTTON FILTER

  if (filter !== "All") {

    filteredTasks =
      filteredTasks.filter(
        (task) =>
          task.priority === filter
      );

  }


  return (
    <div>


      {/* FILTER BUTTONS */}

      <div className="filter-section">

        <span>
          Filter by priority:
        </span>

        <button
          className={
            filter === "All"
              ? "filter-button active"
              : "filter-button"
          }
          onClick={() => setFilter("All")}
        >
          All
        </button>

        <button
          className={
            filter === "High"
              ? "filter-button active"
              : "filter-button"
          }
          onClick={() => setFilter("High")}
        >
          High
        </button>

        <button
          className={
            filter === "Medium"
              ? "filter-button active"
              : "filter-button"
          }
          onClick={() => setFilter("Medium")}
        >
          Medium
        </button>

        <button
          className={
            filter === "Low"
              ? "filter-button active"
              : "filter-button"
          }
          onClick={() => setFilter("Low")}
        >
          Low
        </button>

      </div>


      {/* TASK LIST */}

      {filteredTasks.length === 0 ? (

        <div className="empty-state">

          <div>
            📝
          </div>

          <h2>
            No tasks found
          </h2>

          <p>
            There are no tasks matching this filter.
          </p>

        </div>

      ) : (

        <div className="task-list">

          {filteredTasks.map((task) => (

            <div
              className="task-card"
              key={task.id}
            >

              <div className="task-main">

                <div className="task-title-row">

                  <h2>
                    {task.description}
                  </h2>

                  <span
                    className={
                      task.priority === "High"
                        ? "priority high"
                        : task.priority === "Medium"
                        ? "priority medium"
                        : "priority low"
                    }
                  >
                    {task.priority}
                  </span>

                </div>


                <div className="task-info">

                  <span>
                    📁 {task.category}
                  </span>

                  <span>
                    📅 {formatDate(task.due)}
                  </span>

                  <span
                    className={
                      task.status === "Completed"
                        ? "status completed"
                        : "status pending"
                    }
                  >
                    {task.status}
                  </span>

                </div>

              </div>


              <div className="task-actions">

                <Link
                  to={`/tasks/${task.id}`}
                  className="view-button"
                >
                  View
                </Link>


                <Link
                  to={`/tasks/${task.id}/edit`}
                  className="edit-button"
                >
                  Edit
                </Link>


                {task.status !== "Completed" && (

                  <button
                    className="complete-button"
                    onClick={() =>
                      completeTask(task.id)
                    }
                  >
                    Complete
                  </button>

                )}


                <button
                  className="delete-button"
                  onClick={() =>
                    deleteTask(task.id)
                  }
                >
                  Delete
                </button>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}


// =====================================================
// COMPLETED TASKS
// =====================================================

function CompletedTasks({ tasks }) {

  const completedTasks =
    tasks.filter(
      (task) =>
        task.status === "Completed"
    );


  return (
    <div>

      {completedTasks.length === 0 ? (

        <div className="empty-state">

          <div>
            🎉
          </div>

          <h2>
            No completed tasks
          </h2>

          <p>
            Complete a task and it will appear here.
          </p>

        </div>

      ) : (

        <div className="task-list">

          {completedTasks.map((task) => (

            <div
              className="task-card completed-task-card"
              key={task.id}
            >

              <div className="task-main">

                <div className="task-title-row">

                  <h2>
                    {task.description}
                  </h2>

                  <span className="priority high">
                    {task.priority}
                  </span>

                </div>


                <div className="task-info">

                  <span>
                    📁 {task.category}
                  </span>

                  <span>
                    📅 {formatDate(task.due)}
                  </span>

                  <span className="status completed">
                    Completed
                  </span>

                </div>

              </div>


              <div className="task-actions">

                <Link
                  to={`/tasks/${task.id}`}
                  className="view-button"
                >
                  View Details
                </Link>

                <Link
                  to={`/tasks/${task.id}/edit`}
                  className="edit-button"
                >
                  Edit
                </Link>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}


// =====================================================
// TASK DETAILS - DYNAMIC ROUTE
// =====================================================

function TaskDetails({
  tasks,
  completeTask,
  deleteTask,
}) {

  const { id } = useParams();

  const navigate = useNavigate();


  const task =
    tasks.find(
      (task) =>
        task.id === Number(id)
    );


  if (!task) {

    return (
      <div className="page">

        <div className="empty-state">

          <div>
            ❌
          </div>

          <h2>
            Task not found
          </h2>

          <button
            className="primary-button"
            onClick={() => navigate("/tasks")}
          >
            Back to Tasks
          </button>

        </div>

      </div>
    );

  }


  function handleDelete() {

    deleteTask(task.id);

    navigate("/tasks");

  }


  return (
    <div className="page">

      <button
        className="back-button"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>


      <div className="details-card">

        <div className="details-header">

          <div>

            <span className="details-label">
              Task Details
            </span>

            <h1>
              {task.description}
            </h1>

          </div>


          <span
            className={
              task.priority === "High"
                ? "priority high"
                : task.priority === "Medium"
                ? "priority medium"
                : "priority low"
            }
          >
            {task.priority}
          </span>

        </div>


        <div className="details-grid">

          <div className="detail-item">

            <span>
              Category
            </span>

            <strong>
              📁 {task.category}
            </strong>

          </div>


          <div className="detail-item">

            <span>
              Due Date
            </span>

            <strong>
              📅 {formatDate(task.due)}
            </strong>

          </div>


          <div className="detail-item">

            <span>
              Status
            </span>

            <strong>
              {task.status === "Completed"
                ? "✅ Completed"
                : "⏳ Pending"}
            </strong>

          </div>


          <div className="detail-item">

            <span>
              Task ID
            </span>

            <strong>
              #{task.id}
            </strong>

          </div>

        </div>


        <div className="details-actions">

          <Link
            to={`/tasks/${task.id}/edit`}
            className="edit-button large"
          >
            ✏️ Edit Task
          </Link>


          {task.status !== "Completed" && (

            <button
              className="complete-button large"
              onClick={() =>
                completeTask(task.id)
              }
            >
              ✓ Mark Completed
            </button>

          )}


          <button
            className="delete-button large"
            onClick={handleDelete}
          >
            🗑 Delete Task
          </button>

        </div>

      </div>

    </div>
  );
}


// =====================================================
// ADD TASK
// =====================================================

function AddTask({ addTask }) {

  const navigate = useNavigate();


  const [description, setDescription] =
    useState("");

  const [priority, setPriority] =
    useState("Medium");

  const [category, setCategory] =
    useState("College");

  const [due, setDue] =
    useState("2026-08-28");


  function handleSubmit(event) {

    event.preventDefault();


    if (!description.trim()) {

      alert("Please enter a task description.");

      return;

    }


    addTask({
      description,
      priority,
      category,
      due,
      status: "Pending",
    });


    navigate("/tasks");

  }


  return (
    <div className="page">

      <div className="page-heading">

        <div>

          <h1>
            Add New Task
          </h1>

          <p>
            Create a new task and keep your work organized.
          </p>

        </div>

      </div>


      <form
        className="task-form"
        onSubmit={handleSubmit}
      >

        <div className="form-group">

          <label>
            Task Description
          </label>

          <input
            type="text"
            placeholder="Enter task description"
            value={description}
            onChange={(event) =>
              setDescription(event.target.value)
            }
          />

        </div>


        <div className="form-row">

          <div className="form-group">

            <label>
              Priority
            </label>

            <select
              value={priority}
              onChange={(event) =>
                setPriority(event.target.value)
              }
            >
              <option>
                High
              </option>

              <option>
                Medium
              </option>

              <option>
                Low
              </option>

            </select>

          </div>


          <div className="form-group">

            <label>
              Category
            </label>

            <select
              value={category}
              onChange={(event) =>
                setCategory(event.target.value)
              }
            >
              <option>
                College
              </option>

              <option>
                Study
              </option>

              <option>
                Personal
              </option>

              <option>
                Work
              </option>

            </select>

          </div>

        </div>


        <div className="form-group">

          <label>
            Due Date
          </label>

          <input
            type="date"
            value={due}
            onChange={(event) =>
              setDue(event.target.value)
            }
          />

        </div>


        <div className="form-actions">

          <button
            type="button"
            className="cancel-button"
            onClick={() =>
              navigate("/tasks")
            }
          >
            Cancel
          </button>

          <button
            type="submit"
            className="primary-button"
          >
            Create Task
          </button>

        </div>

      </form>

    </div>
  );
}


// =====================================================
// EDIT / UPDATE TASK
// =====================================================

function EditTask({
  tasks,
  updateTask,
}) {

  const { id } = useParams();

  const navigate = useNavigate();


  const task =
    tasks.find(
      (task) =>
        task.id === Number(id)
    );


  const [description, setDescription] =
    useState(task ? task.description : "");

  const [priority, setPriority] =
    useState(task ? task.priority : "Medium");

  const [category, setCategory] =
    useState(task ? task.category : "College");

  const [due, setDue] =
    useState(task ? task.due : "2026-08-28");


  if (!task) {

    return (
      <div className="page">

        <div className="empty-state">

          <h2>
            Task not found
          </h2>

          <button
            className="primary-button"
            onClick={() =>
              navigate("/tasks")
            }
          >
            Back to Tasks
          </button>

        </div>

      </div>
    );

  }


  function handleSubmit(event) {

    event.preventDefault();


    if (!description.trim()) {

      alert("Please enter a task description.");

      return;

    }


    updateTask(task.id, {
      description,
      priority,
      category,
      due,
    });


    navigate(`/tasks/${task.id}`);

  }


  return (
    <div className="page">

      <div className="page-heading">

        <div>

          <h1>
            Edit Task
          </h1>

          <p>
            Update the details of your task.
          </p>

        </div>

      </div>


      <form
        className="task-form"
        onSubmit={handleSubmit}
      >

        <div className="form-group">

          <label>
            Task Description
          </label>

          <input
            type="text"
            value={description}
            onChange={(event) =>
              setDescription(event.target.value)
            }
          />

        </div>


        <div className="form-row">

          <div className="form-group">

            <label>
              Priority
            </label>

            <select
              value={priority}
              onChange={(event) =>
                setPriority(event.target.value)
              }
            >

              <option>
                High
              </option>

              <option>
                Medium
              </option>

              <option>
                Low
              </option>

            </select>

          </div>


          <div className="form-group">

            <label>
              Category
            </label>

            <select
              value={category}
              onChange={(event) =>
                setCategory(event.target.value)
              }
            >

              <option>
                College
              </option>

              <option>
                Study
              </option>

              <option>
                Personal
              </option>

              <option>
                Work
              </option>

            </select>

          </div>

        </div>


        <div className="form-group">

          <label>
            Due Date
          </label>

          <input
            type="date"
            value={due}
            onChange={(event) =>
              setDue(event.target.value)
            }
          />

        </div>


        <div className="form-actions">

          <button
            type="button"
            className="cancel-button"
            onClick={() =>
              navigate(`/tasks/${task.id}`)
            }
          >
            Cancel
          </button>


          <button
            type="submit"
            className="primary-button"
          >
            Save Changes
          </button>

        </div>

      </form>

    </div>
  );
}


// =====================================================
// DATE FORMATTER
// =====================================================

function formatDate(date) {

  const dateObject =
    new Date(date + "T00:00:00");


  return dateObject.toLocaleDateString(
    "en-GB",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );
}


// =====================================================
// MAIN APP
// =====================================================

function App() {

  const [tasks, setTasks] =
    useState(initialTasks);

  const [isLoggedIn, setIsLoggedIn] =
    useState(false);


  // ADD TASK

  function addTask(newTask) {

    const task = {
      ...newTask,
      id:
        tasks.length > 0
          ? Math.max(
              ...tasks.map(
                (task) => task.id
              )
            ) + 1
          : 1,
    };


    setTasks([
      ...tasks,
      task,
    ]);

  }


  // COMPLETE TASK

  function completeTask(id) {

    setTasks(
      tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              status: "Completed",
            }
          : task
      )
    );

  }


  // DELETE TASK

  function deleteTask(id) {

    setTasks(
      tasks.filter(
        (task) =>
          task.id !== id
      )
    );

  }


  // UPDATE TASK

  function updateTask(id, updatedData) {

    setTasks(
      tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              ...updatedData,
            }
          : task
      )
    );

  }


  return (

    <BrowserRouter>

      <Routes>


        {/* LOGIN */}

        <Route
          path="/login"
          element={
            <Login
              setIsLoggedIn={
                setIsLoggedIn
              }
            />
          }
        />


        {/* PROTECTED ROUTES */}

        <Route
          element={
            <ProtectedRoute
              isLoggedIn={
                isLoggedIn
              }
            />
          }
        >

          <Route
            element={
              <Layout
                setIsLoggedIn={
                  setIsLoggedIn
                }
              />
            }
          >


            {/* DEFAULT */}

            <Route
              path="/"
              element={
                <Navigate
                  to="/dashboard"
                  replace
                />
              }
            />


            {/* DASHBOARD */}

            <Route
              path="/dashboard"
              element={
                <Dashboard
                  tasks={tasks}
                />
              }
            />


            {/* NESTED TASK ROUTES */}

            <Route
              path="/tasks"
              element={
                <TasksLayout />
              }
            >

              <Route
                index
                element={
                  <AllTasks
                    tasks={tasks}
                    completeTask={
                      completeTask
                    }
                    deleteTask={
                      deleteTask
                    }
                  />
                }
              />


              <Route
                path="completed"
                element={
                  <CompletedTasks
                    tasks={tasks}
                  />
                }
              />

            </Route>


            {/* DYNAMIC TASK DETAILS */}

            <Route
              path="/tasks/:id"
              element={
                <TaskDetails
                  tasks={tasks}
                  completeTask={
                    completeTask
                  }
                  deleteTask={
                    deleteTask
                  }
                />
              }
            />


            {/* DYNAMIC EDIT ROUTE */}

            <Route
              path="/tasks/:id/edit"
              element={
                <EditTask
                  tasks={tasks}
                  updateTask={
                    updateTask
                  }
                />
              }
            />


            {/* ADD TASK */}

            <Route
              path="/add-task"
              element={
                <AddTask
                  addTask={
                    addTask
                  }
                />
              }
            />

          </Route>

        </Route>


        {/* UNKNOWN ROUTE */}

        <Route
          path="*"
          element={
            <Navigate
              to="/dashboard"
              replace
            />
          }
        />

      </Routes>

    </BrowserRouter>

  );
}


export default App;