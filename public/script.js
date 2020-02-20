const sendHttpRequest = (method, url, data) => {
  const promise = new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);

    xhr.responseType = "json";

    if (data) {
      xhr.setRequestHeader("Content-Type", "application/json");
    }

    xhr.onload = () => {
      if (xhr.status >= 400) {
        reject(xhr.response);
      } else {
        resolve(xhr.response);
      }
    };

    xhr.onerror = () => {
      reject("Something went wrong!");
    };

    xhr.send(JSON.stringify(data));
  });
  return promise;
};

const getAllGraduates = () => {
  sendHttpRequest("GET", "http://localhost:3000/api/graduates").then(
    responseData => {
      console.log(responseData);
      document.getElementById("results").innerHTML = JSON.stringify(
        responseData
      );
    }
  );
};

function createNewGraduate() {
  var graduate = {
    firstName: document.getElementById("firstName").value,
    lastName: document.getElementById("lastName").value,
    graduationYear: document.getElementById("graduationYear").value,
    jobTitle: document.getElementById("jobTitle").value,
    companyName: document.getElementById("companyName").value,
    keySkills: document.getElementById("keySkills").value,
    gitHub: document.getElementById("gitHub").value,
    linkedIn: document.getElementById("linkedIn").value,
    twitter: document.getElementById("twitter").value
  };
  var xhr = new window.XMLHttpRequest();
  xhr.open("POST", "http://localhost:3000/api/graduates", true);
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.send(JSON.stringify(graduate));
}
