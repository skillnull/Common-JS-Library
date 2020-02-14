###### 图片上传
```html
<div id="upload_btn_box">
     <span class="add-img-box" onclick="uploadImg()">
        点击上传
     </span>
    <input id="upload_input" type="file" accept="image/*" hidden>
</div>
```
```js
    let imgName = '' // 图片名称
    let imaFile = '' // 图片文件

    // 点击上传
    function uploadImg () {
        $('#upload_input').click()
    }
    window.onload = function () {
        $('#upload_input').on('change', (event) => {
            let files = event && event.target && event.target.files
            let file = files && files[0]
            let fileSize = file.size
            if (fileSize / Math.pow(1024, 2) > 10) {
                notTips('最大允许10M')
                return
            }
            imgName = file.name 
            fileRead = new FileReader()
            fileRead.readAsDataURL(file)
            fileRead.onload = function (e) {
                imgFile = e.target.result // 转为base64后的图片文件
            }
        })
    }
```