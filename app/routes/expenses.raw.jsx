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

export function loader() {
  return DUMMY_EXPENSES;
}

// import { useNavigate } from '@remix-run/react';
// import Modal from '~/components/util/Modal';

// export default function RawExpenses() {
//   const navigate = useNavigate();

//   function closeHandler() {
//     navigate('..');
//   }

//   return (
//     <Modal onClose={closeHandler}>
//       <h1>Raw Expenses</h1>
//     </Modal>
//   );
// }
