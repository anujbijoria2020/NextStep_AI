import { useNavigate } from "react-router-dom";
import CardSwap, { Card } from "../components/CardSwap";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen w-full flex flex-col text-white px-6 overflow-hidden">
      <div className="absolute top-0 left-0 w-full flex justify-between items-center p-6">
        <h1
          onClick={() => navigate("/")}
          className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-slate-800 via-slate-900 to-black bg-clip-text text-transparent animate-pulse cursor-pointer"
        >
          NextStep AI
        </h1>
        <button
          onClick={() => navigate("/auth/login")}
          className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl cursor-pointer"
        >
          Sign Up
        </button>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between flex-1 mt-20 md:mt-0">
        <div className="flex flex-col items-center md:items-start justify-center text-center md:text-left md:w-1/2">
          <h2 className="text-3xl md:text-5xl font-extrabold mt-4">
           Generate Your Learning <span className="text-purple-400">Roadmaps</span> in One Place
          </h2>
          <p className="mt-4 text-base md:text-lg max-w-md">
            Instantly generate custom roadmaps, revisit your past creations, and stay on track — all in one app.
          </p>
          <div className="mt-6 flex gap-4">
            <button
              onClick={() => navigate("/auth/login")}
              className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl cursor-pointer"
            >
              Get Started
            </button>
            <button
              onClick={() => navigate("/contact")}
              className="px-6 py-3 border border-white text-white rounded-xl"
            >
              Contact
            </button>
          </div>
        </div>

        <div className="flex justify-center items-center mt-10 md:mt-0 md:w-1/2">
                    <CardSwap
              cardDistance={80}
              verticalDistance={90}
              delay={3000}
              pauseOnHover={false}
            >
              <Card>
                <div
                  className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-lg cursor-pointer hover:scale-105 transition"
                >
                  <h3 className="text-xl font-bold">Generate Roadmap</h3>
                  <p className="text-gray-200">
                    Create personalized learning paths instantly with AI.
                  </p>
                </div>
              </Card>

              <Card>
                <div
                  className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-lg cursor-pointer hover:scale-105 transition"
                >
                  <h3 className="text-xl font-bold">Recent Creations</h3>
                  <p className="text-gray-200">
                    Quickly access and manage your previously generated
                    roadmaps.
                  </p>
                </div>
              </Card>

              <Card>
                <div
                  onClick={() => navigate("/contact")}
                  className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-lg cursor-pointer hover:scale-105 transition"
                >
                  <h3 className="text-xl font-bold">Contact & Support</h3>
                  <p className="text-gray-200">
                    Reach out anytime for help or suggestions.
                  </p>
                </div>
              </Card>
            </CardSwap>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
