Projects = new Mongo.Collection("projects");

if (Meteor.isClient) {
  Template.body.helpers({
    projects: function() {
      return Projects.find({}, {sort: {name: 1}});
    }
  });

  Template.body.events({
    "submit .new-project": function (event) {

      var name = event.target.name.value;

      Projects.insert({
        name: name,
        createdAt: new Date(),
      });

      event.target.name.value = "";

      return false;
    }
  })

  Template.project.events({
    "click .toggle-checked": function () {
      Projects.update(this._id, {$set: {checked: ! this.checked}});
    },
    "click .delete": function () {
      Projects.remove(this._id);
    },
    "click #product-box": function () {
      Projects.update(this._id, {$set: { product: 'done' }});
    }
  });


}
