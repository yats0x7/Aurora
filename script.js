
alert("Script is working! Close this and try the buttons.");
console.log("Aurora script.js loaded!");


const btn = document.getElementById('theme-toggle');
const body = document.body;


if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-mode');    
    if (btn) btn.textContent = '☀️ Light Mode'; 
}


if (btn) {
    btn.addEventListener('click', () => {
       
        const isDark = body.classList.toggle('dark-mode');

       
        if (isDark) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }

    
        if (isDark) {
            btn.textContent = '☀️ Light Mode';
        } else {
            btn.textContent = '🌙 Dark Mode';
        }

    });
}

// Buy Button Logic
const buyBtn = document.getElementById('buy-button');
if (buyBtn) {
    buyBtn.addEventListener('click', () => {
        alert("are you sure you want to make payment");
    });
}

// Gift Checkbox Logic
const giftCheckbox = document.getElementById('gift');
if (giftCheckbox) {
    giftCheckbox.addEventListener('change', () => {
        if (giftCheckbox.checked) {
            console.log("Yayyyy! this is a gift");
        }
    });
}
