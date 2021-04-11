export function historyStr(keyword)
{

    let history=window.localStorage.setItem('history',keyword.trim()+','+window.localStorage.getItem('history'));
}
export function strToHistoryArray()
{
    let history=window.localStorage.getItem('history');
    if(history)
    {
        history=history.split(",")
        history=history.filter((item,index)=>{
            if(item!=='null')
            {
                return item
            }
        })
        return history;
    }
    else{
        return [];
    }
}