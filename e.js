const inputtext=document.querySelector("#inn");
const image=document.querySelector("#imgg")
const genbtn=document.querySelector("#btn")
const gif=document.querySelector("#load")
const resetbtn=document.querySelector("#reset")
const downbtn=document.querySelector("#download")
resetbtn.addEventListener("click",()=>{
	inputtext.value=" "
	window.location.reload();
})
async function query(data) {
	const response = await fetch(
		"https://api-inference.huggingface.co/models/ZB-Tech/Text-to-Image",
		{
			headers: {
				Authorization: `Bearer ${key}`,
				"Content-Type": "application/json",
			},
			method: "POST",
			body: JSON.stringify({"inputs": inputtext.value}),
		}
	);
    image.style.display="block";
	gif.style.display="none";
	const result = await response.blob();
	return result;
}
async function generate() {
	gif.style.display="block";
    query().then((response) => {
        const objurl = URL.createObjectURL(response);
        image.src=objurl;
		downbtn.addEventListener("click",()=>{
			download(objurl);
		})
    });   
}
genbtn.addEventListener("click",()=>{
    generate();
})
inputtext.addEventListener("keydown",(e)=>{
    if(e.key=="Enter"){
        generate();
    }
})
function download(objecturl) {
	fetch(objecturl).then(res=>res.blob())
	.then(file=>{
		let a=document.createElement("a");
		a.href=URL.createObjectURL(file);
		a.download=new Date().getTime();
		a.click();
	})
	.catch(()=>alert("failed download"))
}