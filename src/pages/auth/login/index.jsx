import { useRouter } from "next/router";
import AuthForm from "@/components/layout/authLayout";
import kontenbase from "@/lib/kontenbase";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({}); // Clear previous errors
    const target = e.target;
    const email = target.email.value;
    const password = target.password.value;

    let validationErrors = {};
    if (!email) validationErrors.email = "Email is required";
    if (!password) validationErrors.password = "Password is required";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsLoading(false);
      return;
    }

    // Proceed with login if no errors
    try {
      const { error } = await kontenbase.auth.login({ email, password });

      if (error) {
        console.error("Login failed:", error.message); // Log error for debugging
        setErrors({ error: error.message });
        setIsLoading(false);
      } else {
        console.log("Login successful, redirecting..."); // Log success for debugging
        setIsLoading(false);
        router.push("/"); // Redirect after successful login
      }
    } catch (err) {
      console.error("Unexpected error:", err); // Handle unexpected errors
      setErrors({ error: "An unexpected error occurred." });
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
          name="email"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter your email"
        />
        {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
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
          name="password"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter your password"
        />
        {errors.password && (
          <p className="text-sm text-red-500">{errors.password}</p>
        )}
      </div>
    </AuthForm>
  );
}
