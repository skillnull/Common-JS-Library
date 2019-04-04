/**
 * 可以传入event则阻止冒泡，不传不阻止
 * @param event
 */
function someClick (event) {
    if (event && event.stopPropagation) {
        event.stopPropagation()  // w3c
    } else {
        window.event.cancelBubble = true // IE
    }
    // TODO 需要阻止冒泡的事件
}