import useAuth from "../hooks/Auth";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="fixed w-full bg-transparent p-2 flex flex-col sm:flex-row justify-between items-center z-50 bg-white/10 backdrop-blur-md rounded-xl">
      <div
        onClick={() => navigate("/")}
        className="cursor-pointer mb-2 sm:mb-0"
      >
        <h2 className="text-2xl ml-4 font-bold">
          <span className="text-gray-500">Share</span>Car
        </h2>
      </div>
      <div className="flex items-center gap-1 mb-2 sm:mb-0">
        <Button
          variant="shaded"
          size="md"
          text="Home"
          onClick={() => navigate("/")}
        />
        <Button
          variant="shaded"
          size="md"
          text="BookRide"
          onClick={() => navigate("/booknow1")}
        />
        <Button
          variant="shaded"
          size="md"
          text="PostRide"
          onClick={() => navigate("/postride")}
        />
      </div>
      <div className="flex items-center gap-1">
        {isLoggedIn() ? (
          <>
           <Button
            variant="colored"
            size="md"
            text="Logout"
            onClick={()=>{logout()}}
          />
          </>
        ) : ( 
          <> 
        <Button
              variant="colored"
              size="md"
              text="Sign In"
              onClick={() => navigate("/signin")}
            />
            <Button
              variant="simple"
              size="md"
              text="Sign Up"
              onClick={() => navigate("/signup")}
            />
            </>
          
        )}
      </div>
    </div>
  );
}
