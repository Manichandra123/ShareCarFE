import Button from "./Button";

interface cardProps {
  from: string;
  to: string;
  fare: number;
  seats: string;
  date: string;
  carType: string;
  mobileNo: string;
 
  onBook?: () => void; // Optional handler for booking
}

export default function Card(props: cardProps) {
  // Format date for display
  const formattedDate = props.date
    ? new Date(props.date).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : props.date;

  return (
    <div className="flex flex-col bg-white shadow-lg rounded-xl p-6 m-3 border border-gray-200 transition-transform hover:scale-105 hover:shadow-xl h-[200px]">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-xl font-bold text-blue-700">
          {props.from} <span className="text-gray-400">→</span> {props.to}
        </h3>
        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
          ₹{props.fare}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-gray-700 text-sm mb-4">
        <div>
          <span className="font-medium">Seats:</span> {props.seats}
        </div>
        <div>
          <span className="font-medium">Date:</span> {formattedDate}
        </div>
        <div>
          <span className="font-medium">Car Type:</span> {props.carType}
        </div>
        <div>
          <span className="font-medium">Mobile:</span> {props.mobileNo}
        </div>
      </div>
       <Button
        variant="colored"
        text="Book Now"
        size="md"
        onClick={props.onBook}
      />
       
    </div>
  );
}