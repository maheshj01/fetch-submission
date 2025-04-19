import { useState } from 'react';
import { LoginCredentials } from '../../types/types';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { loginInit, loginSuccess } from '../../store/slices/authSlice';
import { ROUTES } from '../../routes/routes';
import { Button } from '../../components/ui/button';
import { Input } from 'src/components/ui/input';
import authService from 'src/api/authService';
import { useAppSelector } from 'src/hooks/useAppSelector';

const LoginPage = () => {
    const [error, setError] = useState<string>('');
    const [credentials, setCredentials] = useState<LoginCredentials>({
        name: '',
        email: '',
    });

    const dispatch = useAppDispatch();

    const navigate = useNavigate();
    const isLoading = useAppSelector(
        (state) => state.auth.isLoading
    );
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(loginInit());
        setError('');
        try {
            const userData = await authService.login(credentials);
            dispatch(loginSuccess(userData));
            navigate(ROUTES.DOGS);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred. Please try again.');
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCredentials((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <div className="min-h-screen flex w-screen items-center justify-center bg-gradient-to-br from-amber-200 to-amber-600">
            <div className="p-8 rounded-2xl shadow-2xl w-full max-w-md mx-4 bg-gradient-to-tr from-amber-50 to-amber-100">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-amber-900 mb-2">Login</h1>
                    <p className="text-gray-600 text-md">
                        Let's find your perfect furry friend
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                Name
                            </label>
                            <Input
                                id="name"
                                name="name"
                                type="text"
                                value={credentials.name}
                                onChange={handleChange}
                                className="w-full rounded-lg border-black"
                                placeholder="Enter your name"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                Email
                            </label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                value={credentials.email}
                                onChange={handleChange}
                                className="w-full rounded-lg border-black"
                                placeholder="Enter your email"
                                required
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="text-red-500 text-sm text-center">
                            {error}
                        </div>
                    )}

                    <Button
                        type="submit"
                        className="w-full text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200">
                        {isLoading ? 'Logging in...' : 'Login'}
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
