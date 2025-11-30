import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { toast } from 'react-toastify';
import {
    HiMenu, HiX, HiCalendar, HiUserGroup, HiLogout,
    HiSearch, HiFilter, HiTrash, HiCheck, HiBan, HiClock, HiPencilAlt, HiMoon, HiSun, HiUser, HiChevronDown, HiBell
} from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';

const Dashboard = () => {
    const [appointments, setAppointments] = useState([]);
    const [date, setDate] = useState(new Date());
    const [view, setView] = useState('list');
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [isRescheduleModalOpen, setIsRescheduleModalOpen] = useState(false);
    const [newDate, setNewDate] = useState('');
    const [currentTheme, setCurrentTheme] = useState('light');
    const [isSearchVisible, setIsSearchVisible] = useState(false);

    useEffect(() => {
        fetchAppointments();
        document.documentElement.setAttribute('data-theme', currentTheme);
    }, [currentTheme]);

    const fetchAppointments = () => {
        try {
            // Get appointments from localStorage
            const storedAppointments = localStorage.getItem('appointments');
            if (storedAppointments) {
                setAppointments(JSON.parse(storedAppointments));
            } else {
                // Initialize with empty array if no appointments exist
                setAppointments([]);
            }
        } catch (err) {
            toast.error('Failed to fetch appointments');
            setAppointments([]);
        }
    };

    const saveAppointments = (apps) => {
        localStorage.setItem('appointments', JSON.stringify(apps));
        setAppointments(apps);
    };

    const handleStatusChange = (id, status) => {
        try {
            const updatedAppointments = appointments.map(app => 
                app._id === id ? { ...app, status } : app
            );
            saveAppointments(updatedAppointments);
            toast.success(`Appointment ${status}`);
        } catch (err) {
            toast.error('Update failed');
        }
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this appointment?')) {
            try {
                const updatedAppointments = appointments.filter(app => app._id !== id);
                saveAppointments(updatedAppointments);
                toast.success('Appointment deleted');
            } catch (err) {
                toast.error('Delete failed');
            }
        }
    };

    const handleReschedule = (e) => {
        e.preventDefault();
        if (!selectedAppointment || !newDate) return;
        try {
            const updatedAppointments = appointments.map(app => 
                app._id === selectedAppointment._id 
                    ? { ...app, date: newDate, status: 'Rescheduled' }
                    : app
            );
            saveAppointments(updatedAppointments);
            toast.success('Appointment Rescheduled');
            setIsRescheduleModalOpen(false);
            setSelectedAppointment(null);
        } catch (err) {
            toast.error('Reschedule failed');
        }
    };

    const openRescheduleModal = (app) => {
        setSelectedAppointment(app);
        setNewDate(app.date.slice(0, 16));
        setIsRescheduleModalOpen(true);
    };

    const stats = {
        total: appointments.length,
        pending: appointments.filter(a => a.status === 'Pending').length,
        approved: appointments.filter(a => a.status === 'Approved').length,
        today: appointments.filter(a => new Date(a.date).toDateString() === new Date().toDateString()).length
    };

    const filteredAppointments = appointments.filter(app => {
        const matchesSearch = app.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            app.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'All' || app.status === statusFilter;
        const matchesDate = view === 'calendar' ? new Date(app.date).toDateString() === date.toDateString() : true;
        return matchesSearch && matchesStatus && matchesDate;
    });

    return (
        <div className="drawer lg:drawer-open bg-base-200 min-h-screen font-sans">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

            <div className="drawer-content flex flex-col">
                {/* Top Navbar */}
                <div className="navbar bg-base-100 shadow-md sticky top-0 z-50 border-b border-base-300 relative">
                    <div className="flex-none lg:hidden">
                        <label 
                            htmlFor="my-drawer-2" 
                            className="btn btn-square btn-ghost"
                            onClick={() => setIsSearchVisible(false)}
                        >
                            <HiMenu className="text-2xl" />
                        </label>
                    </div>

                    {/* AppointMe Logo - Visible on mobile */}
                    <div className="flex-none lg:hidden px-2">
                        <h2 className="text-xl font-extrabold text-primary whitespace-nowrap">
                            Appoint<span className="text-secondary">Me</span>
                        </h2>
                    </div>

                    {/* Search Bar - Hidden on very small screens, visible on sm and up */}
                    <div className="flex-1 px-2 sm:px-4 hidden sm:block">
                        <div className="relative w-full max-w-md">
                            <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search..."
                                className="input input-bordered input-sm w-full pl-10 bg-base-200"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Mobile Search Toggle Button */}
                    <div className="flex-none sm:hidden">
                        <button 
                            onClick={() => setIsSearchVisible(!isSearchVisible)}
                            className="btn btn-ghost btn-circle"
                        >
                            <HiSearch className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Mobile Search Bar - Shows when toggled */}
                    {isSearchVisible && (
                        <div className="absolute top-full left-0 right-0 bg-base-100 border-b border-base-300 p-2 sm:hidden z-50">
                            <div className="relative w-full">
                                <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40 w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="input input-bordered input-sm w-full pl-10 bg-base-200"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>
                    )}

                    <div className="flex-none gap-2">


                        {/* Notifications */}
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                                <div className="indicator">
                                    <HiBell className="w-5 h-5" />
                                    <span className="badge badge-xs badge-primary indicator-item">{stats.pending}</span>
                                </div>
                            </div>
                        </div>

                        {/* Theme Toggle */}
                        <label className="swap swap-rotate btn btn-ghost btn-circle">
                            <input
                                type="checkbox"
                                checked={currentTheme === 'dark'}
                                onChange={() => setCurrentTheme(currentTheme === 'light' ? 'dark' : 'light')}
                            />
                            <HiMoon className="swap-off w-5 h-5" />
                            <HiSun className="swap-on w-5 h-5" />
                        </label>

                        {/* Profile Dropdown */}
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                                    <HiUser className="w-6 h-6 text-white" />
                                </div>
                            </div>
                            <ul tabIndex={0} className="dropdown-content z-[1] menu p-3 shadow-2xl bg-base-100 rounded-box w-64 border border-base-300 mt-3">
                                <li className="menu-title px-4 py-2">
                                    <span className="text-sm font-bold">Account</span>
                                </li>
                                <li className="px-2 py-2 hover:bg-transparent cursor-default">
                                    <div className="flex flex-col gap-1 pointer-events-none">
                                        <span className="font-semibold">Admin User</span>
                                        <span className="text-xs opacity-60">admin@appointme.com</span>
                                    </div>
                                </li>
                                <div className="divider my-1"></div>
                                <li>
                                    <a className="text-error hover:bg-error/10">
                                        <HiLogout className="w-5 h-5" /> Logout
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <main className="flex-1 p-6">
                    {/* Welcome Card */}
                    <div className="card bg-gradient-to-r from-primary to-secondary text-white shadow-xl mb-6">
                        <div className="card-body flex-row items-center justify-between">
                            <div>
                                <h2 className="card-title text-2xl mb-2">Welcome back, Admin! 🎉</h2>
                                <p className="opacity-90">You have {stats.pending} pending appointments today.</p>
                            </div>

                        </div>
                    </div>

                    {/* Stats Cards Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                        {/* Total Card */}
                        <div className="card bg-base-100 shadow-md hover:shadow-xl transition-shadow">
                            <div className="card-body">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm opacity-60 font-medium">Total</p>
                                        <h3 className="text-3xl font-bold text-primary">{stats.total}</h3>
                                        <p className="text-xs text-success mt-1">↗ +12.5%</p>
                                    </div>
                                    <div className="radial-progress text-primary" style={{ "--value": 70, "--size": "3.5rem", "--thickness": "4px" }}>
                                        <HiUserGroup className="w-6 h-6" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Pending Card */}
                        <div className="card bg-base-100 shadow-md hover:shadow-xl transition-shadow">
                            <div className="card-body">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm opacity-60 font-medium">Pending</p>
                                        <h3 className="text-3xl font-bold text-warning">{stats.pending}</h3>
                                        <p className="text-xs text-warning mt-1">⏳ Awaiting</p>
                                    </div>
                                    <div className="radial-progress text-warning" style={{ "--value": 45, "--size": "3.5rem", "--thickness": "4px" }}>
                                        <HiClock className="w-6 h-6" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Approved Card */}
                        <div className="card bg-base-100 shadow-md hover:shadow-xl transition-shadow">
                            <div className="card-body">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm opacity-60 font-medium">Approved</p>
                                        <h3 className="text-3xl font-bold text-success">{stats.approved}</h3>
                                        <p className="text-xs text-success mt-1">✓ Confirmed</p>
                                    </div>
                                    <div className="radial-progress text-success" style={{ "--value": 85, "--size": "3.5rem", "--thickness": "4px" }}>
                                        <HiCheck className="w-6 h-6" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Today Card */}
                        <div className="card bg-base-100 shadow-md hover:shadow-xl transition-shadow">
                            <div className="card-body">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm opacity-60 font-medium">Today</p>
                                        <h3 className="text-3xl font-bold text-secondary">{stats.today}</h3>
                                        <p className="text-xs text-secondary mt-1">📅 Scheduled</p>
                                    </div>
                                    <div className="radial-progress text-secondary" style={{ "--value": 60, "--size": "3.5rem", "--thickness": "4px" }}>
                                        <HiCalendar className="w-6 h-6" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Filter Section */}
                    <div className="card bg-base-100 shadow-md mb-6">
                        <div className="card-body p-4">
                            <div className="flex flex-col sm:flex-row gap-3 items-center">
                                <div className="dropdown">
                                    <div tabIndex={0} role="button" className="btn btn-outline gap-2">
                                        <HiFilter className="w-4 h-4" />
                                        {statusFilter}
                                        <HiChevronDown className="w-4 h-4" />
                                    </div>
                                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow-lg bg-base-100 rounded-box w-52 border border-base-300">
                                        <li><a onClick={() => setStatusFilter('All')} className={statusFilter === 'All' ? 'active' : ''}>All Appointments</a></li>
                                        <li><a onClick={() => setStatusFilter('Pending')} className={statusFilter === 'Pending' ? 'active' : ''}>Pending</a></li>
                                        <li><a onClick={() => setStatusFilter('Approved')} className={statusFilter === 'Approved' ? 'active' : ''}>Approved</a></li>
                                        <li><a onClick={() => setStatusFilter('Declined')} className={statusFilter === 'Declined' ? 'active' : ''}>Declined</a></li>
                                    </ul>
                                </div>
                                <div className="text-sm opacity-60">
                                    Showing {filteredAppointments.length} of {appointments.length} appointments
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Content View - Table or Calendar */}
                    <AnimatePresence mode="wait">
                        {view === 'list' ? (
                            <motion.div
                                key="list"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="card bg-base-100 shadow-md"
                            >
                                <div className="card-body p-0">
                                    <div className="overflow-x-auto">
                                        <table className="table table-zebra">
                                            <thead className="bg-base-200">
                                                <tr>
                                                    <th>Client</th>
                                                    <th>Date & Time</th>
                                                    <th>Status</th>
                                                    <th>Message</th>
                                                    <th className="text-center">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {filteredAppointments.length > 0 ? filteredAppointments.map((app) => (
                                                    <tr key={app._id} className="hover">
                                                        <td>
                                                            <div className="flex items-center gap-3">
                                                                <div className="avatar placeholder">
                                                                    <div className="bg-neutral text-neutral-content rounded-full w-10">
                                                                        <span className="text-xs">{app.fullName.split(' ').map(n => n[0]).join('')}</span>
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <div className="font-bold">{app.fullName}</div>
                                                                    <div className="text-sm opacity-50">{app.email}</div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="font-semibold">{new Date(app.date).toLocaleDateString()}</div>
                                                            <div className="text-xs opacity-70">{new Date(app.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                                                        </td>
                                                        <td>
                                                            <div className={`badge ${app.status === 'Approved' ? 'badge-success' :
                                                                app.status === 'Declined' ? 'badge-error' :
                                                                    app.status === 'Rescheduled' ? 'badge-info' :
                                                                        'badge-warning'
                                                                }`}>
                                                                {app.status}
                                                            </div>
                                                        </td>
                                                        <td className="max-w-xs truncate">{app.message || <span className="italic opacity-50">No message</span>}</td>
                                                        <td>
                                                            <div className="flex justify-center gap-1">
                                                                <div className="tooltip" data-tip="Approve">
                                                                    <button onClick={() => handleStatusChange(app._id, 'Approved')} className="btn btn-circle btn-success btn-xs">
                                                                        <HiCheck />
                                                                    </button>
                                                                </div>
                                                                <div className="tooltip" data-tip="Decline">
                                                                    <button onClick={() => handleStatusChange(app._id, 'Declined')} className="btn btn-circle btn-error btn-xs">
                                                                        <HiBan />
                                                                    </button>
                                                                </div>
                                                                <div className="tooltip" data-tip="Reschedule">
                                                                    <button onClick={() => openRescheduleModal(app)} className="btn btn-circle btn-info btn-xs">
                                                                        <HiPencilAlt />
                                                                    </button>
                                                                </div>
                                                                <div className="tooltip" data-tip="Delete">
                                                                    <button onClick={() => handleDelete(app._id)} className="btn btn-circle btn-ghost btn-xs text-error">
                                                                        <HiTrash />
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )) : (
                                                    <tr>
                                                        <td colSpan="5" className="text-center py-10 opacity-50">
                                                            No appointments found.
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="calendar"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="grid grid-cols-1 lg:grid-cols-3 gap-6"
                            >
                                {/* Calendar */}
                                <div className="card bg-base-100 shadow-md lg:col-span-1">
                                    <div className="card-body">
                                        <h3 className="card-title text-lg mb-4">Calendar</h3>
                                        <Calendar
                                            onChange={setDate}
                                            value={date}
                                            className="w-full border-none rounded-xl"
                                            tileClassName={({ date, view }) => {
                                                if (appointments.find(x => new Date(x.date).toDateString() === date.toDateString())) {
                                                    return 'bg-primary text-primary-content font-bold rounded-lg';
                                                }
                                            }}
                                        />
                                    </div>
                                </div>

                                {/* Appointments for Selected Date */}
                                <div className="lg:col-span-2">
                                    <div className="card bg-base-100 shadow-md">
                                        <div className="card-body">
                                            <h3 className="card-title flex items-center gap-2 mb-4">
                                                <HiClock className="text-primary" />
                                                Appointments for {date.toDateString()}
                                            </h3>
                                            <div className="space-y-3">
                                                {filteredAppointments.length > 0 ? filteredAppointments.map(app => (
                                                    <div key={app._id} className="card bg-base-200 hover:shadow-md transition-shadow">
                                                        <div className="card-body p-4 flex-row justify-between items-center">
                                                            <div className="flex items-center gap-3">
                                                                <div className="avatar placeholder">
                                                                    <div className="bg-neutral text-neutral-content rounded-full w-12">
                                                                        <span className="text-sm">{app.fullName.split(' ').map(n => n[0]).join('')}</span>
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <h4 className="font-bold">{app.fullName}</h4>
                                                                    <p className="text-sm opacity-70">{new Date(app.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                                                    <p className="text-xs mt-1">{app.message}</p>
                                                                </div>
                                                            </div>
                                                            <div className={`badge ${app.status === 'Approved' ? 'badge-success' :
                                                                app.status === 'Declined' ? 'badge-error' :
                                                                    'badge-warning'
                                                                }`}>{app.status}</div>
                                                        </div>
                                                    </div>
                                                )) : (
                                                    <div className="alert">
                                                        <HiCalendar className="text-primary w-6 h-6" />
                                                        <span>No appointments scheduled for this day.</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </main>
            </div>

            {/* Sidebar */}
            <div className="drawer-side z-40">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                <aside className="bg-base-100 w-64 min-h-full shadow-xl border-r border-base-300">
                    {/* Logo */}
                    <div className="p-6 border-b border-base-300">
                        <h2 className="text-2xl font-extrabold text-primary">
                            Appoint<span className="text-secondary">Me</span>
                        </h2>
                        <p className="text-xs opacity-50 mt-1">Admin Panel</p>
                    </div>

                    {/* Menu */}
                    <ul className="menu p-4 gap-1">
                        <li className="menu-title">
                            <span>DASHBOARD</span>
                        </li>
                        <li>
                            <a onClick={() => setView('list')} className={view === 'list' ? 'active' : ''}>
                                <HiUserGroup className="w-5 h-5" />
                                <span>Appointments</span>
                                <span className="badge badge-primary badge-sm">{stats.total}</span>
                            </a>
                        </li>
                        <li>
                            <a onClick={() => setView('calendar')} className={view === 'calendar' ? 'active' : ''}>
                                <HiCalendar className="w-5 h-5" />
                                <span>Calendar</span>
                            </a>
                        </li>
                    </ul>
                </aside>
            </div>

            {/* Reschedule Modal */}
            {isRescheduleModalOpen && (
                <dialog className="modal modal-open">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Reschedule Appointment</h3>
                        <p className="py-4">Select a new date and time for <strong>{selectedAppointment?.fullName}</strong>.</p>
                        <input
                            type="datetime-local"
                            className="input input-bordered w-full mb-4"
                            value={newDate}
                            onChange={(e) => setNewDate(e.target.value)}
                        />
                        <div className="modal-action">
                            <button className="btn" onClick={() => setIsRescheduleModalOpen(false)}>Cancel</button>
                            <button className="btn btn-primary" onClick={handleReschedule}>Save Changes</button>
                        </div>
                    </div>
                </dialog>
            )}
        </div>
    );
};

export default Dashboard;
