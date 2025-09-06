import { useQuery } from "@tanstack/react-query";
import apiClient from "../ApiClient"; // make sure this points to your axios instance
import { useNavigate } from "react-router-dom";

interface Roadmap {
  _id: string;
  title: string;
  description: string;
  createdAt?: string;
}

export const Recents = () => {
  const navigate = useNavigate();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["roadmaps"],
    queryFn: async () => {
      const res = await apiClient.get<{ roadmaps: Roadmap[] }>("/getAllRoadMaps");
      return res.data.roadmaps;
    },
    staleTime:10000
  });

  if (isLoading) {
    return <p className="text-white text-center">Loading roadmaps...</p>;
  }

  if (isError) {
    return <p className="text-red-500 text-center">Error loading roadmaps</p>;
  }

  return (
    <div className="flex justify-center">
      <div className="flex flex-col gap-4 mt-5">
        {data?.map((card) => (
          <div
            key={card._id}
            className="p-2 sm:min-w-150 md:max-w-200 xl:min-w-280"
            onClick={() => navigate(`/recents/${card._id}`)}
          >
            <div className="bg-white/10 border border-white/20 shadow-2xl backdrop-blur-2xl rounded-2xl min-h-30 cursor-pointer transition hover:scale-[1.02] hover:shadow-3xl">
              <div className="font-semibold m-2 p-6 text-2xl text-white">
                {card.title}
                <div className="text-sm text-white/80 font-light p-2">
                  {card.description}
                </div>
              </div>
              <div className="text-sm text-gray-200 italic text-end m-3">
                {card.createdAt
                  ? new Date(card.createdAt).toLocaleDateString()
                  : "No Date"}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
