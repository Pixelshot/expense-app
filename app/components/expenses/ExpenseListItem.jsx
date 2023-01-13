import { Link, useFetcher } from '@remix-run/react';

function ExpenseListItem({ id, title, amount }) {
  // useFetcher() is used whenever we don't want to redirect after a form submission
  // See #73
  const fetcher = useFetcher();
  function deleteExpenseItemHandler() {
    // The browser has a function called confirm() that we can use to give the user final confirmation before deleting
    const proceed = confirm('Are you sure you want to delete this item?');

    // If the user chooses to not proceed then we cancel the request below
    if (!proceed) {
      return;
    }
    fetcher.submit(null, { method: 'delete', action: `/expenses/${id}` });
  }

  // Like useSubmit(), useFetcher() also has a state that we can use
  // Here we're using fetcher.state to check if fetcher is activated. And if it is, then we want to show a different layout
  if (fetcher.state !== 'idle') {
    return (
      <article className="expense-item locked">
        <p>Deleting...</p>
      </article>
    );
  }
  return (
    <article className="expense-item">
      <div>
        <h2 className="expense-title">{title}</h2>
        <p className="expense-amount">${amount.toFixed(2)}</p>
      </div>
      <menu className="expense-actions">
        <button onClick={deleteExpenseItemHandler}>Delete</button>
        {/* By default this request will be sent to exepenses.jsx and we can catch it via the request object inside of action() */}
        {/* But in this case it makes more sense to send the request to $id. We can do this by providing the route via the action attribute */}
        {/* <Form method="delete" action={`/expenses/${id}`}>
          <button>Delete</button>
        </Form> */}
        <Link to={`${id}`}>Edit</Link>
      </menu>
    </article>
  );
}

export default ExpenseListItem;
