import { useState } from "react";
import logo from "../assets/d.png";
import back from "../assets/background.png";
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-purple-500 to-pink-500">
      <div className="flex flex-col items-center md:flex-row md:space-x-12">
        <div className="bg-white p-8 rounded-lg shadow-lg transform -translate-x-80">
          <div className="flex justify-center mb-6">
            {/* <h1 className="text-3xl font-bold text-purple-600">Digitalflake</h1>
            <p className="text-gray-600">Welcome to Digitalflake Admin</p> */}
            <img src={logo} className="h-14 w-24" alt="" />
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="email"
                placeholder="Email ID"
                value={email}
                onChange={handleEmailChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div className="mb-6">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div className="flex justify-between items-center mb-4">
              <div>
                <a
                  href="#"
                  className="text-sm text-purple-600 hover:text-purple-800"
                >
                  Forgot Password?
                </a>
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors duration-300"
            >
              Log In
            </button>
          </form>
        </div>
        {/* <div className="hidden md:block">
          <img src={back} alt="Login Illustration" className="max-w-md" />
        </div> */}
      </div>
    </div>
  );
};

export default LoginPage;
