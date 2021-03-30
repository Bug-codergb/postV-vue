export function textEllipsis(content,line,box)
{
    let single=1;
    for(let i in content)
    {
        box.innerHTML+=content[i];
        if(i==1)
        {
            console.log(box.innerHTML)
            console.log(box.clientHeight)
            single=box.clientHeight;
        }
        if(i>1)
        {
            console.log(single*line)
            if(box.clientHeight>single*line)
            {
                box.innerHTML=content.substr(0,i-2)+"..."
                break;
            }
        }

    }
}