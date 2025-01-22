const paths = document.querySelectorAll('#map path');
let isExpanded = false;

function highlightSelectedPath() {
    const pathName = localStorage.getItem("alina");
    if (pathName) {
        const path = document.querySelector(`#map path[name='${pathName}']`);
        if (path) {
            //path.style.fill = "#ffffff";
            let sect = document.createElement('section');
            let ul=document.createElement('ul');
            const info = document.getElementById('info');

            removeAllChildNodes(info);
            removeAllChildNodes(ul);

            info.style.display = 'block';
            const h3=document.createElement('h3')
            let img = document.createElement('img');
            let but = document.createElement('button');

            ul.setAttribute('id','ajutor');
            but.setAttribute('id','aratatext');
            but.setAttribute('class','buton');
            but.innerText="Mai mult"
            but.onclick=function aratatext(){
                const text = document.getElementById("desc");
                const buton = document.getElementById("aratatext");
                text.classList.toggle("expanded");
                isExpanded = !isExpanded;
                buton.innerText = isExpanded ? "Mai putin" : "Mai mult";
            };

            let par= document.createElement('p');
            par.setAttribute('id', 'desc');
            par.setAttribute('class', 'articol content');
            img.setAttribute('id', 'poza');
            img.setAttribute('class', 'imagine1');

            h3.className="h3";
            const hr=document.createElement('hr')
            hr.className="line";
            h3.innerText=`Judetul ${pathName}`;
            display(pathName);

            sect.appendChild(par);
            info.appendChild(h3);
            info.appendChild(hr);
            info.appendChild(img);
            info.appendChild(sect);
            info.appendChild(ul);
            info.appendChild(but);

            var origcolour="#6f9c76";
            paths.forEach(p => p.style.fill = origcolour);
            var colourr = "#004400";
            path.style.fill = colourr;

            localStorage.removeItem("alina");

        }
    }
}
window.onload = function() {
    highlightSelectedPath();
};
async function getMainImage(jud) {
    const url = "https://ro.wikipedia.org/w/api.php?action=query&titles="+jud+"&prop=pageimages&format=json&pithumbsize=500&origin=*";
    const response = await fetch(url);
    const data = await response.json();
    const page = Object.values(data.query.pages)[0];
    return page.thumbnail ? page.thumbnail.source : '';
}
async function getIntroText(jud) {
    const url = "https://ro.wikipedia.org/w/api.php?action=query&prop=extracts&exintro=true&explaintext=true&titles="+jud+"&format=json&origin=*";
    const response = await fetch(url);
    const data = await response.json();
    const page = Object.values(data.query.pages)[0];
    return page.extract;
}
async function getHTMLContent(jud) {
    const url = "https://ro.wikipedia.org/w/api.php?action=parse&page="+jud+"&prop=text&format=json&origin=*";
    const response = await fetch(url);
    const data = await response.json();
    return data.parse.text["*"];
}
function parseInfoboxData(cuvant, htmlContent) {
    pageContent=htmlContent;
    const parser = new DOMParser();
    const doc = parser.parseFromString(pageContent, "text/html");
    let rezultat = "Nu e specificat";
    var regionCell="";
    const rows = doc.querySelectorAll("tr");
    rows.forEach(row => {
        if (row.querySelector('th') && row.querySelector('th').textContent.includes(cuvant)||row.querySelector('th') && row.querySelector('th').textContent.includes(cuvant.toLowerCase())) {
            regionCell = row.querySelector("th.adr .region a");
            if (regionCell) { rezultat = regionCell.textContent.trim();  }
        }
        if (rezultat=="Nu e specificat"){
            if (row.querySelector('th') && row.querySelector('th').textContent.includes(cuvant)||row.querySelector('th') && row.querySelector('th').textContent.includes(cuvant.toLowerCase())||row.querySelector('th') && row.querySelector('th').textContent.includes("resedință")) {
                regionCell = row.querySelector("td a");
                if (regionCell) { rezultat = regionCell.textContent.trim(); }
            }
        }
       // if (rezultat=="Nu e specificat"){
            if (cuvant === "Populație") {
                if (row.querySelector('th') && row.querySelector('th').textContent.includes('Total')||row.querySelector('th') && row.querySelector('th').textContent.includes('Județ')||row.querySelector('th') && row.querySelector('th').textContent.includes('Municipiu')) {
                    if (row.querySelector('td') && row.querySelector('td').textContent.includes("locuitori")) {
                        regionCell = row.querySelector("td");
                        if (regionCell) { rezultat = regionCell.textContent.trim(); } }
                }}
     //   }
    });
    return rezultat;
}
async function display (jud){
    if (jud!='București') { jud='Județul_'+jud;}
    const img=await getMainImage(jud);
    let image = document.getElementById('poza');
    let d=document.getElementById('desc');
    let da=await getHTMLContent(jud)
    const desc=await getIntroText(jud);
    d.innerText= desc;
    if (image) { image.src =img; }
    else { console.error('Nu exista poza');}
    const cuvant = ["Regiune","Reședință","Populație"];
    let ul=document.getElementById('ajutor');
    ul.innerHTML='';
    for (let i = 0; i < cuvant.length; i++) {
        let li=document.createElement('li');
        let p=document.createElement('p');
        p.setAttribute('class','textli');
        if(parseInfoboxData(cuvant[i],da)==="Nu e specificat"){  p.innerText=cuvant[i]+": București";}
        else{ p.innerText=cuvant[i]+":"+parseInfoboxData(cuvant[i],da);}
        li.appendChild(p);
        ul.appendChild(li);
        // console.log(cuvant[i]+":"+parseInfoboxData(cuvant[i],da));
    }
    //cuvant.forEach((cuv)=>console.log(parseInfoboxData(cuv,da)));
}
function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}
paths.forEach(path => {
    path.addEventListener('click', () => {
        let sect = document.createElement('section');
        let ul=document.createElement('ul');
        const info = document.getElementById('info');
        const regname=path.getAttribute('name');
        localStorage.setItem("alina", regname);
        console.log(localStorage.getItem("alina"));
        removeAllChildNodes(info);
        removeAllChildNodes(ul);

        info.style.display = 'block';
        const h3=document.createElement('h3')
        let img = document.createElement('img');
        let but = document.createElement('button');

        ul.setAttribute('id','ajutor');
        but.setAttribute('id','aratatext');
        but.setAttribute('class','buton');
        but.innerText="Mai mult"
        but.onclick=function aratatext(){
            const text = document.getElementById("desc");
            const buton = document.getElementById("aratatext");
            text.classList.toggle("expanded");
            isExpanded = !isExpanded;
            buton.innerText = isExpanded ? "Mai putin" : "Mai mult";
        };

        let par= document.createElement('p');
        par.setAttribute('id', 'desc');
        par.setAttribute('class', 'articol content');
        img.setAttribute('id', 'poza');
        img.setAttribute('class', 'imagine1');

        h3.className="h3";
        const hr=document.createElement('hr')
        hr.className="line";
        h3.innerText=`Judetul ${regname}`;
        display(regname);

        sect.appendChild(par);
        info.appendChild(h3);
        info.appendChild(hr);
        info.appendChild(img);
        info.appendChild(sect);
        info.appendChild(ul);
        info.appendChild(but);

        var origcolour="#6f9c76";
        paths.forEach(p => p.style.fill = origcolour);
        var colour = "#004400";
        path.style.fill = colour;

    });
});
