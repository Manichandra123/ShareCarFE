import {
  Car,
  CarIcon,
  CarTaxiFront,
  Check,
} from "lucide-react";
import NavBar from "../components/navbar";
import InputBox from "../components/inputBox";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Landing() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

 

  function handleFindNow() {
    setError("");
    if (!from.trim() || !to.trim() || !date) {
      setError("Please fill in all fields");
      return;
    }
    // good place to pass query params or persist search
    navigate("/bookride");
  }

 

  return (
    <>
  
      <div className="fixed mt-8 inset-x-0 top-4 z-50 flex items-center justify-between px-2">
        <NavBar />
      </div>

   
      <header className="relative min-h-[72vh] flex items-center">
        

 
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-8">
            <div className="w-full lg:w-1/2 text-left mt-12 lg:mt-24">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
                Driving solo? <span className="text-indigo-600">Share the ride.</span>
              </h1>
              <p className="mt-4 text-gray-600 max-w-xl">
                Find co-riders, split costs, and make new connections.
                Seamless bookings, vetted drivers, and flexible trips.
              </p>

              <div className="mt-8 flex gap-3">
                <Button
                  variant="colored"
                  size="md"
                  text="Find Co-riders"
                  endIcon={<CarIcon />}
                  onClick={() => navigate("/signin")}
                />
                <Button
                  variant="simple"
                  size="md"
                  text="How it works"
                  onClick={() =>
                    document
                      .getElementById("how-it-works")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                />
              </div>

 
              <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-md">
                <li className="flex items-center gap-3 text-gray-700">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50">
                    <Check size={16} className="text-indigo-600" />
                  </span>
                  Affordable rides & verified drivers
                </li>
                <li className="flex items-center gap-3 text-gray-700">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50">
                    <Check size={16} className="text-indigo-600" />
                  </span>
                  Easy bookings & flexible scheduling
                </li>
              </ul>
            </div>

            {/* Search card */}
            <div className="w-full lg:w-[420px]">
              <div className="backdrop-blur-md bg-white/70 border border-gray-200 rounded-2xl shadow-lg p-6 sm:p-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <h2 className="text-xl font-semibold flex items-center gap-2">
                      Welcome to ShareCar <Car size={18} />
                    </h2>
                  </div>
                  <span className="text-sm text-gray-500">Ride • Safe • Smart</span>
                </div>

                <p className="mt-3 text-sm text-gray-600">
                  Book quickly — find rides near you or post your trip to share the cost.
                </p>

                <div
                  
                  className="mt-6 space-y-4"
                >
                  <label className="block text-sm font-medium text-gray-700">
                    From
                  </label>
                  <div className="relative">
                    <InputBox
                 
                      onChange={(e) => setFrom(e.target.value)}
                      placeholder="Starting from"
                      type="text"
                      aria-label="From"
                    
                    />
                  
                  </div>

                  <label className="block text-sm font-medium text-gray-700">
                    To
                  </label>
                  <InputBox
                    
                    onChange={(e) => setTo(e.target.value)}
                    placeholder="Traveling to..."
                    type="text"
                    aria-label="To"
                  />

                  <label className="block text-sm font-medium text-gray-700">
                    Date
                  </label>
                  <InputBox
                    
                    onChange={(e) => setDate(e.target.value)}
                    placeholder="Select date"
                    type="date"
                    aria-label="Date"
                
                  />

                  {error && (
                    <p className="text-sm text-red-600 mt-1" role="alert">
                      {error}
                    </p>
                  )}

                  <div className="flex items-center justify-end">
                    <Button
                      variant="colored"
                      text="Find Now"
                      size="md"
                      endIcon={<CarTaxiFront />}
                      onClick={handleFindNow}
                      
                    />
                  </div>
                </div>
              </div>

 
              <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
                <span className="flex"> <Check className="text-green-700"/> Verified drivers</span>
                <span className="flex"><Check className="text-green-700"/> 24/7 support</span>
              </div>
            </div>
          </div>
        </div>
      </header>

 
      <section id="how-it-works" className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 border rounded-xl shadow-sm">
              <h3 className="font-semibold text-lg">Post a ride</h3>
              <p className="mt-2 text-gray-600">
                Drivers can post their route and available seats in seconds.
              </p>
            </div>
            <div className="p-6 border rounded-xl shadow-sm">
              <h3 className="font-semibold text-lg">Find a trip</h3>
              <p className="mt-2 text-gray-600">
                Enter origin, destination and date — filter by preferences.
              </p>
            </div>
            <div className="p-6 border rounded-xl shadow-sm">
              <h3 className="font-semibold text-lg">Connect & ride</h3>
              <p className="mt-2 text-gray-600">
                Chat with co-riders, confirm pickup points and enjoy the trip.
              </p>
            </div>
          </div>
        </div>
      </section>

 
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white  ">
        <div className="container mx-auto px-6 max-w-4xl text-center  ">
          <h2 className="text-3xl font-extrabold">Join the RideShare Community</h2>
          <p className="mt-3 text-indigo-100">
            Connect with drivers and passengers in your area. Save money and reduce your carbon footprint.
          </p>
          <div className="mt-6 flex justify-center items-center">
            <Button
              variant="colored"
              text="Get Started"
              size="md"
              onClick={() => navigate("/signup")}
            />
          </div>
        </div>
      </section>
            {/* Features / Why choose us */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 max-w-6xl text-center">
          <h2 className="text-3xl font-bold">Why Choose ShareCar?</h2>
          <p className="mt-3 text-gray-600">
            We make every ride safe, affordable, and enjoyable.
          </p>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            <div className="p-6 bg-white border rounded-xl shadow-sm">
              <CarIcon className="mx-auto text-indigo-600" size={28} />
              <h3 className="mt-4 font-semibold">Affordable</h3>
              <p className="mt-2 text-gray-600 text-sm">
                Share costs with riders and save money every trip.
              </p>
            </div>
            <div className="p-6 bg-white border rounded-xl shadow-sm">
              <Check className="mx-auto text-green-600" size={28} />
              <h3 className="mt-4 font-semibold">Safe & Verified</h3>
              <p className="mt-2 text-gray-600 text-sm">
                Verified drivers and riders, with 24/7 support.
              </p>
            </div>
            <div className="p-6 bg-white border rounded-xl shadow-sm">
              <CarTaxiFront className="mx-auto text-indigo-600" size={28} />
              <h3 className="mt-4 font-semibold">Flexible</h3>
              <p className="mt-2 text-gray-600 text-sm">
                Choose trips that match your time and preferences.
              </p>
            </div>
          </div>
        </div>
      </section>

 
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-5xl text-center">
          <h2 className="text-3xl font-bold">What Riders Say</h2>
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            <div className="p-6 border rounded-xl shadow-sm">
              <p className="text-gray-600">
                "I’ve saved so much on my daily commute. Easy to use and always safe!"
              </p>
              <span className="mt-3 block font-semibold">– Aditi, Bangalore</span>
            </div>
            <div className="p-6 border rounded-xl shadow-sm">
              <p className="text-gray-600">
                "Great way to meet new people while traveling between cities."
              </p>
              <span className="mt-3 block font-semibold">– Rahul, Nirmal</span>
            </div>
             <div className="p-6 border rounded-xl shadow-sm">
              <p className="text-gray-600">
                "Great way to meet new people while traveling between cities."
              </p>
              <span className="mt-3 block font-semibold">– Mike, Hyderabad</span>
            </div>
          </div>
        </div>
      </section>
 
      <section className="py-20 bg-indigo-50 text-center">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-3xl font-bold text-indigo-700">
            Ready to share your next ride?
          </h2>
          <p className="mt-3 text-gray-600">
            Join thousands of riders already saving money and traveling smarter.
          </p>
          <div className="mt-6 flex justify-center items-center">
            <Button
              variant="colored"
              text="Start Now"
              size="md"
              onClick={() => navigate("/signup")}
            />
          </div>
        </div>
      </section>


      {/* Footer */}
      <footer className="bg-white border-t mt-6">
        <div className="container mx-auto px-6 py-8 text-center">
          <p className="text-sm text-gray-600">&copy; 2025 ShareCar. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
