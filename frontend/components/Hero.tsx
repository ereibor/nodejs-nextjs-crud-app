'use client';
import Link from 'next/link';

const Hero = () => {
  return (
    <section className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-20 text-center">
      <div className="container mx-auto">
        <h2 className="text-4xl font-semibold mb-4">Welcome!</h2>
        <p className="text-xl mb-6">Manage users and access features easily with our intuitive interface.</p>
        <div className="flex justify-center space-x-4">
          <Link href="/login" className="bg-white text-blue-600 py-2 px-6 rounded-full hover:bg-gray-100">Login</Link>
          <Link href="/register" className="bg-transparent border-2 border-white py-2 px-6 rounded-full hover:bg-white hover:text-blue-600">Get Started</Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
