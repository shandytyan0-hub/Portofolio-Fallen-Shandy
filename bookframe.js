const frame = document.getElementById("bookframe");
const closeBtn = document.getElementById("closeBtn");
const glow = document.querySelector('.glow');
const items = document.querySelectorAll('.item');


const glowMap = {
    "cv": "glow/glowcv.png",
    "digi": "glow/glowdigi.png",
    "art": "glow/glowart.png",
    "serti": "glow/glowserti.png",
    "profile": "glow/glowprofile.png"
};


const glowSettings = {
    "cv": {
        scale: 1,
        offsetX: 0,
        offsetY: 0,
        rotate: 0    
    },
    "digi": {
        scale: 1,
        offsetX: 0,
        offsetY: 0,
        rotate: 3
    },
    "art": {
        scale: 1.03,
        offsetX: 5,
        offsetY: 5,
        rotate: 0
    },
    "serti": {
        scale: 1,
        offsetX: 0,
        offsetY: 0,
        rotate: 0
    },
    "profile": {
        scale: 1.03,
        offsetX: 0,
        offsetY: 0,
        rotate: -2
    }
};


function showFrame(src) {
    frame.style.display = "block";
    closeBtn.style.display = "block";
    frame.src = src;
}

function closeFrame() {
    frame.style.display = "none";
    closeBtn.style.display = "none";
    frame.src = "";
}

function clearHoverEffects() {
    glow.classList.remove("show");
    document.body.classList.remove("dimmed");
    items.forEach(i => i.classList.remove("active"));
}

function cvframe()     { clearHoverEffects(); showFrame("cv/cv.html"); }
function digiframe()   { clearHoverEffects(); showFrame("digi/digi.html"); }
function manualframe() { clearHoverEffects(); showFrame("art/manual.html"); }
function sertiframe()  { clearHoverEffects(); showFrame("sertifikat/sertif.html"); }
function profileframe(){ clearHoverEffects(); showFrame("profile/pro.html"); }


items.forEach(item => {
    item.addEventListener('mouseenter', () => {
        let key = [...item.classList].find(c => glowMap[c]);
        
        if (key) glow.src = glowMap[key];
        
        let rect = item.getBoundingClientRect();
        let settings = glowSettings[key] || { scale: 1, offsetX: 0, offsetY: 0, rotate: 0 };
        
        let newWidth = rect.width * settings.scale;
        let newHeight = rect.height * settings.scale;
        
        let centerOffsetX = (newWidth - rect.width) / 2;
        let centerOffsetY = (newHeight - rect.height) / 2;
        
        glow.style.left = (rect.left + window.scrollX - centerOffsetX + settings.offsetX) + "px";
        glow.style.top  = (rect.top + window.scrollY - centerOffsetY + settings.offsetY) + "px";
        glow.style.width  = newWidth + "px";
        glow.style.height = newHeight + "px";
        glow.style.transform = `rotate(${settings.rotate}deg)`;
        
        glow.classList.add("show");
        item.classList.add("active");
        document.body.classList.add("dimmed");
    });
    
    item.addEventListener('mouseleave', () => {
        glow.classList.remove("show");
        item.classList.remove("active");
        document.body.classList.remove("dimmed");
    });
});