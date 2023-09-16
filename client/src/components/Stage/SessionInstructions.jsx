import Button from "../UI/Button";

const SessionInstructions = ({ setStageState }) => {
  const handleReadyClick = () => {
    setStageState("cue");
  };

  return (
    <>
      <p style={{ marginBottom: "5px" }}>
        On the next screen, click MIC to reocrd your voice
      </p>
      <p style={{ marginBottom: "5px" }}>
        Echo Reader will not hear you until you click the MIC
      </p>
      <p style={{ marginBottom: "5px" }}>
        After reading the sentence, wait for results.
      </p>
      <Button onClick={handleReadyClick} bgColor={'green'}> I am Ready</Button>
     
    </>
  );
};

export default SessionInstructions;
