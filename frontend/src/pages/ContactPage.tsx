import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail, Send, Phone } from "lucide-react";
import { motion } from "framer-motion";
import LinkdInIcon from "@/utils/LinkdInIcon";
import GithubIcon from "@/utils/GithubIcon";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import apiClient from "@/ApiClient";
import toast from "react-hot-toast";

const ContactPage = () => {

  const [name,setName]  = useState("");
  const [email,setEmail]  = useState("");
  const [message,setMessage]  = useState("");

const sendMessageMutation = useMutation({
  mutationFn: (inputs:{name:string,email:string,message:string}) :any=> {
    return apiClient.post("/contact", inputs);
  },
  onSuccess: () => {
    setName(""); setEmail(""); setMessage("");
    toast.success(" Message sent successfully!");
  },
  onError: () => {
    toast.error(" Failed to send message, try again later.");
  }
});

  function handleSendMessage(){
    sendMessageMutation.mutate({name,email,message});
  }
  return (
    <div className="flex flex-col justify-center items-center min-h-screen px-4 space-y-12">
      {/* Contact Form */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Card className="w-[400px] bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl rounded-2xl">
          <CardContent className="p-6 space-y-6">
            <h1 className="text-2xl font-semibold text-white text-center">
              Get in Touch ✨
            </h1>
            <div className="space-y-4">
              <Input
                placeholder="Your Name"
                className="bg-white/20 text-white placeholder:text-white/60"
                value={name}
                onChange={(e)=>{setName(e.target.value)}}

              />
              <Input
                type="email"
                placeholder="Your Email"
                className="bg-white/20 text-white placeholder:text-white/60"
                 value={email}
                onChange={(e)=>{setEmail(e.target.value)}}
                
              />
              <Textarea
                placeholder="Your Message"
                className="bg-white/20 text-white placeholder:text-white/60"
                 value={message}
                onChange={(e)=>{setMessage(e.target.value)}}
                
              />
              <Button className="w-full bg-gradient-to-r from-purple-500 to-blue-500 cursor-pointer text-white"
              onClick={handleSendMessage}
              >
                <Send className="mr-2 h-4 w-4" /> Send Message
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Contact Options */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
        className="grid grid-cols-2 sm:grid-cols-4 gap-6"
      >
        {/* Email */}
        <motion.a
          whileHover={{ scale: 1.05 }}
          href="mailto:contactanujkurmi@gmail.com"
          className="flex flex-col items-center bg-white/10 p-4 rounded-xl backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition"
        >
          <Mail size={28} />
          <span className="mt-2 text-sm">Email</span>
        </motion.a>

        {/* Phone */}
        <motion.a
          whileHover={{ scale: 1.05 }}
          href="tel:+918319825028"
          className="flex flex-col items-center bg-white/10 p-4 rounded-xl backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition"
        >
          <Phone size={28} />
          <span className="mt-2 text-sm">Phone</span>
        </motion.a>

        {/* LinkedIn */}
        <motion.a
          whileHover={{ scale: 1.05 }}
          href="https://www.linkedin.com/in/anuj-kurmi-4774ab27a"
          target="_blank"
          className="flex flex-col items-center bg-white/10 p-4 rounded-xl backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition"
        >
          <LinkdInIcon/>
          <span className="mt-2 text-sm">LinkdIn</span>
        </motion.a>

        {/* GitHub */}
        <motion.a
          whileHover={{ scale: 1.05 }}
          href="https://github.com/anujbijoria2020"
          target="_blank"
          className="flex flex-col items-center bg-white/10 p-4 rounded-xl backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition"
        >
         <GithubIcon/>
         <span className="mt-2 text-sm">Github</span>
        </motion.a>
      </motion.div>
    </div>
  );
};

export default ContactPage;
