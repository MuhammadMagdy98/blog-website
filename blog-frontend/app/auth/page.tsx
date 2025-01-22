"use client";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import AuthApi from "@/api/auth-api";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const toggleForm = (): void => {
    setIsLogin(!isLogin);
    setFormData({ username: "", email: "", password: "" }); 
  };

  // Mutation for user registration
  const registerMutation = useMutation({
    mutationFn: async (newUser: typeof formData) => {
      const response = await AuthApi.register(newUser);
      return response.data;
    },
    onSuccess: (data) => {
      alert(data.message); 
      toggleForm(); 
    },
    onError: (error: any) => {
      alert(error.response?.data?.message || "Registration failed.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      // Handle login logic here
      alert("Login functionality is not implemented.");
    } else {
      registerMutation.mutate(formData); // Trigger registration mutation
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl w-full max-w-lg p-8">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
          {isLogin ? "Welcome Back" : "Create Your Account"}
        </h2>
        <p className="text-center text-gray-500 mb-8">
          {isLogin
            ? "Login to continue exploring"
            : "Sign up to join our community"}
        </p>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="mb-4">
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="name"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Enter your full name"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-800 bg-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
          )}
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="email"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-800 bg-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-800 bg-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 px-4 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-400 focus:outline-none transition duration-200"
            disabled={registerMutation.isPending}
          >
            {registerMutation.isPending ? "Processing..." : isLogin ? "Login" : "Sign Up"}
          </button>
        </form>
        <div className="text-center mt-6">
          <p className="text-sm text-gray-500">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              onClick={toggleForm}
              className="text-indigo-600 font-medium hover:underline focus:outline-none"
            >
              {isLogin ? "Sign Up" : "Login"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
