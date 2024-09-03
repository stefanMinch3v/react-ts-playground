import { FormEvent, useRef } from 'react';

type NewGoalProps = {
  onAddGoal: (goal: string, summary: string) => void;
};

export default function NewGoal({onAddGoal}: NewGoalProps) {
  const goal = useRef<HTMLInputElement>(null);
  const summary = useRef<HTMLInputElement>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    // could be done with this approach + name attr on the inputs
    // let test = new FormData(event.currentTarget);
    // let data = Object.fromEntries(test);

    // another approach is two way data binding

    // third approach is using refs
    event.preventDefault();

    const goalVal = goal.current!.value;
    const summaryVal = summary.current!.value;    

    event.currentTarget.reset();

    onAddGoal(goalVal, summaryVal);
  }

  return (
    <form onSubmit={handleSubmit}>
      <p>
        <label htmlFor="goal">Your goal</label>
        <input id="goal" type="text" name='goal' ref={goal}/>
      </p>
      <p>
        <label htmlFor="summary">Short summary</label>
        <input id="summary" type="text" name='summary' ref={summary}/>
      </p>
      <p>
        <button>Add Goal</button>
      </p>
    </form>
  );
}