var events = (function () {
  var topics = {};
  var hOP = topics.hasOwnProperty;

  return {
    subscribe: function (topic, listener) {
      // Create the topic's object if not yet created
      if (!hOP.call(topics, topic)) {
        topics[topic] = [];
      }

      // Add the listener to queue
      var index = topics[topic].push(listener) - 1;

      // Provide handle back for removal of topic
      return {
        remove: function () {
          delete topics[topic][index];
        },
      };
    },
    publish: function (topic, info) {
      // General public publish
      // Publish to multiple events based on commas
      var topicList = topic.split(",");
      topicList.forEach(function (item) {
        events._publishSingle(item, info);
      });
    },
    _publishSingle: function (topic, info) {
      // Publish to multiple events based on dots
      var topicTaxonomy = topic.split(".");
      var currentTopic = "";
      topicTaxonomy.forEach(function (item) {
        if (currentTopic === "") {
          // Top level event
          currentTopic = item;
        } else {
          // Child event
          currentTopic = currentTopic + "." + item;
        }
        events._publishOnly(currentTopic, info);
      });
    },
    _publishOnly: function (topic, info) {
      // This will publish only to the single event matched
      // If the topic doesn't exist, or there's no listeners in queue, just leave
      if (!hOP.call(topics, topic)) {
        return;
      }

      // Cycle through topics queue, fire!
      topics[topic].forEach(function (item) {
        item(info !== undefined ? info : {});
      });
    },
  };
})();

module.exports = events;
