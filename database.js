ItemList = new Mongo.Collection('items');
StoreList = new Mongo.Collection('stores');
GroupList = new Mongo.Collection('groups');
TeamList = new Mongo.Collection('teams');
MemberList = new Mongo.Collection('members');

var Schemas = {};
// Item: only developer can create public items. users make private items. createdBy = userId
Schemas.Item = new SimpleSchema({
  name: {type: String, max:20, min:2},
  icon: {type: String, max:30, min:5},
  public: {type: Boolean,  defaultValue: true},
  createdAt: {type: Date},
  createdBy: {type: String, max:24, min:24},
  groupId: {type: String, max:24, min:24}
});
ItemList.attachSchema(Schemas.Item);
// Store   (there's one store per team)
Schemas.Store = new SimpleSchema({
  desc: {type: String, max:20, defaultValue:""},
  inCart: {type: Boolean},
  createdAt: {type: Date},
  lastDateInCart: {type: Date},
  teamId: {type: String, max:24, min:24},
  itemId: {type: String, max:24, min:24}
});
StoreList.attachSchema(Schemas.Store);
// Group : group of items. it's defined in app. users cannot change it.
Schemas.Group = new SimpleSchema({
  name: {type: String, max:20, min:2}
});
GroupList.attachSchema(Schemas.Group);
// Team: createdBy = userId
Schemas.Team = new SimpleSchema({
  name: {type: String, max:20, min:1},
  createdAt: {type: Date},
  createdBy: {type: String, max:24, min:24}
});
TeamList.attachSchema(Schemas.Team);
// Member
Schemas.Member = new SimpleSchema({
  nickName: {type: String, max:20, min:1},
  privilege: {type: String, allowedValues: ['admin', 'edit','view'] },
  joinedAt: {type: Date},
  teamId: {type: String, max:24, min:24}, 
  userId: {type: String, max:24, min:24}  
});
MemberList.attachSchema(Schemas.Member);
