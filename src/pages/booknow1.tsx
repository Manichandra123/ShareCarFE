import { useEffect, useState } from "react";
import Card from "../components/Card";
import axios from "axios";
import NavBar from "../components/navbar";
import { useNavigate } from "react-router-dom";

export default function BookRide() {
  // Existing code remains unchanged
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const getRides = async () => {
      const backendUrl = import.meta.env.VITE_Backend_Url || "https://sharecar-be.onrender.com";
      const token = localStorage.getItem("token") || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4OTBjYjE2NGEwY2FmNmEzZjhiMzA5ZSIsImlhdCI6MTc1NDk2NTE3NCwiZXhwIjoxNzU1MDUxNTc0fQ.JGTQdrZqBxE-Milv_ju3oK4_8Va-Ik0Fq_x2wkn9NrE";
      if (!token) {
        setError("You must be signed in to view available rides. Please sign in.");
        setLoading(false);
        return;
      }
      try {
        const res = await axios.get(`${backendUrl}/api/ride/rides`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.status === 200) {
          setRides(res.data.rides || []);
        }
      } catch (error: any) {
        let errMsg = "Error fetching rides.";
        if (error.response && error.response.status === 401) {
          errMsg = "Session expired or unauthorized. Please sign in again.";
        } else if (error.message) {
          errMsg += ` Details: ${error.message}`;
        }
        setError(errMsg);
        console.error("Error fetching rides:", error);
      } finally {
        setLoading(false);
      }
    };
    getRides();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-sky-50 flex flex-col">
      <NavBar />
      
      <main className="flex-1 flex flex-col items-center px-4 py-8 md:py-12">
        <div className="w-full max-w-6xl">
          {/* Modern header section */}
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Available Rides
            </h1>
            <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
              Browse through available rides and book your journey. All rides are verified for safety and reliability.
            </p>
          </div>
          
          {/* Status indicators with modern design */}
          <div className="mb-8">
            {loading && (
              <div className="flex flex-col items-center justify-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600 mb-4"></div>
                <p className="text-lg text-gray-700 font-medium">Loading available rides...</p>
              </div>
            )}
            
            {error && (
              <div className="rounded-xl bg-red-50 border border-red-100 p-6 text-center max-w-2xl mx-auto">
                <div className="flex justify-center mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-red-700 mb-1">Something went wrong</h3>
                <p className="text-red-600">{error}</p>
              </div>
            )}
            
            {!loading && !error && rides.length === 0 && (
              <div className="rounded-xl bg-indigo-50 border border-indigo-100 p-8 text-center max-w-2xl mx-auto">
                <div className="flex justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-indigo-700 mb-2">No rides available</h3>
                <p className="text-gray-600 mb-4">Check back later or try different search criteria</p>
                <button
                  onClick={() => window.location.reload()}
                  className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                  </svg>
                  Refresh Rides
                </button>
              </div>
            )}
          </div>
          
          {/* Rides grid with modern layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rides.map((ride: any) => (
              <div 
                key={ride._id}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100"
              >
                <Card
                  fare={ride.fare}
                  from={ride.startfrom}
                  to={ride.endAt}
                  carType={ride.cartype}
                  mobileNo={ride.mobileNo}
                  date={ride.date}
                  seats={ride.seats}
                  onBook={() => {
                    navigate('/booknow1', {
                      state: {
                        rideId: ride._id,
                        from: ride.startfrom,
                        to: ride.endAt,
                        fare: ride.fare,
                        mobileNo: ride.mobileNo,
                        date: ride.date,
                        seats: ride.seats,
                        carType: ride.cartype
                      }
                    });
                  }}
                />
              </div>
            ))}
          </div>
          
          {/* Empty state for when there are rides */}
          {!loading && rides.length > 0 && (
            <div className="mt-8 text-center text-gray-500">
              Showing {rides.length} available ride{rides.length !== 1 ? 's' : ''}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}