import { Outlet } from "react-router-dom";
import Background from "./utils/BackGround";
import { NavBar } from "./components/NavBar";
export default function Layout() {
  return (
    <div className="overflow-none min-h-screen relative">
      <div className="absolute inset-0 -z-10 bg-black">
        <Background
          colorStops={["#7CFF67", "#B19EEF", "#5227FF"]}
          blend={0.2}
          amplitude={0.7}
          speed={0.3}
        />
      </div>

      <div className="relative z-10 text- p-10">
        <NavBar/>
        <Outlet />
      </div>
    </div>
  );
}
