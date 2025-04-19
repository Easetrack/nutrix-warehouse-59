
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useStockAuth = () => {
  const navigate = useNavigate();
  const [locationId, setLocationId] = useState<string>("1");

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    const storedWarehouse = localStorage.getItem("selectedWarehouse");
    if (!storedWarehouse) {
      navigate("/select-warehouse");
      return;
    } else {
      try {
        const parsedWarehouse = JSON.parse(storedWarehouse);
        if (parsedWarehouse && parsedWarehouse.id) {
          setLocationId(parsedWarehouse.id);
        }
      } catch (error) {
        console.error('Error parsing stored warehouse:', error);
      }
    }
  }, [navigate]);

  return { locationId };
};
