'use strict';

async function createProductSet() {
  // Imports the Google Cloud client library
  const vision = require('@google-cloud/vision');

  // Creates a client
  const client = new vision.ProductSearchClient();

  const projectId = 'project-terminal-shopping';
  const location = 'europe-west1';
  const productSetId = '3D-CLOTHES-SHIRTS_001';
  const productSetDisplayName = '3D-CLOTHES-SHIRTS';

  // Resource path that represents Google Cloud Platform location.
  const locationPath = client.locationPath(projectId, location);

  const productSet = {
    displayName: productSetDisplayName,
  };

  const request = {
    parent: locationPath,
    productSet: productSet,
    productSetId: productSetId,
  };

  const [createdProductSet] = await client.createProductSet(request);
  console.log(`Product Set name: ${createdProductSet.name}`);
}
createProductSet();