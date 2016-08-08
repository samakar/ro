Router.configure( { layoutTemplate: 'Main' } );
Router.route('/register');
Router.route('/login');
Router.route("/", {name: 'home', template:'Home'});
Router.route('/list/:_id', {
    template: 'Group_Items',
    name: 'listPage',
    data: function(){
        var currentList = this.params._id;
        return GroupList.findOne({ _id: currentList });
    },
    onBeforeAction: function(){
        console.log("You triggered 'onBeforeAction' for 'listPage' route.");
        var currentUser = Meteor.userId();
        if(currentUser){
            this.next();
        } else {
            this.render("login");
        }
    }  
});