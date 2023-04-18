import goScreenComputer from "../../assets/go-screen-computer.png";
import goScreenComputerNoFrame from "../../assets/go-screen-no-frame.png";

const About = () => {
  return (
    <div className="instructions-container">
      <h1>How to Use Echo Reader</h1>
      <div className="instruction-container">
        <div className="instruction-card">
          <p className="instructions__p">
            Before you can start reading, please allow microphone access.
          </p>
        </div>
        <div className="instructions-container__image-card">
          <img src={goScreenComputer} />
        </div>
      </div>

      <div className="instruction-container">
        <div className="instruction-card">
          <p className="instructions__p">
            If you are not using Chrome or Firefox on a laptop or desktop
            computer, you may see a warning the first time you load a sentence.
          </p>
        </div>
        <div className="instructions-container__image-card">
          <img src={goScreenComputerNoFrame} />
        </div>
      </div>

      <div className="instruction-container">
        <div className="instruction-card">
          <p className="instructions__p">
            Click <span className="font-semibold text-green-500">Go</span> to
            load your first reading sentence. Take a moment to practice reading
            the sentence silently or aloud.
          </p>
        </div>
        <div className="instructions-container__image-card">
          <img src={goScreenComputerNoFrame} />
        </div>
      </div>
    </div>
  )
}

export default About