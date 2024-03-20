import Link from "next/link";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">Auth.js OrchidORM Adapter</h1>
      <p className="text-lg text-center mb-8">
        This is a demo website showcasing the Auth.js OrchidORM Adapter.
      </p>
      <div className="flex space-x-4">
        <Link
          href="/login"
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition duration-300 ease-in-out"
        >
          Login
        </Link>
        <Link
          href="/register"
          className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded transition duration-300 ease-in-out"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default Home;
