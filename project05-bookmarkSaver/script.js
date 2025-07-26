const addBookmarkBtn = document.getElementById("add-bookmark");
const bookmarkList = document.getElementById("bookmark-list");
const bookmarkNameInput = document.getElementById("bookmark-name");
const bookmarkUrlInput = document.getElementById("bookmark-url");

document.addEventListener("DOMContentLoaded", loadBookmarks);
addBookmarkBtn.addEventListener("click",function(){
    const name=bookmarkNameInput.value.trim();
    const url=bookmarkUrlInput.value.trim();

    if(! name || !url){
        alert("Please provide both");
        return;
    }
    else if(!url.startsWith("https://")&&!url.startsWith("http://") ){
        alert("please enter valid url strting with https: of http:")
        return;
    }

    addBookmark(name,url);
    saveBookmark(name,url);

    bookmarkNameInput.value="";
    bookmarkUrlInput.value="";
});

function addBookmark(name,url){
    const li=document.createElement("li");
    const a=document.createElement("a");

    a.href=url;
    a.textContent=name;
    a.target="_blank";

    const removeButton=document.createElement("button");
    removeButton.textContent="Remove";

    removeButton.addEventListener("click",function(){
        bookmarkList.removeChild(li);
        removeBookmarkFromStorage(name,url);
    })

    li.appendChild(a);
    li.appendChild(removeButton);

    bookmarkList.appendChild(li);

}

function getBookmarksFromStorage(){
    const bookmarks=localStorage.getItem("bookmarks");
    return bookmarks ? JSON.parse(bookmarks):[];
}

function saveBookmark(name,url){
    const bookmarks=getBookmarksFromStorage();
    bookmarks.push({name,url});
    localStorage.setItem("bookmarks",JSON.stringify(bookmarks));
}

function loadBookmarks(){
    const bookmarks=getBookmarksFromStorage();
    bookmarks.forEach(bookmark => {
        addBookmark(bookmark.name,bookmark.url);
    });
}

function removeBookmarkFromStorage(name,url){
    let bookmarks=getBookmarksFromStorage();
    bookmarks=bookmarks.filter((bookmark)=>{
        return bookmark.name!==name || bookmark.url!==url;
    });
    localStorage.setItem("bookmarks",JSON.stringify(bookmarks));
}

