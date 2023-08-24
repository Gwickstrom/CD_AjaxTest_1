$(document).ready(function(){

    var baseUrl = "https://core.dodecki.com";
    var venues = "569edffc1a5b7205c70e1fd8";

    $.ajax({
        method: "GET",
        url: baseUrl + "/api/venue/" + venues
    })

    .done(function(data){
        //   console.log(data);
        filterItems()

        menus(data)

        addItem()
        invokeModal()

      }

)
})

function menus(data) {
    //Menus
      for (var i = 0; i < data.menus.length; i++) {
          console.log(data.menus[i].menu_name + ' This is a menu name');
        var menu = ('menu'+data.menus[i].menu_name.replace(/[^a-z0-9\s]/gi,''))

        $('#menus ul').append(
        `
        <li id="${menu}">${data.menus[i].menu_name}</li>
        `)

        menu_groups(data.menus[i],menu)
        }
        menuSelect()
}

function menu_groups(data,menu) {
    for (var i = 0; i < data.menu_groups.length; i++) {
        console.log(data.menu_groups[i].group_name);
        var group = ('group'+data.menu_groups[i].group_name).replace(/[^a-z0-9\s]/gi,'');
        $('#groups ul').append(
        `
        <li id="${menu+group}" class="${menu} ${group}"}>${data.menu_groups[i].group_name}</li>
        `)
        menu_items(data.menu_groups[i],menu,group)
    }
    groupSelect()
}


function menu_items(data,menu,group) {
    for (var i = 0; i < data.menu_items.length; i++) {
        // console.log(data.menu_items[i].menu_item_name);
        var buttonText = '';
        var buttonClass = '';
        if (data.menu_items[i].menu_item_options.length == 0) {
            buttonText = '[+] Add To Order';
            buttonClass = 'addItemButton';
        }
        else {
            buttonText =  '[+] Add To Order';
            buttonClass = 'invokeModalButton';
        }
        var description = '';
        if (data.menu_items[i].menu_item_description !== null) {
            description = data.menu_items[i].menu_item_description;
        }
        $('#items').append(
        `
        <div class="menuBox inline ${menu} ${group}"><div class="itemImage inline"></div><div class="itemText inline"><h5 class="menu_item_name">${data.menu_items[i].menu_item_name}</h5><p class="menu_item_description">${description}</p></div><div class="itemPrice inline"><p class="menu_item_price">${data.menu_items[i].menu_item_price}</p></div><button class="${buttonClass}">${buttonText}</button></div>
        `)
        menu_item_options(data.menu_items[i])

    }
}

function menu_item_options(data) {
    for (var i = 0; i < data.menu_item_options.length; i++) {
        // console.log(data.menu_item_options[i].item_option_name);
        $('.menus').append(
        `
        <div class="menu_item_options"><p>${data.menu_item_options[i].item_option_name}</p>
        `)
        option_choices(data.menu_item_options[i])
    }
}

function option_choices(data) {
    for (var i = 0; i < data.option_choices.length; i++) {
        // console.log(data.option_choices[i].option_name);
        $('.menus').append(
        `
        <div class="option_choices"><p>${data.option_choices[i].option_name}</p>
        `)

    }
}


function menuSelect() {
    $("#menus").on('click','li',function (){
        var targetClass = '.menu'+ ($(this).text()).replace(/[^a-z0-9\s]/gi,'');
        $('#items').children().hide()
        $('#items').children(targetClass).show()
        $('#groups ul').children().hide()
        $('#groups ul').children(targetClass).show()
        $('#groups ul').children('.showAlways').show()
    });
}

function groupSelect() {
    $("#groups").on('click','li',function (){
        var targetClass = '.group'+ ($(this).text()).replace(/[^a-z0-9\s]/gi,'');
        console.log(targetClass);
        //FILTER BY MENU LATER
        if (targetClass == '.groupALL') {
            $('#items').children().show()
        }
        else {
            $('#items').children().hide()
            $('#items').children(targetClass).show()
    }
    });
}


function filterItems(filterText) {
    $(function() {
        $('#search_input').fastLiveFilter('#items');
    });
}

function addItem() {
    $('addItemButton').click(function() {
        alert('addItemButton')
    }
    )
}

function invokeModal() {
    $('.invokeModalButton').click(function() {
        alert("no food");
    // btn.onclick = function() {
    //     modal.style.display = "block";
    };


    //}
    // When the user clicks the button, open the modal
    // $('.invokeModalButton').click = function() {
    //     modal.style.display = "block";
    // }
    //)
}

/* Begin Modal here */
// Get the button that opens the modal
var btn = document.getElementById("invokeModalButton");
// Get the modal
var modal = document.getElementById('myModal');

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

var x = document.getElementsByName("Add").value;
    document.getElementById("demo").innerHTML = "You selected: " + x;


// When the user clicks the button, open the modal
// btn.onclick = function() {
//     modal.style.display = "block";
// }

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}


// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
$(document).ready(function() {
    //set initial state.
    $('#checkbox').change(function() {
        $('#textbox1').val($(this).is(':checked'));
    });

    $('#checkbox').click(function() {
        if (!$(this).is(':checked')) {
            return confirm("Are you sure?");
        }
    });
});



// var $loading = $('#loadingDiv').hide();
// $(document)
//   .ajaxStart(function () {
//     $loading.show();
//   })
//   .ajaxStop(function () {
//     $loading.hide();
//   });
