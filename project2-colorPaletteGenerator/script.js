const generateButton=document.getElementById("generate-btn");
const paletteContainer=document.querySelector(".palette-container");

generateButton.addEventListener("click",generatePalette);

paletteContainer.addEventListener("click",(e)=>{
    if(e.target.classList.contains("copy-button")){
        const hexValue=e.target.previousElementSibling.textContent;

        navigator.clipboard.writeText(hexValue).then(  ()=>showCopySuccess(e.target)).catch((e)=>{alert(e)});
    }
    else if(e.target.classList.contains("color")){
        const hexValue=e.target.nextElementSibling.textContent;

        navigator.clipboard.writeText(hexValue).then(  ()=>showCopySuccess(e.target.nextElementSibling.querySelector(".copy-button"))).catch((e)=>{alert(e)});
    }
});

function showCopySuccess(e){
    e.classList.remove("far"  ,"fa-copy");
    e.classList.add("fas","fa-check");

    e.style.color='#48bb78';

    setTimeout(()=>{
    e.classList.remove("fas","fa-check");
    e.classList.add("far"  ,"fa-copy");

    e.style.color="";


    },1500);
}

function generatePalette(){

    const colors=[];
    for(let i=0;i<5;i++){
        colors.push(generateRandomColor());
    }
    updatePalette(colors);
}


function generateRandomColor(){
    let letters="0123456789ABCDEF";
    let color="#";
    for(let i=0;i<6;i++){
        color+=letters[Math.floor(Math.random()*16)];
    }
    return color;
}

function updatePalette(colors){
    const colorBoxes=document.querySelectorAll(".color-box");

    colorBoxes.forEach((box,index)=>{
        const color=colors[index];
        const colorDiv=box.querySelector(".color");
        const hexValue=box.querySelector(".hex-value");

        colorDiv.style.backgroundColor=color;
        hexValue.textContent=color;

    });
}



generatePalette();
