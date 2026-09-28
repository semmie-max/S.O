import { useEffect, useId, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Undo2 } from "lucide-react";

const DELETE_COLOR = "#FE322A";
const SOFT_COLOR = "#FFEDF1";
const LAYOUT = { duration: 0.4, ease: [0.77, 0, 0.175, 1] };
const CHAR = { duration: 0.3, ease: [0.785, 0.135, 0.15, 0.86] };

export default function DeleteButton({
  onDelete,
  deleteText = "Delete",
  cancelText = "Cancel",
  seconds = 5,
}) {
  const uid = useId();
  const [isDeleting, setIsDeleting] = useState(false);
  const [count, setCount] = useState(seconds);
  const [isAnimating, setIsAnimating] = useState(false);
  const onDeleteRef = useRef(onDelete);
  onDeleteRef.current = onDelete;

  useEffect(() => {
    if (!isDeleting) return;
    if (count === 0) {
      Promise.resolve(onDeleteRef.current?.()).catch(() => setIsDeleting(false));
      return;
    }
    const timer = setTimeout(() => setCount((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [isDeleting, count]);

  const handleClick = (newState) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setIsDeleting(newState);
    if (newState) setCount(seconds);
    setTimeout(() => setIsAnimating(false), LAYOUT.duration * 1000);
  };

  return (
    <div className="relative flex items-center justify-center">
      <AnimatePresence mode="popLayout" initial={false}>
        {!isDeleting ? (
          <motion.button
            key="delete"
            type="button"
            layoutId={`deleteButton-${uid}`}
            onClick={() => handleClick(true)}
            whileTap={{ scale: 0.95 }}
            style={{ pointerEvents: isAnimating ? "none" : "auto" }}
            initial={{ backgroundColor: SOFT_COLOR, filter: "blur(1px)", opacity: 1 }}
            animate={{ backgroundColor: DELETE_COLOR, filter: "blur(0px)", opacity: 1 }}
            exit={{ backgroundColor: SOFT_COLOR, filter: "blur(1px)", opacity: 0 }}
            className="flex items-center justify-center overflow-hidden rounded-full px-4 py-2 text-sm text-white"
            transition={{
              layout: { duration: LAYOUT.duration, ease: LAYOUT.ease },
              backgroundColor: { duration: 0.4, ease: "easeInOut" },
              filter: { duration: 0.1, ease: "easeInOut" },
              opacity: { duration: 0.2, ease: "easeOut" },
            }}
          >
            <motion.span
              layoutId={`buttonText-${uid}`}
              className="flex"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.1 }}
            >
              {deleteText.split("").map((char, i) => (
                <motion.span
                  key={`delete-${i}-${char}`}
                  initial={{ y: 20, opacity: 0, scale: 0.3 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  exit={{ y: -20, opacity: 0, scale: 0.3 }}
                  transition={{
                    duration: CHAR.duration,
                    ease: CHAR.ease,
                    delay: i * 0.005,
                  }}
                  style={{ display: "inline-block", whiteSpace: "pre" }}
                >
                  {char}
                </motion.span>
              ))}
            </motion.span>
          </motion.button>
        ) : (
          <motion.button
            key="cancel"
            type="button"
            layoutId={`deleteButton-${uid}`}
            onClick={() => handleClick(false)}
            whileTap={{ scale: 0.95 }}
            style={{ pointerEvents: isAnimating ? "none" : "auto" }}
            initial={{ backgroundColor: DELETE_COLOR, filter: "blur(1px)", opacity: 0 }}
            animate={{ backgroundColor: SOFT_COLOR, filter: "blur(0px)", opacity: 1 }}
            exit={{ backgroundColor: DELETE_COLOR, filter: "blur(1px)", opacity: 0 }}
            className="flex items-center gap-2 overflow-hidden rounded-full px-2 py-1.5 text-sm"
            transition={{
              layout: { duration: LAYOUT.duration, ease: LAYOUT.ease },
              backgroundColor: { duration: 0.4, ease: "easeInOut" },
              filter: { duration: 0.2, ease: "easeInOut" },
              opacity: { duration: 0.2, ease: "easeIn" },
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.2, delay: 0.05 }}
              className="flex shrink-0 items-center justify-center rounded-full p-1.5"
              style={{ backgroundColor: DELETE_COLOR }}
            >
              <Undo2 className="h-3.5 w-3.5 text-white" />
            </motion.div>

            <motion.span
              layoutId={`buttonText-${uid}`}
              className="flex font-medium"
              style={{ color: DELETE_COLOR }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.1 }}
            >
              {cancelText.split("").map((char, i) => (
                <motion.span
                  key={`cancel-${i}-${char}`}
                  initial={{ y: 20, opacity: 0, scale: 0.3 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  exit={{ y: -20, opacity: 0, scale: 0.3 }}
                  transition={{
                    duration: CHAR.duration,
                    ease: CHAR.ease,
                    delay: i * 0.006,
                  }}
                  style={{ display: "inline-block", whiteSpace: "pre" }}
                >
                  {char}
                </motion.span>
              ))}
            </motion.span>

            <motion.div
              className="relative flex h-7 min-w-[28px] shrink-0 items-center justify-center overflow-hidden rounded-full px-3 text-xs font-semibold text-white"
              style={{ backgroundColor: DELETE_COLOR }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.2, delay: 0.1 }}
            >
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={count}
                  initial={{ opacity: 0, y: 10, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.8 }}
                  transition={{ duration: 0.2, ease: [0.33, 1, 0.68, 1] }}
                  className="absolute"
                >
                  {count}
                </motion.span>
              </AnimatePresence>
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}