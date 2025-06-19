import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const Dashboard = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  console.log(user);
const handleLogout = async () => {
  try {
    const res = await api.post("/auth/logout"); // Just this is enough
    if (res.status === 200) {
      setUser(null);
      navigate("/login");
    }
  } catch (error) {
    console.error(error);
    alert("Logout failed. Try again later.");
  }
};



  return (
    <div className="flex h-screen bg-gray-900 text-amber-400">
      {/* Sidebar */}
      <aside className="w-64 bg-black/80 p-6 flex flex-col">
        <h2 className="text-3xl font-bold mb-8" style={{ fontFamily: 'emoFont' }}>
          😉emoExplain
        </h2>

        <div className="mb-10">
          <p className="text-sm text-gray-400">Welcome,</p>
          <p className="text-lg font-semibold">{user?.username || user?.email}</p>
        </div>

        <nav className="flex flex-col space-y-3">
          <button
            onClick={() => navigate('/dashboard')}
            className="text-amber-400 hover:text-amber-300 transition"
          >
            Dashboard Home
          </button>
          <button
            onClick={() => navigate('/profile')}
            className="text-amber-400 hover:text-amber-300 transition"
          >
            Profile
          </button>
          {/* Add more nav buttons here */}
        </nav>

        <div className="mt-auto">
          <button
            onClick={handleLogout}
            className="bg-amber-400 hover:bg-amber-500 text-black font-semibold w-full py-2 rounded"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-4xl font-bold mb-6">Dashboard</h1>

        {/* Example cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-black/70 rounded-lg p-6 shadow">
            <h3 className="text-xl font-semibold mb-2">Your Favorite Emojis</h3>
            <p className="text-gray-400">You have 10 emojis saved.</p>
          </div>
          <div className="bg-black/70 rounded-lg p-6 shadow">
            <h3 className="text-xl font-semibold mb-2">Search History</h3>
            <p className="text-gray-400">You searched 25 emojis recently.</p>
          </div>
          <div className="bg-black/70 rounded-lg p-6 shadow">
            <h3 className="text-xl font-semibold mb-2">Account Status</h3>
            <p className="text-gray-400">{user?.isVerified ? 'Verified' : 'Unverified'}</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
