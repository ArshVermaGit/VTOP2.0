import { LoginBox } from "@/components/auth/LoginBox";

export default function LoginPage() {
  return (
    <main className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-slate-50 selection:bg-blue-500/30">
        
      {/* Professional Portal Canvas */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        {/* Subtle Gradient Glow */}
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-blue-100/50 rounded-full blur-[120px]" />
        
        {/* Clean Grid Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />
      </div>

      <div className="relative z-10 w-full max-w-5xl px-6 py-12">
        <LoginBox />
      </div>
    </main>
  );
}
