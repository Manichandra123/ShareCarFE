import { ArrowRightLeft } from "lucide-react";
import NavBar from "../components/navbar";
import InputBox from "../components/inputBox";
import Button from "../components/Button";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function PostRide1() {
  // State variables remain the same
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  let [date, setDate] = useState("");
  const [mobile, setMobile] = useState("");
  const [seats, setSeats] = useState("");
  const [price, setPrice] = useState("");
  const [carType, setCarType] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      setError("You must be logged in to post a ride.");
      navigate("/signin");
    }
  }, [token, navigate]);

  const backendUrl = import.meta.env.VITE_Backend_Url || "https://sharecar-be.onrender.com";

  async function handlePostRide() {
   
    setError("");
    setSuccess("");
    const token = localStorage.getItem("token");
 
    if (!start || !end || !date || !mobile || !seats || !price || !carType) {
      setError("Please fill in all fields");
      return;
    }
    const rideData = {
      startfrom: start,
      endAt: end,
      fare: Number(price),
      mobileNo: mobile,
      date: date,
      seats: seats,
      cartype: carType,
    };

    try {
      const res = await axios.post(`${backendUrl}/api/ride/create-ride`, rideData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        setSuccess("Ride posted successfully");
        alert("Ride posted successfully");
        navigate('/bookride');
      }

    } catch (error) {
      setError("Error posting ride:");
    }
  }

  function swapLocations() {
   
    const a = start;
    const b = end;
    setStart(b);
    setEnd(a);
  }

  return (
    <>
 
        <div  >
          <NavBar />
        </div>
   

      <div className="relative min-h-screen bg-gradient-to-br from-indigo-50 to-sky-50">
        <div className="h-[50vh] w-full overflow-hidden relative">
 
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-sky-400 to-purple-500"></div>

    
          <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:3rem_3rem]"></div>
          
 
          <div className="absolute -top-20 -left-20 w-96 h-96 bg-purple-400 rounded-full mix-blend-soft-light opacity-30 blur-3xl"></div>
          <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-indigo-400 rounded-full mix-blend-soft-light opacity-30 blur-3xl"></div>
        </div>

 
        <div className="absolute inset-0 flex items-center justify-center mt-12">
          <div className="w-full max-w-5xl mx-6 lg:mx-0">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 -mt-40">
 
              <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-white/30">
                <div className="flex items-start gap-4">
                  <div className="bg-indigo-100 p-3 rounded-xl">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">Post a Ride</h2>
                    <p className="mt-2 text-gray-600">
                      Share your trip, find riders, and earn from empty seats. Fill the details and post - it's quick and easy.
                    </p>
                  </div>
                </div>

    
                <div className="mt-6 space-y-3">
                  {error && (
                    <div className="rounded-xl bg-red-50/80 p-4 border border-red-100 text-red-700 flex items-start gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      <span>{error}</span>
                    </div>
                  )}
                  {!error && success && (
                    <div className="rounded-xl bg-emerald-50/80 p-4 border border-emerald-100 text-emerald-700 flex items-start gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>{success}</span>
                    </div>
                  )}
                </div>

     
                <div className="mt-8 space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-indigo-500 rounded-full p-1.5 mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">Clear Pickup Location</h4>
                      <p className="mt-1 text-sm text-gray-600">Choose a precise pickup location so riders can find you quickly.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-indigo-500 rounded-full p-1.5 mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">Realistic Pricing</h4>
                      <p className="mt-1 text-sm text-gray-600">Set fair pricing and accurate seat counts for faster bookings.</p>
                    </div>
                  </div>
                </div>
              </div>

           
              <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-white/30">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
                  <h3 className="text-xl font-bold text-gray-800">Ride Details</h3>
                  <span className="text-sm font-medium bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full">
                    Safe • Verified • Simple
                  </span>
                </div>

                <div
                  className="space-y-6"
                >
        
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">From</label>
                      <div className="relative">
                        <InputBox 
                          onChange={(e) => setStart(e.target.value)} 
                          placeholder="Starting from" 
                          type="text"
                           
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
                      <div className="relative flex items-center gap-2">
                        <div className="flex-1">
                          <InputBox 
                            onChange={(e) => setEnd(e.target.value)} 
                            placeholder="Traveling To.." 
                            type="text"
                             
                          />
                        </div>
                        <button
                          type="button"
                          onClick={swapLocations}
                          aria-label="swap start and end"
                          className="h-11 w-11 flex items-center justify-center rounded-xl bg-white hover:bg-gray-50 border border-gray-200 shadow-sm transition-all duration-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-100"
                        >
                          <ArrowRightLeft className="rotate-90 text-gray-600 w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>

       
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                      <InputBox 
                        onChange={(e) => setDate(e.target.value)} 
                        placeholder="Select Date" 
                        type="date"
 
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Mobile No</label>
                      <InputBox 
                        onChange={(e) => setMobile(e.target.value)} 
                        placeholder="Enter Mobile No" 
                        type="tel"
 
                      />
                    </div>
                  </div>

 
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Seats</label>
                      <InputBox 
                        onChange={(e) => setSeats(e.target.value)} 
                        placeholder="Available Seats" 
                        type="number"
 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Price (₹)</label>
                      <InputBox 
                        onChange={(e) => setPrice(e.target.value)} 
                        placeholder="Price per seat" 
                        type="number"
 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Car Type</label>
                      <InputBox 
                        onChange={(e) => setCarType(e.target.value)} 
                        placeholder="Car model/type" 
                        type="text"
 
                      />
                    </div>
                  </div>

    
                  <div className="flex items-center justify-end gap-3 pt-4">
                    <Button
                      variant="simple"
                      text="Preview"
                      size="md"
                      className="border border-gray-300 hover:border-gray-400 rounded-xl transition-colors"
                      onClick={() => {
                        alert(`Preview:\n${start} → ${end}\n${date}\nSeats: ${seats}  Price: ₹${price}`);
                      }}
                    />
                    <Button 
                      variant="colored" 
                      text="Post Ride" 
                      size="md"
                      className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 rounded-xl shadow-md hover:shadow-lg transition-all"
                      onClick={handlePostRide} 
                    />
                  </div>
                </div>
              </div>
            </div>

    
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-between text-sm text-gray-500 px-4 py-3 bg-white/80 backdrop-blur-sm rounded-xl border border-white/30 shadow-sm">
              <div className="flex items-center gap-2 mb-2 sm:mb-0">
                <span className="flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-emerald-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Verified drivers
                </span>
                <span className="mx-2">•</span>
                <span className="flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-sky-500" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                    <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
                  </svg>
                  24/7 support
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">ShareCar</span>
                <span className="h-1 w-1 bg-gray-400 rounded-full"></span>
                <span>2025</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}