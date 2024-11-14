import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import AuthForm from "@/components/layout/authLayout";
import { registerSchema } from "@/utils/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { handleRegister } from "@/services/auth/authHandlers";

export default function RegisterPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    const { error } = await handleRegister(data.email, data.password);

    if (error) {
      alert("Registrasi gagal: " + error.message);
    } else {
      alert("Registrasi berhasil! Silakan login.");
      router.push("/auth/login");
    }
  };

  return (
    <AuthForm
      title="Create an Account"
      onSubmit={handleSubmit(onSubmit)}
      loading={isSubmitting}
      buttonLabel="Register"
      isLogin={false}
    >
      <div className="space-y-2">
        <label
          htmlFor="username"
          className="block text-sm font-medium text-gray-700"
        >
          Username
        </label>
        <input
          id="username"
          type="text"
          {...register("username", { required: true })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter your username"
        />
        {errors.username && (
          <p className="text-sm text-red-500">Username is required</p>
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
