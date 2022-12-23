import { useNavigate } from '@remix-run/react';
import Modal from '~/components/util/Modal';
import ExpenseForm from '~/components/expenses/ExpenseForm';

export default function UpdateExpensesPage() {
  const navigate = useNavigate();

  function closeHandler() {
    navigate('..');
  }
  return (
    <Modal onClose={closeHandler}>
      <ExpenseForm />
    </Modal>
  );
}
