import { useState } from "react"
import "./App.css"

const initialEmployees = [
  {
    id: 1,
    name: "Rahul Das",
    employeeId: "EMP101",
    department: "Farm Operations",
    gender: "Male",
    phone: "9876543210",
    localAddress: "Kolkata, West Bengal",
    permanentAddress: "Siliguri, West Bengal",
  },
  {
    id: 2,
    name: "Priya Roy",
    employeeId: "EMP102",
    department: "Dairy",
    gender: "Female",
    phone: "9876501234",
    localAddress: "Kolkata, West Bengal",
    permanentAddress: "Durgapur, West Bengal",
  },
  {
    id: 3,
    name: "Amit Kumar",
    employeeId: "EMP103",
    department: "Crop Management",
    gender: "Male",
    phone: "9123456780",
    localAddress: "Howrah, West Bengal",
    permanentAddress: "Patna, Bihar",
  },
]

const emptyForm = {
  name: "",
  employeeId: "",
  department: "Farm Operations",
  gender: "Male",
  phone: "",
  localAddress: "",
  permanentAddress: "",
}

function App() {
  const [employees, setEmployees] = useState(initialEmployees)
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState(null)
  const [search, setSearch] = useState("")
  const [departmentFilter, setDepartmentFilter] = useState("All")

  function handleChange(event) {
    const { name, value } = event.target
    setForm({ ...form, [name]: value })
  }

  function handleSubmit(event) {
    event.preventDefault()

    if (editingId) {
      setEmployees(
        employees.map((employee) =>
          employee.id === editingId ? { ...form, id: editingId } : employee
        )
      )
      setEditingId(null)
    } else {
      setEmployees([...employees, { ...form, id: Date.now() }])
    }

    setForm(emptyForm)
  }

  function editEmployee(employee) {
    setForm(employee)
    setEditingId(employee.id)
  }

  function deleteEmployee(id) {
    setEmployees(employees.filter((employee) => employee.id !== id))
  }

  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch =
      employee.name.toLowerCase().includes(search.toLowerCase()) ||
      employee.employeeId.toLowerCase().includes(search.toLowerCase())

    const matchesDepartment =
      departmentFilter === "All" || employee.department === departmentFilter

    return matchesSearch && matchesDepartment
  })

  return (
    <>
      <header className="header">
        <div className="container">
          <h1>Farm Employee Directory</h1>
          <p>Manage employee records easily</p>
        </div>
      </header>

      <main className="container">
        <section className="form-section">
          <h2>{editingId ? "Edit Employee" : "Add Employee"}</h2>

          <form onSubmit={handleSubmit} className="employee-form">
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Employee Name"
              required
            />

            <input
              name="employeeId"
              value={form.employeeId}
              onChange={handleChange}
              placeholder="Employee ID"
              required
            />

            <select
              name="department"
              value={form.department}
              onChange={handleChange}
            >
              <option>Farm Operations</option>
              <option>Dairy</option>
              <option>Crop Management</option>
              <option>Administration</option>
            </select>

            <select name="gender" value={form.gender} onChange={handleChange}>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>

            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              required
            />

            <input
              name="localAddress"
              value={form.localAddress}
              onChange={handleChange}
              placeholder="Local Address"
              required
            />

            <input
              name="permanentAddress"
              value={form.permanentAddress}
              onChange={handleChange}
              placeholder="Permanent Address"
              required
            />

            <button type="submit">
              {editingId ? "Update Employee" : "Add Employee"}
            </button>
          </form>
        </section>

        <section className="directory-section">
          <div className="directory-top">
            <h2>Employee Directory ({employees.length})</h2>

            <div className="filters">
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search by name or ID"
              />

              <select
                value={departmentFilter}
                onChange={(event) => setDepartmentFilter(event.target.value)}
              >
                <option value="All">All Departments</option>
                <option>Farm Operations</option>
                <option>Dairy</option>
                <option>Crop Management</option>
                <option>Administration</option>
              </select>
            </div>
          </div>

          {filteredEmployees.length === 0 ? (
            <p className="empty-message">No employee found.</p>
          ) : (
            <div className="employee-grid">
              {filteredEmployees.map((employee) => (
                <article className="employee-card" key={employee.id}>
                  <h3>{employee.name}</h3>
                  <p><strong>Employee ID:</strong> {employee.employeeId}</p>
                  <p><strong>Department:</strong> {employee.department}</p>
                  <p><strong>Gender:</strong> {employee.gender}</p>
                  <p><strong>Phone:</strong> {employee.phone}</p>
                  <p><strong>Local Address:</strong> {employee.localAddress}</p>
                  <p>
                    <strong>Permanent Address:</strong>{" "}
                    {employee.permanentAddress}
                  </p>

                  <div className="card-buttons">
                    <button onClick={() => editEmployee(employee)}>
                      Edit
                    </button>
                    <button
                      className="delete-button"
                      onClick={() => deleteEmployee(employee.id)}
                    >
                      Delete
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
    </>
  )
}

export default App