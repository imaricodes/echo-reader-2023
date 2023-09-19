const regexRemovePunctuation = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g;

export function processCue(cue) {
 
    let sentenceToDisplay = cue.split(" ");
  
    let sentenceNoPunctuation = cue
      .replace(regexRemovePunctuation, "")
      .toLowerCase();
  
    let sentenceToEvaluateArray = sentenceNoPunctuation.split(" ");
    let cueLength = sentenceToEvaluateArray.length;
  
    return {
      display: sentenceToDisplay, //array
      evaluate: sentenceToEvaluateArray,
      cueLength: cueLength //array
      
    };
  }