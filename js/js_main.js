// By Dan Gretzinger
// 2/18/2019
// Constructed For ENGFILM Film Directors: Nolan

var main_path = window.location.pathname; console.log(main_path); main_path = main_path.substring(0, main_path.length - 1);
main_path = main_path.split("/index.html")[0];    //Current Directory
var offline_or_online = "https://"                 //Swap to http:// or file://
var item_list = [];                               //List of display_items
var z_index_level = 5;            
var total_items_used = 0;                         //Tracker of display_items on screen
var image_list_txt;                               //File names of all images, TODO - rename, var holds more than images
var quote_on_page = false;

// Constructor for the added visuals
function display_item(file_type, path, size, content, text, used){
  this.file_type = file_type,
  this.path = path,
  this.size = size,
  this.text = text,
  this.content = content,
  this.used = false
}

// callback function and closure
// Used in getting back text file contents
var getData_info;
var getData = function(data_return){
  getData_info = data_return;
}

//loads any given text file, where file is the path
function readTextFile(file, callback){
  var new_file = new XMLHttpRequest();
  new_file.open("GET", file, false);
  var data = null;

  new_file.onreadystatechange = function()
  {
    if(new_file.readyState === 4){

      if(new_file.status === 200 || new_file.status == 0)
      {
        data = new_file.responseText;
        callback.apply(this, [data]);
      }
    }
  }
  new_file.send('');
}

// Places item on screen - text, GIFS, text
function add_image_to_screen(display_item){
  display_item.used = true;
  total_items_used += 1;
  var box_div = document.getElementById('image_box');
  var newtag;
    
  var path_type;
  if(display_item.file_type === 'i'){
    path_type = '/images/';
    newtag = document.createElement('img');
  }
  else if(display_item.file_type === 'g'){ 
    path_type = '/images/';
    newtag = document.createElement('img');
  }
  else if(display_item.file_type === 't'){
    remove_quote();
    path_type = '/quotes/';
    newtag = document.createElement('strong');
    newtag.style.class = "quote";
  }
  else if(display_item.file_type === 'h'){
    remove_quote();
    path_type = '/images/her/';
    newtag = document.createElement('img');
    newtag.classList.add('her');
  }
  
  //add to screen
  var complete_path = offline_or_online + main_path + path_type+ display_item.path;
  if((display_item.file_type === 'i') || (display_item.file_type === 'g') || (display_item.file_type === 'h')){             //TODO -Quick fix, clean
    newtag.src = complete_path;
    place_in_random_positions(newtag);
  }
  else{
    readTextFile(offline_or_online + main_path + "/quotes/" + display_item.path, getData);
    newtag.textContent = getData_info;
  }

  newtag.style.zIndex = z_index_level;
  z_index_level = z_index_level + 1;
  box_div.appendChild(newtag);
  
  load_descript_text(display_item);

}

function place_in_random_positions(image){
  var left_rando = Math.floor(Math.random()*55 +23 ); 
  var top_rando = Math.floor(Math.random()*90); 

  image.style.left = left_rando + "%";
  image.style.top = top_rando + "%";
}

function load_descript_text(display_item){
  //display item
  var item_label;
  var item_tag = document.getElementById("item");
  if((display_item.file_type === 'i') || (display_item.file_type === 'h'))
    item_label = "Image";
  if(display_item.file_type === 'g')
    item_label = "GIF";    
  if(display_item.file_type === 't')
    item_label = "Quote";
  item_tag.textContent = "Item: " + item_label;

  //display name
  var name_tag = document.getElementById("name");
  name_tag.textContent = "Name: " + display_item.path;

  //Create description text file
  load_descript_file(display_item);
}

function load_descript_file(display_item){
  var newtag = document.createElement('p');
  readTextFile(offline_or_online + main_path + "/text/" + display_item.path.substring(0,3)+".txt", getData);
  newtag.textContent = getData_info;

  //add class for color control
  if(display_item.file_type === 'i')
    newtag.classList.add('momento_image');
  else if(display_item.file_type === 'h')
    newtag.classList.add('her_image');


  var box_div = document.getElementById('text_box');
  box_div.appendChild(newtag);

}

//removes old text to stop overlapping
function remove_quote(){
    var strong_tag = document.querySelectorAll("strong");

    for(var i = 0; i < strong_tag.length; i++){
      strong_tag[i].textContent = "";
    }
}

// Gets info from directory list files and loads them into item_list
function load_all(){
  // Load images
  readTextFile(offline_or_online + main_path + "/images/list.txt", getData);
  image_list_txt = getData_info.split('\n');

  //create object for every image item
  for(i = 0; i < image_list_txt.length; i++){       //TODO -wrap into a method
    var curr_string = image_list_txt[i];
    var string_key = image_list_txt[i].substring(0, 3);

    item_list.push(new display_item(string_key[0], curr_string.replace(/[\n\r]/g, ''), null,null,null,false));
    
  }

  // load quotes
  readTextFile(offline_or_online + main_path + "/quotes/list.txt", getData);
  image_list_txt = getData_info.split('\n');

  for(i = 0; i < image_list_txt.length; i++){
    var curr_string = image_list_txt[i];
    var string_key = image_list_txt[i].substring(0, 3);
    item_list.push(new display_item(string_key[0], curr_string.replace(/[\n\r]/g, ''), null,null,null,false));
  }

  //load her story images
  readTextFile(offline_or_online + main_path + "/images/her/list.txt", getData);
  image_list_txt = getData_info.split('\n');

  for(i = 0; i < image_list_txt.length; i++){       //TODO -wrap into a method
    var curr_string = image_list_txt[i];
    var string_key = image_list_txt[i].substring(0, 3);

    item_list.push(new display_item(string_key[0], curr_string.replace(/[\n\r]/g, ''), null,null,null,false));
    
  }
  console.log(item_list);
}


//event listeners
//1. display random image on next click
//2. future includes hover options
var next_element = document.getElementById("next_button");
next_element.addEventListener('click', listener_for_add_handler);

//Asks display_image to load random index from item_list
//Naive approach, TODO change random integer to bag data structure
function listener_for_add_handler(e){
  var next_image_num;
  var found_free = false;

  if(total_items_used === item_list.length){
    alert("No more items");
  } 
 else{
    while(found_free === false){
      next_image_num = Math.floor(Math.random()*item_list.length); 
      
      if(item_list[next_image_num].used === false)
        found_free = true;
    }
    add_image_to_screen(item_list[next_image_num]);
  }
}


load_all();







