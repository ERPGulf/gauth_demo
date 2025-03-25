import React from 'react';

interface ParameterListProps {
    parameters: string[];
}

const ParameterList: React.FC<ParameterListProps> = ({ parameters }) => (
    <div className="mb-6 sm:mb-8">
        <label
            htmlFor="Parameters"
            className="block text-base sm:text-lg font-semibold text-gray-700 mb-2 sm:mb-3"
        >
            Parameters
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {parameters.map((param) => (
                <div key={param}>
                    <input
                        type="text"
                        value={param}
                        readOnly
                        className="w-full p-3 border border-gray-300 rounded-lg text-gray-800 bg-gray-100 focus:outline-none"
                    />
                </div>
            ))}
        </div>
    </div>
);

export default ParameterList;


