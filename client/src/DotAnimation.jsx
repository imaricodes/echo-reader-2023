import { useEffect, useRef, useState } from "react";
import { socket } from "./socketIO/socket-service";

const DotAnimation = (props) => {
  // const [animateDots, setAnimateDots] = useState(false);

  // const processing_results = false;

  const dotAnimationRef = useRef(null);
  const animationOnRef = useRef(null);
  const animationOffRef = useRef(null);

  // useEffect(() => {
  //   console.log("useEffect triggered");

  //   if (animateDots === true) {
  //     animationOnRef.current.classList.remove("hidden");
  //   } 

  //   return () => {
  //     socket.off("processing_resutls", startDotAnimation);
  //   };
  // }, [animateDots]);

  // const startDotAnimation = (data) => {
  //   console.log("start dot animation function run data value = ", data);
  //   if (data === "true") {
  //     setAnimateDots(true);
  //   }
  // };

  // socket.on("processing_results", (data) => startDotAnimation(data));

  return (
    <div ref={dotAnimationRef}>
      <div ref={animationOnRef} className="">
        <div
          className="
           flex top-7 left-12
          dot-elastic
          dot-elastic-animation
          before:dot-elastic-before-class 
          after:dot-elastic-after-class 
          before:dot-elastic-before-animation
          after:dot-elastic-after-animation"
        />
      </div>

      {/* <div ref={animationOffRef} className="absolute flex top-7 left-12 ">
        <div
          className="
        dot-elastic
        before:dot-elastic-before-class 
        after:dot-elastic-after-class 
       "
        />
      </div> */}
    </div>
  );
};

export default DotAnimation;
