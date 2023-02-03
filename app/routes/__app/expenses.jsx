import { Link, Outlet, useLoaderData } from '@remix-run/react';
import ExpensesList from '~/components/expenses/ExpensesList';
import { getExpenses } from '~/data/expenses.server';
import { FaPlus, FaDownload } from 'react-icons/fa';

// Remix will automatically wait for the promise to resolve before rendering a component.
// All components of the same route has access to the routes useLoader() and useAction() data
// loader() is a server-side only function but the data inside of it is commonly used for front-end
// To establish communication between the two sides, Remix uses response as the carrier to transport data

export default function ExpensesLayout() {
  // When we first visit a page, that page is prepared on the BACK-END by Remix
  // This can be shown via console.log() command
  // console.log('This appears on front-end and back-end on first render'); // uncomment this line to test
  // As the log says: on first render, the log should appear on both front-end and back-end
  // But if we were to move to another link and return, it only appears on the front-end
  // This is how a single application works
  // Even though other links were not the inital page fetched, they are all subsequent navigation for this single page application
  // But this also means any logs on the console would appear on both front-end and back-end
  // Need to be weary on what is left for the console to pick up
  // Question: All pages are prepped beforehand on the server side are ready to be sprung into action when called, minimising loading time?
  // As long as we don't refresh, we're in the single page applicatin zone and that means the server will not be fetching the entire page
  // See #66

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
// Remix will automatically wait for the Promise to resolve before rendering any component that is calling their loaders
// EG: ExpenseOutlet component above will only be rendered once the promise inside of loader() here is resolved
export async function loader() {
  const expenses = await getExpenses();
  // Remix will automatically wrap any return raw data into a response because technically, loader needs to return a response. See #66
  // return json(expenses); // This is returning raw data(json format). But because of the explanation above, the result will be the same as below:
  // Don't forget to import {json} from @remix/node if you're using it
  // For more of this and explanation on single page see #66
  return expenses;
}
