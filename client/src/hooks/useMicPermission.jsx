import { useCallback, useState } from "react";

const useMicPermission = () => {
const [micAllowed, setMicAllowed] = useState(false);

  const getMicPermission = useCallback(async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      setMicAllowed(true);
      return true;
    } catch (error) {
      setMicAllowed(false)
      console.log("mic access denied", error);
      return false;
    }
  }, []); // Add dependencies here if any

  return { getMicPermission, micAllowed };
};

export default useMicPermission;

