

const CardStage = ({ children }) => {
  return (
    <div className="flex flex-col items-center justify-center overflow-hidden rounded-lg px-8 py-8 shadow-lg bg-white h-full relative ">
      <div className="text-lg leading-7 sm:text-2xl lg:text-3xl lg:leading-10 w-full min-h-[250px] xl:min-h-[400px]">
        {children}
      </div>
    </div>
  );
};

export default CardStage;
