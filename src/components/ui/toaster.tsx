import { useToast } from "@/common/hooks/use-toast";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";

import { useCompany } from "@/contexts/CompanyContext";

import imageTop from "@/assets/Group 3.png";
import imageBop from "@/assets/Group 6.png";
import imageBg from "@/assets/Dog print.png";
import srpIcon from "@/assets/Group.png"
import srpIcon2 from "@/assets/warehouse-svgrepo-com(3) 1.png"

export function Toaster() {
  const { toasts } = useToast();

  const {
    companyData,
    isAltTheme,
    toggleTheme: toggleCompanyTheme,
  } = useCompany();

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast
            key={id}
            {...props}
            // style={{
            //   backgroundImage: `url(${imageBg})`,
            //   backgroundPosition: "center",
            //   backgroundSize: "25% 60%", // เปลี่ยนจาก 'cover' เป็น 'contain' เพื่อให้รูปไม่ถูก crop
            //   backgroundRepeat: "no-repeat",
            // }}
            className="relative overflow-hidden"
          >
            {/* รูปสามเหลี่ยมด้านบน */}
            <div className="absolute top-0 left-0 w-16 h-16 bg-primary rounded-br-full">
              <div className="absolute bottom-7 right-7 flex items-center justify-center">
                {!isAltTheme && (
                  <img
                    src={imageBg}
                    alt="Top decoration"
                    className="w-6 h-6"
                  />
                )}
                {isAltTheme && (
                  <img
                    src={srpIcon2}
                    alt="Top decoration"
                    className="w-6 h-6"
                  />
                )}
              </div>
            </div>

            {/* เนื้อหา Toast */}
            <div className="grid gap-1 pt-6 pb-6">
              {" "}
              {/* เพิ่ม padding ด้านบนและล่างเพื่อไม่ให้เนื้อหาทับกับรูป */}
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>

            {action}
            <ToastClose />

            {/* รูปสามเหลี่ยมด้านล่าง */}
            <div className="absolute bottom-0 right-0 w-16 h-16 bg-primary rounded-tl-full">
              <div className="absolute top-7 left-7 flex items-center justify-center">
              {!isAltTheme && (
                  <img
                    src={imageBg}
                    alt="Top decoration"
                    className="w-6 h-6"
                  />
                )}
                {isAltTheme && (
                  <img
                    src={srpIcon2}
                    alt="Top decoration"
                    className="w-6 h-6"
                  />
                )}
              </div>
            </div>
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
