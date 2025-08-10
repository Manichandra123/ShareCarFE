import { useEffect, useState } from "react";
import Card from "../components/Card";
import axios from "axios";
import NavBar from "../components/navbar";
import    { useNavigate }  from "react-router-dom";
 

export default function BookRide() {
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const getRides = async () => {
      const backendUrl = import.meta.env.VITE_Backend_Url || "https://sharecar-3rlo.onrender.com";
      try {
        const res = await axios.get(`${backendUrl}/api/ride/rides`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (res.status === 200) {
          setRides(res.data.rides || []);
        }
      } catch (error) {
        setError("Error fetching rides.");
        console.error("Error fetching rides:", error);
      } finally {
        setLoading(false);
      }
    };
    getRides();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <NavBar />
      <main className="flex-1 flex flex-col items-center px-2 py-6 mt-10">
        <h1 className="text-3xl font-bold mb-6 text-gray-500">
          Available Rides
        </h1>
        <div className="w-full max-w-6xl">
          {loading && (
            <div className="text-center py-8 text-lg text-gray-600">
              Loading rides...
            </div>
          )}
          {error && (
            <div className="text-red-600 text-center py-8 text-lg">{error}</div>
          )}
          {!loading && !error && rides.length === 0 && (
            <div className="text-center py-8 text-lg text-gray-600">
              No rides available.
            </div>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {rides.map((ride: any) => (
              <Card
                key={ride._id}
                fare={ride.fare}
                from={ride.startfrom}
                to={ride.endAt}
                carType={ride.cartype}
                mobileNo={ride.mobileNo}
                date={ride.date}
                seats={ride.seats}
        
              onBook={() => {
                  
                  navigate('/booknow', {
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
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
