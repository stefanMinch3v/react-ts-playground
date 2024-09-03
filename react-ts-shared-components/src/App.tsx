import { useRef } from "react";
import Button from "./components/Button";
import Input from "./components/Input";
import Form, { FormHandle } from "./components/Form";

function App() {
  const customForm = useRef<FormHandle>(null);

  function handleSave(data: unknown) {
    const result = data as { name: string, age: number };
    console.log(result);
    customForm.current?.clear();
  }

  // const nameRef = useRef<HTMLInputElement>(null);
  // const ageRef = useRef<HTMLInputElement>(null);

  return (
    <main>
      <Form onSave={handleSave} ref={customForm}>
        {/* <Input type="text" id="name" label="Your name" ref={nameRef}/>
        <Input type="number" id="age" label="Your age" ref={ageRef}/> */}
        <Input type="text" id="name" label="Your name" />
        <Input type="number" id="age" label="Your age" />

        <p>
          <Button el="button">Save</Button>
        </p>
      </Form>
      {/* <Container as='button' onClick={() => {console.log(nameRef.current!.value); console.log(ageRef.current!.value)}} type="button">Save</Container> */}
    </main>
  );
}

export default App;
