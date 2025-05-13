import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginWithEmail } from "@/lib/firebase";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { onAuthStateChange } from "@/lib/firebase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Check if user is already logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChange((user) => {
      if (user) {
        navigate("/cms");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { user, error } = await loginWithEmail(email, password);

    if (error) {
      setError(error);
      setLoading(false);
      return;
    }

    if (user) {
      navigate("/cms");
    }
  };

  return (
    <div className="min-h-screen bg-[#0c162d] font-inter text-white">
      <Navbar />

      <main className="container mx-auto px-4 min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="w-full max-w-md animate-fade-in">
          <div className="bg-gray-800 rounded-xl p-8 shadow-2xl shadow-black/20 border border-white/10">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                Welcome Back
              </h1>
              <p className="text-white/60">Sign in to access the CMS</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-red-400 text-sm">
                  {error}
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-2 text-white/80"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-gray-700/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-neonBlue focus:ring-2 focus:ring-neonBlue/20 transition-all duration-300"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium mb-2 text-white/80"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-gray-700/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-neonBlue focus:ring-2 focus:ring-neonBlue/20 transition-all duration-300"
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-neonBlue hover:text-neonBlue/80 transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-neonBlue hover:bg-neonBlue/90 text-darkBlue px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-neonBlue/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Login;
