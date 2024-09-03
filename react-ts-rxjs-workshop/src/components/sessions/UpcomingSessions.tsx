import { useEffect, useRef, useState } from 'react';
import Modal, { type ModalHandle } from '../ui/Modal';
import UpcomingSession from './UpcomingSession';
import Button from '../ui/Button.tsx';
import { RxJsStore, Session } from '../../store/store.ts';

type UpcomingSessionsProps = {
  onClose: () => void; // onClose is accepted to "tell" the parent component that the UpcomingSessions component should be removed from the DOM
};

export default function UpcomingSessions({ onClose }: UpcomingSessionsProps) {
  const modal = useRef<ModalHandle>(null);
  const [upcomingSessions, setUpcomingSessions] = useState<ReadonlyArray<Session>>([]);
  const store = RxJsStore.getInstance();
  
  // useEffect is used to open the Modal via its exposed `open` method when the component is mounted
  useEffect(() => {
    const sub$ = store.get().subscribe(x => {
      setUpcomingSessions(x);
    });

    if (modal.current) {
      modal.current.open();
    }

    return () => {
      sub$.unsubscribe();
    }
  }, []);

  function handleCancelSession(sessionId: string) {
    store.delete(sessionId);
  }

  const hasSessions = upcomingSessions.length > 0;

  return (
    <Modal ref={modal} onClose={onClose}>
      <h2>Upcoming Sessions</h2>
      {hasSessions && (
        <ul>
          {upcomingSessions.map((session) => (
            <li key={session.id}>
              <UpcomingSession
                session={session}
                onCancel={() => handleCancelSession(session.id)}
              />
            </li>
          ))}
        </ul>
      )}
      {!hasSessions && <p>No upcoming sessions.</p>}
      <p className="actions">
        <Button onClick={onClose}>Close</Button>
      </p>
    </Modal>
  );
}
