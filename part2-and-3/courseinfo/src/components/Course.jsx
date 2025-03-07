const Header = ({ nameOfCourse }) => {
    return <h1>{nameOfCourse}</h1>
  }
  
  const Content = ({ parts }) => {
    return (
      <div>
        {parts.map(part => <Part key={part.id} part={part} />)}
      </div>
    )
  }
  
  const Part = ({ part }) => {
    return <p>{part.name} {part.exercises}</p>
  }
  
  const DisplaySum = ({ parts }) => {
    const totalExercises = parts.map(part => part.exercises).reduce((sum, exercises) => sum + exercises, 0)
  
    return (
      <p><strong>total of {totalExercises} exercises</strong></p>
    )
  }
  
  const Course = ({ course }) => {
  
    return (
      <div>
        <Header nameOfCourse={course.name} />
        <Content parts={course.parts} />
        <DisplaySum parts={course.parts} />
      </div>
    )
  }

  export default Course