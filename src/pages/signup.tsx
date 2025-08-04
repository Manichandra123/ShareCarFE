import { ArrowRight, CarIcon } from "lucide-react";
import InputBox from "../components/inputBox";
import Button from "../components/Button";
import { Link } from "react-router-dom";

export default function SignUP() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 via-blue-50 to-gray-200 px-2">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-4 sm:p-8 border border-gray-200">
        <div className="flex flex-col items-center mb-6">
          <CarIcon className="text-black w-10 h-10 sm:w-12 sm:h-12 mb-2" />
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-1">
            Share<span className="text-black">Car</span>
          </h1>
          <p className="text-gray-500 text-base sm:text-lg">Create your account</p>
        </div>
        <form>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1 text-sm sm:text-base">Username</label>
              <InputBox placeholder="Enter username" type="text" />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1 text-sm sm:text-base">Email</label>
              <InputBox placeholder="Enter email" type="email" />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1 text-sm sm:text-base">Password</label>
              <InputBox placeholder="Enter password" type="password" />
            </div>
            <div className="flex items-center justify-end mt-4">
              <Button
                variant="colored"
                text="Sign Up"
                size="md"
                endIcon={<ArrowRight />}
              />
            </div>
          </div>
        </form>
        <div className="mt-6 text-center">
          <span className="text-gray-600 text-sm sm:text-base">Already have an account? </span>
          <Link to="/signin" className="text-blue-600 font-semibold hover:underline text-sm sm:text-base">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}