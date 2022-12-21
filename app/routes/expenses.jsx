import { Outlet } from '@remix-run/react';
import ExpensesList from '~/components/expenses/ExpensesList';
import expensesStyles from '~/styles/expenses.css';

const DUMMY_EXPENSES = [
  {
    id: 1,
    title: 'First Expense',
    amount: 12.99,
    date: new Date().toISOString(),
  },
  {
    id: 2,
    title: 'Second Expense',
    amount: 16.99,
    date: new Date().toISOString(),
  },
];

export default function ExpenseOutlet() {
  return (
    <>
      <main>
        <h1>This is the Expanse Layout from routes/expanse.jsx</h1>
        <Outlet />
      </main>
      <ExpensesList expenses={DUMMY_EXPENSES} />
    </>
  );
}

export function links() {
  return [{ rel: 'stylesheet', href: expensesStyles }];
}
