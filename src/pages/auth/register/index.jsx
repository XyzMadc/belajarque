import { useRouter } from "next/router";
import AuthForm from "@/components/layout/authLayout";
import { useState } from "react";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.error) {
        setError(data.error);
      } else {
        setIsLoading(false);
        router.push("/auth/login");
      }
    } catch (error) {
      setIsLoading(false);
      setError("An error occurred");
    }
  };

  return (
    <AuthForm
      title="Create an Account"
      onSubmit={handleSubmit}
      loading={isLoading}
      buttonLabel="Register"
      isLogin={false}
    >
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="space-y-2">
        <label
          htmlFor="userName"
          className="block text-sm font-medium text-gray-700"
        >
          Username
        </label>
        <input
          id="userName"
          type="userName"
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter your username"
          value={formData.userName}
          onChange={(e) =>
            setFormData({ ...formData, userName: e.target.value })
          }
          required
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter your email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <input
          id="password"
          type="password"
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter your password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          required
        />
      </div>
    </AuthForm>
  );
}
