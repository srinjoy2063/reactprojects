function Skills() {
  const skills = ["HTML", "CSS", "JavaScript", "React", "Git", "GitHub"]

  return (
    <section id="skills" className="section">
      <div className="container">
        <h2>Skills</h2>

        <div className="skills-list">
          {skills.map((skill) => (
            <span key={skill} className="skill">
              {skill}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills