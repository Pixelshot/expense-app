import { getExpenses } from '~/data/expenses.server';
import { requireUserSession } from '~/data/auth.server';

export async function loader({ request }) {
  const userId = await requireUserSession(request);
  return getExpenses(userId);
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
