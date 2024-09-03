
import './App.css'
import Header from './components/Header.tsx'
import ReactImgPath from './assets/react.svg'
import { useState } from 'react'
import CourseGoalList from './components/CourseGoalList.tsx'
import NewGoal from './components/NewGoal.tsx'

export type CourseGoalType = {
  title: string,
  description: string,
  id: number
}

export default function App() {
  const [goals, setGoals] = useState<CourseGoalType[]>([]); // goals current state snapshot of the component, setGoals that modifies the state

  function handleAddGoal(title: string, description: string) : void {
    setGoals(prevGoals => {
      const newGoal: CourseGoalType = {
        id: Math.random(),
        description: description,
        title: title
      };

      return [...prevGoals, newGoal];
    })
  }

  function handleDeleteGloal(id: number) : void {
    setGoals(oldGoals => oldGoals.filter(x => x.id !== id));
  }

  return (
    <main>
      <Header image={{ src: ReactImgPath, alt: 'a list of goals'}}>
        <h1>My course goals</h1>
      </Header>

      <NewGoal onAddGoal={handleAddGoal}/>

      <CourseGoalList goals={goals} onDelete={handleDeleteGloal}></CourseGoalList>
    </main>
  )
}
