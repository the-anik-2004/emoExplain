import { createContext,useContext,ReactNode, useEffect,useState } from "react";
import api from "../services/api";

interface User{
    _id:string;
    username:string;
    email:string;
    isVerified:boolean;
    favorites:string[];
    searchHistory:string[];
}

interface AuthContextType{
    user:User | null; 
    setUser:React.Dispatch<React.SetStateAction<User|null>>;
    logout:()=>void;
    register:(email:string,password:string)=>Promise<any>;
    verifyUser:(email:string,otp:string)=>Promise<any>;
    login:(email:string,password:string)=>Promise<any>;
    loading:boolean;
}
const AuthContext=createContext<AuthContextType|undefined>(undefined);

export const AuthProvider=({children}:{children:ReactNode})=>{
    const [user,setUser]=useState<User|null>(null);
    const [loading,setLoading]=useState<boolean>(true);

    useEffect(() => {
    api
        .get("/auth/me")
        .then((res) => setUser(res.data))
        .catch((err) => {
        console.error("Not logged in", err);
        setUser(null);
        })
        .finally(() => setLoading(false)); // <-- Add loading state
    }, []);


    //register
    const register= async (email:string,password:string)=>{
        try {
            const res =await api.post("/auth/register",{email,password});
            return res.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    //verify user
    const verifyUser=async(email:string,otp:string)=>{
        try {
            const res=await api.post("/auth/verify",{email,otp});
            return res.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    //login
    const login=async (email:string,password:string)=>{
        try {
            const res= await api.post('/auth/login',{email,password});
            return res.data;
        } catch (error) {
             console.error(error);
            throw error;
        }
    }
    //logout
    const logout=async()=>{
        await api.post("/auth/logout");
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{user,setUser,register,verifyUser,login,logout,loading}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};