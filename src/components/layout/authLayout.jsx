import Link from "next/link";
import Image from "next/image";
import GoogleLogo from "../../../public/assets/google-logo.png";
import FacebookLogo from "../../../public/assets/facebook-logo.png";
import { PencilRuler } from "@phosphor-icons/react";

export default function AuthForm({
  title,
  onSubmit,
  loading,
  buttonLabel,
  children,
  isLogin = true,
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-lg md:max-w-5xl flex flex-col md:flex-row shadow-lg rounded-lg overflow-hidden bg-white">
        <div className="w-full md:w-1/2 p-6">
          <div className="mb-8">
            <div className="flex gap-2 items-center mb-6 text-blue-500">
              <PencilRuler size={32} weight="fill" />
              <h1 className="text-3xl font-extrabold">BelajarQ</h1>
            </div>
            <h2 className="text-2xl font-semibold text-gray-900">{title}</h2>
            <p className="text-gray-500 mt-2">
              {isLogin
                ? "Welcome back! Select a method to log in:"
                : "Create your account to get started."}
            </p>
          </div>

          {isLogin && (
            <div className="flex gap-4 mb-6">
              <button
                onClick={() => signIn("google")}
                className="flex items-center justify-center w-1/2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <Image
                  src={GoogleLogo}
                  alt="Google"
                  width={20}
                  height={20}
                  className="mr-2"
                />
                Google
              </button>
              <button
                onClick={() => signIn("facebook")}
                className="flex items-center justify-center w-1/2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <Image
                  src={FacebookLogo}
                  alt="Facebook"
                  width={24}
                  height={24}
                  className="mr-2"
                />
                Facebook
              </button>
            </div>
          )}

          {isLogin && (
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center">
                <button className="bg-white px-2 text-sm text-gray-500">
                  or continue with email
                </button>
              </div>
            </div>
          )}

          <form onSubmit={onSubmit} className="space-y-4">
            {children}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 px-4 border border-transparent rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Please wait..." : buttonLabel}
            </button>
          </form>

          {isLogin ? (
            <p className="mt-8 text-center text-sm text-gray-600">
              Don{"'"}t have an account?{" "}
              <Link
                href="/auth/register"
                className="text-blue-600 hover:text-blue-500"
              >
                Create an account
              </Link>
            </p>
          ) : (
            <p className="mt-8 text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                href="/auth/login"
                className="text-blue-600 hover:text-blue-500"
              >
                Log in
              </Link>
            </p>
          )}
        </div>

        <div className="hidden md:flex w-1/2 bg-blue-600 p-8 items-center justify-center text-white">
          <div className="max-w-md text-center">
            <h2 className="text-2xl font-bold mb-4">
              Dapatkan kemudahan belajar dengan BelajarQ.
            </h2>
            <p className="text-sm">
              Ayo bergabung untuk mendapatkan pelajaran baru dan quiz dan
              menarik.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
