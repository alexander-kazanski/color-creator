const buttonEl = document.getElementById("button");

buttonEl.addEventListener('mouseover', function(e) {
    e.target.textContent = 'God speed';
})

buttonEl.addEventListener('mouseout', function(e) {
    e.target.textContent = 'Get color schema';
})

buttonEl.addEventListener('click', function(e) {
    e.preventDefault();
    if (document.querySelectorAll('.pallet-wrapper').length > 0) {
        document.getElementById('body').innerHTML = ''
    }
    const inputValue = document.getElementById("select");
    const palletColorArray = [];
    const hexInput = document.getElementById('color');
    fetch(`https://www.thecolorapi.com/scheme?hex=${hexInput.value.slice(1)}&mode=${inputValue.value}`)
        .then(response => response.json())
        .catch(err => console.log(err))
        .then(data => {
            for (let color of data.colors.reverse()) {
                const { hex: { value } } = color;
                console.log(color, value);
                palletColorArray.push(value);
            }
            renderPalletBlock(palletColorArray);
        })
        .catch(err => console.log(err));
    })


function renderPalletBlock(colorArray) {
    const bodyEl = document.getElementById('body');
    for (let color of colorArray) {
        const palletWrapper = document.createElement('div')
        palletWrapper.classList.add('pallet-wrapper');
        const pallet = document.createElement('div')
        pallet.classList.add('pallet');
        pallet.style.backgroundColor = color;
        palletWrapper.appendChild(pallet);
        const palletColor = document.createElement('p');
        palletColor.textContent = color;
        palletWrapper.appendChild(palletColor);
        bodyEl.appendChild(palletWrapper);
    }
}