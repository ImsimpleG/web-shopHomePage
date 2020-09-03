
let [ menuContent, subMenu,  ] =
    [
        byId("screen-5__school__menu"),
        byId("screen-5__school__intro"),
    ];
let [   menuItems,innerBox  ] = [
    menuContent.getElementsByClassName("screen-5__school__menu_item"),
    subMenu.getElementsByClassName("screen-5__school__inner_box")
];
function byId(id) {
    return typeof (id) === "string" ? document.getElementById(id) : id;
}

function addHandler(element, type, handler) {
    if (element.addEventListener) {
        element.addEventListener(type, handler, false);
    } else if (element.attachEvent) {
        element.attachEvent("on" + type, handler);
    } else {
        element["on" + type] = handler;
    }
}

let schoolsTip = document.querySelector('.screen-5_school__item_tip_active');
for (let i = 0; i < menuItems.length; i++) {
    menuItems[i].setAttribute("data-index",i);
    addHandler(menuItems[i], "mouseover", function () {
        idx = this.getAttribute("data-index");
        for (let j = 0; j < innerBox.length; j++) {
            innerBox[j].style.display = "none";
            menuItems[j].style.color = "#2c2926";
        }
        innerBox[idx].style.display = "block";
        menuItems[idx].style.color = "#f08305";
        schoolsTip.style.top = (i * 49) + 'px';
    });
}



