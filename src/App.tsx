import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signin from "./pages/signin";
import Landing from "./pages/landing";
import PostRide from "./pages/postRide";
import SignUP from "./pages/signup";
import BookRide from "./pages/bookRide";
import BookNow from "./pages/BookNow";
import MyBookings from "./pages/mybookings";
import BookNow1 from "./pages/booknow1";
 
 

 
function App() {
  return (
    <>
       <BrowserRouter>
      <Routes>
        
        <Route path="/signin" element={<Signin />} />
        <Route path="/" element={<Landing/>} />
        <Route path="/postride" element={<PostRide/>} />
        <Route path="/signup" element={<SignUP/>} />
        <Route path="/bookride" element={<BookRide/>} />
        <Route path="/booknow" element={<BookNow/>} />
        <Route path="/my-bookings" element={<MyBookings/>} />
        <Route path="/booknow1" element={<BookNow1/>}/>
         
      
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
