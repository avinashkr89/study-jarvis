import React, { useState } from 'react';
import { User } from '../types';

interface AuthPageProps {
  allUsers: User[];
  setAllUsers: React.Dispatch<React.SetStateAction<User[]>>;
  onLogin: (user: User) => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ allUsers, setAllUsers, onLogin }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    
    const inputBaseStyle = "w-full bg-slate-100 dark:bg-slate-900/70 border border-slate-300 dark:border-slate-700 rounded-lg py-2 px-3 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500";
    const buttonBaseStyle = "w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-lg transition-all glow-effect";


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (isLogin) {
            const foundUser = allUsers.find(u => u.email === email);
            if (foundUser) {
                onLogin(foundUser);
            } else {
                setError('No user found with this email. Please sign up.');
            }
        } else {
            if (!name || !email || !password) {
                setError('Please fill all fields.');
                return;
            }
            if (allUsers.some(u => u.email === email)) {
                setError('An account with this email already exists.');
                return;
            }
            const newUser: User = { 
                name, 
                email, 
                password,
                role: email === 'avinashkr502080@gmail.com' ? 'admin' : 'user',
                credits: email === 'avinashkr502080@gmail.com' ? 999 : 25
            };
            setAllUsers([...allUsers, newUser]);
            onLogin(newUser);
        }
    };

    return (
        <div className="w-full max-w-md mx-auto fade-in">
            <div className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-lg p-8 rounded-2xl shadow-xl dark:shadow-2xl dark:shadow-blue-900/20 border border-slate-200 dark:border-slate-800">
                <h1 className="text-3xl font-extrabold text-slate-800 dark:text-white text-center mb-6">{isLogin ? 'Welcome Back!' : 'Create Your Account'}</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {!isLogin && (
                        <div>
                            <label className="block text-sm font-medium text-slate-600 dark:text-gray-300 mb-1">Name</label>
                            <input type="text" value={name} onChange={e => setName(e.target.value)} required className={inputBaseStyle} />
                        </div>
                    )}
                    <div>
                        <label className="block text-sm font-medium text-slate-600 dark:text-gray-300 mb-1">Email</label>
                        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className={inputBaseStyle} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-600 dark:text-gray-300 mb-1">Password</label>
                        <input type="password" value={password} onChange={e => setPassword(e.target.value)} required className={inputBaseStyle} />
                    </div>
                    {error && <p className="text-sm text-red-500 dark:text-red-400">{error}</p>}
                    <button type="submit" className={buttonBaseStyle}>
                        {isLogin ? 'Login' : 'Create Account'}
                    </button>
                </form>
                <p className="text-center text-sm text-slate-500 dark:text-gray-400 mt-6">
                    {isLogin ? "Don't have an account? " : "Already have an account? "}
                    <button onClick={() => setIsLogin(!isLogin)} className="font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300">
                        {isLogin ? 'Sign up' : 'Login'}
                    </button>
                </p>
            </div>
        </div>
    );
};

export default AuthPage;