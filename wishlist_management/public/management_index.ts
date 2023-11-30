const basicURL = 'http://Localhost:3000/wishlist/children';
const postChild = async () =>{
    let age =  parseInt((document.getElementById("child-age") as HTMLInputElement).value);
    let name = (document.getElementById("child-name") as HTMLInputElement).value;
    let data = await fetch(basicURL, {
        method : "POST",
        headers : {
            "Content-Type" : "application/JSON"
        },
        body : JSON.stringify({
            name,
            age
        })
    })
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
        } )
    } catch(ex){
        console.log("err, did not find name");
        return;
    }


    //const data = await fetch(basicURL)
}