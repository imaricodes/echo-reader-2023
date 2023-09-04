export const checkForMaxWords = (arr, maxWords) => {
  if (arr.length > maxWords) {
    // console.log("MAX WORDS REACHED");
    // console.log(`current array length: ${arr.length}`);

    // terminateAssemblySession();
    // closeSocket();
    return true;
  } else {
    // console.log("MAX WORDS NOT REACHED");
    return false;
  }
};

//this function returns an array of objects
export const evaluateSession = async (cueObj, responseObj) => {
  //compare strings index and return t/f for match
  const compareStrings = (a, b) => {
    let result;

    result = a === b;

    if (result === true) {
      // console.log(`compared true`);
    } else {
      // console.log(`compared false`);
    }
    return result;
  };

  let cueEvaluate = cueObj.evaluate.map((item) => item);
  let cueDisplay = cueObj.display.map((item) => item);

  let responseEvaluate = responseObj.evaluate.map((item) => item);
  let responseDisplay = responseObj.display.map((item) => item);

  let arr = [];
  // arr.push("This will be chat gpt")

  arr.push(responseDisplay);
  arr.push(cueDisplay);

  for (const [index, name] of cueEvaluate.entries()) {
    // console.log(
    //   `cue evaulate array index:  ${cueEvaluate[index]} , ${responseEvaluate[index]}`
    // );
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

    //here, check whether reposnse is contained in cueEvaluate
  

    arr.push({
      cueWord: cue,
      responseWord: response,
      match: match,
      responseDisplayWord: responseDisplay[index],
    });
  }
  // console.log(`final sesion result array on server!: ${JSON.stringify(arr)}`);
  return arr;
};

export const calculateTimeOut = (startSessionTime, maxSessionTime) => {
  let endTime = Date.now();
  let elapsedSessionTime = (endTime - startSessionTime) / 1000;
  let result = false;
  // console.log("elapsed session time", elapsedSessionTime);

  if (elapsedSessionTime >= maxSessionTime) {
    result = true;
    return {timeout:true, elapsedTime: elapsedSessionTime};
  } else {
    return {timeout:false, elapsedTime: elapsedSessionTime};
  }
};
