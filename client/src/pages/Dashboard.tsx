import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();
  console.log(user)
  return (
    <div className="p-4">
      {user ? (
        <>
          <h2 className="text-xl font-bold">Welcome, {user.username}</h2>
          <p>Email: {user.email}</p>
        </>
      ) : (
        <p>Loading user info...</p>
      )}
    </div>
  );
};

export default Dashboard;
