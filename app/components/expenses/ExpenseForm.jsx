import {
  Form,
  Link,
  useActionData,
  useLoaderData,
  useMatches,
  useParams,
  useTransition as useNavigation,
} from '@remix-run/react';

// useTransition() as useNavigation() because the name will be changed to useNavigation() in the near future

// useActionData() and useLoaderData() can also be called in a component, not just in a route file.

// useMatches() hook provides an array of objects
// The id property of each object shows active route as its value
// If that route has data in its loader(), it'll be shown in the data object
// We can extract the data and use it here
// This is what it means by leveraging on parent's loader()

// We can use useParams() hook to obtain current id and match it with the data's id that we've gotten from useMatches() to extract the particular data

function ExpenseForm() {
  const today = new Date().toISOString().slice(0, 10); // yields something like 2023-09-10
  const validationErrors = useActionData();
  const navigation = useNavigation();
  const params = useParams();
  const matches = useMatches();

  const expenses = matches.find(
    (match) => match.id === 'routes/__app/expenses'
  );

  const expenseData = expenses.data.find((expense) => expense.id === params.id);

  // The loader data is coming from $id.jsx
  // We're bypassing useLoaderData() in there and coming straight here to unpack the data for edit
  // More info, see #67
  // const expenseData = useLoaderData();

  // Our form is unaware of the details of an id's data
  // So we create default values using expenseData to populate the form with its data or set them to an empty string so a new form can be submitted

  const defaultValues = expenseData
    ? {
        title: expenseData.title,
        amount: expenseData.amount,
        date: expenseData.date,
      }
    : {
        title: '',
        amount: '',
        date: '',
      };
  // This useTransition()/useNavigation() hook can only work with <Form /> not <form />

  // Letting the user know what's going on with the submitted form
  // this can be used at our button inside of <Form>
  const isSubmitting = navigation.state !== 'idle';

  return (
    <Form method="post" className="form" id="expense-form">
      <p>
        <label htmlFor="title">Expense Title</label>
        <input
          type="text"
          id="title"
          name="title"
          required
          maxLength={30}
          defaultValue={defaultValues.title}
        />
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
            defaultValue={defaultValues.amount}
          />
        </p>
        <p>
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            max={today}
            required
            defaultValue={
              defaultValues.date ? defaultValues.date.slice(0, 10) : ''
            }
          />
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
