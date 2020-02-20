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

      const listItems = responseData.map(element => {
        return (
          "<li>" +
          "First Name: " +
          element.firstName +
          " , " +
          "Last Name: " +
          element.lastName +
          " , " +
          "Graduation (MM/YYYY): " +
          element.graduationYear +
          " , " +
          "Job Title: " +
          element.jobTitle +
          " , " +
          "Company Name: " +
          element.companyName +
          " , " +
          "Key Skills: " +
          element.keySkills +
          " , " +
          "Github: " +
          element.gitHub +
          " , " +
          "LinkedIn: " +
          element.linkedIn +
          " , " +
          "Twitter: " +
          element.twitter +
          "</li>"
        );
      });

      document.getElementById("results").innerHTML =
        "<ul>" + listItems.join("\n") + "</ul>";
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
