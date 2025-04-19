import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

type IconButtonProps = {
  onClick?: () => void;
  children: React.ReactNode;
  ariaLabel?: string;
  className?: string;
  tooltipPlacement?: "top-start" | "top" | "top-end" | "right-start" | "right" | "right-end" | "bottom-start" | "bottom" | "bottom-end" | "left-start" | "left" | "left-end";
};

const IconButton: React.FC<IconButtonProps> = ({ onClick, children, ariaLabel, className, tooltipPlacement }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <div
            aria-label={ariaLabel}
            className={`rounded-full p-2 dark:text-white ${className}`}
            onClick={onClick}>
            {children}
          </div>
        </TooltipTrigger>
        <TooltipContent className="bg-gray-700 text-white">
          {ariaLabel}
        </TooltipContent>
      </Tooltip >
    </TooltipProvider>
  );
};

export default IconButton;