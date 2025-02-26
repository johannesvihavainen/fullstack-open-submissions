
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

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      {courses.map(course => <Course key={course.id} course={course} />)}
    </div>
  )
}
export default App