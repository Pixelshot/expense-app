import {
  Form,
  Link,
  useActionData,
  useTransition as useNavigation,
} from '@remix-run/react';

// useTransition() as useNavigation() because the name will be changed to useNavigation() in the near future

// useActionData() and useLoaderData() can also be called in a component, not just in a route file.

function ExpenseForm() {
  const today = new Date().toISOString().slice(0, 10); // yields something like 2023-09-10
  const validationErrors = useActionData();
  const navigation = useNavigation();

  // This useTransition()/useNavigation() hook can only work with <Form /> not <form />

  // Letting the user know what's going on with the submitted form
  // this can be used at our button inside of <Form>
  const isSubmitting = navigation.state !== 'idle';

  return (
    <Form method="post" className="form" id="expense-form">
      <p>
        <label htmlFor="title">Expense Title</label>
        <input type="text" id="title" name="title" required maxLength={30} />
      </p>

      <div className="form-row">
        <p>
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            id="amount"
            name="amount"
            min="0"
            step="0.01"
            required
          />
        </p>
        <p>
          <label htmlFor="date">Date</label>
          <input type="date" id="date" name="date" max={today} required />
        </p>
      </div>
      {validationErrors && (
        <ul>
          {Object.values(validationErrors).map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}
      <div className="form-actions">
        <button disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Save Expense'}
        </button>
        <Link to="..">Cancel</Link>
      </div>
    </Form>
  );
}

export default ExpenseForm;

// This code is just to show how to use useSubmit() hook
// For more info, see vid 63

// import { useSubmit} from '@remix-run/react'

// insert this section and the function below inside of action()
// const submit = useSubmit()

// function submitHandler(event) {
//   event.preventDefault();
// perform your own validation
// ...
//   submit(event.target, {
//     action: 'expenses/add',
//     method: 'post'
//   })
// }

// This function can the be hooked to onSubmit() in our form
