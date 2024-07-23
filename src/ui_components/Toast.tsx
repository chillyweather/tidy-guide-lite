import { h } from "preact";
import { useEffect } from "preact/hooks";
import { useAtom } from "jotai";
import { toastMessageAtom, toastTypeAtom } from "src/state/atoms";
import { createPortal } from "preact/compat";

const Toast = ({ onClose }: { onClose: () => void }) => {
  const [message] = useAtom(toastMessageAtom);
  const [type] = useAtom(toastTypeAtom);
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [onClose]);

  function setToastClass(type: string) {
    switch (type) {
      case "idle":
        return "custom-toast";
      case "error":
        return "custom-toast custom-toast-error";
      case "success":
        return "custom-toast custom-toast-success";
      case "warning":
        return "custom-toast custom-toast-warning";
      default:
        return "custom-toast";
    }
  }

  return createPortal(
    <div className={setToastClass(type)}>
      <div className="custom-toast-message">{message}</div>
    </div>,
    document.body
  );
};

export default Toast;
