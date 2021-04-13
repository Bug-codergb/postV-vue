export function getVideoBase64(url) {
    return new Promise((resolve,reject)=>{
        const canvas=document.createElement('canvas');
        const ctx=canvas.getContext("2d");

        const video=document.createElement('video');
        /*video.setAttribute('width','300');*/
        /*video.setAttribute('height','300');*/
        video.setAttribute('controls',"controls");
        console.log(video.offsetHeight,video.offsetWidth)
        video.src=url;
        video.currentTime =1;
        video.oncanplay=function (){
            //console.log(video.videoHeight,video.videoWidth)
            canvas.height = video.videoHeight;
            canvas.width=video.videoWidth;
            ctx.drawImage(video,0,0, video.videoWidth,video.videoHeight);
            let dataUrl=canvas.toDataURL("image/png");
            resolve(dataUrl);
        }
    })
}
export function getVideoImage(url, filename) {
    filename=filename.replace('.mp4','');
    let arr = url.split(',')
    let type = arr[0].match(/:(.*?);/)[1]
    let fileExt = type.split('/')[1]
    let bstr = atob(arr[1])
    let n = bstr.length
    let u8arr = new Uint8Array(n)
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename+'.' + fileExt, {
        type: "image/png"
    });
}

export function getVideoDuration(file)
{
    let url = URL.createObjectURL(file);
    let oVideo = document.createElement('video');
    oVideo.setAttribute('src',url);
    return new Promise((resolve,reject)=>{
        oVideo.oncanplay = ()=>{
            resolve(oVideo.duration*1000)
        }
    })
}