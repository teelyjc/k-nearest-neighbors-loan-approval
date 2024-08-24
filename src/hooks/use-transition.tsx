"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { FunctionComponent, ReactNode, useEffect, useState } from "react";

interface TransitionProps {
  children: ReactNode;
}

export const Transition: FunctionComponent<TransitionProps> = ({
  children,
}) => {
  const [initial, setInitial] = useState<boolean>(true);
  const pathname = usePathname();

  useEffect(() => {
    setInitial(false);
  }, [pathname]);

  return (
    <AnimatePresence initial={initial} mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          type: "spring",
          damping: 10,
          stiffness: 100,
          duration: 150,
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
