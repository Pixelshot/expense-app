import ExpenseStatistics from '~/components/expenses/ExpenseStatistics';
import Chart from '../components/expenses/Chart';
// import expensesStyles from '~/styles/expenses.css';

export default function AnalysisPage() {
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
  return (
    <main>
      <ExpenseStatistics expenses={DUMMY_EXPENSES} />
      <Chart expenses={DUMMY_EXPENSES} />
    </main>
  );
}

// export function links() {
//   return [{ rel: 'stylesheet', expensesStyles }];
// }
