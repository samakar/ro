Meteor.publish('items', 
  function(){
    return ItemList.find( {$or: [ {createdBy: this.userId}, {public: true} ] } );
  }
)
Meteor.publish('groups', 
  function(){
    return GroupList.find({});
  }
);

Meteor.methods({
  'createNewGroup': function(groupName){
    var currentUser = this.userId;
    if(!currentUser)
            throw new Meteor.Error("not-logged-in", "You're not logged-in.");
    var data = { name: groupName };
    return GroupList.insert( data );   
  },
  'createNewItem': function(itemName, itemIcon, currentGroupId){
    var currentUser = this.userId;
    checkUser();
    var data =  { 
      name: itemName, 
      icon: itemIcon, 
      createdAt: new Date(),
      createdBy: currentUser,
      groupId: currentGroupId
    };
    return ItemList.insert( data );   
  },
  'editItem': function(itemId, itemName){
    checkUser();
    return ItemList.update( {_id: itemId } , { $set : { name: itemName } } );
  },
  'itemCart': function(itemId, itemInCart){
    checkUser();
    return  ItemList.update( {_id: itemId } , { $set : { inCart: itemInCart} } );
  },
  'removeItem': function(itemId){
    checkUser();
    return  ItemList.remove({ _id: itemId });
  },
  'removeGroup': function(groupId){
    checkUser();
    return  GroupList.remove({ _id: groupId });
  }
  
});

function checkUser(){
    var currentUser = Meteor.userId();
    if(!currentUser)
            throw new Meteor.Error("not-logged-in", "You're not logged-in.");  
}