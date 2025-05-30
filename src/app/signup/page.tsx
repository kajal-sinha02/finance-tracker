import SignupForm from "@/components/SignupForm";
import Navbar from "@/components/Navbar";

export default function SignupPage() {
  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />
      <SignupForm />
    </div>
  );
}
