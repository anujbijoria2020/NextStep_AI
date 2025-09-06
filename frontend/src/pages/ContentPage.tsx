import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import apiClient from "../ApiClient";

interface ReturnData {
    message:string,
    RoadMapContent:{title:string,
      description:string,
      items:[{title:string,description:string,timeframe:string,
        difficulty:string,
        resources:[string]
      }]
    },
    success:boolean
}

const ContentPage = () => {
  const RoadMapId = useParams().contentId;
  console.log(RoadMapId);

  const { data } = useQuery({
    queryKey: [RoadMapId],
    queryFn: async () => {
      const data = await apiClient.get<ReturnData>(`/roadmap/${RoadMapId}`);
      return data.data.RoadMapContent;
    },
  });

  return (
    <div className="flex flex-col items-center p-6 text-white">
      <div className="text-center max-w-3xl mb-8">
        <h1 className="text-3xl font-bold mb-2">{data?.title}</h1>
        <p className="text-gray-300">{data?.description}</p>
      </div>

      <div className="w-full max-w-4xl flex flex-col gap-6">
        {data?.items.map((step, index) => (
          <div
            key={index}
            className="relative p-6 bg-white/10 border border-white/20 
                       rounded-2xl shadow-lg backdrop-blur-lg 
                       transition hover:scale-[1.02] hover:shadow-2xl"
          >
            <div
              className="absolute -top-3 -left-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white 
                            px-3 py-1 rounded-full text-sm font-semibold shadow-md"
            >
              Step {index + 1}
            </div>

            <h2 className="text-xl font-semibold mb-2">{step.title}</h2>
            <p className="text-gray-300 mb-3">{step.description}</p>

            <div className="flex flex-wrap gap-3 text-sm mb-3">
              <span className="px-3 py-1 bg-blue-500/20 border border-blue-400/40 rounded-full">
                ⏳ {step.timeframe}
              </span>
              <span
                className={`px-3 py-1 rounded-full border ${
                  step.difficulty === "Beginner"
                    ? "bg-green-500/20 border-green-400/40"
                    : step.difficulty === "Intermediate"
                    ? "bg-yellow-500/20 border-yellow-400/40"
                    : "bg-red-500/20 border-red-400/40"
                }`}
              >
                🎯 {step.difficulty}
              </span>
            </div>

            <div>
              <p className="font-medium mb-2">📚 Resources:</p>
              <ul className="list-disc list-inside text-gray-300">
                {step.resources.map((res, i) => (
                  <li key={i} className="hover:text-white cursor-pointer">
                    {res}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContentPage;

// const demoContent = {
//   title: "React.js Frontend Developer Roadmap",
//   description:
//     "A structured 3-month learning path to master React.js and related frontend development skills to become job-ready.",
//   items: [
//     {
//       title: "HTML, CSS, and JavaScript Refresh",
//       description:
//         "Revise core web technologies like semantic HTML, responsive CSS, and modern JavaScript (ES6+ features). Ensure you are comfortable with DOM manipulation and basic problem-solving in JS.",
//       timeframe: "1 week",
//       difficulty: "Beginner",
//       resources: ["MDN Web Docs", "JavaScript.info"],
//     },
//     {
//       title: "Introduction to React",
//       description:
//         "Learn about React concepts: components, JSX, props, and state. Build simple UI components and understand React's declarative nature.",
//       timeframe: "1 week",
//       difficulty: "Beginner",
//       resources: [
//         "React Official Docs (Main Concepts)",
//         "Scrimba React Crash Course",
//       ],
//     },
//     {
//       title: "Hooks and State Management",
//       description:
//         "Deep dive into React Hooks (useState, useEffect, useContext). Learn to manage state across small applications. Understand the difference between local and global state.",
//       timeframe: "2 weeks",
//       difficulty: "Intermediate",
//       resources: ["React Docs - Hooks", "Epic React by Kent C. Dodds"],
//     },
//     {
//       title: "Routing and Navigation",
//       description:
//         "Set up client-side navigation using React Router DOM. Understand nested routes, protected routes, and dynamic parameters.",
//       timeframe: "1 week",
//       difficulty: "Intermediate",
//       resources: [
//         "React Router Official Docs",
//         "FreeCodeCamp React Router Tutorial",
//       ],
//     },
//     {
//       title: "Working with APIs",
//       description:
//         "Learn to fetch and display data from REST APIs using fetch/axios. Handle loading, errors, and conditional rendering.",
//       timeframe: "1 week",
//       difficulty: "Intermediate",
//       resources: [
//         "Axios GitHub Repo",
//         "REST API Crash Course - Traversy Media",
//       ],
//     },
//     {
//       title: "Advanced React Concepts",
//       description:
//         "Understand performance optimization techniques (React.memo, useCallback, useMemo), code-splitting, and lazy loading.",
//       timeframe: "1 week",
//       difficulty: "Advanced",
//       resources: [
//         "React Docs - Optimizing Performance",
//         "Frontend Masters Advanced React",
//       ],
//     },
//     {
//       title: "State Management with Redux / Context",
//       description:
//         "Learn Redux toolkit or advanced Context API patterns for managing complex state across large applications.",
//       timeframe: "2 weeks",
//       difficulty: "Advanced",
//       resources: ["Redux Toolkit Docs", "Redux Essentials Tutorial"],
//     },
//     {
//       title: "Testing React Applications",
//       description:
//         "Write unit and integration tests with Jest and React Testing Library. Learn about snapshot testing and mocking API calls.",
//       timeframe: "1 week",
//       difficulty: "Advanced",
//       resources: ["Testing Library Docs", "Jest Docs"],
//     },
//     {
//       title: "Deployment and Portfolio Project",
//       description:
//         "Build a full React project (e.g., Task Manager, E-Commerce UI). Deploy it on platforms like Netlify, Vercel, or GitHub Pages. Showcase in portfolio.",
//       timeframe: "2 weeks",
//       difficulty: "Intermediate",
//       resources: ["Netlify Deployment Guide", "Vercel Docs"],
//     },
//   ],
// };
