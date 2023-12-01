const baseURL = 'http://localhost:3000/wishlist/children';

window.onload = async () =>{
    console.log("hallo")
    const data = await fetch(baseURL)
    const jsonData = await data.json();

    let stringOut = "";
    jsonData.forEach((e : any) =>{
        stringOut +=
            `<tr class="table-row" onClick="getWishes('${e.name}')">`
            + `<td class="table-elements">${e.name}</td>`
            + `<td class="table-elements">${e.age}</td> </tr>`
    })

    console.log(stringOut);

    document.getElementById('child-tBody')!.innerHTML = stringOut;
}

const getWishes = async (name : string) =>{
    const data = await fetch(baseURL);
    const arr : any[] = await data.json();

    try{
        const obj : any = arr.find(e => e.name === name );

        console.log(obj.wishes)

        const objWishes = obj.wishes;

        let stringOut = "";
        objWishes.forEach((w : any) =>{
            stringOut +=
                `<tr class="wish-table-row">`
                + `<td class="wish-table-elements">${w.name}</td>`
                + `<td class="wish-table-elements"><a href="${w.URL}">Link</a></td> `
                + `<td class="wish-table-elements"><img src="${w.img_url}" class="wish-img"></td></tr>`
        })

        document.getElementById('wishes-tBody')!.innerHTML = stringOut;

    } catch(ex){
        console.log("err, did not find name");
        return;
    }
}
