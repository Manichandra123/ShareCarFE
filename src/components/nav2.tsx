import  { useState } from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

export default function NavBar2({
    issigned,
}: {
    issigned?: boolean;
}) {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="fixed w-full bg-transparent p-2 flex justify-between items-center z-50">
            <div onClick={() => navigate("/")} className="cursor-pointer">
                <h2 className="text-2xl ml-4 font-bold">RideShare</h2>
            </div>
            {/* Hamburger for mobile */}
            <div className="md:hidden flex items-center mr-4">
                <button
                    className="focus:outline-none"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                >
                    <svg
                        className="w-8 h-8"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        {menuOpen ? (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        ) : (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 8h16M4 16h16"
                            />
                        )}
                    </svg>
                </button>
            </div>
            {/* Menu for desktop */}
            <div className="hidden md:flex items-center gap-1 ">
                <Button variant="shaded" size="md" text="Home" onClick={() => console.log("Home Clicked")} />
                <Button variant="shaded" size="md" text="BookRide" onClick={() => console.log("About Us Clicked")} />
                <Button variant="shaded" size="md" text="PostRide" onClick={() => {}} />
                {issigned ? (
                    <Button variant="colored" size="md" text="Logout" onClick={() => console.log("Sign Out Clicked")} />
                ) : (
                    <>
                        <Button variant="colored" size="md" text="Sign In" onClick={() => navigate('/signin')} />
                        <Button variant="simple" size="md" text="Sign Up" onClick={() => console.log("Sign Up Clicked")} />
                    </>
                )}
            </div>
            {/* Mobile menu */}
            {menuOpen && (
                <div className="absolute top-16 left-0 w-full bg-white shadow-md flex flex-col items-center    gap-2 py-4 md:hidden">
                    <Button variant="shaded" size="md" text="Home" onClick={() => { setMenuOpen(false); console.log("Home Clicked"); }} />
                    <Button variant="shaded" size="md" text="BookRide" onClick={() => { setMenuOpen(false); console.log("About Us Clicked"); }} />
                    <Button variant="shaded" size="md" text="PostRide" onClick={() => setMenuOpen(false)} />
                    {issigned ? (
                        <Button variant="colored" size="md" text="Logout" onClick={() => { setMenuOpen(false); console.log("Sign Out Clicked"); }} />
                    ) : (
                        <>
                            <Button variant="colored" size="md" text="Sign In" onClick={() => { setMenuOpen(false); navigate('/signin'); }} />
                            <Button variant="simple" size="md" text="Sign Up" onClick={() => { setMenuOpen(false); console.log("Sign Up Clicked"); }} />
                        </>
                    )}
                </div>
            )}
        </nav>
    );
}