"use client"
import { useParams } from 'next/navigation';

const UserPage = () => {
  const params = useParams();

  if (!params || !params.id || Array.isArray(params.id)) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-100">Invalid user ID</div>;
  }

  const { id } = params;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">User Profile: {id}</h1>
        <p className="text-gray-700">This is the user profile page for user {id}.</p>
      </div>
    </div>
  );
};

export default UserPage;
