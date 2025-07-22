const generateButton=document.getElementById("generate-btn");
const paletteContainer=document.querySelector(".palette-container");

generateButton.addEventListener("click",generatePalette);

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
