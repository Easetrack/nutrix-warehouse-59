
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useStockUpdateAuth = () => {
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
    }
    try {
      const parsed = JSON.parse(storedWarehouse);
      if (parsed && parsed.id) setLocationId(parsed.id);
    } catch (e) {
      // fallback: don't crash
    }
  }, [navigate]);
  return { locationId, setLocationId };
};
