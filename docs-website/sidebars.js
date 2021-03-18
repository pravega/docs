// This builds the consolidated navigation sidebars for the Pravega ecosystem.
// It combines the sidebars for all components.

// Apply a function to the entries of an object.
function objectMap(obj, fn) {
  return Object.fromEntries(
    Object.entries(obj).map(
      ([k, v], i) => [k, fn(v, k, i)]
    )
  )
}

// Add prefix to any document IDs in a sidebar object.
function addPrefixToDocumentId(obj, prefix) {
  if (typeof obj === 'string') {
    return prefix + obj;
  } else if (Array.isArray(obj)) {
    return obj.map(v => addPrefixToDocumentId(v, prefix));
  } else if (typeof obj === 'object') {
    return objectMap(obj, v => addPrefixToDocumentId(v, prefix));
  } else {
    return obj;
  }
}

// Load sidebars from outside directories or submodules.
// This must be consistent with editUrlMap in docusaurus.config.js.

pravegaSidebars = require('./docs/pravega/sidebars.js');
flinkConnectorsSidebars = require('./docs/flink-connectors/sidebars.js');

module.exports = {
  mainSidebar: {
    Pravega: addPrefixToDocumentId(pravegaSidebars.mainSidebar, 'pravega/'),
    Connectors: [
      { Flink: addPrefixToDocumentId(flinkConnectorsSidebars.mainSidebar, 'flink-connectors/') },
      { type: 'link', label: 'Spark', href: 'https://github.com/pravega/spark-connectors' },
      { type: 'link', label: 'NiFi', href: 'https://github.com/pravega/nifi-pravega' },
      { type: 'link', label: 'Logstash', href: 'https://github.com/pravega?q=logstash' },
      { type: 'link', label: 'Boomi', href: 'https://github.com/pravega/boomi-connector' },
      { type: 'link', label: 'Kafka Adapter', href: 'https://github.com/pravega/kafka-adapter' },
    ],
  },
};
