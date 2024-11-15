import { useState } from "react";
import { useRouter } from "next/router";
import AuthForm from "@/components/layout/authLayout";
import kontenbase from "@/lib/kontenbase";

export default function RegisterPage() {
  const { replace } = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({}); // To store validation errors

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({}); // Clear previous errors
    const target = e.target;
    const firstName = target.firstName.value;
    const lastName = target.lastName.value;
    const userName = target.userName.value;
    const email = target.email.value;
    const password = target.password.value;

    // Basic client-side validation
    let validationErrors = {};
    if (!firstName) validationErrors.firstName = "First name is required";
    if (!lastName) validationErrors.lastName = "Last name is required";
    if (!userName) validationErrors.userName = "Username is required";
    if (!email) validationErrors.email = "Email is required";
    if (!password) validationErrors.password = "Password is required";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsLoading(false);
      return; // Prevent form submission if there are validation errors
    }

    // Proceed with registration if no errors
    const { error } = await kontenbase.auth.register({
      email,
      password,
      firstName,
      lastName,
      userName,
    });

    if (error) {
      alert(error.message);
      setIsLoading(false);
    } else {
      replace("/"); // Redirect to the homepage after successful registration
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
      <div className="flex gap-4">
        <div className="space-y-2 w-1/2">
          <label
            htmlFor="firstName"
            className="block text-sm font-medium text-gray-700"
          >
            First Name
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your First Name"
          />
          {errors.firstName && (
            <p className="text-sm text-red-500">{errors.firstName}</p>
          )}
        </div>

        <div className="space-y-2 w-1/2">
          <label
            htmlFor="lastName"
            className="block text-sm font-medium text-gray-700"
          >
            Last Name
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your Last Name"
          />
          {errors.lastName && (
            <p className="text-sm text-red-500">{errors.lastName}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <label
          htmlFor="userName"
          className="block text-sm font-medium text-gray-700"
        >
          Username
        </label>
        <input
          id="userName"
          name="userName"
          type="text"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter your username"
        />
        {errors.userName && (
          <p className="text-sm text-red-500">{errors.userName}</p>
        )}
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
          name="email"
          type="email"
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
          name="password"
          type="password"
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
