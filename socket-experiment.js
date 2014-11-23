Projects = new Mongo.Collection("projects");

if (Meteor.isClient) {
  Template.body.helpers({
    projects: function() {
      return Projects.find({});
    }
  });
}
