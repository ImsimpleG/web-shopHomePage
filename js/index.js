// 获取元素
let getElem = ( selector ) =>{
    return document.querySelector(selector);
};
let getAllElem = ( selector ) =>{
    return document.querySelectorAll(selector);
};
// 获取元素的样式
let getCls = ( element ) =>{
    return element.getAttribute('class');
};
// 设置元素的样式
let setCls = ( element, cls ) =>{
    return element.setAttribute('class',cls);
};
// 为元素添加样式
let addCls = ( element , cls ) =>{
    let baseCls  = getCls(element);
    if( baseCls.indexOf(cls) === -1){
        setCls(element,baseCls+' '+cls); // 注意空格
    }
};
// 为元素删减样式
let delCls = ( element , cls) =>{
    let baseCls  = getCls(element);
    if( baseCls.indexOf(cls) > -1){ // 更精确的需要用正则表达式 ,因为这里只用于切换 _animate_in 所以没事
        setCls( element,baseCls.split(cls).join(' ').replace(/\s+/g,' ') );
    }
};

let screenAnimateElements = {
    '.screen-1' : [
        '.screen-1__heading',
        '.screen-1__phone',
        '.screen-1__shadow',
    ],
    '.screen-2' : [
        '.screen-2__heading',
        '.screen-2__subheading',
        '.screen-2__phone',
        '.screen-2__point_i_1',
        '.screen-2__point_i_2',
        '.screen-2__point_i_3',
    ],
    '.screen-3' : [
        '.screen-3__heading',
        '.screen-3__phone',
        '.screen-3__subheading',
        '.screen-3__features',
    ],
    '.screen-4' : [
        '.screen-4__heading',
        '.screen-4__subheading',
        '.screen-4__type__item_i_1',
        '.screen-4__type__item_i_2',
        '.screen-4__type__item_i_3',
        '.screen-4__type__item_i_4',
    ],
    '.screen-5' : [
        '.screen-5__heading',
        '.screen-5__subheading',
        '.screen-5__bg',
    ]
};

function setScreenAnimateInit(screenCls) {
    let animateElements =  screenAnimateElements[screenCls]; // 需要设置动画的元素
    for(let i=0;i<animateElements.length;i++){
        let element = document.querySelector(animateElements[i]);
        let baseCls = element.getAttribute('class');
        element.setAttribute('class',baseCls +' '+animateElements[i].substr(1)+'_animate_init');
    }
}

// 第一步：初始化设置
window.onload = () =>{
    //  为所有元素设置 init
    for(let k in screenAnimateElements){
        if (k === '.screen-1'){
            continue;
        }
        setScreenAnimateInit(k);
    }
};


function playScreenAnimateDone(screenCls){
    let animateElements =  screenAnimateElements[screenCls]; // 需要设置动画的元素
    for(let i=0;i<animateElements.length;i++){
        let element = document.querySelector(animateElements[i]);
        let baseCls = element.getAttribute('class');
        element.setAttribute('class',baseCls.replace('_animate_init','_animate_done'));
    }
}

// 默认加载第一屏动画
setTimeout(function(){playScreenAnimateDone('.screen-1');},100);

// 双向导航门定位
let navItems = getAllElem('.header__nav-item');
let outLineItems = getAllElem('.outline__item');
let switchNavItemsActive = (idx) =>{
    for (let i = 0; i < navItems.length; i++) {
        delCls(navItems[i],'header__nav-item_status_active');
        navTip.style.left = 0+'px';
    }
    for(let i=0;i<outLineItems.length;i++){
        delCls(outLineItems[i],'outline__item_status_active');
    }
    addCls(navItems[idx],'header__nav-item_status_active');
    addCls(outLineItems[idx],'outline__item_status_active');
    navTip.style.left = ( idx * 70 )+'px';
};

// 屏幕滚动播放
window.onscroll =  () => {
    let top = document.documentElement.scrollTop;
    if (top > 80 ) {
        addCls(getElem('.header'), 'header_status_black');
        addCls(getElem('.outline'), 'outline_status_in')
    } else{
        delCls(getElem('.header'),'header_status_black');
        delCls(getElem('.outline'),'outline_status_in');
        switchNavItemsActive(0);
    }
    if (top > 1){
        playScreenAnimateDone('.screen-1');
        switchNavItemsActive(0);
    }
    if (top > 700){
        playScreenAnimateDone('.screen-2');
        switchNavItemsActive(1);
    }
    if (top > 700*2){
        playScreenAnimateDone('.screen-3');
        switchNavItemsActive(2);
    }
    if (top > 700*3){
        playScreenAnimateDone('.screen-4');
        switchNavItemsActive(3);
    }
    if (top > 700*4){
        playScreenAnimateDone('.screen-5');
        switchNavItemsActive(4);
    }
};

// 双向定位
let setNavJump = (i,lib) =>{
    let item = lib[i];
    item.onclick = () =>{
        document.documentElement.scrollTop = i*800;
    }
};
for (let i = 0; i < navItems.length; i++) {
    setNavJump(i,navItems);
}
for (let i = 0; i < outLineItems.length; i++) {
    setNavJump(i,outLineItems);
}

// 滑动门
let navTip = getElem('.header__nav-tip');
let setTip = (idx,lib)=>{
    lib[idx].onmouseover =()=>{
        navTip.style.left = ( idx * 70 )+'px';
    };
    let currentIdx = 0;
    lib[idx].onmouseout = ()=>{
        console.log(currentIdx);
        for(let i=0;i<lib.length;i++){
            if( getCls(lib[i]).indexOf('header__nav-item_status_active') > -1  ){
                currentIdx = i;
                break;
            }
        }
        navTip.style.left = ( currentIdx * 70 )+'px';
    }
};

for (let i = 0; i < navItems.length; i++) {
    setTip(i,navItems);
}

