let sNo = document.getElementById("sno");
let fnam = document.getElementById("fname");
let dob = document.getElementById("dob");
let doj = document.getElementById("doj");
let genderbtn = document.getElementsByName("inlineRadioOptions");
let desgnBtn = document.getElementById("designation");
let cmnts = document.getElementById("floatingTextarea2");
let subBtn = document.getElementById("sub-btn");
let clsBtn = document.getElementById("close-btn");
let viewDataBtn = document.getElementById("view-data");
let tableDiv = document.getElementById("table-append");
let viewClsBTn = document.getElementById("clos-view-btn");
let crBtn = document.getElementById("createData");
let check = 0,
  updatBtnClck = 0;
let sNoVal, fnamVal, dobVal, dojVal, gendVal, desgnVal, cmntsVal;
function restrictAlphabets(e) {
  let x = e.which;
  if (x >= 48 && x <= 57) {
    return true;
  } else {
    return false;
  }
}
sNo.addEventListener("keyup", function () {
  //console.log("gf");
  sNoVal = sNo.value;
  if (sNoVal < 100) {
    sNo.nextElementSibling.classList.remove("active");
    check = 0;
    sNoVal = sNo.value;
  } else {
    sNo.nextElementSibling.classList.add("active");
    check = 1;
  }
});

fnam.addEventListener("keyup", function () {
  fnamVal = fnam.value;
  if (fnamVal.length >= 5) {
    fnam.nextElementSibling.classList.remove("active");
    check = 0;
    fnamVal = fnam.value;
    //console.log("pass");
  } else {
    fnam.nextElementSibling.classList.add("active");
    // console.log("fail");
    check = 1;
  }
});

dob.addEventListener("focusout", function () {
  dobVal = dob.value;
  //console.log(dobVal);
  if (dobVal == "") {
    dob.nextElementSibling.classList.add("active");
    check = 1;
    // console.log("pass");
  } else {
    dob.nextElementSibling.classList.remove("active");
    check = 0;
    dobVal = dob.value;
    // console.log("fail");
  }
});
doj.addEventListener("focusout", function () {
  dojVal = doj.value;
  // console.log(dojVal);
  if (dojVal == "") {
    doj.nextElementSibling.classList.add("active");
    check = 1;
    // console.log("pass");
  } else {
    doj.nextElementSibling.classList.remove("active");
    //console.log("fail");
    check = 0;
    dojVal = doj.value;
  }
});

desgnBtn.addEventListener("change", function () {
  if (desgnBtn.value == "Select Designation") {
    desgnBtn.nextElementSibling.classList.add("active");
    check = 1;
    console.log("fail desgn");
  } else {
    desgnBtn.nextElementSibling.classList.remove("active");
    desgnVal = desgnBtn.value;
    check = 0;
    console.log(desgnVal);
  }
});

cmnts.addEventListener("keyup", function () {
  if (cmnts.value.length == 0) {
    cmnts.parentElement.nextElementSibling.classList.add("active");
    check = 1;
  } else {
    cmnts.parentElement.nextElementSibling.classList.remove("active");
    cmntsVal = cmnts.value;
    check = 0;
  }
});
subBtn.addEventListener("click", function () {
  sNoVal = parseInt(sNo.value);
  //console.log(sNoVal);
  if (sNoVal < 100) {
    sNo.nextElementSibling.classList.remove("active");
    check = 0;
    sNoVal = sNo.value;
  } else {
    sNo.nextElementSibling.classList.add("active");
    check = 1;
  }

  fnamVal = fnam.value;
  if (fnamVal.length >= 5) {
    fnam.nextElementSibling.classList.remove("active");
    check = 0;
    fnamVal = fnam.value;
    //console.log("pass");
  } else {
    fnam.nextElementSibling.classList.add("active");
    // console.log("fail");
    check = 1;
  }

  dobVal = dob.value;
  //console.log(dobVal);
  if (dobVal == "") {
    dob.nextElementSibling.classList.add("active");
    check = 1;
    // console.log("pass");
  } else {
    dob.nextElementSibling.classList.remove("active");
    check = 0;
    dobVal = dob.value;
    // console.log("fail");
  }

  if (desgnBtn.value == "Select Designation") {
    desgnBtn.nextElementSibling.classList.add("active");
    check = 1;
    //console.log("fail desgn");
  } else {
    desgnBtn.nextElementSibling.classList.remove("active");
    desgnVal = desgnBtn.value;
    check = 0;
    //console.log(desgnVal);
  }

  if (cmnts.value.length == 0) {
    cmnts.parentElement.nextElementSibling.classList.add("active");
    check = 1;
  } else {
    cmnts.parentElement.nextElementSibling.classList.remove("active");
    cmntsVal = cmnts.value;
    check = 0;
  }

  dojVal = doj.value;
  // console.log(dojVal);
  if (dojVal == "") {
    doj.nextElementSibling.classList.add("active");
    check = 1;
    // console.log("pass");
  } else {
    doj.nextElementSibling.classList.remove("active");
    //console.log("fail");
    check = 0;
    dojVal = doj.value;
  }

  // console.log(dobVal);
  for (let i = 0; i < genderbtn.length; i++) {
    if (genderbtn[i].checked) {
      gendVal = genderbtn[i].value;
    }
  }
  if (check == 0) {
    //console.log("pass final",sNoVal,fnamVal,dobVal,dojVal,desgnVal,gendVal,cmntsVal);
    if (updatBtnClck == 0) {
      let obj = {
        sno: sNoVal,
        name: fnamVal,
        dob: dobVal,
        doj: dojVal,
        gender: gendVal,
        designation: desgnVal,
        comments: cmntsVal,
      };
      // console.log(obj);
      fetch("http://localhost:8082/fulldata", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(obj),
      })
        .then((r) => r.json())
        .then((res) => console.log(res));
      clsBtn.click();
      console.log("new data");
    } else {
      console.log("updated data");
      updatBtnClck = 0;
      let obj = {
        sno: sNoVal,
        name: fnamVal,
        dob: dobVal,
        doj: dojVal,
        gender: gendVal,
        designation: desgnVal,
        comments: cmntsVal,
      };
      console.log(obj);
      fetch("http://localhost:8082/newupdateData", {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(obj),
      })
        .then((r) => r.json())
        .then((res) => console.log(res));
      location.reload();
    }
  }
});

let maintr;
let tempTR;
viewDataBtn.addEventListener("click", function () {
  fetch("http://localhost:8082/viewdata")
    .then((r) => r.json())
    .then((res) => {
      console.log(res.data);
      res.data.map((e) => {
        maintr = document.createElement("tr");
        maintr.setAttribute("class", "maintr");
        let sn = document.createElement("td");
        maintr.append(sn);
        sn.setAttribute("class", "sno-id");
        sn.innerText = e.sno;

        let nam = document.createElement("td");
        maintr.append(nam);
        nam.innerText = e.name;

        let dobDiv = document.createElement("td");
        maintr.append(dobDiv);
        var now = new Date(e.dob);
        var day = ("0" + now.getDate()).slice(-2);
        var month = ("0" + (now.getMonth() + 1)).slice(-2);
        var today = now.getFullYear() + "-" + month + "-" + day;
        dobDiv.innerText = today;

        let dojDiv = document.createElement("td");
        maintr.append(dojDiv);
        var dojj = new Date(e.doj);
        var da = ("0" + dojj.getDate()).slice(-2);
        var mont = ("0" + (dojj.getMonth() + 1)).slice(-2);
        var dt = dojj.getFullYear() + "-" + mont + "-" + da;
        dojDiv.innerText = dt;

        let gen = document.createElement("td");
        maintr.append(gen);
        gen.innerText = e.gender;

        let des = document.createElement("td");
        maintr.append(des);
        des.innerText = e.designation;

        let cmts = document.createElement("td");
        maintr.append(cmts);
        cmts.innerText = e.comments;

        let delTd = document.createElement("td");
        delTd.innerHTML = `<button onclick="deleteData(${e.sno})" class="delete-data btn btn-danger">Delete</button>`;
        maintr.append(delTd);

        let updTd = document.createElement("td");
        updTd.innerHTML = `<button onclick="updateData(${e.sno})" class="btn btn-primary" >Update</button>`;
        maintr.append(updTd);
        tableDiv.append(maintr);
      });
    })
    .then((data) => {
      tempTR = document.getElementsByClassName("maintr");
      console.log(tempTR);
    });
});

function deleteData(id) {
  // let del = document.getElementsByClassName("delete-data");
  // console.log(del);
  // for (let i = 0; i < del.length; i++) {

  //   del[i].onclick = function () {
  //     this.parentNode.parentNode.style.display = "none";
  //     console.log("del");
  //   };
  // }
  let ttt = window.confirm("Do you really want to delete the record");
  if (ttt) {
    let del = document.getElementsByClassName("sno-id");
    console.log(del);
    for (let i = 0; i < del.length; i++) {
      if (del[i].innerText == id) {
        del[i].parentElement.remove();
      }
    }
    let tempObj = { id: `${id}` };

    fetch(`http://localhost:8082/deleteData/:${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tempObj),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => console.log(data));
  }
}

function updateData(id) {
  console.log(id);

  let tempObj = { id: `${id}` };
  console.log(id);
  fetch(`http://localhost:8082/updateData/:${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tempObj),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data.data[0]);
      let oldData = data.data[0];
      sNo.value = oldData.sno;
      fnam.value = oldData.name;
      dob.value = oldData.dob;
      desgnBtn.value = oldData.designation;
      var now = new Date(oldData.dob);

      var day = ("0" + now.getDate()).slice(-2);
      var month = ("0" + (now.getMonth() + 1)).slice(-2);

      var today = now.getFullYear() + "-" + month + "-" + day;

      dob.value = today;
      var dojj = new Date(oldData.doj);
      var da = ("0" + dojj.getDate()).slice(-2);
      var mont = ("0" + (dojj.getMonth() + 1)).slice(-2);

      var dt = dojj.getFullYear() + "-" + mont + "-" + da;
      doj.value = dt;

      for (let i = 0; i < genderbtn.length; i++) {
        if (genderbtn[i].value == oldData.gender) {
          genderbtn[i].checked = true;
          //console.log(genderbtn[i]);
        }
      }
      cmnts.value = oldData.comments;
      updatBtnClck = 1;
    });
  crBtn.click();
}

viewClsBTn.addEventListener("click", function () {
  // for (let i = 0; i < tempTR.length; i++) {
  //   tempTR[i].remove();
  //   console.log("tr remove");
  // }
  let main = document.getElementById("table-append");
  let tmain = main.getElementsByClassName("maintr");
  for (let i = 0; i < tmain.length; i++) {
    tmain[i].style.display = "none";
  }
});

var myModalEl = document.getElementsByClassName('view-modal')[0]
myModalEl.addEventListener('hidden.bs.modal', function (event) {
  // do something...
  let main = document.getElementById("table-append");
  let tmain = main.getElementsByClassName("maintr");
  for (let i = 0; i < tmain.length; i++) {
    tmain[i].style.display = "none";
  }
  // console.log("hehe");
})