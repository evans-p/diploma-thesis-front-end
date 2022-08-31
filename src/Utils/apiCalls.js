import axios from "axios";

const backendURL = " http://localhost:8080";

function postReferenceBlock(refBlock) {
  const url = backendURL + "/reference-block";

  axios
    .post(url, refBlock)
    .then((response) => {
      console.log("Status: ", response.status);
      console.log("Data: ", response.data);
    })
    .catch((error) => {
      console.log(error);
    });
}

function postActionBlock(aBlock) {
  const url = backendURL + "/action-block";
  // let block = null;

  axios
    .post(url, aBlock)
    .then((response) => {
      console.log("Status: ", response.status);
      console.log("Data: ", response.data);
    })
    .catch((error) => {
      console.log(error);
    });
}

function postDecisionBlock(dBlock) {
  const url = backendURL + "/decision-block";

  axios
    .post(url, dBlock)
    .then((response) => {
      console.log("Status: ", response.status);
      console.log("Data: ", response.data);
    })
    .catch((error) => {
      console.log(error);
    });
}

export { postReferenceBlock, postActionBlock, postDecisionBlock };
