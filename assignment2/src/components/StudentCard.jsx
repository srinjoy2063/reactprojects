function StudentCard({
  name,
  rollNumber,
  department,
  semester,
  cgpa,
  photo,
}) {
  return (
    <article className="student-card">
      <img className="student-photo" src={photo} alt={name} />

      <div className="student-details">
        <h3>{name}</h3>
        <p><strong>Roll Number:</strong> {rollNumber}</p>
        <p><strong>Department:</strong> {department}</p>
        <p><strong>Semester:</strong> {semester}</p>
        <p><strong>CGPA:</strong> {cgpa}</p>
      </div>
    </article>
  )
}

export default StudentCard