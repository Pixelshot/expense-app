import { redirect } from '@remix-run/node';
import { useNavigate } from '@remix-run/react';
import ExpenseForm from '~/components/expenses/ExpenseForm';
import Modal from '~/components/util/Modal';
import { addExpense } from '~/data/expenses.server';
import { validateExpenseInput } from '~/data/validation.server';

export default function AddExpensesPage() {
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

export async function action({ request }) {
  const formData = await request.formData();
  // To obtain data from formData, we need to use the get('name') method
  // The other way of obtaining is to convert formData into an object like below
  const expenseData = Object.fromEntries(formData);
  // console.log(expenseData, formData.get('title'));

  try {
    validateExpenseInput(expenseData);
  } catch (error) {
    // If data is returned instead of being redirected, the data can be accessed in our component
    return error;
  }

  await addExpense(expenseData); // This is where form connects with server
  return redirect('/expenses');
}
