import { FormEvent, useEffect, useRef } from 'react';

import Modal, { ModalHandle } from '../ui/Modal.tsx';
import Input from '../ui/Input.tsx';
import Button from '../ui/Button.tsx';
import { bookSessionAction, Session } from '../../store/session-slice.ts';
import { useAppDispatch, useAppSelector } from '../../store/hooks.ts';

type BookSessionProps = {
  session: Session;
  onDone: () => void; // onDone will "tell" the parent component that the BookSession component should be removed from the DOM
};

export default function BookSession({ session, onDone }: BookSessionProps) {
  const modal = useRef<ModalHandle>(null);
  const dispatch = useAppDispatch();
  const upcomingSessions = useAppSelector(state => state.session.upcomingSessions);

  // useEffect is used to open the Modal via its exposed `open` method when the component is mounted
  useEffect(() => {
    if (modal.current) {
      modal.current.open();
    }
  }, []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData);
    console.log(data); // would normally be sent to a server, together with session data

    if (upcomingSessions.some(x => x.id === session.id)) {
      alert('You have already booked that session!');
    } else {
      dispatch(bookSessionAction(session));
      onDone();
    }
  }

  return (
    <Modal ref={modal} onClose={onDone}>
      <h2>Book Session</h2>
      <form onSubmit={handleSubmit}>
        <Input label="Your name" id="name" name="name" type="text" />
        <Input label="Your email" id="email" name="email" type="email" />
        <p className="actions">
          <Button type="button" textOnly onClick={onDone}>
            Cancel
          </Button>
          <Button>Book Session</Button>
        </p>
      </form>
    </Modal>
  );
}
