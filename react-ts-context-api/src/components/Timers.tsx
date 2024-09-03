import { useTimersContext } from "../store/timers-context";
import Timer from "./Timer";

export default function Timers() {
  const { timers } = useTimersContext();

  return <ul>{timers.map(x => 
    <li key={x.name}><Timer {...x}></Timer></li>
  )}</ul>;
}
