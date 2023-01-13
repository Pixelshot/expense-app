import { useNavigate } from '@remix-run/react';
import Modal from '~/components/util/Modal';
import ExpenseForm from '~/components/expenses/ExpenseForm';
import {
  updateExpense,
  getExpense,
  deleteExpense,
} from '~/data/expenses.server';
import { validateExpenseInput } from '~/data/validation.server';
import { redirect } from '@remix-run/node';

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

export async function action({ request, params }) {
  const expenseId = params.id;
  const formData = await request.formData();
  const expenseData = Object.fromEntries(formData);

  // making the method conditional is the key to having different data inside of action()
  if (request.method === 'PATCH') {
    try {
      validateExpenseInput(expenseData);
    } catch (error) {
      return error;
    }

    await updateExpense(expenseId, expenseData);
    return redirect('/expenses');
  } else if (request.method === 'DELETE') {
    // This else if statement is redundant because there are only two methods coming this: PATCH & DELETE but for the sake of clarity, we're going to keep it as such
    await deleteExpense(expenseId);
    return redirect('/expenses');
  }
}
