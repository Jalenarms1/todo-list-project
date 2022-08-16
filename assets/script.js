// listed-items now-list add these classes to urgent todos, listed-items next-list these to next up, listed-items when-list these to items to be done whenever

var todoInput = $("#todo-input");
var submitBtn = $("#submit");
var selectInput = $("#priority-contain");

var getToIt = $("#now-list");
var nextUp = $("#next-list");
var wheneverList = $("#when-list");
let storeUrgent = [];
let storeNext = [];
let storeWhenever = [];
var checkboxInput = $(".checkbox");
var listedItems = $(".listed-items");
var keepListItemNow = [];
var keepListItemNext = [];
var keepListItemWhenever = [];
var inputs = $("input");
var listWrapDiv = $(".list-items");
var itemsToMove = $(".to-beMoved");
var modalListEl = $(".modal-list");
var modalSelect = $("#modal-select");


var addNowItem = (content) => {
    let li = $("<li>");
    li.addClass("listed-items now-list")
    let checkbox = $("<input>");
    checkbox.attr({type: "checkbox", class: "checkbox", id: "checkbox"})
    li.text(content);
    li.append(checkbox);
    getToIt.append(li);
}

var addWheneverItem = content => {
    let li = $("<li>");
    li.addClass("listed-items when-list")
    let checkbox = $("<input>");
    checkbox.attr({type: "checkbox", class: "checkbox" })
    li.text(content);
    li.append(checkbox);
    wheneverList.append(li);
}

var addNextItem = (content) => {
    let li = $("<li>");
    li.addClass("listed-items next-list")
    let checkbox = $("<input>");
    checkbox.attr({type: "checkbox", class: "checkbox" })
    li.text(content);
    li.append(checkbox);
    nextUp.append(li);
}

var holdListChildren = [];
var holdListItems = [];

var createLiForModal = (content) => {
    let li = $("<li>");
    li.addClass("to-beMoved")
    li.text(content);
    $(".modal-list").append(li);

}

var holdMovedItems = [];

var moveItems = () => {
    for(i = 0;i < listWrapDiv.length;i++){
        holdListChildren.push($(listWrapDiv[i]).children(".listed-items"))
    }
    for(i = 0;i < holdListChildren.length;i++){
        console.log(holdListChildren[i]);
        for(j = 0;j < holdListChildren[i].length;j++){
            holdListItems.push(holdListChildren[i][j])
        }
    }
    console.log(holdListItems)
    $("#moveItems-modal").modal();
    for(i = 0;i < holdListItems.length;i++){
        holdMovedItems.push($(holdListItems[i]).children()) 
     
        
    } 
    
    holdMovedItems.forEach(item => {
        if(item.prop("checked")){
            return createLiForModal(item.parent().text().trim())
        }
        
    })
    
    
    
}

var tasksDone = () => {
    console.log(storeUrgent)
    for(i = 0;i < listWrapDiv.length;i++){
        holdListChildren.push($(listWrapDiv[i]).children(".listed-items"))
    }
    for(i = 0;i < holdListChildren.length;i++){
        console.log(holdListChildren[i]);
        for(j = 0;j < holdListChildren[i].length;j++){
            holdListItems.push(holdListChildren[i][j])
        }
    }
    console.log(holdListItems)
    for(i = 0;i < holdListItems.length;i++){
        if($(holdListItems[i]).children().prop("checked") && storeUrgent.includes($(holdListItems[i]).text())){
            storeUrgent = storeUrgent.filter((item) => {
                return item != $(holdListItems[i]).text();
            });
            localStorage.setItem("urgents", JSON.stringify(storeUrgent))
            location.reload();
        } else if($(holdListItems[i]).children().prop("checked") && storeNext.includes($(holdListItems[i]).text())){
            storeNext = storeNext.filter((item) => {
                return item != $(holdListItems[i]).text();
            });
            localStorage.setItem("next", JSON.stringify(storeNext))
            location.reload();
        }else if($(holdListItems[i]).children().prop("checked") && storeWhenever.includes($(holdListItems[i]).text())){
            storeWhenever = storeWhenever.filter((item) => {
                return item != $(holdListItems[i]).text();
            });
            localStorage.setItem("whenever", JSON.stringify(storeWhenever))
            location.reload();
        };
    
    }
};


var restoreSaved = () => {
    var storage = JSON.parse(localStorage.getItem("urgents"));
    console.log(storeUrgent);
    if(storage != null){
       storage.forEach(item => {
            storeUrgent.push(item);
            addNowItem(item);
       })
    }
    var storage = JSON.parse(localStorage.getItem("next"));
    if(storage != null){
        storage.forEach(item => {
            storeNext.push(item)
            addNextItem(item);
            
        })
    }
    var storage = JSON.parse(localStorage.getItem("whenever"));
    if(storage != null){
        storage.forEach(item => {
            storeWhenever.push(item);
            addWheneverItem(item);
        })
    }
}

restoreSaved();

console.log(storeUrgent);

var saveTodo = () => {
    console.log(!storeUrgent.includes(todoInput.val()) && !storeNext.includes(todoInput.val()) && !storeWhenever.includes(todoInput.val()));
    if(!storeUrgent.includes(todoInput.val()) && !storeNext.includes(todoInput.val()) && !storeWhenever.includes(todoInput.val())){
        if(selectInput.val() === "0" || todoInput.val() === ""){
            $("#err-content").text("Enter your activity AND its priority level.")
            $("#error-modal").modal();
        }else if(selectInput.val() === "get to it"){
            addNowItem(todoInput.val());
            storeUrgent.push(todoInput.val());
            console.log(storeUrgent)
            if(storeUrgent != null){
                localStorage.setItem("urgents", JSON.stringify(storeUrgent));
            }
            todoInput.val("");
            
        }else if(selectInput.val() === "up-next"){
            addNextItem(todoInput.val())
            storeNext.push(todoInput.val());
            if(storeNext != null){
                localStorage.setItem("next", JSON.stringify(storeNext));
            }
            todoInput.val("");
            
        } else if(selectInput.val() === "whenever"){
            addWheneverItem(todoInput.val())
            storeWhenever.push(todoInput.val());
            if(storeWhenever != null){
                
                localStorage.setItem("whenever", JSON.stringify(storeWhenever));
            }
            todoInput.val("");
            
        } 
    } else{
        $("#err-content").text("This activity has already been added. You can move it to another list by clicking the 'Move Item(s)' button")
        $("#error-modal").modal();
    }
    
    
}

var closeModal = () => {
    $(".modal-list").children().remove();
    location.reload();
} 

var changePriorityLevel = (text) => {
    console.log(text);
    if(modalSelect.val() === "get to it"){
        if(storeUrgent.includes(text)){
            console.log("already there")
            storeUrgent = storeUrgent.filter(item => {
                return item === text
            })
            storeUrgent.push(storeUrgent);
            if(storeUrgent != null){
                localStorage.setItem("urgents", JSON.stringify(storeUrgent));
            }
        } else if(storeNext.includes(text)){
            storeNext = storeNext.filter(item => {
                return item != text
            })
            storeUrgent.push(text);
            if(storeUrgent != null){
                localStorage.setItem("urgents", JSON.stringify(storeUrgent));
            }
            if(storeNext != null){
                localStorage.setItem("next", JSON.stringify(storeNext));

            }
        } else if(storeWhenever.includes(text)){
            storeWhenever = storeWhenever.filter(item => {
                return item != text
            })
            storeUrgent.push(text);
            if(storeUrgent != null){
                localStorage.setItem("urgents", JSON.stringify(storeUrgent));
            }
            if(storeWhenever != null){
                localStorage.setItem("whenever", JSON.stringify(storeWhenever));

            }
        }
       
    } else if(modalSelect.val() === "up-next"){
        if(storeUrgent.includes(text)){
            console.log("Already There");
            storeUrgent = storeUrgent.filter(item => {
                return item != text
            })
            storeNext.push(text);
            if(storeNext != null){
                localStorage.setItem("next", JSON.stringify(storeNext));
            }
            if(storeUrgent != null){
                localStorage.setItem("urgents", JSON.stringify(storeUrgent))
            }
        } else if(storeNext.includes(text)){
            console.log(text + "is already there");
            storeNext = storeNext.filter(item => {
                return item != text
            })
            storeNext.push(text);
            if(storeNext != null){
                localStorage.setItem("next", JSON.stringify(storeNext));
            }
            
        } else if(storeWhenever.includes(text)){
            storeWhenever = storeWhenever.filter(item => {
                return item != text
            })
            storeNext.push(text);
            if(storeNext != null){
                localStorage.setItem("next", JSON.stringify(storeNext));
            }
            if(storeWhenever != null){
                localStorage.setItem("whenever", JSON.stringify(storeWhenever))
            }
        }
    } else if(modalSelect.val() === "whenever"){
        if(storeUrgent.includes(text)){
            storeUrgent = storeUrgent.filter(item => {
                return item != text
            })
            storeWhenever.push(text);
            if(storeWhenever != null){
                localStorage.setItem("whenever", JSON.stringify(storeWhenever));
            }
            if(storeUrgent != null){
                localStorage.setItem("urgents", JSON.stringify(storeUrgent))
            }
        } else if(storeNext.includes(text)){
            storeNext = storeNext.filter(item => {
                return item != text
            })
            storeWhenever.push(text);
            if(storeWhenever != null){
                localStorage.setItem("whenever", JSON.stringify(storeWhenever));
            }
            if(storeNext != null){
                localStorage.setItem("next", JSON.stringify(storeNext))
            }
        } else if(storeWhenever.includes(text)){
            console.log(`${text} is already in there`);
            storeWhenever = storeWhenever.filter(item => {
                return item != text
            })
            storeWhenever.push(text);
            if(storeWhenever != null){
                localStorage.setItem("whenever", JSON.stringify(storeWhenever));
            }
        }
    }
    
}

var updateChanges = () => {
    let holdElements= [];
    console.log($(modalListEl).children())
    for(i = 0;i < $(modalListEl).children().length;i++){
        console.log($($(modalListEl).children()[i]).text().trim())
        changePriorityLevel($($(modalListEl).children()[i]).text().trim())
    }
    location.reload();
    
}

submitBtn.on("click", saveTodo);
$("#task-done").on("click", tasksDone);
$("#move-item").on("click", moveItems);
$(".close").on("click", closeModal)
$("#save-changes").on("click", updateChanges);

