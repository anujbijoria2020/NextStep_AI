import { useState } from "react";
import SplitText from "../utils/SplitText";
import { useMutation } from "@tanstack/react-query";
import apiClient from "../ApiClient";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


interface GenerateType{
  topic:string,
  goal:string
}

const HomePage = () => {
  const [topic, setTopic] = useState("");
  const [goal, setGoal] = useState("");
  
  const navigate = useNavigate();


  const GenerateMutation = useMutation({
    mutationFn: (input:GenerateType) : any =>{
      return  apiClient.post("/generate",input);
    },
    onError:()=>{
      toast.error("Something Went Wrong!!")
    },
    onSuccess:(res:any)=>{
      console.log(res);
      const id = res.data.RoadMapId;
      navigate(`/recents/${id}`)
    }
  })

  function handleGenerate() {
    GenerateMutation.mutate({topic,goal})
  }

  return (
    <div>
      {/* Hero Section */}
      <div className="flex justify-center pt-20">
        <div className="p-4">
          <div className="text-4xl bg-white/20 rounded-sm p-4 text-center text-black font-semibold backdrop-blur-md shadow-md">
            Welcome To{" "}
            <span className="text-6xl text-white/30 font-bold">
              NextStep AI
            </span>
          </div>
          <SplitText
            text="Generate Your Roadmap from a prompt..."
            disabled={false}
            speed={10}
          />
        </div>
      </div>

      <div className="flex justify-center pt-10">
        <div
          className="p-6 bg-white/5 border border-white/20 
                       rounded-2xl shadow-lg backdrop-blur-lg  sm:w-[70%] w-[90%]  flex flex-col space-y-4"
        >
          <input
            type="text"
            value={topic}
            placeholder="Enter topic..."
            className="w-full px-4 py-3 rounded-lg bg-white/0 text-white placeholder-gray-300 border border-white/20 focus:outline-none  transition-all"
            onChange={(e) => {
              setTopic(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Enter goal..."
            value={goal}
            className="w-full px-4 py-3 rounded-lg bg-white/0 text-white placeholder-gray-300 border border-white/20 focus:outline-none  transition-all"
            onChange={(e) => {
              setGoal(e.target.value);
            }}
          />
      <button
  className="mt-4 w-full sm:w-1/2 md:w-1/3 self-center 
             bg-gradient-to-r from-[#7CFF67] via-[#B19EEF] to-[#5227FF] 
             text-black font-semibold py-3 rounded-lg shadow-md 
             transition-all duration-300 ease-in-out 
             hover:scale-105 hover:shadow-[0_0_25px_rgba(178,158,239,0.3)] 
             cursor-pointer text-center"
  onClick={handleGenerate}
>
  {GenerateMutation.isPending ? "Loading..." : "Generate"}
</button>

        </div>
      </div>
    </div>
  );
};

export default HomePage;
