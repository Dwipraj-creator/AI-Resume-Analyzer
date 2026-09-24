import { FiAlertTriangle } from "react-icons/fi";

const headFont = "'Space Grotesk','Inter Tight','Helvetica Neue',Arial,sans-serif";

const Bracket = ({ className }) => (
  <span className={`absolute w-3 h-3 border-[#FF8A3D] ${className}`} aria-hidden="true" />
);

const ConfirmDialog = ({
  open,
  title = "Are you sure?",
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  destructive = false,
  onConfirm,
  onCancel,
}) => {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[110] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
      onClick={onCancel}
    >
      <div
        className="relative w-full max-w-sm bg-[#14171A] border border-[#262B30] rounded-md p-6 animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        <Bracket className="top-0 left-0 border-t-2 border-l-2 -translate-x-px -translate-y-px" />
        <Bracket className="top-0 right-0 border-t-2 border-r-2 translate-x-px -translate-y-px" />
        <Bracket className="bottom-0 left-0 border-b-2 border-l-2 -translate-x-px translate-y-px" />
        <Bracket className="bottom-0 right-0 border-b-2 border-r-2 translate-x-px translate-y-px" />

        <div className="flex items-start gap-3 mb-6">
          <div className="w-9 h-9 rounded-sm bg-[#1C2024] border border-[#262B30] flex items-center justify-center shrink-0">
            <FiAlertTriangle
              className={destructive ? "text-[#FF5D5D]" : "text-[#FF8A3D]"}
              size={16}
            />
          </div>
          <div>
            <h3 className="text-[#E8E6E1] text-base" style={{ fontFamily: headFont, fontWeight: 600 }}>
              {title}
            </h3>
            {message && <p className="text-sm text-[#7A828A] mt-1">{message}</p>}
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-sm text-sm text-[#C7C1B4] border border-[#262B30] hover:bg-[#1C2024] transition-colors"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            className={`px-4 py-2 rounded-sm text-sm transition-colors ${
              destructive
                ? "bg-[#FF5D5D] text-[#0A0C0E] hover:bg-[#FF7A7A]"
                : "bg-[#FF8A3D] text-[#0A0C0E] hover:bg-[#FFA05E]"
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;