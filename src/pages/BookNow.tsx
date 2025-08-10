import  { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import NavBar from '../components/navbar';
import Button from '../components/Button';
import axios from 'axios';
import InputBox from '../components/inputBox';

export default function BookNow() {
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
    // Get the ride data from navigation state
    if (location.state) {
      setRideData(location.state as RideData);
    } else {
      // If no state data, redirect back to rides page
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
      const backendUrl = import.meta.env.VITE_Backend_Url || "https://sharecar-3rlo.onrender.com";
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
      navigate('/my-bookings'); // or wherever you want to redirect after booking
    } catch (error: any) {
      console.error('Booking error:', error);
      const message = error?.response?.data?.message || 'Booking failed. Please try again.';
      alert(`Booking failed: ${message}`);
    } finally {
      setLoading(false);
    }
  };


  // Show loading or redirect message if no ride data
  if (!rideData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-gray-600">Loading ride details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <NavBar />
      <main className="flex-1 flex flex-col items-center px-4 py-6 mt-10">
        <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
            Confirm Your Booking
          </h1>

           
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Ride Details</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="font-medium text-gray-600">From:</span>
                <span className="text-gray-900">{rideData?.from}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-600">To:</span>
                <span className="text-gray-900">{rideData?.to}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-600">Date:</span>
                <span className="text-gray-900">
                  {rideData ? new Date(rideData.date).toLocaleDateString() : ''}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-600">Car Type:</span>
                <span className="text-gray-900">{rideData?.carType}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-600">Available Seats:</span>
                <span className="text-gray-900">{rideData?.seats}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-600">Contact:</span>
                <span className="text-gray-900">{rideData?.mobileNo}</span>
              </div>
              <div className="flex justify-between border-t pt-3">
                <span className="font-bold text-gray-800">Fare per person:</span>
                <span className="font-bold text-green-600 text-lg">₹{rideData?.fare}</span>
              </div>
            </div>
          </div>

          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Number of Passengers
            </label>
             <InputBox
             onChange={(e) => setPassengerCount(Number(e.target.value))}
              type='text' placeholder='Enter Number of Passengers'/>
          </div>
           <div className='mb-6'>
           <label className="block text-sm font-medium text-gray-700 mb-2">
             Passengers Mobile No:
            </label>
            <InputBox
              type='tel'
              placeholder='Enter Mobile No'
              onChange={(e) => setMobileNo(e.target.value)}
            />
           </div>
   
          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <div className="flex justify-between items-center">
              <span className="text-lg font-medium text-gray-800">Total Amount:</span>
              <span className="text-2xl font-bold text-blue-600">
                ₹{(rideData?.fare || 0) * passengerCount}
              </span>
            </div>
            <p className="text-sm text-gray-600 mt-1">
              {passengerCount} × ₹{rideData?.fare || 0} per person
            </p>
          </div>

           
          <div className="flex gap-4">
            <button
              onClick={() => navigate(-1)}
              className="flex-1 py-3 px-4 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Go Back
            </button>
            <Button
              variant="colored"
              size="md"
              text={loading ? "Booking..." : "Confirm Booking"}
              onClick={handleBooking}
              
              className="flex-1"
            />
          </div>
        </div>
      </main>
    </div>
  );
}