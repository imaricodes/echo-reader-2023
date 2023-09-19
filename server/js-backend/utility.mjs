export const checkForMaxWords = (arr, maxWords) => {
  if (arr.length > maxWords) {
    return true;
  } else {
    return false;
  }
};

export const evaluateSession = async (cueObj, responseObj) => {
  const compareStrings = (a, b) => {
    let result;

    result = a === b;

    if (result === true) {
    } else {
    }
    return result;
  };

  let cueEvaluate = cueObj.evaluate.map((item) => item);
  let cueDisplay = cueObj.display.map((item) => item);

  let responseEvaluate = responseObj.evaluate.map((item) => item);
  let responseDisplay = responseObj.display.map((item) => item);

  let arr = [];

  arr.push(responseDisplay);
  arr.push(cueDisplay);

  for (const [index, name] of cueEvaluate.entries()) {
    let cue = cueEvaluate[index];
    let response = responseEvaluate[index];
    let match = "";

    let evaluation = compareStrings(cue, response);
    evaluation ? (match = "true") : (match = "false");

    if (match === "false") {
      if (cueEvaluate.includes(response)) {
        match = "false-true";
      }
    }

    arr.push({
      cueWord: cue,
      responseWord: response,
      match: match,
      responseDisplayWord: responseDisplay[index],
    });
  }
  return arr;
};

export const calculateTimeOut = (startSessionTime, maxSessionTime) => {
  let endTime = Date.now();
  let elapsedSessionTime = (endTime - startSessionTime) / 1000;
  let result = false;
  if (elapsedSessionTime >= maxSessionTime) {
    result = true;
    return {timeout:true, elapsedTime: elapsedSessionTime};
  } else {
    return {timeout:false, elapsedTime: elapsedSessionTime};
  }
};
