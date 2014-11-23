Projects = new Mongo.Collection("projects");

if (Meteor.isClient) {
  Template.body.helpers({

    projects: function () {
      if (Session.get("hideCompleted")) {
        return Projects.find({checked: {$ne: true}}, {sort: {name: 1}});
      } else {
        return Projects.find({}, {sort: {name: 1}});
      }
    },

    hideCompleted: function () {
      return Session.get("hideCompleted");
    },

    incompleteCount: function() {
      return Projects.find({checked: {$ne: true}}).count();
    }

  });

  Template.body.events({
    "submit .new-project": function (event) {

      var name = event.target.name.value;

      Projects.insert({
        name: name,
        createdAt: new Date()
      });

      event.target.name.value = "";

      return false;
    },

    "change .hide-completed input": function (event) {
      Session.set("hideCompleted", event.target.checked);
    }
  })

  Template.project.events({
    "click .toggle-checked": function () {
      Projects.update(this._id, {$set: {checked: ! this.checked}});
    },
    "click .delete": function () {
      Projects.remove(this._id);
    }
  });

  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });
}
