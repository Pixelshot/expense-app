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

  // function validateExpenseInput() will go through the inputs submitted by user in the try block to see if they meet the validation requirements
  // If it doesn't then it'll move to catch(error) block
  // error holds error messages we set in validation.server.js
  // This error can be displayed on the front-end by sending it back as a data from here(back-end)
  // Our current parent function is action() therefore we can extract it over on the front-end with useAction() hook
  // This method also eliminates the usage of sending data as a prop to <ExpenseForm />
  try {
    validateExpenseInput(expenseData);
  } catch (error) {
    // If data is returned instead of being redirected, the data can be accessed in our component
    return error;
  }

  await addExpense(expenseData); // This is where form connects with server
  return redirect('/expenses');
}
