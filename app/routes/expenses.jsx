import { Outlet } from '@remix-run/react';
import expensesStyles from '~/styles/expenses.css';
export default function ExpenseOutlet() {
  return (
    <main>
      <h1>This is the Expanse Layout from routes/expanse.jsx</h1>
      <Outlet />
    </main>
  );
}

export function links() {
  return [{ rel: 'stylesheet', href: expensesStyles }];
}
