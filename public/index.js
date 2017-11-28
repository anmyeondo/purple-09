$(document).ready(function() {
    $("body").on('click','#icon',function() {
        var tap = document.getElementById("tapmenu");
            
        if(tap.style.width == "30%")
            tap.style.width = "0%";
        else
            tap.style.width = "30%" ;
                    
        $(this).toggleClass('open');
    });
});

$(document).ready(function() {
    $("body").on('click','#tLogin', function() {
        $("#hexGrid").hide();
        $("#Login").show();
        $("#License").hide();
    });
});

$(document).ready(function() {
    $("body").on('click','#tCategory', function() {
        $("#hexGrid").show();
        $("#Login").hide();
        $("#License").hide();
    });
});

$(document).ready(function() {
    
    $("body").on('click','#tLicense', function() {
        $("#hexGrid").hide();
        $("#Login").hide();
        $("#License").show();
    });
});

/********* Google Login ******/

$(document).ready(function() {
    $("body").on('click','#GOOGLE_LOGIN',function() {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then(function(result) {
        }).catch(function(error) {
            alert(error.massage)
        });
            
    });
});

$(document).ready(function() {
    firebase.auth().onAuthStateChanged(function(user) {
            if(user){
                $('#AUTH_STATE').text(user.displayName + "님 로그인 하셨습니다.");
                $('#LOGOUT').show();
                $("#tapmenu").html("<p id=\"tUser\"> <i class=\"fa fa-user-circle-o\" aria-hidden=\"true\"></i> " +                              user.displayName + "</p>" + 
                                   "<p id=\"tCategory\"><i class=\"fa fa-eye\" aria-hidden=\"true\"></i> 카드뉴스</p>" + 
                                   "<p id=\"tLicense\"><i class=\"fa fa-file-text-o\" aria-hidden=\"true\"></i> 라이센스</p>" + 
                                   "<p><a href=\"https://tyle.io/\" style=\"text-decoration: none\"><i class=\"fa fa-wrench\" aria-hidden=\"true\"></i> 만들기</a></p>");
            }
            else{
                $('#AUTH_STATE').text("인증되지 않음");
                $('#LOGOUT').hide();
                $("#tapmenu").html("<p id=\"tLogin\"> <i class=\"fa fa-lock\" aria-hidden=\"true\"></i> 로그인 </p>" + 
                                   "<p id=\"tCategory\"><i class=\"fa fa-eye\" aria-hidden=\"true\"></i> 카드뉴스</p>" + 
                                   "<p id=\"tLicense\"><i class=\"fa fa-file-text-o\" aria-hidden=\"true\"></i> 라이센스</p>" + 
                                   "<p><a href=\"https://tyle.io/\" style=\"text-decoration: none\"><i class=\"fa fa-wrench\" aria-hidden=\"true\"></i> 만들기</a></p>");
            }
    });
});

$(document).ready(function() {
    $("body").on('click', '#LOGOUT', function() {
        firebase.auth().signOut().then(function(){
        }, function(error){
            alert(error.massage);
        });
    });
});