import { motion } from "framer-motion";
import { fadeUp } from "../../styles/animations";

function Reveal({ children, style = {}, delay = 0 }) {
  return (
    <motion.div
      variants={{
        hidden: fadeUp.hidden,
        show: {
          ...fadeUp.show,
          transition: { duration: 0.7, ease: "easeOut", delay },
        },
      }}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      style={style}
    >
      {children}
    </motion.div>
  );
}

export default Reveal;