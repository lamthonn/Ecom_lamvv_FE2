import { Navigate } from "react-router-dom";
import useAuth from "./useAuth";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const isAuthenticated = useAuth();
    // const location = useLocation();
    // const navigate = useNavigate();
    // const [accessToken, setAccessToken] = useState<string | null>(null);
    // const [expiresIn, setExpiresIn] = useState<string | null>(null);
    // const [checked, setChecked] = useState(false);

    // useEffect(() => {
    //     const token = localStorage.getItem("auth");
    //     console.log("token", token);
        
    //     // setAccessToken(token);
    //     // setExpiresIn(expiry);
    
    //     // // Check first
    //     // if (!token && location.pathname !== "/login") {
    //     //   navigate("/seller-center/login", {
    //     //     state: { returnUrl: location.pathname },
    //     //   });
    //     // } else {
    //     //   if (location.pathname === '/') {
    //     //     navigate("/seller-center/dashboard");
    //     //   }
    //     //   setChecked(true);
    //     // }
    //   }, []);

    if (isAuthenticated === null) return <div>Loading...</div>;
    return isAuthenticated ? children : <Navigate to="/seller-center/login" replace />;
};

export default ProtectedRoute;