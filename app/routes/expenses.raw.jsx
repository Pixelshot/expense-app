import { useNavigate } from '@remix-run/react';
import Modal from '~/components/util/Modal';

export default function RawExpenses() {
  const navigate = useNavigate();

  function closeHandler() {
    navigate('..');
  }

  return (
    <Modal onClose={closeHandler}>
      <h1>Raw Expenses</h1>
    </Modal>
  );
}
