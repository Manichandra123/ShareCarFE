import Button from "./Button";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const navigate = useNavigate();
  return (
    <div className="fixed w-full bg-transparent p-2 flex justify-between items-center">
      <div
        onClick={() => navigate("/")}
        className="cursor-pointer"
      >
        <h2 className="text-2xl ml-4 font-bold">
          <span className="text-gray-500">Share</span>Car
        </h2>
      </div>
      <div className="flex items-center gap-1">
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
          onClick={() => navigate("/bookride")}
        />
        <Button
          variant="shaded"
          size="md"
          text="PostRide"
          onClick={() => navigate("/postride")}
        />
      </div>
      <div className="flex items-center flex-row">
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
      </div>
    </div>
  );
}
