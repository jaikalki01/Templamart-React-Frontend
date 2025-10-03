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
  username: string;
  expiry: number; // ✅ add expiry time in ms
};

type AuthContextType = {
  isAuthenticated: boolean;
  currentUser: User | null;
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
};

// Create context
const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  currentUser: null,
  user: null,
  login: async () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  // Auto logout when token expires
  const scheduleLogout = (expiry: number) => {
    const timeout = expiry - Date.now();
    if (timeout > 0) {
      setTimeout(() => {
        logout();
      }, timeout);
    } else {
      logout();
    }
  };

  // Restore user from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const parsedUser: User = JSON.parse(savedUser);
      if (Date.now() < parsedUser.expiry) {
        setUser(parsedUser);
        scheduleLogout(parsedUser.expiry);
      } else {
        logout();
      }
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

      // decode JWT expiry (standard `exp` claim)
      const payload = JSON.parse(atob(data.access_token.split(".")[1]));
      const expiry = payload.exp * 1000; // convert to ms

      const userData: User = {
        token: data.access_token,
        role: data.role,
        username: data.username,
        expiry,
      };

      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);

      // schedule auto logout
      scheduleLogout(expiry);

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
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user,
        currentUser: user,
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
export const useAuth = () => useContext(AuthContext);
