import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import apiClient from "../ApiClient";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const BACKEND_URL = import.meta.env.VITE_API_URL;
console.log(BACKEND_URL);

interface inputType {
  email: string;
  password: string;
  InputOtp?: string;
}

interface OtpResponse {
  message: string;
}

export default function Auth() {
  const [currentState, setCurretState] = useState("signup");
  const [email, SetEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [InputOtp, setInputOtp] = useState<string>("");

  const navigate = useNavigate();

const signupMutation = useMutation({
  mutationFn: (inputs: inputType): any => {
    return apiClient.post("/signup", inputs);
  },
  onSuccess: (res:any) => {
    localStorage.setItem("token", res.data.token);
    console.log(res.data.message);
    toast.success("Sign up successful");
    navigate("/home");
  },
  onError: (error: any) => {
    const message =
      error?.response?.data?.message || "Something went wrong. Please try again";
    toast.error(message);
  },
});


  const loginMutation = useMutation({
    mutationFn: (inputs: inputType): any => {
      return apiClient.post("/login", inputs);
    },
    onSuccess: (res:any) => {
      localStorage.setItem("token", res.data.token);
      console.log(res.data.message);
      toast.success("login successfull");
      navigate("/home");
    },
    onError: (res: any) => {
      console.log(res);
      toast.error(res.response.data.message);
    },
  });
  function handleAuth() {
    if (currentState === "signup") {
      signupMutation.mutate({ email, password, InputOtp });
    } else {
      loginMutation.mutate({ email, password });
    }
  }

  const verificationMutation = useMutation({
    mutationFn: (inputs: any): any => {
      return apiClient.post("/sendotp", inputs);
    },
    onSuccess: (res: OtpResponse) => {
      toast.success("Otp Sent to your Email");
      console.log(res);
    },
  });

  function handleVerification() {
    verificationMutation.mutate({ email });
  }

  const handleMessage = (event:any) => {
    if (event.origin !== BACKEND_URL) return; 
   try{
     const { token } = event.data;
    if (token) {
      localStorage.setItem("token", token);
      toast.success("Google login successful!");
      navigate("/home");
    }
   }
   catch(error){
    toast.error("something went wrong");
    console.log(error);
   }
   finally{
window.removeEventListener("message",handleMessage);
   }
  }

function handleGoogleLogin() {
   window.open(
  `${BACKEND_URL}/auth/google`,
    "GoogleLogin",
    "width=500,height=600"
  );

  
  
  window.addEventListener("message", handleMessage);
}


  return (
    <div className="flex justify-center items-center h-screen overflow-none">
      <div className="bg-white/15 w-[28rem] rounded-3xl shadow-lg p-8 flex flex-col backdrop-blur-lg mb-26">
        <h2 className="text-2xl font-semibold text-center mb-6">
          {currentState === "signup" ? "Sign Up" : "Login"}
        </h2>

<form
  onSubmit={(e) => {
    e.preventDefault();
    handleAuth();
  }}
>
  <input
    type="email"
    value={email}
    placeholder="Enter your email"
    name="email"
    className="w-full p-4 mb-4 rounded-lg outline-none border"
    onChange={(e) => SetEmail(e.target.value)}
    required
    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
    title="Enter a valid email address"
  />

  <input
    type="password"
    value={password}
    placeholder="Enter your password"
    name="password"
    className="w-full p-4 mb-4 rounded-lg outline-none border"
    onChange={(e) => setPassword(e.target.value)}
    required
    pattern="^(?=.*[a-z])(?=.*[A-Z]).{8,}$"
    title="Password must be at least 8 characters long and include at least one uppercase and one lowercase letter"
  />

  {currentState === "signup" && (
    <div className="flex gap-3 mb-6">
      <input
        type="text"
        placeholder="OTP"
        value={InputOtp}
        className="flex-1 p-4 rounded-lg outline-none border"
        onChange={(e) => setInputOtp(e.target.value)}
        required
        pattern="\d{6}"
        title="Enter the 6-digit OTP"
      />
      <button
        className="px-4 rounded-lg border bg-[#B19EEF] cursor-pointer"
        type="button"
        onClick={handleVerification}
      >
        Get OTP
      </button>
    </div>
  )}

  <button
    className="w-full p-4 rounded-lg cursor-pointer border mb-4 bg-gradient-to-r  from-[#B19EEF] to-[#6f23cb]"
    type="submit"
  >
    {signupMutation.isPending || loginMutation.isPending
      ? "loading..."
      : currentState === "signup"
      ? "Sign Up"
      : "Login"}
  </button>
</form>

        <div className="flex items-center gap-2 my-4">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="text-sm text-gray-600">or</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        <button className="w-full p-4 rounded-lg border bg-gray-300 hover:bg-gray-400 flex items-center justify-center gap-2 cursor-pointer"
        onClick={handleGoogleLogin}
        >
          <img
            src="https://www.svgrepo.com/show/355037/google.svg"
            alt="Google"
            className="w-5 h-5"
          />
          Continue with Google
        </button>

        {currentState === "signup" ? (
          <p className="text-sm text-center mt-6 text-white">
            Already have an account?{" "}
            <span
              className="cursor-pointer"
              onClick={() => setCurretState("login")}
            >
              Login
            </span>
          </p>
        ) : (
          <p className="text-sm text-center mt-6 text-white">
            Don't have an account?{" "}
            <span
              className="cursor-pointer"
              onClick={() => setCurretState("signup")}
            >
              Signup
            </span>
          </p>
        )}
      </div>
    </div>
  );
}
