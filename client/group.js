Template.Group_List.onCreated(function () {
    this.subscribe('groups');
});

Template.Group_List.helpers({
  'groups' : function() {
    return GroupList.find({}, {sort: {name: 1}});
  }
});

Template.Group_List.events({
   'click .removeConfirm' : function(e) {
     var groupId = Session.get('activeModal');
     console.log(groupId);
     Meteor.call('removeGroup', groupId, function(error, results){
        if(error) console.log(error.reason);
     });     
   }
}); 

Template.Group.events({
   'click .remove' : function(e) {
     Session.set('activeModal', this._id);
     console.log(Session.get('activeModal'));
   },
   'keyup [name=listItem]': function(event){
      var groupId = this._id;
      var groupName = event.target.value;
      GroupList.update( {_id: groupId } , { $set : { name: groupName } } );
    }
});

Template.Add_Group_Form.events({
  'submit ' : function() {
    event.preventDefault();
    var groupName = event.target.groupName.value;
    Meteor.call('createNewGroup', groupName, function(error, results){
        if(error){
            console.log(error.reason);
        } else {
            Router.go('listPage', { _id: results });
            $('[name=groupName]').val('');
        };
    })
    console.log(groupName );
  }
});
