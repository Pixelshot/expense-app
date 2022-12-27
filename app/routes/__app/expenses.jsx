import { Link, Outlet } from '@remix-run/react';
import ExpensesList from '~/components/expenses/ExpensesList';
import { FaPlus, FaDownload } from 'react-icons/fa';

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
        <section id="expenses-actions">
          <Link to="add">
            <FaPlus />
            <span>Add Expense</span>
          </Link>
          <a href="/expenses/raw">
            <FaDownload />
            <span>Load Raw Data</span>
          </a>
        </section>
        <ExpensesList expenses={DUMMY_EXPENSES} />
      </main>
    </>
  );
}
