const $= document.querySelector.bind(document)
const $$= document.querySelectorAll.bind(document)

const Setting={
    Tables: [
        'QUEQUAN',
        'NGHENGHIEP',
        'QUANHE',
        'NGUYENNHAN',
       'DIADIEMMAITANG',
        'LOAITHANHTICH'
        ],
    TablesInfo:{
        QUEQUAN : [['MaQueQuan','TenQueQuan'],['92','Quang Nam'],['59','Sai Gon'],['93','Binh Phuoc'],['43','Da Nang']],
        NGHENGHIEP : [['MaNgheNghiep','TenNgheNghiep'],['92','AI Engineer'],['59','Sai Gon'],['93','Binh Phuoc'],['43','Da Nang']],
        QUANHE : [['MaQuanHe','TenQuanHe'],['1','Vợ/Chồng'],['2','Con']],
        NGUYENNHAN : [['MaQueQuan','TenQueQuan'],['92','Quang Nam'],['59','Sai Gon'],['93','Binh Phuoc'],['43','Da Nang']],
       DIADIEMMAITANG : [['MaQueQuan','TenQueQuan'],['92','Quang Nam'],['59','Sai Gon'],['93','Binh Phuoc'],['43','Da Nang']],
        LOAITHANHTICH : [['MaQueQuan','TenQueQuan'],['92','Quang Nam'],['59','Sai Gon'],['93','Binh Phuoc'],['43','Da Nang']],
    },
    render : function() {
        const SelectBox=$('.chooseTableContainer select')
        var optionListHTML='<option value="default" disabled selected hidden>Choose Table</option>'
        optionListHTML=this.Tables.reduce((savedValue,current,index)=> {return savedValue+`<option value="${index}" >${current}</option>`},optionListHTML)
        // console.log(optionListHTML);
        SelectBox.innerHTML=optionListHTML
    },
    handleEvents: function(){
        var editButtons=$$('.buttonBox .editButton')
        var deleteButtons=$$('.buttonBox .deleteButton')
        const ChooseButton= $('#settingContainer .Button')
        const SelectBox=$('.chooseTableContainer select')
        ChooseButton.onclick=()=>{
            // console.log('Oke')
            const SelectValue=this.Tables[SelectBox.value]
            // console.log(SelectValue)
            // Gọi API trả về bảng value
            data=this.TablesInfo[SelectValue]
            // console.log(data)
            const tableList=$('.tableList')
            tableListInnerHTML=''
            tableListInnerHTML=data.reduce((savedValue,[ID,Content],index)=>{
                if (index==0) return savedValue+
                    `<li class="columnTitle">
                        <div class="tableItemContainer">
                            <div class="firstColumn">
                            ${ID}
                            </div>
                            <div class="secondColumn">
                            ${Content}
                            </div>
                            <div class="buttonBox">
                            <div class="addButton">
                                <i class="fa-solid fa-plus"></i>
                            </div>
                        </div>
                        </div> 
                    </li>`
                
                return savedValue+`
                <li class="tableContent">
                    <div class="tableItemContainer">
                        <div class="firstColumn">
                            ${ID}
                        </div>
                        <div class="secondColumn">
                            ${Content}
                        </div>
                        <div class="buttonBox">
                            <div class="editButton">
                                <i class="fa-solid fa-pen"></i>
                            </div>
                            <div class="deleteButton">
                                <i class="fa-solid fa-xmark"></i>
                            </div>
                        </div>
                    </div>
                    
                </li>`
            },tableListInnerHTML)
            tableList.innerHTML=tableListInnerHTML
            const DataTable=$('.tableContainer')
            DataTable.classList.remove('displayNone')
            ButtonEvent()
            // console.log(editButtons)

        }
        // console.log(editButtons)
        ButtonEvent=()=>{
            // console.log('oks')
            editButtons=$$('.buttonBox .editButton')
            deleteButtons=$$('.buttonBox .deleteButton')
            editButtons.forEach((element)=>{
            element.onclick=()=>{
                const editPopup=$('.popUpEdit')
                editPopup.style.display='flex'
                    const title=$('.popUpEditContainer .Title')
                    // ID của thằng cần edit nè
                    IDtoDelete=element.parentNode.previousElementSibling.previousElementSibling.innerText
                    // Bảng của thằng cần edit nè
                    currentTable=this.Tables[$('select').value]
                    title.innerText=`Type new value for ID ${IDtoDelete} of ${currentTable}:`
                    const submitButton=$('#settingContainer .buttonContainer .submitButton')
                    submitButton.onclick=()=>{
                        // update xong gọi render lại
                        // console.log(IDtoDelete,currentTable)
                        const inputtTag=$('.popUpEditContainer input')
                        // Nhớ kiểm tra input hợp lệ không
                        console.log(inputtTag.value)
                        inputtTag.value=''
                        editPopup.style.display='none'
                    }
            };
            
            });
            deleteButtons.forEach((element)=>{
                element.onclick=()=>{
                    const deletePopup=$('.popUpDelete')
                    deletePopup.style.display='flex'
                    const deleteButton=$('#settingContainer .buttonContainer .deleteButton')
                    deleteButton.onclick=()=>{
                        // Xoá xong gọi render lại
                        // ID của thằng cần xoá nè
                        IDtoDelete=element.parentNode.previousElementSibling.previousElementSibling.innerText
                        // Bảng của thằng cần xoá nè
                        currentTable=this.Tables[$('select').value]
                        // console.log(IDtoDelete,currentTable)
                        deletePopup.style.display='none'
                    }
                    const cancelButton=$('.popUpDelete .buttonContainer .cancelButton')
                    cancelButton.onclick=()=>{
                        deletePopup.style.display='none'
                    }
                };
                
            });
            const addButton=$('.columnTitle .buttonBox .addButton')
            addButton.onclick=()=>{
                const addPopup=$('.popUpAdd')
                addPopup.style.display='flex'
                    const Addtitle=$('.popUpAddContainer .Title')
                    // Bảng của thằng cần add nè
                    currentTable=this.Tables[$('select').value]
                    Addtitle.innerText=`Add new value to table ${currentTable}:`
                    const submitButton=$('.popUpAdd .buttonContainer .submitButton')
                    submitButton.onclick=()=>{
                        // update xong gọi render lại
                        // console.log(IDtoDelete,currentTable)
                        const inputtTag=$('.popUpAddContainer input')
                        // Nhớ kiểm tra input hợp lệ không
                        console.log(inputtTag.value)
                        inputtTag.value=''
                        addPopup.style.display='none'
                    }
            }
    }
        
    },
    
    start : function(){
        // console.log(this.Tables);
        this.render();
        this.handleEvents();
    }
}
Setting.start()