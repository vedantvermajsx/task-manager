import { toast } from "sonner";
import { CheckCircle, XCircle, Info, AlertTriangle } from "lucide-react";
class MyToaster {
    defaultOptions = {
        position: "top-right",
        duration: 1000,
    };

    success(message, duration = 1000) {
        toast.success(message, {
            ...this.defaultOptions,
            duration,
            icon: <CheckCircle size={20} />,
            style: {
                borderRadius: "12px",
                padding: "14px 16px",
                color: "#fff",
                fontWeight: "500",
                boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
                backdropFilter: "blur(8px)",
                background: "linear-gradient(135deg, #10B981, #059669)",
            },
        });
    }

    error(message, duration = 1000) {
        toast.error(message, {
            ...this.defaultOptions,
            duration,
            icon: <XCircle size={20} />,
            style: {
                borderRadius: "12px",
                padding: "14px 16px",
                color: "#fff",
                fontWeight: "500",
                boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
                backdropFilter: "blur(8px)",
                background: "linear-gradient(135deg, #EF4444, #DC2626)",
            },
        });
    }

    warning(message, duration = 1000) {
        toast.warning(message, {
            ...this.defaultOptions,
            duration,
            icon: <AlertTriangle size={20} color="#F59E0B" />,
            style: {
                borderRadius: "12px",
                padding: "14px 16px",
                color: "#fff",
                fontWeight: "500",
                boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
                backdropFilter: "blur(8px)",
                background: "linear-gradient(135deg, #F59E0B, #D97706)",
            },

        });
    }

    info(message, duration = 1000) {
        toast.info(message, {
            ...this.defaultOptions,
            duration,
            icon: <Info size={20} color="#60A5FA" />,
            style: {
                borderRadius: "12px",
                padding: "14px 16px",
                color: "#fff",
                fontWeight: "500",
                boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
                backdropFilter: "blur(8px)",
                background: "linear-gradient(135deg, #3B82F6, #2563EB)",
            },
        });
    }
}

export default new MyToaster();