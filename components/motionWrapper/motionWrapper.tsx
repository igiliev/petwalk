import { motion } from 'framer-motion';

const MotionWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div                                
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2 * 0.1 }}>{children}</motion.div>
  );
}

export default MotionWrapper;