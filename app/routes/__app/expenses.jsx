// /expenses => shared layout
import { Link, Outlet, useLoaderData } from '@remix-run/react';
import ExpensesList from '~/components/expenses/ExpensesList';
import { getExpenses } from '~/data/expenses.server';
import { FaPlus, FaDownload } from 'react-icons/fa';

// Remix will automatically wait for the promise to resolve before rendering a component.
// All components of the same route has access to the routes useLoader() and useAction() data

export default function ExpensesLayout() {
  // server-side codes(eg: console.log()) in functions outside of loader() can end up on the front-end. Therefore, it's best to keep it inside of loader() since they always only run on the server-side
  // Similar concept applies to front-end codes only as well
  const expenses = useLoaderData();

  // Whenever we throw an error, the closest CatchBoundary() will be triggered
  // Not having any data at the beginning is not exactly an error, therefore a conditional statement is better suited for this task
  const hasExpenses = expenses && expenses.length > 0;
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
        {/* If there is an expense data to load, then load othwerwise direct the user to the add ui. See #78 */}
        {/* Instead of using CatchBoundary() we're doing it with conditional statement instead */}
        {/* Goes to show there are more than one way to do things */}
        {hasExpenses && <ExpensesList expenses={expenses} />}
        {!hasExpenses && (
          <section id="no-expenses">
            <h1>No Expenses found</h1>
            <p>
              Start by <Link to="add">adding some</Link> today!
            </p>
          </section>
        )}
      </main>
    </>
  );
}

// in this case, async can be omitted from loader() because the function that we're calling(getExpenses()) is already an async function that is resolved within itself via the return keyword. vid 65
export async function loader() {
  const expenses = await getExpenses();
  // Remix will automatically wrap any return raw data into a response
  // return json(expenses); // This is returning raw data(json format). But because of the explanation above, the result will be the same as below:
  // Don't forget to import {json} from @remix/node if you're using it
  // For more of this and explanation on single page see vid #66
  return expenses;
}
