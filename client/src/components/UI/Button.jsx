const Button = ({ children, bgColor, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`group rounded-md py-2 px-4 text-base font-bold text-white bg-${bgColor}-500 relative`}
    >
      <div
        className={`rounded-md absolute inset-0 w-0 bg-${bgColor}-400 opacity-0 transition-all duration-[250ms] ease-out group-hover:w-full group-hover:opacity-100 `}
      ></div>
      <span className="relative ">{children}</span>
    </button>
  );
};

export default Button;
