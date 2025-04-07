import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "@/config";
// Define user shape
type User = {
  role: number;
  token: string;
  username: string; // ✅ Add this
};

type AuthContextType = {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
};

// Create context
const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => {},
  logout: () => {},
});

// Provider
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  // Restore user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // Login function
  const login = async (username: string, password: string) => {
    try {
      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          username,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();

      const userData: User = {
        token: data.access_token,
  role: data.role,
  username: data.username, // ✅ Add this
      };

localStorage.setItem("user", JSON.stringify(userData));
setUser(userData);

      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);

      // Redirect based on role
      if (data.role === 3) {
        navigate("/admin/dashboard");
      } else if (data.role === 2) {
        navigate("/seller/dashboard");
      } else {
        navigate("/account");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Invalid username or password");
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
export const useAuth = () => useContext(AuthContext);
