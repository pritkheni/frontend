import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="w-full h-screen bg-slate-200 flex justify-center items-center">
      <div className="w-96 bg-slate-400 rounded-md flex flex-col p-4 gap-4">
        <Link className="p-2 bg-slate-200 rounded-md" to="/product">
          producats
        </Link>
        <Link className="p-2 bg-slate-200 rounded-md" to="/newProducat">
          Add Producat
        </Link>
      </div>
    </div>
  );
}
