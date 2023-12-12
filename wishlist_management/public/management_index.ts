const basicURL = 'http://Localhost:3000/wishlist/children';
const postChild = async () =>{
    let age =  parseInt((document.getElementById("child-age") as HTMLInputElement).value);
    let name = (document.getElementById("child-name") as HTMLInputElement).value;
    let response = await fetch(basicURL, {
        method : "POST",
        headers : {
            "Content-Type" : "application/JSON"
        },
        body : JSON.stringify({
            name,
            age
        })
    });

    (document.getElementById("error-message") as HTMLParagraphElement).innerText = response.statusText;

    dropDownFunction();
}

const postWish = async () =>{
    console.log("hallo");
    let name = (document.getElementById("wish-child") as HTMLInputElement).value;
    let wishName = (document.getElementById("wish-name") as HTMLInputElement).value;
    let url = (document.getElementById("wish-URL") as HTMLInputElement).value;
    let imageURL = (document.getElementById("wish-Image-URL") as HTMLInputElement).value;

    const data = await fetch(basicURL);
    const arr : any[] = await data.json();

    try{
        const obj : any = arr.find(e => e.name === name);

        console.log(obj.id)
        const res = await fetch(basicURL + `/${obj.id}/wishes`, {
            method : "POST",
            headers : {
                "Content-Type" : "application/JSON"
            },
            body : JSON.stringify({
                "name" : wishName,
                "url" : url,
                "img_url" : imageURL

            })
        });
        (document.getElementById("error-message") as HTMLParagraphElement).innerText = res.statusText;
    } catch(ex){
        console.log("err, did not find name");
        return;
    }



}

window.onload =  () =>{
    dropDownFunction();
}

const dropDownFunction = async () =>{
    const allChilds = await fetch(basicURL);
    const JSONallChilds = await allChilds.json();
    let out : any = "";

    JSONallChilds.forEach( (e : any) =>{
        out  += `<option value="${e.name}">${e.name}</option>`;
    });
    (document.getElementById("wish-child") as HTMLSelectElement).innerHTML = out;
}