import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkAuth } from "@/utils/auth";

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyAuth = async () => {
      const authValid = await checkAuth();
      if (!authValid) {
        navigate("/login");
      } else if (window.location.pathname === "/select-warehouse") {
        // อนุญาตให้เข้าถึงหน้าเลือก warehouse ได้
        setIsAuthenticated(true);
      } else if (!localStorage.getItem("selectedWarehouse")) {
        // หากยังไม่ได้เลือก warehouse ให้ redirect ไปเลือก
        navigate("/select-warehouse");
      } else {
        setIsAuthenticated(true);
      }
    };
    
    verifyAuth();
  }, [navigate]);

  return isAuthenticated ? children : children;
};

export default ProtectedRoute;