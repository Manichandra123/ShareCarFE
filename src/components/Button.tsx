interface ButtonProps {
  variant: "simple" | "colored" | "shaded";
  size: "sm" | "md" | "xl";
  text: string;
  onClick?: () => void;
  className?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

const variantStyles = {
  simple: "text-black border m-2 rounded-md p-2 hover:bg-gray-100",
  colored: "bg-black text-white m-2 rounded-md p-2 hover:bg-gray-800",
  shaded:
    "border border-gray-400 bg-gray-200 m-2 rounded-md p-2 hover:bg-gray-100",
};

const sizeStyles = {
  sm: "py-1 px-2 text-sm",
  md: "py-2 px-4 text-base",
  xl: "py-3 px-6 text-lg",
};

export default function Button(props: ButtonProps) {
  return (
    <button
      className={`${variantStyles[props.variant]} ${sizeStyles[props.size]} ${
        props.className || ""
      } cursor-pointer flex items-center justify-center gap-2`}
      onClick={props.onClick}
    >
      {props.text} {props.endIcon && <span className="ml-2">{props.endIcon}</span>}
    </button>
  );
}
