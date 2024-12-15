import axios from 'axios';
import { useContext, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { GlobalContext } from 'GlobalContext';
import { useNavigate } from 'react-router';

export default function Login() {
  // State to handle form inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false); // Add loading state
  const { mfaEmail, setMfaEmail } = useContext(GlobalContext);
  const token = localStorage.getItem('token') || null;
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!email) newErrors.email = 'Email is required';
    if (!password) newErrors.password = 'Password is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setLoading(true); // Set loading to true before making the request

      try {
        const res = await axios.post('http://127.0.0.1:5000/login', {
          email: email,
          password: password,
        });
        setMfaEmail(email);
        console.log(mfaEmail);
        console.log(email);
        setTimeout(() => {
          navigate('/mfa', { state: { email: email } });
        }, 1000);
      } catch (error) {
        alert("Invalid Email or Password");
        console.error('Error calling API:', error);
      } finally {
        setLoading(false); // Set loading to false once the request is complete
      }

      console.log('Form submitted with:', { email, password });
      setEmail('');
      setPassword('');
      setErrors({});
    }
  };

  return (
    <div className="flex min-h-screen flex-col justify-center px-6 py-12 bg-[url('src/pages/authentication/auth-forms/9838956.jpg')] bg-cover bg-center">
      <div className="bg-white bg-opacity-90 backdrop-blur-lg rounded-xl shadow-lg w-full max-w-md p-8 ml-16 lg:ml-72">
        <div className="flex justify-center items-center mb-6">
          <img className="h-12 w-auto" src="src/assets/images/logo.png" alt="Blue Eye" />
          <p className="text-gray-900 text-lg font-semibold ml-3">BlueEye</p>
        </div>
        <h2 className="text-center text-2xl font-bold tracking-tight text-gray-900">
          Smart Monitoring, Reliable Waters
        </h2>
        <p className="text-center text-sm text-gray-500 mt-2">
          Revolutionizing Data with DWLR
        </p>
        <div className="mt-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                  className={`block w-full rounded-lg border px-4 py-2 text-gray-900 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
              </div>
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                Password
              </label>
              <div className="mt-2">
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                  className={`block w-full rounded-lg border px-4 py-2 text-gray-900 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
              </div>
            </div>
            <div className="mt-6">
              <button
                type="submit"
                className="flex w-full justify-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1"
                disabled={loading} // Disable the button when loading
              >
                {loading ? (
                  <div className="spinner-border animate-spin text-white" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                ) : (
                  'Login'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
