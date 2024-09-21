import React from 'react';
import '../index.css'

const Login = () => {
    return (
        <div className="tw-flex tw-items-center tw-justify-center tw-h-screen tw-bg-gradient-to-r tw-from-blue-950 tw-to-blue-200">
            <div className="tw-bg-blue-900 tw-shadow-lg tw-rounded-lg tw-p-8 tw-max-w-sm tw-w-full">
                <h2 className="tw-text-2xl tw-font-bold tw-text-center tw-mb-6 tw-text-white">
                    Login to Your Account
                </h2>
                <form>
                    <div className="tw-mb-4">
                        <label className="tw-block tw-text-gray-300 tw-mb-2" htmlFor="email">
                            Email
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
                            type="password"
                            id="password"
                            className="tw-w-full tw-p-3 tw-border tw-border-gray-300 tw-rounded-lg focus:tw-border-blue-500 focus:outline-none"
                            placeholder="********"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="tw-w-full tw-bg-blue-600 tw-text-white tw-font-semibold tw-p-3 tw-rounded-lg hover:tw-bg-blue-700 focus:outline-none focus:tw-ring-2 focus:tw-ring-blue-500 focus:tw-ring-opacity-50"
                    >
                        Login
                    </button>
                </form>
                <p className="tw-mt-4 tw-text-center tw-text-gray-300">
                    Not an organizer? <a href="/join" className="tw-text-blue-400 hover:tw-underline">Join here</a>
                </p>
            </div>
        </div>
    );
};

export default Login;
