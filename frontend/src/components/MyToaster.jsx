import toast from "react-hot-toast";
import {
    CheckCircle,
    XCircle,
    AlertTriangle,
    Info,
} from "lucide-react";

class MyToaster {
    defaultOptions = {
        position: "top-right",
        duration: 2000,
        style: {
            borderRadius: "12px",
            padding: "14px 16px",
            color: "#fff",
            fontWeight: "500",
            boxShadow:
                "0 10px 25px rgba(0,0,0,0.15)",
            backdropFilter: "blur(8px)",
        },
    };

    success(message, duration = 2000) {
        toast.success(message, {
            ...this.defaultOptions,
            duration,
            icon: <CheckCircle size={20} />,
            style: {
                ...this.defaultOptions.style,
                background:
                    "linear-gradient(135deg, #10B981, #059669)",
            },
        });
    }

    error(message, duration = 2000) {
        toast.error(message, {
            ...this.defaultOptions,
            duration,
            icon: <XCircle size={20} />,
            style: {
                ...this.defaultOptions.style,
                background:
                    "linear-gradient(135deg, #EF4444, #DC2626)",
            },
        });
    }

    warning(message, duration = 2000) {
        toast(message, {
            ...this.defaultOptions,
            duration,
            icon: <AlertTriangle size={20} color="#FBBF24" />,
            style: {
                ...this.defaultOptions.style,
                background:
                    "linear-gradient(135deg, #F59E0B, #D97706)",
            },
        });
    }

    info(message, duration = 2000) {
        toast(message, {
            ...this.defaultOptions,
            duration,
            icon: <Info size={20} color="#60A5FA" />,
            style: {
                ...this.defaultOptions.style,
                background:
                    "linear-gradient(135deg, #3B82F6, #2563EB)",
            },
        });
    }
}

export default new MyToaster();