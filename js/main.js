(function($) {
    "use strict";


    /*==================================================================
    [ Focus input ]*/
    $('.input100').each(function() {
        $(this).on('blur', function() {
            if ($(this).val().trim() != "") {
                $(this).addClass('has-val');
            } else {
                $(this).removeClass('has-val');
            }
        })
    })


    /*==================================================================
    [ Validate ]*/
    var input = $('.validate-input .input100');

    $('.validate-form').on('submit', function() {
        var check = true;

        for (var i = 0; i < input.length; i++) {
            if (validate(input[i]) == false) {
                showValidate(input[i]);
                check = false;
            }
        }

        return check;
    });


    $('.validate-form .input100').each(function() {
        $(this).focus(function() {
            hideValidate(this);
        });
    });


    /* Login Admin */

    $('#btn').click(function(event) {
        /* Act on the event */
        event.preventDefault();
        let username = $('#username').val();
        let pass = $('#pass').val();
        if (username == 'giapnguyen086' && pass == '23081998') {
            window.location.href = "Book_Manager.html";
        } else {
            alert('Sai tài khoản hoặc mật khẩu! Xin vui lòng nhập lại');
        }

    });

    /* Log out */

    $('a#phai').click(function(event) {
        /* Act on the event */
        window.location.href = "index.html";
    });;

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

    /* Xử lí hiệu ứng Add Catergory */

    $('#btn_add_C').click(function(event) {
        /* Act on the event */
        $('#mix').fadeIn('fast');
        $('#Add_Category').fadeIn('fast');

    });
    $('#mix').click(function(event) {
        $('#mix').fadeOut('fast');
        $('#Add_Category').fadeOut('fast');
        $('#Edit_Category').fadeOut('fast');
        $('#Edit_Book').fadeOut('fast');
        $('#Add_Book').fadeOut('fast');
    });


    /* Start Show Catergory */

    var lcate = [];
    var cout;

    lcate = JSON.parse(localStorage.getItem("lcate"));

    if (lcate != null) {

        cout = lcate.length;
        for (var i = 0; i < cout; i++) {

            $('#myTable2').append(`
                <tr>
                <td>${lcate[i].ID}</td>
                <td>${lcate[i].Name}</td>
                <td>${lcate[i].NOB}</td>
                <td><input type="checkbox" class="checkbox" /></td>
                <td>
                <img class="edit" src="./images/icons/edit.png">
                <img class="delete" src="./images/icons/delete.png">
                </td>

                </tr>`);
        }
    }

    /* END Show Catergory */

    /* Start ADD Catergory */


    function Sinh_IDC() {
        cout = 1;
        for (var i = 0; i < lcate.length; i++) {
            if (cout == lcate[i].ID) {
                cout++;
            } else {
                break;
            }
        }
    }

    function AddCategory(ID, Name, NOB) {
        this.ID = ID;
        this.Name = Name;
        this.NOB = NOB;
    }

    $('#btn_AC').on('click', function(event) {
        if (lcate == null) {
            lcate = [];
        }

        Sinh_IDC();

        var id = cout;
        var NC = $('#NC').val();
        var NOB = 0;


        var cg = new AddCategory(id, NC, NOB);

        $('#CID').append(`<option value="${cg.ID}">${cg.Name}</option>`);

        $('tbody#myTable2').append(`
            <tr>
            <td>${cg.ID}</td>
            <td>${cg.Name}</td>
            <td>${cg.NOB}</td>
            <td><input type="checkbox" class="checkbox" /></td>
            <td>
            <img class="edit" src="./images/icons/edit.png">
            <img class="delete" src="./images/icons/delete.png">
            </td>

            </tr>`);

        lcate.push(cg);
        lcateID.push(cg);
        localStorage.setItem("lcate", JSON.stringify(lcate));
        localStorage.setItem("lcateID", JSON.stringify(lcateID));


        /* Ẩn form ADD Catergory */
        $('#mix').fadeOut('fast');
        $('#Add_Category').fadeOut('fast');

    });


    /* End ADD Catergory */

    /* Start Select Catergory*/

    // $('.checkall').click(function(event) {
    //     console.log("Giáp");
    //     $('input .checkbox').attr("checked");;
    // });

    /* End Select Catergory */

    /* Start Edit Catergory*/


    var x;
    var namee;
    var nobce;


    $('tbody#myTable2').on('click', '.edit', function(event) {

        x = $(this).parents('tr').find('td:eq(0)').text();
        $('#NCE').val(lcate[x - 1].Name);
        $('#NOBCE').val(lcate[x - 1].NOB);
        $('#Edit_Category').fadeIn('fast');
        $('#mix').fadeIn('fast');

    });

    $('#btn_EC').on('click', function(event) {
        namee = $('#NCE').val();
        nobce = $('#NOBCE').val();


        lcate[x - 1].Name = namee;
        lcate[x - 1].NOB = nobce;

        lcateID[x - 1].Name = namee;


        localStorage.setItem("lcate", JSON.stringify(lcate));
        localStorage.setItem("lcateID", JSON.stringify(lcateID));

        $('#Edit_Category').fadeOut('fast');
        $('#mix').fadeOut('fast');

        location.reload();
    });

    /* End Edit Catergory */

    /* Start Remove Catergory*/



    function deleteCate(e) {

        lcate = lcate.filter(function(index) {
            return index.ID != e;
        });

        localStorage.setItem("lcate", JSON.stringify(lcate));
    }
    $('tbody#myTable2').on('click', '.delete', function() {
        // $(".delete").on('click',function() {
        $("#myTable2 tr").find('input').each(function() {
            if ($(this).is(":checked")) {
                var x = $(this).parents('tr').find('td:eq(0)').text();
                deleteCate(x);
                $(this).parents("tr").remove();
                $('#CID').find(`option[value='${x}']`).remove();
                lbook[x - 1].cateID = "";
                localStorage.setItem("lbook", JSON.stringify(lbook));
            }

        });
        location.reload();
    });

    /* End Remove Catergory */

    /*====================================================================*/

    function C_ID(ID, Name) {
        this.ID = ID;
        this.Name = Name;
    }
    var lcateID = [];

    for (var i = 0; i < lcate.length; i++) {
        let a = lcate[i].ID;
        let b = lcate[i].Name;

        lcateID.push(new C_ID(a, b));
        $('#CID').append(`<option value="${a}">${b}</option>`);
    }


    /*====================================================================*/
    /* Start Show Book */



    var lbook = [];
    var couts;

    lbook = JSON.parse(localStorage.getItem("lbook"));

    if (lbook != null) {

        couts = lbook.length;
        for (var i = 0; i < couts; i++) {

            $('tbody#myTable').append(`
                <tr>
                <td>${lbook[i].ID}</td>
                <td>${lbook[i].Name}</td>
                <td>${lbook[i].Mota}</td>
                <td>${lbook[i].Tacgia}</td>
                <td>${lbook[i].cateID}</td>
                <td>
                    <a href="${lbook[i].source}">
                        <img class="anhnho" src="${lbook[i].source}">
                    </a>
                </td>
                <td><input type="checkbox" class="checkbox" /></td>
                <td>
                    <img class="Edit" src="./images/icons/edit.png">
                    <img class="Delete" src="./images/icons/delete.png">
                </td>
            </tr>`);
        }
    }


    /* END Show Book */

    /* Start ADD Book */

    function A_B(argument) {
        // body...


        $('#btn_B').click(function(event) {
            /* Act on the event */
            $('#mix').fadeIn('fast');
            $('#Add_Book').fadeIn('fast');

        });

        function Sinh_IDB() {
            couts = 1;
            for (var i = 0; i < lbook.length; i++) {
                if (couts == lbook[i].ID) {
                    couts++;
                } else {
                    break;
                }
            }
        }

        function AddBook(ID, Name, Mota, Tacgia, cateID, source) {
            this.ID = ID;
            this.Name = Name;
            this.Mota = Mota;
            this.Tacgia = Tacgia;
            this.cateID = cateID;
            this.source = source;
        }

        $('#btn_AB').on('click', function(event) {

            if (lbook == null) {
                lbook = [];
            }
            couts++;

            var IDB = couts;
            var NameB = $('#NB').val();
            var MotaB = $('#DS').val();
            var TacgiaB = $('#At').val();
            var cateID = $('#CID').val();
            var sourceB = $('#IM').val();



            var book = new AddBook(IDB, NameB, MotaB, TacgiaB, cateID, sourceB);

            $('#myTable').append(`
                <tr>
                <td>${book.ID}</td>
                <td>${book.Name}</td>
                <td>${book.Mota}</td>
                <td>${book.Tacgia}</td>
                <td>${book.cateID}</td>
                <td>
                    <a href="${book.source}">
                        <img class="anhnho" src="${book.source}">
                    </a>
                </td>
                <td><input type="checkbox" class="checkbox" /></td>
                <td>
                    <img class="Edit" src="./images/icons/edit.png">
                    <img class="Delete" src="./images/icons/delete.png">
                </td>
            </tr>`);
            console.log(lcate[0]);
            for (var i = 0; i < lcate.length; i++) {

                if (lcate[i].ID == cateID) {
                    lcate[i].NOB++;
                }
            }
            console.log(lcate[0]);

            lbook.push(book);
            localStorage.setItem("lbook", JSON.stringify(lbook));
            localStorage.setItem("lcate", JSON.stringify(lcate));


            /* Ẩn form ADD Book */
            $('#mix').fadeOut('fast');
            $('#Add_Book').fadeOut('fast');

            location.reload();

        });
    }
    A_B();

    /* End ADD Book */

    /* Start Edit Book */



    var y;
    var nameBook;
    var des;
    var au;
    var cateid;
    var im;


    $('#myTable').on('click', '.Edit', function(event) {

        y = $(this).parents('tr').find('td:eq(0)').text();

        $('#myTable_EB #NB').val(lbook[y - 1].Name);
        $('#myTable_EB #DS').val(lbook[y - 1].Mota);
        $('#myTable_EB #At').val(lbook[y - 1].Tacgia);
        $('#myTable_EB #CID').val(lbook[y - 1].cateID);
        $('#myTable_EB #IM').val(lbook[y - 1].source);


        $('#Edit_Book').fadeIn('fast');
        $('#mix').fadeIn('fast');

    });

    $('#btn_EB').on('click', function(event) {

        nameBook = $('#myTable_EB #NB').val();
        des = $('#myTable_EB #DS').val();
        au = $('#myTable_EB #At').val();
        cateid = $('#myTable_EB #CID').val();
        im = $('#myTable_EB #IM').val();


        lbook[y - 1].ID = parseInt(y);
        lbook[y - 1].Name = nameBook;
        lbook[y - 1].Mota = des;
        lbook[y - 1].Tacgia = au;
        lbook[y - 1].cateID = cateid;
        lbook[y - 1].source = im;


        localStorage.setItem("lbook", JSON.stringify(lbook));

        $('#Edit_Book').fadeOut('fast');
        $('#mix').fadeOut('fast');

        location.reload();
    });

    /* End Edit Book */

    /* Start Remove Book */



    function deleteBook(e) {

        lbook = lbook.filter(function(index) {
            return index.ID != e;
        });

        localStorage.setItem("lbook", JSON.stringify(lbook));
    }
    $('#myTable').on('click', '.Delete', function() {
        $("#myTable tr").find('input').each(function() {
            if ($(this).is(":checked")) {
                var x = $(this).parents('tr').find('td:eq(4)').text();
                deleteBook($(this).parents('tr').find('td:eq(0)').text());
                $(this).parents("tr").remove();
                lcate[x - 1].NOB = lcate[x - 1].NOB - 1;
                console.log(lcate[x - 1].NOB);
                localStorage.setItem("lcate", JSON.stringify(lcate));
            }

        });
        location.reload();
    });

    /* End Remove Catergory */



})(jQuery);