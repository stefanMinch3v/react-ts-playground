import { FC, PropsWithChildren, ReactNode } from "react";

// fist way
// interface CourseGoalProps {
//   title: string,
//   children: ReactNode
// };

// second way
type CourseGoalProps = PropsWithChildren<{
  id: number,
  title: string,
  onDelete: (id: number) => void 
}>;

// third way
// const CourseGoal2: FC<CourseGoalProps> = ({ title, children }) => {
//   return (
//     <article>
//       <div>
//         <h2>{ title }</h2>
//         { children }
//       </div>
//       <button>Delete</button>
//     </article>
//   );
// }

// export default CourseGoal2;

export default function CourseGoal({ title, id, children, onDelete } : CourseGoalProps) {
  return (
    <article>
      <div>
        <h2>{ title }</h2>
        { children }
      </div>
      <button onClick={() => onDelete(id)}>Delete</button>
    </article>
  );
}