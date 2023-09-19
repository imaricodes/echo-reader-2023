import PropTypes from "prop-types";

const CardStage = ({ children }) => {
  return (
    <div className="flex flex-col items-center justify-center overflow-hidden rounded-lg px-8 py-8 shadow-lg  h-full relative bg-white">
      <div className="text-lg leading-7 sm:text-2xl lg:text-3xl lg:leading-10 w-full min-h-[250px] xl:min-h-[400px]">
        {children}
      </div>
    </div>
  );
};

CardStage.propTypes = {
  children: PropTypes.node.isRequired
};

export default CardStage;
