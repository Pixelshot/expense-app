import { useNavigate } from '@remix-run/react';
import Modal from '~/components/util/Modal';
import ExpenseForm from '~/components/expenses/ExpenseForm';
import { getExpense } from '~/data/expenses.server';

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

// loader() has a params object that we can use to match the id inside of our Prisma DB
export async function loader({ params }) {
  // get the function from expenses.server.js and use it to match our params
  // send this info straight to component with useLoader()
  // Remember all components of the same route has access to the same useLoader() and useAction()
  return await getExpense(params.id);
}
