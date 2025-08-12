import { ArrowRight, CarIcon } from "lucide-react";
import InputBox from "../components/inputBox";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function SignUP() {
  const backendUrl = import.meta.env.VITE_Backend_Url || "https://share-car-fe-w4z6.vercel.app/";
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSignup() {
    setError("");
    if (!username || !email || !password) {
      setError("Please fill in all fields");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post(`${backendUrl}/api/user/signup`, {
        username,
        email,
        password,
      });
      if (res.status === 201) {
        navigate("/signin");
      }
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Signup failed. Please try again.");
      }
      console.error("Signup error:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <> 
     <div
        onClick={() => navigate("/")}
        className="cursor-pointer mb-2 sm:mb-0 bg-gradient-to-br from-gray-100 via-blue-50 to-gray-200 p-4 "
      >
        <h1 className="text-2xl ml-4 font-bold">
          <span className="text-gray-500">Share</span>Car
        </h1>
      </div>
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 via-blue-50 to-gray-200 px-2">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-4 sm:p-8 border border-gray-200">
        <div className="flex flex-col items-center mb-6">
          <CarIcon className="text-black w-10 h-10 sm:w-12 sm:h-12 mb-2" />
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-1">
            Share<span className="text-black">Car</span>
          </h1>
          <p className="text-gray-500 text-base sm:text-lg">Create your account</p>
        </div>
        {error && (
          <div className="mb-4 text-red-600 text-center text-sm font-medium">{error}</div>
        )}
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1 text-sm sm:text-base">Username</label>
            <InputBox 
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              type="text"
            
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1 text-sm sm:text-base">Email</label>
            <InputBox 
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              type="email"
            
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1 text-sm sm:text-base">Password</label>
            <InputBox 
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              type="password"
              
            />
          </div>
          <div className="flex items-center justify-end mt-4">
            <Button
              variant="colored"
              text={loading ? "Signing Up..." : "Sign Up"}
              size="md"
              endIcon={<ArrowRight />}
              onClick={handleSignup}
        
            />
          </div>
        </div>
        <div className="mt-6 text-center">
          <span className="text-gray-600 text-sm sm:text-base">Already have an account? </span>
          <Link to="/signin" className="text-blue-600 font-semibold hover:underline text-sm sm:text-base">
            Sign In
          </Link>
        </div>
      </div>
    </div>
    </>
  );
}