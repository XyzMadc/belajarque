import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import AuthForm from "@/components/layout/authLayout";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { loginSchema } from "@/utils/validation";

export default function LoginPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    const result = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    if (result.error) {
      alert("Login gagal: " + result.error);
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <AuthForm
      title="Log in to your Account"
      onSubmit={handleSubmit(onSubmit)}
      loading={isSubmitting}
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
          {...register("email", { required: true })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter your email"
        />
        {errors.email && (
          <p className="text-sm text-red-500">Email is required</p>
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
          {...register("password", { required: true })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter your password"
        />
        {errors.password && (
          <p className="text-sm text-red-500">Password is required</p>
        )}
      </div>
    </AuthForm>
  );
}
