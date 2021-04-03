export function holder(count,line)
{
    if(count<line)
    {
        return line-count;
    }
    else if(count%line===0)
    {
        return 0;
    }
    else{
        let rem=Math.ceil(count/line);
        return rem*line-count;
    }
}