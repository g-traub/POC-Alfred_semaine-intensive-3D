async function importProductSets(){
  // Imports the Google Cloud client library
  const vision = require('@google-cloud/vision');
  // Creates a client
  const client = new vision.ProductSearchClient();

  const projectId = 'project-terminal-shopping';
  const location = 'europe-west1';
  const gcsUri = 'gs://test-shopping-terminal_storage/references2.csv';

  // A resource that represents Google Cloud Platform location.
  const projectLocation = client.locationPath(projectId, location);

  // Set the input configuration along with Google Cloud Storage URI
  const inputConfig = {
    gcsSource: {
      csvFileUri: gcsUri,
    },
  };

  // Import the product sets from the input URI.
  const [response, operation] = await client.importProductSets({
    parent: projectLocation,
    inputConfig: inputConfig,
  });

  console.log('Processing operation name: ', operation.name);

  // synchronous check of operation status
  const [result] = await response.promise();
  console.log('Processing done.');
  console.log('Results of the processing:');

  for (const i in result.statuses) {
    console.log('Status of processing ', i, 'of the csv:', result.statuses[i]);

    // Check the status of reference image
    if (result.statuses[i].code === 0) {
      console.log(result.referenceImages[i]);
    } else {
      console.log('No reference image.');
    }
  }
}

importProductSets();