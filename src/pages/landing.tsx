import {   ArrowRightLeft,  Car,   CarIcon, CarTaxiFront,     } from "lucide-react";
import NavBar from "../components/navbar";
import InputBox from "../components/inputBox";
import Button from "../components/Button";
import {  useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Landing() {
  const [From, setFrom] = useState("");
  const [To, setTo] = useState("");
  const [Date, setDate] = useState("");
    const navigate = useNavigate();
    function handleFindNow() {
       if (!From || !To || !Date ) {
             alert("Please fill in all fields");
            return;
        }
        navigate("/bookride");
    }
  return (
    <>
       <div className="fixed w-full bg-transparent p-2 flex justify-between items-center z-50 mt-8">
   <NavBar/>
</div>
      <div className="relative">
        <div className="relative h-screen w-full flex flex-row items-center justify-center ">
          <img
            className=" "
            src="https://plus.unsplash.com/premium_vector-1737114743406-412cb885c90b?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzF8fGNhcnN8ZW58MHx8MHx8fDA%3D"
            alt="hero img"
          />
        </div>
       
        <div className="absolute inset-0 flex items-center justify-end  ">
          <div className="  bg-gray-50 p-8 rounded-lg shadow-lg max-w-md w-full mr-8 border border-gray-400">
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
            <div className="flex flex-col"> 
            <h3>From</h3>
            <InputBox
              onChange={(e)=>setFrom(e.target.value)}
             placeholder="Starting from "type="text" />
          
            <ArrowRightLeft className="rotate-90 my-2 justify-center items-center " />
              <h3>To</h3>
               <InputBox
                onChange={(e) => setTo(e.target.value)}
                placeholder="Traveling To.. "type="text" />
               <h3>Date</h3>
               <InputBox
                onChange={(e) => setDate(e.target.value)}
                placeholder="Select Date" type="date" />
            </div>
            <div className="flex items-center justify-end mt-4">
                <Button variant="colored" text="Find Now" size="md" endIcon={<CarTaxiFront/>} onClick={()=>{handleFindNow()}}/>
            </div>
          </div>
        </div>
      </div>
       
      {/* heronext */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-gray-50 to-white">
        
        <div className="max-w-6xl mx-auto px-8 text-left">
       
            <div className="space-y-6">
              <h1 className="text-7xl md:text-8xl font-black leading-tight tracking-tight">
                Driving solo? Find co-riders and split the cost
                
              </h1>
              <h2 className="text-3xl md:text-4xl font-light text-gray-600 mt-8">
                Turn your empty seats into earnings
              </h2>
              <div className="flex gap-4 mt-12">
                <Button variant="colored" size="md" text="Find Co-"  endIcon={<CarIcon/>} onClick={()=>navigate('/signin')}/>
                
              </div>
            </div>
            
        </div>
         
         
      </section>
         {/* join  */}        
         <section className="min-h-screen flex items-center justify-center bg-black text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-gray-900 to-black opacity-90"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-8 text-center">
        
            <div className="space-y-8">
              <h1 className="text-6xl font-black mb-6">
                Join the RideShare
                <span className="block text-gray-300">Community</span>
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                Connect with drivers and passengers in your area. Build relationships, save money, and reduce your carbon footprint.
              </p>
              <Button variant="simple" size="xl" text="Get Started" 
                onClick={() => console.log("Get Started Clicked")} />
            </div>
           
        </div>
      </section>
       {/* Footer */}
      <footer className="bg-white border-t-2 border-black p-8 text-center">
        <div className="max-w-6xl mx-auto">
          <p className="text-lg font-medium">
            &copy;  2025 RideShare. All rights reserved.
          </p>
        </div>
      </footer>

    </>
  );
}
