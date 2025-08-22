import { motion } from "framer-motion";
import "./App.css";

interface TiltleProps {
  title: string;
}
const Title = (props: TiltleProps) => {
  const { title } = props;
  return (
    <motion.h1
      initial={{ y: -1000 }}
      animate={{ y: -150 }}
      transition={{ duration: 1, ease: "easeInOut", delay: 0.5 }}
      className="text-center"
    >
      {title}
      className="calendar-title"
    </motion.h1>
  );
};

export default Title;
