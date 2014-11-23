if (Meteor.isClient) {
  Template.body.helpers({
    projects: [
      { name: "Youtube Karaoke" },
      { name: "Hack a Trackathon" },
      { name: "Badges for Friends" }
    ]
  });
}
