import { useState, useEffect, useMemo } from "react";
import kontenbase from "@/lib/kontenbase";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState(null); // Initial state should be null
  const [loading, setLoading] = useState(true);

  const getProfile = async () => {
    try {
      const { user, error } = await kontenbase.auth.user();
      setLoading(false);
      if (error) {
        router.push("/login");
      } else {
        setUser(user);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error fetching profile:", error);
      router.push("/login"); // Redirect to login if an error occurs
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getProfile();
    } else {
      router.push("/login");
    }
  }, [router]);

  const name = useMemo(() => {
    return user?.firstName || ""; // Simplify the logic
  }, [user]);

  const logout = async () => {
    await kontenbase.auth.logout();
    localStorage.removeItem("token"); // Clear the token from local storage
    router.push("/login"); // Redirect to login after logout
  };

  if (loading) {
    return <div>Loading...</div>; // Show loading state while fetching profile
  }

  if (!user) {
    return null; // Return nothing if the user is not set
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold">Welcome {name}</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-500">{user.email}</span>
              <button
                onClick={logout}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
