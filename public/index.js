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
        $("#userInfo").hide();
    });
});

$(document).ready(function() {
    
    $("body").on('click','#tLicense', function() {
        $("#hexGrid").hide();
        $("#Login").hide();
        $("#License").show();
        $("#userInfo").hide();
    });
});

$(document).ready(function() {
    
    $('body').on('click', '#tUser', function() {
        $("#hexGrid").hide();
        $("#Login").hide();
        $("#License").hide();
        $("#userInfo").show();
    })
})

/*********** MAIL LOGIN ************/

$(document).ready(function() {
    
    $('body').on('click', '#signup', function() {
        var mail = $('#upMail').val();
        var password = $('#upPassword').val();
        var name = $('#upName').val();
        
        firebase.auth().createUserWithEmailAndPassword(mail, password).then(function() {
            
            var user = firebase.auth().currentUser;
            user.updateProfile({
                'displayName': name
            }).then(function() {
                alert("가입 성공");
                location.reload();
            }, function(error) {
                if(error.massage == 'undefined')
                    alert("유효하지 않은 메일입니다.");
                else
                    alert(error.massage);
            });
        }).catch(function(error) {
            alert(error.massage);
        });
    });
});

$(document).ready(function() {
    $('body').on('click', '#signin', function() {
        var mail = $('#inMail').val();
        var password = $('#inPassword').val();
        
        firebase.auth().signInWithEmailAndPassword(mail, password).then(function() {
            location.reload();
        }).catch(function(error) {
            alert(error.massage);
        });
    });
});


/********* Google Login ******/

$(document).ready(function() {
    $("body").on('click','#GOOGLE_LOGIN',function() {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then(function(result) {
            $('#Login').hide();
            $('#userInfo').show();
        }).catch(function(error) {
            alert(error.massage)
        });
            
    });
});

$(document).ready(function() {
    $("body").on('click', '#LOGOUT', function() {
        firebase.auth().signOut().then(function(){
            $('#userInfo').hide();
            $('#Login').show();
        }, function(error){
            alert(error.massage);
        });
    });
});


$(document).ready(function() {
    firebase.auth().onAuthStateChanged(function(user) {
            if(user){
                $("#tapmenu").html("<p id=\"tUser\"> <i class=\"fa fa-user-circle-o\" aria-hidden=\"true\"></i> " +                              user.displayName + "</p>" + 
                                   "<p id=\"tCategory\"><i class=\"fa fa-eye\" aria-hidden=\"true\"></i> 카드뉴스</p>" + 
                                   "<p id=\"tLicense\"><i class=\"fa fa-file-text-o\" aria-hidden=\"true\"></i> 라이센스</p>" + 
                                   "<p><a href=\"https://tyle.io/\" style=\"text-decoration: none\"><i class=\"fa fa-wrench\" aria-hidden=\"true\"></i> 만들기</a></p>");
                $('#userUID').text(user.uid);
                $('#userName').text(user.displayName);
                $('#userMail').text(user.email);
            }
            else{
                $("#tapmenu").html("<p id=\"tLogin\"> <i class=\"fa fa-lock\" aria-hidden=\"true\"></i> 로그인 </p>" + 
                                   "<p id=\"tCategory\"><i class=\"fa fa-eye\" aria-hidden=\"true\"></i> 카드뉴스</p>" + 
                                   "<p id=\"tLicense\"><i class=\"fa fa-file-text-o\" aria-hidden=\"true\"></i> 라이센스</p>" + 
                                   "<p><a href=\"https://tyle.io/\" style=\"text-decoration: none\"><i class=\"fa fa-wrench\" aria-hidden=\"true\"></i> 만들기</a></p>");           
                $('#userUID').text("");
                $('#userName').text("");
                $('#userMail').text("");
            }
    });
});