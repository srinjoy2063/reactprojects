import StudentCard from "./StudentCard"

function StudentList({ students, onSort, isSorted }) {
  return (
    <section className="student-section">
      <div className="container">
        <div className="section-title">
          <h2>Student List</h2>

          <button className="sort-button" onClick={onSort}>
            {isSorted ? "Show Original Order" : "Sort by CGPA"}
          </button>
        </div>

        <div className="student-grid">
          {students.map((student) => (
            <StudentCard
              key={student.rollNumber}
              name={student.name}
              rollNumber={student.rollNumber}
              department={student.department}
              semester={student.semester}
              cgpa={student.cgpa}
              photo={student.photo}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default StudentList