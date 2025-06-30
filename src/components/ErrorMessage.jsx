import React from 'react';

const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
      <div className="flex justify-between items-center">
        <div>
          <p className="font-bold">Error</p>
          <p>{message}</p>
        </div>
        {onRetry && (
          <button
            onClick={onRetry}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Retry
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorMessage;