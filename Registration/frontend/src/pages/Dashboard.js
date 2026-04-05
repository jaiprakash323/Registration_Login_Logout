function Dashboard () {
    const logout = () => {
        localStorage.removeItem("token");
        window.location.href = "/";
    };

    return (
        <div className="container">
            <h2>Dashboard</h2>
            <button onClick={logout}>Logout</button>
        </div>
    )
}

export default Dashboard;