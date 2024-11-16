import { useRouter } from "next/router";

const ErrorPage = () => {
  const router = useRouter();
  const { error } = router.query;

  const getErrorMessage = () => {
    if (error === "CredentialsSignin") {
      return "Email atau password Anda salah. Silakan coba lagi.";
    }
    if (error === "SessionRequired") {
      return "Anda perlu login untuk mengakses halaman ini.";
    }
    return "Terjadi kesalahan yang tidak diketahui. Silakan coba lagi nanti.";
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full text-center">
        <h1 className="text-3xl font-bold text-red-500">Terjadi Kesalahan</h1>
        <p className="text-lg mt-4 text-gray-700">{getErrorMessage()}</p>
        <div className="mt-6">
          <button
            onClick={() => router.push("/auth/login")}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Kembali ke Halaman Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
