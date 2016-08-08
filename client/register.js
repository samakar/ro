Template.register.events({
    'submit form': function(event){
        event.preventDefault();
    }
});


Template.register.onRendered(function(){
    $('.register').validate({
      submitHandler: function(event){
        var email = $('[name=email]').val();
        var password = $('[name=password]').val();
        Accounts.createUser({
            email: email,
            password: password
            }, function(error){
            if(error){
               if(error.reason == "Email already exists."){
                    $('.register').validate().showErrors({
                        email: "That email already belongs to a registered user."   
                    });
               }
            }else
                Router.go("home"); // Redirect user if registration succeeds
            })
        }
    });
});