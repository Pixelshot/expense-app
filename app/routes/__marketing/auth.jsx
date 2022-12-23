import AuthForm from '~/components/auth/AuthForm';
import authStyles from '~/styles/auth.css';

export default function AuthPage() {
  return (
    <div>
      <AuthForm />
    </div>
  );
}

export function links() {
  return [{ rel: 'stylesheet', href: authStyles }];
}
