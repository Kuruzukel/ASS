import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { HiMail, HiLockClosed, HiArrowRight } from 'react-icons/hi';

const LoginPage = ({ setIsAuthenticated }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const res = await axios.post('http://localhost:5000/api/login', { email, password });
            if (res.data.token) {
                setIsAuthenticated(true);
                toast.success('Welcome back, Admin!');
                setTimeout(() => navigate('/admin'), 500);
            }
        } catch (err) {
            toast.error('Invalid Credentials');
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200 relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/20 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-secondary/10 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-primary/20 rounded-full blur-3xl"></div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="card w-full max-w-md bg-base-100 shadow-2xl z-10 border border-base-200"
            >
                <div className="card-body p-8">
                    <div className="text-center mb-8">
                        <h2 className="text-4xl font-extrabold text-primary mb-2">Appoint<span className="text-secondary">Me</span></h2>
                        <p className="text-secondary font-semibold">Admin Portal Access</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-bold text-primary">Email Address</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <HiMail className="text-secondary text-lg" />
                                </div>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="input input-bordered w-full pl-10 focus:input-primary transition-all"
                                    placeholder="admin@example.com"
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-bold text-primary">Password</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <HiLockClosed className="text-secondary text-lg" />
                                </div>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="input input-bordered w-full pl-10 focus:input-primary transition-all"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover text-primary">Forgot password?</a>
                            </label>
                        </div>

                        <div className="form-control mt-6">
                            <button
                                type="submit"
                                className={`btn btn-primary w-full text-lg shadow-lg hover:shadow-primary/50 transition-all ${isLoading ? 'loading' : ''}`}
                                disabled={isLoading}
                            >
                                {isLoading ? 'Authenticating...' : (
                                    <>
                                        Login <HiArrowRight className="ml-2 text-secondary" />
                                    </>
                                )}
                            </button>
                        </div>
                    </form>

                    <div className="divider my-6 text-xs text-gray-400">SECURE LOGIN</div>

                    <p className="text-center text-sm text-gray-500">
                        Protected by reCAPTCHA and subject to the Privacy Policy and Terms of Service.
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default LoginPage;
