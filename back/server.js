const http = require("http");
/* const fs = require('fs'); */

const hostname = '127.0.0.1';
const port = 8000;
let product = '';

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS'){
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.end();
  }
  if (req.method === 'POST'){
    let body = '';
    req.on('data' , chunk => {
      body += chunk.toString();
      });
    req.on('end', () => {
    //saves file locally
    let base64Data = body.replace(/^data:image\/png;base64,/, "");
    /* fs.writeFile('./snaps/test.png', base64Data, {encoding: 'base64'}, () =>console.log('OK')); */
     getSimilarProductsFile(base64Data)
     .then(function (){
      console.log(`product : ${product}`);
      res.writeHead(200);
      res.write(product);
      res.end();
     })
    });
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

async function getSimilarProductsFile(image64) {
  // Imports the Google Cloud client library
  const vision = require('@google-cloud/vision');
  
  // Creates a client
  const productSearchClient = new vision.ProductSearchClient();
  const imageAnnotatorClient = new vision.ImageAnnotatorClient();

  const projectId = 'project-terminal-shopping';
  const location = 'europe-west1';
  const productSetId = '3D-CLOTHES-SHIRTS_001';
  const productCategory = 'apparel';
  /* const filePath = '/Users/pro/Documents/Hetic/projets/semaine-intensive_3D/assets/test/ultimate-test-3.jpg'; */
  const filter = '';
  const productSetPath = productSearchClient.productSetPath(
    projectId,
    location,
    productSetId
  );
/*   const content = fs.readFileSync(filePath, 'base64'); */
//récuperer data envoyé coté client et attribuer à content
  const request = {
    image: {content: image64},
    features: [{type: 'PRODUCT_SEARCH'}],
    imageContext: {
      productSearchParams: {
        productSet: productSetPath,
        productCategories: [productCategory],
        filter: filter,
      },
    },
  };
  const [response] = await imageAnnotatorClient.batchAnnotateImages({
    requests: [request],
  });
  /* console.log('Search Image:', filePath); */
  const results = response['responses'][0]['productSearchResults']['results'][0];
  const productId = results['product'].name.split('/').pop(-1);
  /* console.log('Product id:', productId);
  console.log('Product display name:', results['product'].displayName);
  console.log('Product description:', results['product'].description);
  console.log('Product category:', results['product'].productCategory); */
  product = productId;
}
