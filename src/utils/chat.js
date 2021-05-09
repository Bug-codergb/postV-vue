export function chat(content)
{
    let ws=new WebSocket("ws://localhost:8200/");
    ws.onopen=()=>{
        console.log("ee")
        ws.send(content);
    }
    return new Promise((resolve,reject)=>{
        ws.onmessage=(msg)=>{
            console.log("woshidata");
            resolve(msg.data);
        }
    })
}