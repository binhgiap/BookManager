
(function ($) {
    "use strict";


     /*==================================================================
     [ Focus input ]*/
     $('.input100').each(function(){
        $(this).on('blur', function(){
            if($(this).val().trim() != "") {
                $(this).addClass('has-val');
            }
            else {
                $(this).removeClass('has-val');
            }
        })    
    })


    /*==================================================================
    [ Validate ]*/
    var input = $('.validate-input .input100');

    $('.validate-form').on('submit',function(){
        var check = true;

        for(var i=0; i<input.length; i++) {
            if(validate(input[i]) == false){
                showValidate(input[i]);
                check=false;
            }
        }

        return check;
    });


    $('.validate-form .input100').each(function(){
        $(this).focus(function(){
         hideValidate(this);
     });
    });

    /*Zoom img */
    // Login Admin
    $('#btn').click(function(event) {
        /* Act on the event */
        event.preventDefault();
        let username = $('#username').val();
        let pass = $('#pass').val();
        if (username == 'giapnguyen086' && pass == '23081998') {
            window.location.href = "Book_Manager.html";
        }
        else
        {
            alert('Sai tài khoản hoặc mật khẩu! Xin vui lòng nhập lại');
        }

    });
    /*Search Book*/
    $("#myInput").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#myTable tr").filter(function() {
          $(this).toggle($(this).find("td:eq(1)").text().toLowerCase().indexOf(value) > -1)
      });
    });
    /*Search Category*/
    $("#myInput2").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#myTable2 tr").filter(function() {
          $(this).toggle($(this).find("td:eq(1)").text().toLowerCase().indexOf(value) > -1)
      });
    });
    /*Tính Tổng*/
    $('#btnSum').click(function() {
        var sum = 0;
        $('#myTable2 tr').each(function() {
            var number = $(this).find('td').eq(2).text();
            sum += parseInt(number);
        });
        console.log(sum);
        $('#result').val(sum);
    });

    /*Add Category*/
    var cate = [];
    var count = 0;
    $('#btn_add_C').click(function(event) {
        /* Act on the event */
        $('div#mix').fadeIn('fast', function() {

        });;
        $('#Add_Category').fadeToggle('slow', function() {
        });
    });

    $('div#mix').click(function(event) {
        /* Act on the event */
        $('#Add_Category').fadeToggle('slow', function() {
        });
        $(this).fadeOut('slow');

    });
    function check_cate(cg) {
     var check = 0;
     for (var i = 0; i < cate.length; i++) {
         if(cate[i].Name.toLowerCase().indexOf(cg.Name.toLowerCase())>-1)
         {
            check++;
        }
    }
    return check;
}

$('#btn_AC').click(function(event) {
    count++;
    let IDS = "CI"+count;
    let NameS = $('input#NC').val();
    let NOBC = $('input#NOBC').val();

    var cg = new AddCategory(IDS,NameS,NOBC);

    var check = check_cate(cg);
    if(check == 0){
        $('tbody#myTable2').append(`
            <tr>
            <td>${cg.ID}</td>
            <td>${cg.Name}</td>
            <td>${cg.NOB}</td>
            <td><input type="checkbox" class="checkbox" /></td>
            <td>
            <img id="edit" src="./images/icons/edit.png">
            <img id="delete" src="./images/icons/delete.png">
            </td>

            </tr>`
            );
        cate.push(cg);
        localStorage.setItem("category", JSON.stringify(cate));
        $('#Add_Category').fadeToggle('slow', function() {
        });
        $('div#mix').fadeOut('slow');
    }
    else{
        alert(`Thể loại đã tồn tại \n Xin vui lòng nhập lại !`);
    }
});


/*Edit Category*/



 /*Delete Category*/
 
    function deleteCate(e) {
        // body....splice(stt,1);
        console.log("=========Delete========");
         console.log(cate.length);
        cate = cate.filter(function(index) {
            return index.ID != e;
        });
        console.log(cate.length);
        localStorage.setItem("category", JSON.stringify(cate));
    }
$('#Category').click(function(event) {
    $(".delete").click(function() {
        $("tr").find('input').each(function() {
            if ($(this).is(":checked")) {
          /////////dùng .find(input), this se trỏ tới 'input'
          // console.log($(this).parents('tr').find('td:eq(0)').text());
          // listC.push($(this).parents('tr').find('td:eq(0)').text()); 

          deleteCate($(this).parents('tr').find('td:eq(0)').text());
          $(this).parents("tr").remove();
      }
  });
    });

});


function validate (input) {
    if($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
        if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
            return false;
        }
    }
    else {
        if($(input).val().trim() == ''){
            return false;
        }
    }
}

function showValidate(input) {
    var thisAlert = $(input).parent();

    $(thisAlert).addClass('alert-validate');
}

function hideValidate(input) {
    var thisAlert = $(input).parent();

    $(thisAlert).removeClass('alert-validate');
}

function AddCategory(ID,Name,NOB) {
    this.ID = ID;
    this.Name = Name;
    this.NOB = NOB;
}


function Load_Data_Cate(argument) {
    Temple_Cate();
    var lscate = JSON.parse(localStorage.getItem("category"));
    var a;
    if(lscate){
        a = lscate.length;
    }
    else{
        a = cate.length;
    }

    var b = cate.length;
    if(a>b)
    {
        for (var i = a; i > b; i--) {
            cate.push(lscate[i-1]);
        }
    }

    for (var i = 0; i < a; i++) {

        $('tbody#myTable2').append(`
            <tr>

            <td>${cate[i].ID}</td>
            <td>${cate[i].Name}</td>
            <td>${cate[i].NOB}</td>
            <td><input type="checkbox" class="checkbox" /></td>
            <td>
            <img class="edit" src="./images/icons/edit.png">
            <img class="delete" src="./images/icons/delete.png">
            </td>

            </tr>`
            );
    }
}

Load_Data_Cate();

function Temple_Cate() {
    count++;
    var ID1 = "CI"+count;
    var cg1 = new AddCategory(ID1,"Sách Thiếu Nhi","1");
    count++;
    var ID2 = "CI"+count;
    var cg2 = new AddCategory(ID2,"Sách Văn Học","1");
    count++;
    var ID3 = "CI"+count;
    var cg3 = new AddCategory(ID3,"Sách Kinh Tế","1");
    count++;
    var ID4 = "CI"+count;
    var cg4 = new AddCategory(ID4,"Sách Kỹ Năng","1");

    cate.push(cg1);
    cate.push(cg2);
    cate.push(cg3);
    cate.push(cg4);
}

//localStorage.removeItem("category");
})(jQuery);
