let subBtn = document.getElementById("submit-btn");
let fnam = document.getElementById("fname");
let lnam = document.getElementById("lname");
let mail = document.getElementById("mail");
let pass = document.getElementById("pswrd");
let check = 0;
function restrictAlphabets(e) {
  let x = e.which;
  if ((x >= 65 && x <= 90) || (x >= 97 && x <= 122)) {
    return true;
  } else {
    return false;
  }
}

fnam.addEventListener("keyup", function () {
  // console.log("few");
  let fnamVal = fnam.value.length;
  if (fnamVal >= 5) {
    // console.log("pass");
    let temp = fnam.parentNode.nextElementSibling;
    temp.classList.remove("active");
    check = 0;
  } else {
    // console.log("fail");
    let temp = fnam.parentNode.nextElementSibling;
    temp.classList.add("active");
    check = 1;
  }
});

lnam.addEventListener("keyup", function () {
  let lnamVAl = lnam.value;
  let regEx = /^[A-Za-z]+$/;
  if (lnamVAl.match(regEx)) {
    //  console.log("pass");
    let temp = lnam.parentNode.nextElementSibling;
    temp.classList.remove("active");
    check = 0;
  } else {
    // console.log("fail");
    let temp = lnam.parentNode.nextElementSibling;
    temp.classList.add("active");
    check = 1;
  }
});

mail.addEventListener("keyup", function () {
  // console.log("efe");
  let mailVal = mail.value;
  let validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/;
  if (mailVal.match(validRegex)) {
    // console.log("pass");
    let temp = mail.parentNode.nextElementSibling;
    temp.classList.remove("active");
    check = 0;
  } else {
    // console.log("fail");
    let temp = mail.parentNode.nextElementSibling;
    temp.classList.add("active");
    check = 1;
  }
});

pass.addEventListener("keyup", function () {
  let passVal = pass.value;
  let regExPass = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  if (regExPass.test(passVal)) {
    let temp = pass.parentNode.nextElementSibling;
    temp.classList.remove("active");
    check = 0;
    // console.log("pass");
  } else {
    // console.log("fail");
    let temp = pass.parentNode.nextElementSibling;
    temp.classList.add("active");
    check = 1;
  }
});

subBtn.addEventListener("click", function (e) {
  e.preventDefault();

  let fnamVal = fnam.value.length;
  let lnamVAl = lnam.value;
  let mailVal = mail.value;
  let passVal = pass.value;
  // console.log(passVal);

  if (fnamVal >= 5) {
    // console.log("pass");
    let temp = fnam.parentNode.nextElementSibling;
    temp.classList.remove("active");
    check = 0;
  } else {
    // console.log("fail");
    let temp = fnam.parentNode.nextElementSibling;
    temp.classList.add("active");
    check = 1;
  }

  var regEx = /^[A-Za-z]+$/;
  if (lnamVAl.match(regEx)) {
    //  console.log("pass");
    let temp = lnam.parentNode.nextElementSibling;
    temp.classList.remove("active");
    check = 0;
  } else {
    // console.log("fail");
    let temp = lnam.parentNode.nextElementSibling;
    temp.classList.add("active");
    check = 1;
  }

  let validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/;
  if (mailVal.match(validRegex)) {
    // console.log("pass");
    let temp = mail.parentNode.nextElementSibling;
    temp.classList.remove("active");
    check = 0;
  } else {
    // console.log("fail");
    let temp = mail.parentNode.nextElementSibling;
    temp.classList.add("active");
    check = 1;
  }
  let regExPass = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  if (regExPass.test(passVal)) {
    let temp = pass.parentNode.nextElementSibling;
    temp.classList.remove("active");
    check = 0;
    // console.log("pass");
  } else {
    // console.log("fail");
    let temp = pass.parentNode.nextElementSibling;
    temp.classList.add("active");
    check = 1;
  }

  if (check == 0) {
    console.log("Validation Success");
    // window.alert("Validation Success");
    let mailVal = mail.value;
    let passVal = pass.value;
    localStorage.setItem("email", mailVal);
    localStorage.setItem("pass", passVal);
    // location.href = "./signin.html";
    let obj = {
      fname: fnam.value,
      lname: lnam.value,
      mail: mailVal,
      pass: passVal,
    };
    console.log(obj);
    fetch("http://localhost:8082/getData", { method: "POST" ,
  headers:{
    "Content-type":"application/json"
  },
  body:JSON.stringify(obj)
}).then((r)=>r.json()).then((res)=>{
  if(res.data=="exists")
  {
    window.alert("email already exists")
  }
  else{
    window.alert("Registration Successful")
   window.location.href="/signin"
  }
});
  }
});

let sigininBtn = document.getElementById("signin-link");

sigininBtn.addEventListener("click", function () {
  // console.log("efg");
  //location.href = "http://localhost:8082/signin";


});
