
import React, { useState } from 'react';
import { User, PaymentRequest } from '../types.ts';

type AdminTab = 'users' | 'payments';

interface AdminPageProps {
    allUsers: User[];
    setAllUsers: React.Dispatch<React.SetStateAction<User[]>>;
    allPayments: PaymentRequest[];
    setAllPayments: React.Dispatch<React.SetStateAction<PaymentRequest[]>>;
}

const AdminPage: React.FC<AdminPageProps> = ({ allUsers, setAllUsers, allPayments, setAllPayments }) => {
    const [activeTab, setActiveTab] = useState<AdminTab>('payments');

    const handleCreditChange = (email: string, amount: number) => {
        setAllUsers(prevUsers => prevUsers.map(u => 
            u.email === email 
            ? { ...u, credits: Math.max(0, u.credits + amount) } 
            : u
        ));
    };

    const handlePaymentApproval = (paymentId: string) => {
        const payment = allPayments.find(p => p.id === paymentId);
        if (!payment || payment.status !== 'pending') return;

        handleCreditChange(payment.userId, payment.credits);

        setAllPayments(prevPayments => prevPayments.map(p => 
            p.id === paymentId ? { ...p, status: 'approved' } : p
        ));
    };
    
    const handlePaymentRejection = (paymentId: string) => {
         setAllPayments(prevPayments => prevPayments.map(p => 
            p.id === paymentId ? { ...p, status: 'rejected' } : p
        ));
    };


    const renderUserManagement = () => (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white dark:bg-slate-900/50 rounded-lg">
                <thead className="border-b border-slate-200 dark:border-slate-700">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-blue-600 dark:text-blue-400 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-blue-600 dark:text-blue-400 uppercase tracking-wider">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-blue-600 dark:text-blue-400 uppercase tracking-wider">Credits</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-blue-600 dark:text-blue-400 uppercase tracking-wider">Role</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                    {allUsers.map(user => (
                        <tr key={user.email}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-800 dark:text-white">{user.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-gray-300">{user.email}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-gray-300 font-semibold">{user.credits}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-gray-300">{user.role}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
    
    const renderPaymentManagement = () => (
         <div className="overflow-x-auto">
            <table className="min-w-full bg-white dark:bg-slate-900/50 rounded-lg">
                <thead className="border-b border-slate-200 dark:border-slate-700">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-blue-600 dark:text-blue-400 uppercase tracking-wider">User ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-blue-600 dark:text-blue-400 uppercase tracking-wider">Plan ({'Credits'})</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-blue-600 dark:text-blue-400 uppercase tracking-wider">UTR Code</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-blue-600 dark:text-blue-400 uppercase tracking-wider">Status</th>
                         <th className="px-6 py-3 text-left text-xs font-medium text-blue-600 dark:text-blue-400 uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                    {allPayments.map(payment => (
                        <tr key={payment.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-gray-300">{payment.userId}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-800 dark:text-white">{payment.plan} ({payment.credits})</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-gray-300 font-mono">{payment.utrCode}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                    payment.status === 'approved' ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300' :
                                    payment.status === 'rejected' ? 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300' :
                                    'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-300'
                                }`}>
                                    {payment.status}
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-4">
                                {payment.status === 'pending' && (
                                    <>
                                        <button onClick={() => handlePaymentApproval(payment.id)} className="text-green-600 hover:text-green-500">Approve</button>
                                        <button onClick={() => handlePaymentRejection(payment.id)} className="text-red-600 hover:text-red-500">Reject</button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );


    return (
        <div className="w-full max-w-6xl mx-auto p-4 text-left fade-in">
            <h1 className="text-4xl font-extrabold text-slate-800 dark:text-white mb-8">Admin Dashboard</h1>
            <div className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-lg rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 p-6">
                 <div className="border-b border-slate-200 dark:border-slate-700 mb-6">
                    <nav className="flex -mb-px space-x-6" aria-label="Tabs">
                        <button onClick={() => setActiveTab('users')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-semibold text-sm ${activeTab === 'users' ? 'border-blue-500 text-blue-600 dark:text-blue-300' : 'border-transparent text-slate-500 dark:text-gray-400 hover:text-slate-800 dark:hover:text-white'}`}>User Management</button>
                        <button onClick={() => setActiveTab('payments')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-semibold text-sm ${activeTab === 'payments' ? 'border-blue-500 text-blue-600 dark:text-blue-300' : 'border-transparent text-slate-500 dark:text-gray-400 hover:text-slate-800 dark:hover:text-white'}`}>Payment Requests</button>
                    </nav>
                </div>
                {activeTab === 'users' ? renderUserManagement() : renderPaymentManagement()}
            </div>
        </div>
    );
};

export default AdminPage;