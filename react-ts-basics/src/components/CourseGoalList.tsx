import { ReactNode } from "react";
import { CourseGoalType } from "../App";
import CourseGoal from "./CourseGoal";
import InfoBox from "./InfoBox";

type CourseGoalListProps = {
  goals: Array<CourseGoalType>,
  onDelete: (id: number) => void
};

export default function CourseGoalList({goals, onDelete }: CourseGoalListProps) {
  if (goals.length === 0) {
    return (
      <InfoBox mode="info">You have no course goals yet.</InfoBox>
    );
  }

  let warningBox: ReactNode;

  if (goals.length >= 5 ) {
    warningBox = <InfoBox mode="warning" severity="medium">Too many goals.</InfoBox>
  }

  return (
    <>
      {warningBox}
      <ul>
        {goals.map((goal) => (
          <li key={goal.id}>
            <CourseGoal title={goal.title} onDelete={onDelete} id={goal.id}>
              <p>{goal.description}</p>
            </CourseGoal>
          </li>
        ))}
      </ul>
    </>
  )
}