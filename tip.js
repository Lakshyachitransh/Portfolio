
const web3= new Web3(Web3.givenProvider);
//getting the button and adding an event here

const button=document.querySelector('form');
console.log(button);
//hiding form when user have no account
if(window.ethereum){
    button.classList.add('has-eth');
}

const send = async (amount) =>{
    const accounts=await window.ethereum.request({ method:"eth_requestAccounts" });
    const wei=web3.utils.toWei(amount,'ether');

    //sending money to another account
    if(accounts.length>0){
        window.ethereum.request({ 
            method:"eth_sendTransaction",
            params:[{
                from:accounts[0],
                to:"0x95c5A9237b337214AfD590B080c6C15B7a6A0fFc",
                value:web3.utils.toHex(wei)
            }]
        })
    }
}
button.addEventListener('submit',(event) => {
    event.preventDefault();
    //this method preventDefault nature of submit
    if(window.ethereum){
        const input=document.querySelector('input');
        send(input.value)
    }else{
        const body = document.getElementsByTagName('body')
        console.log(body);
        
        const div = document.createElement('div');
        div.style.height="200px";
        div.style.width="400px";
        div.style.transform="translate(-50%,-50%)";
        div.style.border="2px solid grey";
        div.style.position="absolute";
        div.style.top="50%";
        div.style.left="50%";
        div.style.zIndex="100";
        div.style.backgroundColor="black";
        const h3=document.createElement('h3');
        h3.textContent="Please install MetaMask in your browser";
        div.appendChild(h3);
        div.style.padding="10px 10px 10px 10px";
        div.style.color="white";
        const button=document.createElement('button');
        button.style.height="70px";
        button.style.width="300px";
        button.style.alignItems="center";
        button.innerText="Create";
        div.appendChild(button);
        body[0].appendChild(div);
    }
})