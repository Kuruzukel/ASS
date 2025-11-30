import React, { useState } from 'react';
import { toast } from 'react-toastify';

const AppointmentForm = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        mobile: '',
        date: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            // Get existing appointments from localStorage
            const existingAppointments = JSON.parse(localStorage.getItem('appointments') || '[]');
            
            // Create new appointment with unique ID
            const newAppointment = {
                _id: Date.now().toString(),
                ...formData,
                status: 'Pending',
                createdAt: new Date().toISOString()
            };
            
            // Add new appointment to the list
            const updatedAppointments = [...existingAppointments, newAppointment];
            
            // Save to localStorage
            localStorage.setItem('appointments', JSON.stringify(updatedAppointments));
            
            toast.success('Appointment Request Sent!');
            setFormData({ fullName: '', email: '', mobile: '', date: '', message: '' });
        } catch (err) {
            toast.error('Failed to send request.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-3 bg-gray-50" placeholder="John Doe" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-3 bg-gray-50" placeholder="john@example.com" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Mobile Number</label>
                    <input type="tel" name="mobile" value={formData.mobile} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-3 bg-gray-50" placeholder="+1 234 567 890" />
                </div>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Preferred Date & Time</label>
                <input type="datetime-local" name="date" value={formData.date} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-3 bg-gray-50" />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Message</label>
                <textarea name="message" value={formData.message} onChange={handleChange} rows="4" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-3 bg-gray-50" placeholder="Any specific requirements?"></textarea>
            </div>
            <button type="submit" className="w-full bg-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 transition duration-300 shadow-lg transform hover:-translate-y-1">
                Book Appointment
            </button>
        </form>
    );
};

export default AppointmentForm;
