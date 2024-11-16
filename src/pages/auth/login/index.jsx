import { useRouter } from "next/router";
import AuthForm from "@/components/layout/authLayout";
import { useState } from "react";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const [formData, setFormData] = useState({
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
      const result = await signIn("credentials", {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });

      if (result.error) {
        setError("Invalid credentials");
      } else {
        router.push("/");
        setIsLoading(false);
      }
    } catch (error) {
      setError("An error occurred");
      setIsLoading(false);
    }
  };

  return (
    <AuthForm
      title="Log in to your Account"
      onSubmit={handleSubmit}
      loading={isLoading}
      buttonLabel="Log in"
    >
      {error && <p className="text-red-500 mb-4">{error}</p>}
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
