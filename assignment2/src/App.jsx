import { useState } from "react"
import Header from "./components/Header"
import StudentList from "./components/StudentList"
import Footer from "./components/Footer"
import "./App.css"

const students = [
  {
    name: "Aarav Sharma",
    rollNumber: "BCA101",
    department: "BCA",
    semester: "4th Semester",
    cgpa: 8.7,
    photo: "https://i.pravatar.cc/200?img=11",
  },
  {
    name: "Priya Das",
    rollNumber: "BCA102",
    department: "BCA",
    semester: "4th Semester",
    cgpa: 9.2,
    photo: "https://i.pravatar.cc/200?img=32",
  },
  {
    name: "Rahul Roy",
    rollNumber: "BCA103",
    department: "BCA",
    semester: "4th Semester",
    cgpa: 8.4,
    photo: "https://i.pravatar.cc/200?img=12",
  },
  {
    name: "Sneha Gupta",
    rollNumber: "BCA104",
    department: "BCA",
    semester: "4th Semester",
    cgpa: 9.0,
    photo: "https://i.pravatar.cc/200?img=47",
  },
]

function App() {
  const [isSorted, setIsSorted] = useState(false)

  const displayedStudents = isSorted
    ? [...students].sort((a, b) => b.cgpa - a.cgpa)
    : students

  function toggleSort() {
    setIsSorted(!isSorted)
  }

  return (
    <>
      <Header />
      <main>
        <StudentList
          students={displayedStudents}
          onSort={toggleSort}
          isSorted={isSorted}
        />
      </main>
      <Footer />
    </>
  )
}

export default App