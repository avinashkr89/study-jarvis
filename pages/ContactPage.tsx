import React from 'react';

const ContactPage: React.FC = () => {
    
    const inputBaseStyle = "w-full bg-slate-100 dark:bg-slate-900/70 border border-slate-300 dark:border-slate-700 rounded-lg py-2 px-3 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500";
    const buttonBaseStyle = "w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-6 rounded-lg transition-all glow-effect";

    return (
        <div className="w-full max-w-2xl mx-auto p-4 text-center fade-in">
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 dark:text-white mb-4">Get in Touch</h1>
            <p className="text-lg text-slate-500 dark:text-gray-400 mb-12">Have questions, feedback, or suggestions? I'd love to hear from you.</p>

            <div className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-lg p-8 rounded-2xl text-left shadow-xl border border-slate-200 dark:border-slate-800">
                <form action="https://api.web3forms.com/submit" method="POST">
                    <input type="hidden" name="access_key" value="f4dc1e02-a136-4902-8b55-403c200e07c4" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-slate-600 dark:text-gray-300 mb-1">Name</label>
                            <input type="text" id="name" name="name" required className={inputBaseStyle} />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-slate-600 dark:text-gray-300 mb-1">Email</label>
                            <input type="email" id="email" name="email" required className={inputBaseStyle} />
                        </div>
                    </div>
                    <div className="mb-6">
                        <label htmlFor="message" className="block text-sm font-medium text-slate-600 dark:text-gray-300 mb-1">Message</label>
                        <textarea id="message" name="message" rows={5} required className={inputBaseStyle}></textarea>
                    </div>
                    <button type="submit" className={buttonBaseStyle}>
                        Send Message
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ContactPage;