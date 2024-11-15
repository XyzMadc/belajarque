import { useRouter } from "next/router";
import AuthForm from "@/components/layout/authLayout";
import { registerSchema } from "@/utils/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export default function RegisterPage() {
  const { push } = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting: isLoading },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        setError("root", {
          type: "manual",
          message: result.error || "Registration failed",
        });
        return;
      }

      push("/");
    } catch (error) {
      setError("root", {
        type: "manual",
        message: "An unexpected error occurred",
      });
    }
  };

  return (
    <AuthForm
      title="Create an Account"
      onSubmit={handleSubmit(onSubmit)}
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
            type="text"
            {...register("firstName")}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 
              ${
                errors.firstName
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              }`}
            placeholder="Enter your first name"
          />
          {errors.firstName && (
            <p className="text-sm text-red-500">{errors.firstName.message}</p>
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
            type="text"
            {...register("lastName")}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 
              ${
                errors.lastName
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              }`}
            placeholder="Enter your last name"
          />
          {errors.lastName && (
            <p className="text-sm text-red-500">{errors.lastName.message}</p>
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
          type="text"
          {...register("userName")}
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 
              ${
                errors.userName
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              }`}
          placeholder="Enter your username"
        />
        {errors.userName && (
          <p className="text-sm text-red-500">{errors.userName.message}</p>
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
          type="email"
          {...register("email")}
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 
              ${
                errors.email
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              }`}
          placeholder="Enter your email"
        />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}
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
          {...register("password")}
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 
              ${
                errors.password
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              }`}
          placeholder="Enter your password"
        />
        {errors.password && (
          <p className="text-sm text-red-500">{errors.password.message}</p>
        )}
      </div>
    </AuthForm>
  );
}
