import React from 'react';
import { ArrowRight } from 'lucide-react';

const CRM_URL = 'https://apex-voice-crm-production.up.railway.app/login';

const Login: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="flex justify-center">
                    <img src="/assets/logo.png" alt="Apex Voice Solutions" className="h-12 w-auto" />
                </div>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Apex Voice CRM
                </h2>
                <p className="mt-2 text-center text-gray-600">
                    Manage leads, automate calls, grow revenue
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 text-center">
                    <p className="text-gray-500 mb-6">
                        Access your dashboard to manage leads, view call transcripts, and track conversions.
                    </p>

                    <a
                        href={CRM_URL}
                        className="w-full inline-flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#1479FF] hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1479FF]"
                    >
                        Open CRM Dashboard
                        <ArrowRight size={18} />
                    </a>

                    <div className="mt-6 pt-6 border-t border-gray-200">
                        <p className="text-xs text-gray-400">
                            Default login: apexvoicesolutions@gmail.com / password123
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
