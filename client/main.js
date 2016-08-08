console.log("Hello Chrome be carefull!");

Template.Navigation.events({
    'click .logout': function(event){
        event.preventDefault();
        Meteor.logout();
        Router.go("login");
    }
});