import { Link, Outlet, useLoaderData } from '@remix-run/react';
import ExpensesList from '~/components/expenses/ExpensesList';
import { getExpenses } from '~/data/expenses.server';
import { FaPlus, FaDownload } from 'react-icons/fa';

// Remix will automatically wait for the promise to resolve before rendering a component.
// All components of the same route has access to the routes useLoader() and useAction() data

export default function ExpenseOutlet() {
  const expenses = useLoaderData();
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
        <ExpensesList expenses={expenses} />
      </main>
    </>
  );
}

// in this case, async can be omitted from loader() because the function that we're calling(getExpenses()) is already an async function that is resolved within itself via the return keyword. vid 65
export function loader() {
  return getExpenses();
}
