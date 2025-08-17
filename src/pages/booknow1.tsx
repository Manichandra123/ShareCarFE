import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import NavBar from '../components/navbar';
import Button from '../components/Button';
import axios from 'axios';
import InputBox from '../components/inputBox';

export default function BookNow1() {
  // Existing code remains unchanged
  const location = useLocation();
  const navigate = useNavigate();
  
  interface RideData {
    rideId: string;
    from: string;
    to: string;
    date: string;
    carType: string;
    seats: number;
    mobileNo: string;
    fare: number;
  }

  const [rideData, setRideData] = useState<RideData | null>(null);
  const [passengerCount, setPassengerCount] = useState<number>(1);
  const [loading, setLoading] = useState(false);
  const [mobileNo, setMobileNo] = useState('');

  useEffect(() => {
    if (location.state) {
      setRideData(location.state as RideData);
    } else {
      console.log('No ride data found, redirecting...');
      navigate('/bookride');
    }
  }, [location.state, navigate]);

  const handleBooking = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('You must be logged in to book a ride.');
      navigate('/signin');
      return;
    }
    if (!rideData) return;
    setLoading(true);
    try {
      const backendUrl = import.meta.env.VITE_Backend_Url || "https://sharecar-be.onrender.com";
      await axios.post(
        `${backendUrl}/api/ride/book-ride`,
        {
          startfrom: rideData.from,
          endAt: rideData.to,
          fare: rideData.fare * passengerCount,
          mobileNo: mobileNo,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      alert('Booking successful!');
      navigate('/my-bookings');
    } catch (error: any) {
      console.error('Booking error:', error);
      const message = error?.response?.data?.message || 'Booking failed. Please try again.';
      alert(`Booking failed: ${message}`);
    } finally {
      setLoading(false);
    }
  };

  if (!rideData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-sky-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mx-auto mb-4"></div>
          <p className="text-lg text-gray-700 font-medium">Loading ride details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-sky-50 flex flex-col">
      <NavBar />
      <main className="flex-1 flex items-center justify-center p-4 py-8 md:py-12">
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6">
            <h1 className="text-2xl md:text-3xl font-bold text-white text-center">
              Confirm Your Booking
            </h1>
          </div>

          <div className="p-6 md:p-8">
            {/* Ride Details Card */}
            <div className="bg-gradient-to-br from-indigo-50 to-sky-50 rounded-xl border border-indigo-100 p-6 mb-8 shadow-sm">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-indigo-100">
                <h2 className="text-xl font-bold text-indigo-700">Ride Details</h2>
                <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium">
                  Confirmation
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <DetailItem label="From:" value={rideData.from} />
                  <DetailItem label="To:" value={rideData.to} />
                  <DetailItem 
                    label="Date:" 
                    value={new Date(rideData.date).toLocaleDateString('en-US', {
                      weekday: 'short',
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  />
                </div>
                <div className="space-y-3">
                  <DetailItem label="Car Type:" value={rideData.carType} />
                  <DetailItem label="Available Seats:" value={rideData.seats} />
                  <DetailItem label="Contact:" value={rideData.mobileNo} />
                </div>
              </div>
              
              <div className="mt-5 pt-4 border-t border-indigo-100">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-gray-700">Fare per person:</span>
                  <span className="font-bold text-xl text-green-600">₹{rideData.fare}</span>
                </div>
              </div>
            </div>

            {/* Booking Form */}
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Passengers
                  </label>
                  <InputBox
                    onChange={(e) => setPassengerCount(Math.max(1, Number(e.target.value)))}
                    type='number'
                  
      
                    placeholder='Enter passenger count'
               
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Max: {rideData.seats} passengers
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Mobile No
                  </label>
                  <InputBox
                    type='tel'
                    placeholder='Enter mobile number'
                    onChange={(e) => setMobileNo(e.target.value)}
             
                  />
                </div>
              </div>

              {/* Total Amount */}
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-5 border border-indigo-100">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-lg font-bold text-gray-800">Total Amount</p>
                    <p className="text-sm text-gray-600">
                      {passengerCount} × ₹{rideData.fare} per person
                    </p>
                  </div>
                  <span className="text-2xl font-bold text-indigo-600">
                    ₹{(rideData.fare || 0) * passengerCount}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  onClick={() => navigate(-1)}
                  className="flex-1 py-3 px-4 border border-gray-300 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                  </svg>
                  Go Back
                </button>
                
                <Button
                  variant="colored"
                  size="md"
                  text={loading ? "Processing..." : "Confirm Booking"}
                  onClick={handleBooking}
                 
                  className="flex-1 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-md hover:shadow-lg transition-all"
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// Helper component for detail items
function DetailItem({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex justify-between">
      <span className="font-medium text-gray-600">{label}</span>
      <span className="text-gray-900 font-medium">{value}</span>
    </div>
  );
}