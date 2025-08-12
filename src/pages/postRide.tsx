import { ArrowRightLeft, Car } from "lucide-react";
import NavBar from "../components/navbar";
import InputBox from "../components/inputBox";
import Button from "../components/Button";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";



export default function PostRide() {
    const [start ,setStart] = useState("");
    const [end ,setEnd] = useState("");
    let [date ,setDate] = useState("");
    const [mobile ,setMobile] = useState("");
    const [seats ,setSeats] = useState("");
    const [price ,setPrice] = useState("");
    const [carType ,setCarType] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  
     
     useEffect(() => {
    if (!token) {
      setError("You must be logged in to post a ride.");
      navigate('/signin');
     }
}, [token, navigate]);
     
 
const backendUrl = import.meta.env.VITE_Backend_Url || "https://share-car-fe-w4z6.vercel.app/";
    async function handlePostRide() {
      setError("");
    setSuccess("");
    const token = localStorage.getItem("token");
    console.log("Token:", token);
        if (!start || !end || !date || !mobile || !seats || !price || !carType) {
             setError("Please fill in all fields");
            return;
        }
        const rideData = {
           startfrom: start,
           endAt: end,
           fare:  Number(price),
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
            } 
        } catch (error) {
            setError('Error posting ride:');
        }
    }
  return(
    <>
     <div className="fixed w-full bg-transparent p-2 flex justify-between items-center z-50 mt-8">
       <NavBar/>
    </div>
    <div className="relative"> 
    <div className="relative h-screen w-full flex flex-row items-center justify-center ">
          <img
            className=" "
            src="https://images.unsplash.com/vector-1743702228669-15c868db27e6?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHdlYnNpdGUlMjBjYXIlMjBiYWNrZ3JvdW5kfGVufDB8fDB8fHww"
            alt="hero img"
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center  ">
          <div className="bg-gray-50   backdrop-blur-md p-8 rounded-lg shadow-lg max-w-md w-full mr-8 border border-gray-400">
            <h2 className="text-2xl items-center  gap-2 flex font-bold mb-4">
              Welcome to ShareCar 
              <span className="text-black">
                
                <Car /> 
              </span> 
            </h2>
            <p className="text-gray-700 mb-4">
              Experience seamless rides with our user-friendly platform. Book
              your ride now!
            </p>
            {error && (
              <div className="mb-2 text-red-600 text-center text-sm font-medium">{error}</div>
            )}
            {success && (
              <div className="mb-2 text-green-600 text-center text-sm font-medium">{success}</div>
            )}
            <div className="flex flex-col"> 
            <h3>From</h3>
            <InputBox 
            onChange={(e) => setStart(e.target.value)}
            placeholder="Starting from "type="text" />
          
            <ArrowRightLeft className="rotate-90 my-2 justify-center items-center " />
              <h3>To</h3>
               <InputBox
                onChange={(e) => setEnd(e.target.value)}
                placeholder="Traveling To.. "type="text" />
               <h3>Date</h3>
               <InputBox
                onChange={(e) => setDate(e.target.value)}
                placeholder="Select Date" type="date" />
               <h3>Mobile No</h3>
               <InputBox
                onChange={(e) => setMobile(e.target.value)}
                placeholder="Enter Mobile No" type="tel" />
               <h3>Seats Available</h3>
               <InputBox
                onChange={(e) => setSeats(e.target.value)}
                placeholder="Enter Seats Available" type="number" />
               <h3>Price</h3>
               <InputBox 
                onChange={(e) => setPrice(e.target.value)}
               placeholder="Enter Price" type="number" />
               <h3>Car Type</h3>
               <InputBox
                onChange={(e) => setCarType(e.target.value)}
                placeholder="Enter Car Type" type="text" />
            </div>
            <div className="flex items-center justify-end mt-4">
                <Button variant="colored" text="Post" size="md" endIcon={<Car/>} onClick={()=>{handlePostRide()}}/>
            </div>
          </div>
        </div>

    </div>
    </>
  )
}