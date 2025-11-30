import React from 'react';
import Navbar from '../components/Navbar';
import AppointmentForm from '../components/AppointmentForm';
import { motion } from 'framer-motion';

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            {/* Hero Section */}
            <section id="home" className="pt-32 pb-20 px-6 md:px-12 lg:px-24 flex flex-col md:flex-row items-center justify-between min-h-screen">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="md:w-1/2 space-y-6"
                >
                    <h1 className="text-5xl md:text-7xl font-extrabold text-dark leading-tight">
                        Book Your <br /> <span className="text-primary">Next Visit</span> <br /> With Ease
                    </h1>
                    <p className="text-lg text-gray-600 max-w-lg">
                        Experience seamless scheduling. Professional, reliable, and always on time. Manage your appointments effortlessly.
                    </p>
                    <button onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })} className="bg-secondary text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:bg-pink-600 transition-all transform hover:scale-105">
                        Get Started
                    </button>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="md:w-1/2 mt-12 md:mt-0 relative"
                >
                    <div className="w-full h-96 bg-gradient-to-tr from-primary to-secondary rounded-[3rem] opacity-20 absolute top-4 left-4 blur-3xl"></div>
                    <img src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Meeting" className="relative rounded-[2rem] shadow-2xl w-full object-cover h-96 z-10" />
                </motion.div>
            </section>

            {/* About Section */}
            <section id="about" className="py-20 px-6 md:px-24 bg-white">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-dark mb-4">About Us</h2>
                    <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="order-2 md:order-1">
                        <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Team" className="rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300" />
                    </div>
                    <div className="order-1 md:order-2 space-y-6">
                        <h3 className="text-3xl font-bold text-gray-800">Why Choose Us?</h3>
                        <p className="text-gray-600 leading-relaxed">
                            We provide a top-tier appointment scheduling system designed to streamline your business operations. Our platform ensures that you never miss a client and that your schedule is always optimized.
                        </p>
                        <ul className="space-y-3">
                            <li className="flex items-center text-gray-700"><span className="w-2 h-2 bg-secondary rounded-full mr-3"></span>24/7 Online Booking</li>
                            <li className="flex items-center text-gray-700"><span className="w-2 h-2 bg-secondary rounded-full mr-3"></span>Automated Reminders</li>
                            <li className="flex items-center text-gray-700"><span className="w-2 h-2 bg-secondary rounded-full mr-3"></span>Easy Management</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section id="services" className="py-20 px-6 md:px-24 bg-gray-50">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-dark mb-4">Our Services</h2>
                    <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { title: 'Consultation', icon: '💡', desc: 'Expert advice tailored to your needs.' },
                        { title: 'Therapy', icon: '🧘', desc: 'Professional therapy sessions for mental well-being.' },
                        { title: 'Checkups', icon: '🩺', desc: 'Regular health checkups to keep you in top shape.' },
                    ].map((service, index) => (
                        <motion.div
                            whileHover={{ y: -10 }}
                            key={index}
                            className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-gray-100"
                        >
                            <div className="text-5xl mb-6">{service.icon}</div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-3">{service.title}</h3>
                            <p className="text-gray-600">{service.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="py-20 px-6 md:px-24 bg-dark text-white relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                    <div className="w-96 h-96 bg-primary rounded-full filter blur-[100px] opacity-20 absolute -top-20 -left-20"></div>
                    <div className="w-96 h-96 bg-secondary rounded-full filter blur-[100px] opacity-20 absolute bottom-0 right-0"></div>
                </div>

                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16">
                    <div>
                        <h2 className="text-4xl font-bold mb-6">Get In Touch</h2>
                        <p className="text-gray-300 mb-8 text-lg">
                            Ready to schedule your appointment? Fill out the form and we will get back to you shortly.
                        </p>
                        <div className="space-y-6">
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-2xl">📍</div>
                                <div>
                                    <h4 className="font-bold">Address</h4>
                                    <p className="text-gray-400">123 Street, City, Country</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-2xl">📞</div>
                                <div>
                                    <h4 className="font-bold">Phone</h4>
                                    <p className="text-gray-400">+1 234 567 890</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-2xl">✉️</div>
                                <div>
                                    <h4 className="font-bold">Email</h4>
                                    <p className="text-gray-400">contact@example.com</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-3xl p-8 text-gray-900 shadow-2xl">
                        <h3 className="text-2xl font-bold mb-6">Book Appointment</h3>
                        <AppointmentForm />
                    </div>
                </div>
            </section>

            <footer className="bg-gray-900 text-gray-500 py-8 text-center border-t border-gray-800">
                <p>&copy; 2025 AppointMe. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default LandingPage;
