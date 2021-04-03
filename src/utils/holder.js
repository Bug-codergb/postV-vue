export function holder(count,line)
{
    //console.log(count,line)
    let rem=count%line;
    if(rem===0)
    {
        return 0;
    }
    else{
        return count-rem;
    }
}