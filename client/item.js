Template.Item_List.helpers({
  'tasks' : function() {
    return ItemList.find({groupId : this._id}, {sort: {createdAt: -1}});
  },
  'total' : function() {
    return ItemList.find({groupId : this._id}).count();
  },
  'totalCompleted' : function() {
    return ItemList.find({groupId : this._id , inCart:true}).count();
  },
});

Template.Item_List.onCreated(function () {
    this.subscribe('items');
});

Template.Item_List.events({
  'click .removeConfirm' : function() {
      var itemId = Session.get('activeModal');
      Meteor.call('removeItem', itemId, function(error, results){
        if(error) console.log(error.reason);
      });
   },
})  

Template.Item.helpers({
  'selected' : function() {
    //if ( this._id==Session.get('selectedTask'))
    //  return "selected";
  },
  'inCart': function() {
    if ( this.inCart) return "inCart";
   },
  'checkedBox': function() {
    if ( this.inCart) return "checked";
  }
});
  
Template.Item.events({
  'click .completed' : function() {
    console.log("checkbox");
    var itemId = this._id;
    var itemInCart = !(TaskList.findOne( {_id: taskId } ).completed);
    Meteor.call('completeTask', itemId, itemInCart, function(error, results){
      if(error) console.log(error.reason);
    });
  },
   'keyup [name=itemName]': function(event){
       //console.log('taskDesc');
       var itemId = this._id;
       var itemName = event.target.value;
       Meteor.call('editTask', itemId, itemName, function(error, results){
            if(error) console.log(error.reason);
        });
    },
    'click .remove' : function() {
      var itemId = this._id;
      Session.set('activeModal', itemId);
   }
});

Template.Add_Item_Form.events({
  'submit ' : function() {
    event.preventDefault();
    var itemName = event.target.itemName.value;
    var currentGroupId = this._id;
    Meteor.call('createNewItem', itemName, currentGroupId, function(error, results){
        if(error){
            console.log(error.reason);
        } else {
            $('[name=taskDesc]').val('');
        };
    });
    console.log(taskDesc );
  }
});
