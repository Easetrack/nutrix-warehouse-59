
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { fetchCompanyData, CompanyData } from '@/common/utils/companyApi';

interface CompanyContextType {
  isAltTheme: boolean;
  toggleTheme: () => void;
  companyData: CompanyData | null;
  isLoading: boolean;
}

const defaultCompanyData: CompanyData = {
  comId: '',
  companyName: 'Nutrix WMS',
  logo: '/Nutrix.png'
};

const CompanyContext = createContext<CompanyContextType>({
  isAltTheme: false,
  toggleTheme: () => { },
  companyData: defaultCompanyData,
  isLoading: true,
});

export const useCompany = () => useContext(CompanyContext);

interface CompanyProviderProps {
  children: ReactNode;
}

export const CompanyProvider: React.FC<CompanyProviderProps> = ({ children }) => {
  const [isAltTheme, setIsAltTheme] = useState(() => {
    const saved = localStorage.getItem('isAltTheme');
    return saved ? JSON.parse(saved) : false;
  });
  const [companyData, setCompanyData] = useState<CompanyData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadCompanyData = async () => {
      if (isAltTheme) {
        try {
          const data = await fetchCompanyData();
          setCompanyData(data);
          // console.log('Company data loaded:', data);
        } catch (error) {
          console.error('Failed to load company data:', error);
        }
      } else {
        setCompanyData(defaultCompanyData);
      }
      setIsLoading(false);
    };

    loadCompanyData();
  }, [isAltTheme]);

  useEffect(() => {
    localStorage.setItem('isAltTheme', JSON.stringify(isAltTheme));

    // Update the document title based on the company theme
    if (companyData) {
      document.title = companyData.companyName;
      const existingFavicon = document.querySelector("link[rel~='icon']") as HTMLLinkElement;

      if (existingFavicon) {
        existingFavicon.href = companyData.logo; // เปลี่ยน path ของ favicon
      } else {
        const newFavicon = document.createElement("link");
        newFavicon.rel = "icon";
        newFavicon.href = companyData.logo;
        newFavicon.type = "image/png";
        document.head.appendChild(newFavicon);
      }
    }

    // Update CSS variables for theme colors directly on :root
    const rootElement = document.documentElement;

  }, [isAltTheme, companyData]);

  const toggleTheme = () => {
    setIsAltTheme((prev) => !prev);
  };

  return (
    <CompanyContext.Provider value={{ isAltTheme, toggleTheme, companyData, isLoading }}>
      {children}
    </CompanyContext.Provider>
  );
};
