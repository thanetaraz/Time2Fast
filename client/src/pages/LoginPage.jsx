import { Link } from 'react-router-dom';
import InputField from '../components/common/InputField';
import Button from '../components/common/Button';

function LoginPage() {
  return (
    <>
      <section className="min-h-screen flex items-center justify-center">
        <form className="max-w-sm w-full p-6 border border-gray-300 rounded-lg shadow-lg bg-white">
          <InputField
            label="Email"
            type="email"
            id="email"
            placeholder="johndoe@gmail.com"
            required
          />

          <InputField label="Password" type="password" id="password" required />
          <div className="text-gray-400 mb-5">
            <p className="text-sm">
              Don't have an account?{' '}
              <Link
                to={'/register'}
                className="text-gray-300 underline hover:text-blue-500 transition-colors duration-100 ease-in-out"
              >
                Create a new account now
              </Link>
            </p>
          </div>
          <Button text="Sign in" />
        </form>
      </section>
    </>
  );
}

export default LoginPage;
