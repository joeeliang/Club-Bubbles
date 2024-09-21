import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../index.css';

function Signup() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [passwordRequirements, setPasswordRequirements] = useState({
        length: false,
        uppercase: false,
        lowercase: false,
        number: false,
    });

    const validatePassword = (password) => {
        setPasswordRequirements({
            length: password.length >= 8,
            uppercase: /[A-Z]/.test(password),
            lowercase: /[a-z]/.test(password),
            number: /\d/.test(password),
        });
    };

    const handlePasswordChange = (e) => {
        const value = e.target.value.replace(/\s/g, ''); // Remove spaces
        setPassword(value);
        validatePassword(value);
    };

    const handleConfirmPasswordChange = (e) => {
        const value = e.target.value.replace(/\s/g, ''); // Remove spaces
        setConfirmPassword(value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === confirmPassword && Object.values(passwordRequirements).every(Boolean)) {
            console.log("Signup successful!");
        }
    };

    return (
        <div className="tw-flex tw-items-center tw-justify-center tw-min-h-screen tw-bg-gradient-to-r tw-from-blue-950 tw-to-blue-200 tw-py-8">
            <div className="tw-bg-blue-900 tw-shadow-lg tw-rounded-lg tw-p-8 tw-max-w-sm tw-w-full">
                <h2 className="tw-text-2xl tw-font-bold tw-text-center tw-text-white tw-mb-6">
                    Create Your Account
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="tw-mb-4">
                        <label className="tw-block tw-text-gray-300 tw-mb-2" htmlFor="name">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            className="tw-w-full tw-p-3 tw-border tw-border-gray-300 tw-rounded-lg focus:tw-border-blue-500 focus:outline-none"
                            placeholder="Your Name"
                            required
                        />
                    </div>
                    <div className="tw-mb-4">
                        <label className="tw-block tw-text-gray-300 tw-mb-2" htmlFor="email">
                            School Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="tw-w-full tw-p-3 tw-border tw-border-gray-300 tw-rounded-lg focus:tw-border-blue-500 focus:outline-none"
                            placeholder="you@example.com"
                            required
                        />
                    </div>
                    <div className="tw-mb-6">
                        <label className="tw-block tw-text-gray-300 tw-mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            className="tw-w-full tw-p-3 tw-border tw-border-gray-300 tw-rounded-lg focus:tw-border-blue-500 focus:outline-none"
                            placeholder="********"
                            value={password}
                            onChange={handlePasswordChange}
                            required
                        />
                    </div>
                    <div className="tw-mb-6">
                        <label className="tw-block tw-text-gray-300 tw-mb-2" htmlFor="confirmPassword">
                            Confirm Password
                        </label>
                        <input
                            type={showPassword ? "text" : "password"}
                            id="confirmPassword"
                            className="tw-w-full tw-p-3 tw-border tw-border-gray-300 tw-rounded-lg focus:tw-border-blue-500 focus:outline-none"
                            placeholder="********"
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                            required
                        />
                    </div>
                    <div className="tw-flex tw-items-center tw-mb-4">
                        <input
                            type="checkbox"
                            id="showPasswordCheckbox"
                            checked={showPassword}
                            onChange={() => setShowPassword(!showPassword)}
                            className="tw-mr-2"
                        />
                        <label htmlFor="showPasswordCheckbox" className="tw-text-gray-300">Show Password</label>
                    </div>

                    {/* Password Requirement Prompts */}
                    <div className="tw-text-sm">
                        <p className={`tw-mb-1 ${passwordRequirements.length ? 'tw-text-green-500' : 'tw-text-red-500'}`}>
                            {passwordRequirements.length ? '✓ Minimum 8 characters' : '✗ Minimum 8 characters'}
                        </p>
                        <p className={`tw-mb-1 ${passwordRequirements.uppercase ? 'tw-text-green-500' : 'tw-text-red-500'}`}>
                            {passwordRequirements.uppercase ? '✓ At least 1 uppercase letter' : '✗ At least 1 uppercase letter'}
                        </p>
                        <p className={`tw-mb-1 ${passwordRequirements.lowercase ? 'tw-text-green-500' : 'tw-text-red-500'}`}>
                            {passwordRequirements.lowercase ? '✓ At least 1 lowercase letter' : '✗ At least 1 lowercase letter'}
                        </p>
                        <p className={`tw-mb-1 ${passwordRequirements.number ? 'tw-text-green-500' : 'tw-text-red-500'}`}>
                            {passwordRequirements.number ? '✓ At least 1 number' : '✗ At least 1 number'}
                        </p>
                    </div>

                    <button
                        type="submit"
                        className="tw-w-full tw-bg-blue-600 tw-text-white tw-font-semibold tw-p-3 tw-rounded-lg hover:tw-bg-blue-700 focus:outline-none focus:tw-ring-2 focus:tw-ring-blue-500 focus:tw-ring-opacity-50"
                    >
                        Create
                    </button>
                </form>
                <p className="tw-mt-4 tw-text-center tw-text-gray-300">
                    Already have an account? <a href="/join" className="tw-text-blue-400 hover:tw-underline">Log in here.</a>
                </p>
            </div>
        </div>
    );
}

export default Signup;
