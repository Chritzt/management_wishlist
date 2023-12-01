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
const baseURL = 'http://localhost:3000/wishlist/children';
window.onload = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("hallo");
    const data = yield fetch(baseURL);
    const jsonData = yield data.json();
    let stringOut = "";
    jsonData.forEach((e) => {
        stringOut +=
            `<tr class="table-row" onClick="getWishes('${e.name}')">`
                + `<td class="table-elements">${e.name}</td>`
                + `<td class="table-elements">${e.age}</td> </tr>`;
    });
    console.log(stringOut);
    document.getElementById('child-tBody').innerHTML = stringOut;
});
const getWishes = (name) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield fetch(baseURL);
    const arr = yield data.json();
    try {
        const obj = arr.find(e => e.name === name);
        console.log(obj.wishes);
        const objWishes = obj.wishes;
        let stringOut = "";
        objWishes.forEach((w) => {
            stringOut +=
                `<tr class="wish-table-row">`
                    + `<td class="wish-table-elements">${w.name}</td>`
                    + `<td class="wish-table-elements"><a href="${w.URL}">Link</a></td> `
                    + `<td class="wish-table-elements"><img src="${w.img_url}" class="wish-img"></td></tr>`;
        });
        document.getElementById('wishes-tBody').innerHTML = stringOut;
    }
    catch (ex) {
        console.log("err, did not find name");
        return;
    }
});
