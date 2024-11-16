import { useSession, signOut } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  // If session is not available yet, show loading
  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
          role="status"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="bg-blue-600 p-4 flex justify-between items-center text-white">
        <div className="text-lg font-semibold">Dashboard</div>
        <div className="flex items-center gap-4">
          <span>{session.user.email}</span>
          <button
            onClick={() => signOut()}
            className="bg-red-500 px-4 py-2 rounded-lg text-white hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-grow p-8">
        <h1 className="text-2xl mb-4">Welcome, {session.user.email}!</h1>
        <p>This is your protected dashboard.</p>
      </div>
    </div>
  );
}
