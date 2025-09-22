let count = 0;
function eve(event)
{
    event.currentTarget.style = "box-shadow : 5px 5px 15px rgb(0,0,0,3); "
    event.currentTarget.style.transform = "scale(1.05)";
    event.currentTarget.style.transition = "transform 0.2s ease";
}
function eve1(event)
{
    event.currentTarget.style = "box-shadow : none; padding : 8px 12px;"
}
function use(res)
{
    let n = Number(res.quantity)
        let text = document.createTextNode(`${res.name} - ${res.price} - ${res.quantity}`)
        let txt = document.createElement("p")
        txt.appendChild(text)
        let ele = document.createElement("li")
        let ele2 = document.createElement("div")
        let ele21 = document.createElement("button")
        ele21.innerText = "delete"
        ele21.addEventListener("click",(event)=>{
            let id = res._id;
            axios.delete(`https://crudcrud.com/api/ea2ea5e709a64dd5a14713e26c1f78c9/vegetables/${id}`)
            document.querySelector("ul").removeChild(ele)
            count--
            document.querySelector("#a2").innerText = `Total : ${count}`
        })
    ele2.appendChild(ele21)
    let ele3 = document.createElement("div")
        let ele31 = document.createElement("button")
    let ele32 = document.createElement("input");
        ele32.id = "css1"
        ele32.type = "number"
        ele3.appendChild(ele32)
        ele31.innerText = "Buy"
    function up()
    {
            if(n!==0)
            {
                if(ele32.value<=n)
                {
                    let q = n - ele32.value
                    n = q
                    let obj = {
                        "name" : res.name,
                        "price" : res.price,
                        "quantity" : q
                    }
                    let id = res._id;
                    axios.put(`https://crudcrud.com/api/ea2ea5e709a64dd5a14713e26c1f78c9/vegetables/${id}`,obj).then((rr)=>
                        {
                            console.log(rr)
                            txt.removeChild(text)
                            ele.removeChild(txt)
                            ele.removeChild(ele3)
                            ele.removeChild(ele2)
                            document.querySelector("ul").removeChild(ele)
                            text = document.createTextNode(`${res.name} - ${res.price} - ${q}`)
                            txt.appendChild(text)
                            ele.appendChild(txt)
                            ele.appendChild(ele3)
                            ele3.appendChild(ele32)
                            ele3.appendChild(ele31)
                            ele31.addEventListener("click",up)
                            ele.appendChild(ele2)
                            ele.addEventListener("mouseover",eve)
                            ele.addEventListener("mouseout",eve1)
                            document.querySelector("ul").appendChild(ele)
                        }
                    ).catch()
                }
            }
    }
    ele31.addEventListener("click",up)
    ele3.appendChild(ele31)
        ele.appendChild(txt)
        ele.appendChild(ele3)
        ele.appendChild(ele2)
    ele.addEventListener("mouseover",eve)
    ele.addEventListener("mouseout",eve1)
        document.querySelector("ul").appendChild(ele)
}
function f(r)
{
    for(let i=0;i<r.data.length;i++)
    {
        use(r.data[i]);
    }
}
window.addEventListener("load",()=>{
    axios.get("https://crudcrud.com/api/ea2ea5e709a64dd5a14713e26c1f78c9/vegetables").then((response)=>{
        f(response);
        count = response.data.length
        document.querySelector("#a2").innerText = `Total : ${count}`
    }).catch((e)=>{
        console.log(e)
    })
})
document.querySelector("form").addEventListener("submit", (event)=> {
    event.preventDefault()
    let name = event.target.vname.value;
    let price = event.target.vprice.value;
    let quantity = event.target.vquantity.value;
    let obj = {
        "name": name,
        "price": price,
        "quantity": quantity
    }
    axios.post("https://crudcrud.com/api/ea2ea5e709a64dd5a14713e26c1f78c9/vegetables", obj).then((response) => {
        console.log(response)
        use(response.data)
        count++
        document.querySelector("#a2").innerText = `Total : ${count}`
        document.querySelector("form").reset()
        }).catch((error) => {
            console.log(error)
        })

    })