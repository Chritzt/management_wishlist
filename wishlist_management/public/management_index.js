"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const basicURL = 'http://Localhost:3000/wishlist/children';
const postChild = () => __awaiter(void 0, void 0, void 0, function* () {
    let age = parseInt(document.getElementById("child-age").value);
    let name = document.getElementById("child-name").value;
    let response = yield fetch(basicURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/JSON"
        },
        body: JSON.stringify({
            name,
            age
        })
    });
    document.getElementById("error-message").innerText = response.statusText;
    dropDownFunction();
});
const postWish = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("hallo");
    let name = document.getElementById("wish-child").value;
    let wishName = document.getElementById("wish-name").value;
    let url = document.getElementById("wish-URL").value;
    let imageURL = document.getElementById("wish-Image-URL").value;
    const data = yield fetch(basicURL);
    const arr = yield data.json();
    try {
        const obj = arr.find(e => e.name === name);
        console.log(obj.id);
        const res = yield fetch(basicURL + `/${obj.id}/wishes`, {
            method: "POST",
            headers: {
                "Content-Type": "application/JSON"
            },
            body: JSON.stringify({
                "name": wishName,
                "url": url,
                "img_url": imageURL
            })
        });
        document.getElementById("error-message").innerText = res.statusText;
    }
    catch (ex) {
        console.log("err, did not find name");
        return;
    }
});
window.onload = () => {
    dropDownFunction();
};
const dropDownFunction = () => __awaiter(void 0, void 0, void 0, function* () {
    const allChilds = yield fetch(basicURL);
    const JSONallChilds = yield allChilds.json();
    let out = "";
    JSONallChilds.forEach((e) => {
        out += `<option value="${e.name}">${e.name}</option>`;
    });
    document.getElementById("wish-child").innerHTML = out;
});
