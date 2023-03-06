import {
  Form,
  Link,
  useSearchParams,
  useTransition as useNavigation,
  useActionData,
} from '@remix-run/react';
import { FaLock, FaUserPlus } from 'react-icons/fa';

function AuthForm() {
  let [searchParams] = useSearchParams();
  const navigation = useNavigation(); // using this to enhance user experience
  const validationErrors = useActionData(); // This is coming from catch block inside of auth.js
  const authMode = searchParams.get('mode') || 'login';

  const isSubmitting = navigation.state !== 'idle';

  const submitBtnCaption = authMode === 'login' ? 'Login' : 'Create User';
  const toggleBtnCaption =
    authMode === 'login' ? 'Create a new user' : 'Log in with existing user';

  return (
    <Form method="post" className="form" id="auth-form">
      <div className="icon-img">
        {authMode === 'login' ? <FaLock /> : <FaUserPlus />}
      </div>
      <p>
        <label htmlFor="email">Email Address</label>
        <input type="email" id="email" name="email" required />
      </p>
      <p>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" minLength={7} />
      </p>
      {validationErrors && (
        <ul>
          {Object.values(validationErrors).map((error) => (
            <div key={error}>
              <li>{error}</li>
              <br />
            </div>
          ))}
        </ul>
      )}
      <div className="form-actions">
        <button disabled={isSubmitting}>
          {isSubmitting ? 'Authenticating...' : submitBtnCaption}
        </button>
        <Link to={authMode === 'login' ? '?mode=signup' : '?mode=login'}>
          {toggleBtnCaption}
        </Link>
      </div>
    </Form>
  );
}

export default AuthForm;
