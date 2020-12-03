// 基准大小
const baseSize = 14;
// 设置 rem 函数
function setRem() {
  // 当前页面宽度相对于 750 宽的缩放比例，可根据自己需要修改。
  const scale = document.documentElement.clientWidth / 1920;
  // 设置页面根节点字体大小
  let fontSize = (baseSize * Math.min(scale, 2)) < 10 ? 10: (baseSize * Math.min(scale, 2));
  //let fontSize = (baseSize * Math.min(scale, 2))
  document.documentElement.style.fontSize = fontSize  + 'px';
  //document.body.style.fontSize = fontSize + 'px'
}
// 初始化
setRem();

// 改变窗口大小时重新设置 rem 使用防抖
function debounce(callback,wait){
  let timer;
  return ()=>{
    clearTimeout(timer);
    timer = setTimeout(callback,wait)
  }
}
window.onresize = debounce(setRem,500);


