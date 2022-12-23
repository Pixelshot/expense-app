import { Outlet } from '@remix-run/react';
import ExpensesList from '~/components/expenses/ExpensesList';

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
      <Outlet />
      <main>
        <ExpensesList expenses={DUMMY_EXPENSES} />
      </main>
    </>
  );
}
