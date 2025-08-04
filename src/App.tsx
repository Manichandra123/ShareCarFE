import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signin from "./pages/signin";
import Landing from "./pages/landing";
import PostRide from "./pages/postRide";
import SignUP from "./pages/signup";

 

 
function App() {
  return (
    <>
       <BrowserRouter>
      <Routes>
        
        <Route path="/signin" element={<Signin />} />
        <Route path="/" element={<Landing/>} />
        <Route path="/postride" element={<PostRide/>} />
        <Route path="/signup" element={<SignUP/>} />
      
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
