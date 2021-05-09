import Message from "./Message";
const obj={};
obj.install=(Vue)=>{
    const MessageConstructor=Vue.extend(Message);
    const message=new MessageConstructor();
    message.$mount(document.createElement("div"));
    document.body.appendChild(message.$el);
    Vue.prototype.$message=message;
}
export default obj;