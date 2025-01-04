export function rgbToHex(R,G,B,A) {return toHex(R) + toHex(G) + toHex(B) + (A < 1 ? toHex(Math.round(A * 255)) : '');}

export function toHex(value) {
    value = Math.max(0, Math.min(255, Math.round(value)));
    
    return value.toString(16).padStart(2, '0').toUpperCase();
}

export function makeColor (event, canvasRef, pointer) {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;

    if(x < 0) {
        x = 0
    } else if(x > 199) {
        x = 199
    } 

    if(y < 0) {
        y = 0
    } else if (y > 126) {
        y = 126
    }

    pointer.current.style.top = `${y}px`
    pointer.current.style.left = `${x}px`

    return ctx.getImageData(x, y, 1, 1).data;
}

export function getColor(event, ref) {
    const canvas = ref.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;

    return ctx.getImageData(x, y, 1, 1).data;
}

export function initCnavasImage (ref, width, height, image) {
    const canvas = ref.current;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });

    const img = new Image();
    img.src = image;
    img.onload = function () {
        ctx.drawImage(img, 0, 0, width, height);
    };
}

export function validateFields (data) {
    const emptyFields = Object.keys(data).filter(key => !data[key]);

    if (emptyFields.length > 0) {
        return emptyFields;
    }

    return null; 
};

export function validateArray (array) {
    return array.some(item => {
        return !item.file || !item.description || !item.imageName;
    });
};

export function formatDate(isoDate) {
    const date = new Date(isoDate);
    
    if (isNaN(date.getTime())) {
        throw new Error("Invalid date format");
    }
    
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); 
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    
    return `${day}.${month}.${year} ${hours}:${minutes}`;
}