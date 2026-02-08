import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Set base URL for axios
    axios.defaults.baseURL = "http://localhost:5000/api";

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem("token");
            if (token) {
                try {
                    // Expecting an endpoint to get current user details
                    // If not available, we decoded token or just trust it for now until 401
                    // For now, let's assume we have a user endpoint or just persistence
                    // Since backend doesn't show a handy "me" endpoint in the snippets, 
                    // we will attach token to headers and assume valid if present.
                    // Ideally we should verify token. 
                    // Let's decode if possible or just set auth.

                    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

                    // Optional: Fetch user details if there's an endpoint
                    // const res = await axios.get("/auth/me"); 
                    // setUser(res.data);

                    // For now, just set authenticated
                    setIsAuthenticated(true);
                    // Decode token to get user info if needed, or store user info in localStorage on login
                    const storedUser = localStorage.getItem("user");
                    if (storedUser) {
                        setUser(JSON.parse(storedUser));
                    }
                } catch (error) {
                    console.error("Auth check failed", error);
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                    delete axios.defaults.headers.common["Authorization"];
                    setIsAuthenticated(false);
                    setUser(null);
                }
            }
            setLoading(false);
        };

        checkAuth();
    }, []);

    const login = async (email, password) => {
        try {
            const res = await axios.post("/auth/login", { email, password });
            const { token, user } = res.data;

            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));

            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            setUser(user);
            setIsAuthenticated(true);
            return { success: true };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || "Login failed"
            };
        }
    };

    const signup = async (userData) => {
        try {
            const res = await axios.post("/auth/signup", userData);
            const { token, user } = res.data;

            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));

            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            setUser(user);
            setIsAuthenticated(true);
            return { success: true };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || "Signup failed"
            };
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        delete axios.defaults.headers.common["Authorization"];
        setUser(null);
        setIsAuthenticated(false);
    };

    const socialLoginSuccess = (token) => {
        localStorage.setItem("token", token);
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        setIsAuthenticated(true);
        // We might want to fetch user details here if not provided in URL
        // unique situation for social login redirect
    };



    const value = {
        user,
        loading,
        isAuthenticated,
        login,
        signup,
        logout,
        socialLoginSuccess,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
