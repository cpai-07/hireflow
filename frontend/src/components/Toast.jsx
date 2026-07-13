import { useEffect } from "react";

export default function Toast({ message, onClose }) {
  useEffect(() => {
    // show popup only for 5 seconds
    const timer = setTimeout(onClose, 5000);

    // clean up function
    return () => clearTimeout(timer);
  }, [onClose]);

  return <div className="toast">{message}</div>;
}
