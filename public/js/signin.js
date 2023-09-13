

let subBtn = document.getElementById("submit-btn");
// let fnam = document.getElementById("fname");
// let lnam = document.getElementById("lname");
let mail = document.getElementById("mail");
let pass = document.getElementById("pswrd");
let check = 0;
let remail = localStorage.getItem("email");
let rpass = localStorage.getItem("pass");
// mail.addEventListener("focusout", function (e) {
//   console.log(mail.value);
//   let mailVal = mail.value;
//   let mailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/;
//   if (mailRegex.test(mailVal)) {
//     // console.log("pass");
//     let temp = mail.parentNode.nextElementSibling;
//     temp.classList.remove("active");
//     check = 0;
//   } else {
//     // console.log("fail");
//     let temp = mail.parentNode.nextElementSibling;
//     temp.classList.add("active");
//     check = 1;
//   }
// });
// pass.addEventListener("focusout", function () {
//   let passVal = pass.value;
//   let regExPass = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
//   if (regExPass.test(passValVal)) {
//     let temp = pass.parentNode.nextElementSibling;
//     temp.classList.remove("active");
//     check = 0;
//     // console.log("pass");
//   } else {
//     // console.log("fail");
//     let temp = pass.parentNode.nextElementSibling;
//     temp.classList.add("active");
//     check = 1;
//   }
// });

// let signupLinkBtn=document.getElementById("signup-link");
// signupLinkBtn.addEventListener("click",function(){
//     console.log("rgr");
//     location.href="./signup.html"
// })

subBtn.addEventListener("click", function (e) {
  e.preventDefault();

  let mailVal = mail.value;
  let passVal = pass.value;

  // var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  // if (validRegex.test(mail)){

  //     // console.log("pass");
  //     let temp = mail.parentNode.nextElementSibling;
  //     temp.classList.remove("active")
  //     check=0;

  // } else {
  //     // console.log("fail");
  //     let temp = mail.parentNode.nextElementSibling;
  //     temp.classList.add("active")
  //     check=1;

  // }
  // let regExPass = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  // if (passVal==rpass) {
  //     let temp = pass.parentNode.nextElementSibling;
  //     temp.classList.remove("active")
  //     check=0;
  //     // console.log("pass");
  // }
  // else {
  //     // console.log("fail");
  //     let temp = pass.parentNode.nextElementSibling;
  //     temp.classList.add("active")
  //     check=1;
  // }
let dataVal=0;
  if (check == 0) {
    // console.log("Validation Success");
    // window.alert("Validation Success");
    // mail.value = "";
    // pass.value = "";

    let obj = {
      mail: mail.value,
      pass: pass.value,
    };
    fetch("http://localhost:8082/validateData", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(obj),
    })
      .then((res) => {console.log(res.status)
    
      
      if(res.status ==200)
      {
        let temp = pass.parentNode.nextElementSibling;
         temp.classList.remove("active");
         let tempMail=mail.parentNode.nextElementSibling;
         tempMail.classList.remove("active");
         window.alert("Validation Success");
         window.location.href="/create";
      }
      else{
        let temp = pass.parentNode.nextElementSibling;
         temp.classList.add("active")
         let tempMail=mail.parentNode.nextElementSibling;
         tempMail.classList.add("active");
         
      }})
      }
      
  
});

// let passShowBtn=document.getElementById("pass-icon");

// passShowBtn.addEventListener("click",function(){
//     if(pass.getAttribute("type")=="password"){
//         pass.setAttribute("type","text");
//     }
//     else{
//     pass.setAttribute("type","password");}
// })
