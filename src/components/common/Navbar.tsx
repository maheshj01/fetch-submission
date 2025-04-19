import { motion } from "framer-motion";
import { IoLogoGithub } from "react-icons/io5";
interface FetchNavbarProps {
    className?: string;
    navbarTitle?: string;
    children?: React.ReactNode;
    onNavbarIconClick?: () => void;
}
const FetchNavbar: React.FC<FetchNavbarProps> = ({ className, navbarTitle, children, onNavbarIconClick }) => {
    return (
        <div className={`bg-background px-8 sticky top-0 z-50 w-full h-16 flex justify-between items-center ${className}`}>
            <div className='flex space-x-20'>
                {/* appbar content */}
                <div className='flex grow items-center'>
                    <motion.p
                        className='md:text-lg sm:text-sm sm:text-center'
                        initial={{ translateY: 16 }}
                        animate={{ translateY: 0 }}
                        transition={{ duration: 0.3 }}
                        key={navbarTitle}
                    >
                        {navbarTitle}
                    </motion.p>
                </div>
            </div>
            <div className='flex' />
            {children}
        </div>
    )
}
export default FetchNavbar;