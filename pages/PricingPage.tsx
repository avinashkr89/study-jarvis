import React, { useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { PaymentRequest, Page, User } from '../types';

interface PricingPageProps {}

const pricingPlans = [
  { name: 'Mini Pack', credits: 25, price: '₹49', description: 'Quick boost for a few topics.' },
  { name: 'Starter Pack', credits: 50, price: '₹99', description: 'Perfect for getting started.' },
  { name: 'Student Pack', credits: 100, price: '₹199', description: 'Ideal for a week of study.', popular: true },
  { name: 'Revision Pack', credits: 200, price: '₹299', description: 'Great for focused exam revision.' },
  { name: 'Pro Pack', credits: 500, price: '₹499', description: 'For long-term exam preparation.' },
];

const qrCodeBase64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIACAMAAADDpiTIAAAABlBMVEX///8AAABVwtN+AAAE6klEQVR42u3DQW7jMAwEwPz/07sHqk3LKCxYvGgLgSSwP8mjvM4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABA93b76Qag/Or8a/0PQL3+DFh/sF1f3ADM0L3uLwEG9v4DmICT+b6v+P/tEwZwMt/XbO7VHg/KR/UBM3Ay31/8f+3vIqMhJ/N9y/UeLyAjETfzfcv1fSEyE1G98sVPewGZgE28X7vuKyAzEbXyxbp/sBMQJ/N9b+4iIyNNvF657icjI1GtWrAJ31/8fG4yAVH1ykG7vAxE1SsQVt9y6G4yAVH1yqG7vAxE1SsQVt9y6G4yAVH1yqG7vAxE1SsQVt9y9W4yAVH1yq27vAxE1SsQVt9y9W4yAVH1yq27vAxE1SsQVt9ydW4yAVH1yrW7vAxE1SsQVt9y924yAVH1yv27vAxE1SsQVt9y+W4yAVH1yv27vAxE1SsQVt8yAVH1yv27vAxE1SsQVt8yAVH1yv27vAxE1SsQVt8yAVH1yv27vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1ysC7vAxE1SsQVt8yAVH1-80uA7l3wAAAABJRU5ErkJggg==";

const PricingPage: React.FC<PricingPageProps> = () => {
    const [selectedPlan, setSelectedPlan] = useState<(typeof pricingPlans)[0] | null>(null);
    const [utrCode, setUtrCode] = useState('');
    const [message, setMessage] = useState('');
    
    const [allPayments, setAllPayments] = useLocalStorage<PaymentRequest[]>('all_payments', []);
    const [currentUser] = useLocalStorage<User | null>('user', null);

    const navigateTo = (page: Page) => {
      const event = new CustomEvent('navigate', { detail: page });
      window.dispatchEvent(event);
    };

    const handlePurchase = (plan: (typeof pricingPlans)[0]) => {
        if (!currentUser) {
            navigateTo('auth');
            return;
        }
        setSelectedPlan(plan);
        setMessage('');
    };

    const handleSubmitPayment = () => {
        if (!utrCode || !selectedPlan || !currentUser) {
            setMessage('Invalid details. Please try again.');
            return;
        }
        if (utrCode.length < 12) {
             setMessage('Please enter a valid 12-digit UTR code.');
             return;
        }

        const newPayment: PaymentRequest = {
            id: `pay_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            userId: currentUser.email,
            plan: selectedPlan.name,
            credits: selectedPlan.credits,
            amount: parseInt(selectedPlan.price.replace('₹', '')),
            utrCode,
            status: 'pending',
            date: new Date().toISOString()
        };
        
        setAllPayments([...allPayments, newPayment]);
        
        setMessage(`Payment request submitted! Your request for the ${selectedPlan.name} is pending admin approval.`);
        
        setTimeout(() => {
            setSelectedPlan(null);
            setUtrCode('');
            setMessage('');
        }, 4000);
    };

    return (
        <div className="w-full max-w-6xl mx-auto p-4 text-center fade-in">
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 dark:text-white mb-4">Get More Credits</h1>
            <p className="text-lg text-slate-500 dark:text-gray-400 mb-12">Choose a plan that fits your study needs. More credits, more learning.</p>
            
            {!selectedPlan ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                    {pricingPlans.map(plan => (
                        <div key={plan.name} className={`bg-white dark:bg-slate-900/70 p-6 rounded-2xl border-2 flex flex-col relative overflow-hidden shadow-lg transition-all hover:scale-105 hover:shadow-xl ${plan.popular ? 'border-blue-500' : 'border-slate-200 dark:border-slate-800'}`}>
                            {plan.popular && <span className="absolute top-0 right-4 -mt-3 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full">POPULAR</span>}
                            <h2 className="text-xl font-bold text-slate-800 dark:text-white flex-grow">{plan.name}</h2>
                            <p className="text-5xl font-extrabold text-blue-600 dark:text-blue-400 my-4">{plan.credits}</p>
                            <p className="text-slate-500 dark:text-gray-400 mb-6 text-sm flex-grow">{plan.description}</p>
                            <button onClick={() => handlePurchase(plan)} className="w-full bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-white font-bold py-3 px-6 rounded-lg transition-colors mt-auto">
                                Buy for {plan.price}
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="max-w-md mx-auto bg-white/50 dark:bg-slate-900/50 backdrop-blur-lg p-8 rounded-2xl text-left shadow-xl border border-slate-200 dark:border-slate-800">
                    <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">Complete Your Purchase</h2>
                    <p className="text-slate-500 dark:text-gray-400 mb-6">This is a manual payment system. Please follow the steps below.</p>
                    <ol className="list-decimal pl-5 space-y-2 text-slate-600 dark:text-gray-300 mb-6">
                        <li>Scan the QR code or pay to UPI ID <code className="bg-slate-200 dark:bg-slate-800 px-1 rounded text-blue-600 dark:text-blue-300">nobitanohur@ybl</code>.</li>
                        <li>Enter the amount for the <strong className="text-blue-600 dark:text-blue-300">{selectedPlan.name} ({selectedPlan.price})</strong>.</li>
                        <li>After payment, enter the 12-digit UTR/Transaction ID below.</li>
                    </ol>
                    <div className="bg-white p-2 rounded-lg max-w-[200px] mx-auto my-6 shadow-md">
                        <img src={qrCodeBase64} alt="UPI QR Code" className="w-full h-full" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-600 dark:text-gray-300 mb-1">Enter UTR Code</label>
                        <input type="text" value={utrCode} onChange={e => setUtrCode(e.target.value)} maxLength={12} placeholder="12-digit UTR" className="w-full bg-slate-100 dark:bg-slate-900/70 border border-slate-300 dark:border-slate-700 rounded-lg py-2 px-3 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                    </div>
                    {message && <p className={`mt-4 text-sm text-center ${message.includes('submitted') ? 'text-green-600 dark:text-green-400' : 'text-yellow-600 dark:text-yellow-400'}`}>{message}</p>}
                    <button onClick={handleSubmitPayment} className="w-full mt-6 bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-6 rounded-lg transition-all glow-effect">
                        Submit for Approval
                    </button>
                    <button onClick={() => setSelectedPlan(null)} className="w-full text-center text-slate-500 dark:text-gray-400 text-sm mt-3 hover:text-slate-800 dark:hover:text-white">Back to plans</button>
                </div>
            )}
        </div>
    );
};

export default PricingPage;