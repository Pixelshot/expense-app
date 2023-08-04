import ExpenseStatistics from '~/components/expenses/ExpenseStatistics';
import Chart from '~/components/expenses/Chart';
import Error from '~/components/util/Error';
import { json } from '@remix-run/node';
import { getExpenses } from '~/data/expenses.server';
import { useCatch, useLoaderData } from '@remix-run/react';
import { requireUserSession } from '~/data/auth.server';

export default function ExpensesAnalysisPage() {
  const expenses = useLoaderData();
  return (
    <main>
      <Chart expenses={expenses} />
      <ExpenseStatistics expenses={expenses} />
    </main>
  );
}

export async function loader({ request }) {
  const userId = await requireUserSession(request);
  const expenses = await getExpenses(userId);
  if (!expenses || expenses.length === 0) {
    throw json(
      { message: 'Error: Could not create chart for expanse(s)' },
      {
        status: 404,
        statusText: 'Expenses not found',
      }
    );
  }
  return expenses; // same as return json(expenses) but Remix does it automatically for us
}

export function CatchBoundary() {
  const caughtResponse = useCatch();
  return (
    <main>
      <Error title={caughtResponse.statusText}>
        <p>
          {caughtResponse.data?.message ||
            'Could not create chart for expense(s)'}
        </p>
      </Error>
    </main>
  );
}
