import axios from "axios";
import NavBar from "../components/navbar";
import { CheckCircle } from 'lucide-react';
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function MyBookings() {
  const navigate = useNavigate();


 useEffect(()=>{
  const res = axios.get(``)
 },[])

  return (
    <>
      <NavBar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full flex flex-col items-center">
          <CheckCircle className="text-green-500 mb-4" size={56} />
          <h1 className="text-2xl font-bold mb-2 text-gray-800">Booking Confirmed!</h1>
          <p className="text-gray-600 mb-4 text-center">Thank you for using our service. Your ride has been successfully booked.</p>
          <div className="w-full mb-4">
            <div className="flex justify-between text-gray-700 mb-2">
              <span className="font-semibold">Booking ID:</span>
              <span className="font-mono">{bookingId}</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span className="font-semibold">Driver Number:</span>
              <span>{driverNumber}</span>
            </div>
          </div>
          <button
            onClick={() => navigate("/")}
            className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
          >
            Go to Home
          </button>
        </div>
      </div>
    </>
  );
}

