import React, { useRef, ReactNode } from 'react';
import { motion, useInView, HTMLMotionProps } from 'framer-motion';

interface ScrollRevealProps extends HTMLMotionProps<"div"> {
    children: ReactNode;
    delay?: number;
    threshold?: number; // Amount visible to trigger
    once?: boolean; // Whether to animate only once
}

/**
 * ScrollReveal
 * 
 * Wraps content with a scroll-triggered animation.
 * Scales up from 0.7 to 1 and fades in from opacity 0 to 1.
 * 
 * Based on the "AnimatedItem" logic provided by the user.
 */
const ScrollReveal: React.FC<ScrollRevealProps> = ({
    children,
    delay = 0,
    threshold = 0.2,
    once = true,
    className,
    ...props
}) => {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { amount: threshold, once });

    return (
        <motion.div
            ref={ref}
            initial={{ scale: 0.2, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : { scale: 0.3, opacity: 0 }}
            transition={{ duration: 0.3, delay, ease: "easeOut" }}
            className={className}
            {...props}
        >
            {children}
        </motion.div>
    );
};

export default ScrollReveal;
