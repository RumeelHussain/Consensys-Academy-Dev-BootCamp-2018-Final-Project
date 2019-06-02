'use strict';

const Documents = artifacts.require('Documents');

contract('Documents', function(accounts) {

  const verifier1 = accounts[1];
  const verifier2 = accounts[2];
  const requester1 = accounts[3];
  const requester2 = accounts[4]; // eslint-disable-line

  const doc1 = {
    verifier: verifier1,
    name: 'Document 1',
    description: 'Document1 Description',
    docAddress: 'Document1 IPFS address'
  };

  const doc2 = {
    verifier: verifier2,
    name: 'Document 2',
    description: 'Document2 Description',
    docAddress: 'Document2 IPFS address'
  };

  it('...should add a document and mark as verified for requester.', async() => {

    const documents = await Documents.deployed();

    let eventAddEmitted = false;
    const eventAdded = documents.DocumentAdded();
    await eventAdded.watch((err, res) => {
      if (err) {
        assert.fail('error received on event watch');
      }
      eventAddEmitted = true;
    });

    let eventVerifiedEmitted = false; // eslint-disable-line
    const eventVerified = documents.DocumentVerified();
    await eventVerified.watch((err, res) => {
      if (err) {
        assert.fail('error received on event watch');
      }
      eventVerifiedEmitted = true;
    });

    await documents.addDocument(doc1.verifier, doc1.name, doc1.description, doc1.docAddress, { from: requester1 });

    const docDetails = await documents.getDocument.call(doc1.docAddress, { from: requester1 });
    assert.equal(docDetails[0], doc1.name, 'the name of the last added item does match the expected value');
    assert.equal(docDetails[1], requester1, 'the requester1 of the last added item does match the expected value');
    assert.equal(docDetails[2], doc1.verifier, 'the verifier of the last added item does match the expected value');
    assert.equal(docDetails[3], doc1.description, 'the description of the last added item does match the expected value');
    assert.equal(docDetails[4], false, 'the state of the last added item does match the expected value');
    assert.equal(eventAddEmitted, true, 'adding an item should emit a Registered event');

    const verifierDoc = await documents.getVerifierDocuments.call(doc1.verifier, 0, { from: requester1 });
    assert.equal(verifierDoc[0], doc1.name, 'the name of the last added item does match the expected value');
    assert.equal(verifierDoc[1], requester1, 'the requester of the last added item does match the expected value');
    assert.equal(verifierDoc[2], doc1.description, 'the description of the last added item does match the expected value');
    assert.equal(verifierDoc[3], doc1.docAddress, 'the docAddress of the last added item does match the expected value');
    assert.equal(verifierDoc[4], false, 'the state of the last added item does match the expected value');
    assert.equal(verifierDoc[5].c[0], 0, 'the state of the last added item does match the expected value');

    const requesterDoc = await documents.getRequesterDocuments.call(requester1, 0, { from: requester1 });
    assert.equal(requesterDoc[0], doc1.name, 'the name of the last added item does match the expected value');
    assert.equal(requesterDoc[1], doc1.verifier, 'the verifier of the last added item does match the expected value');
    assert.equal(requesterDoc[2], doc1.description, 'the description of the last added item does match the expected value');
    assert.equal(requesterDoc[3], doc1.docAddress, 'the docAddress of the last added item does match the expected value');
    assert.equal(requesterDoc[4], false, 'the state of the last added item does match the expected value');
    assert.equal(requesterDoc[5].c[0], 0, 'the index of the last added item does match the expected value');

    const verifierDocs1 = await documents.getCounts.call(doc1.verifier, { from: doc1.verifier });
    assert.equal(verifierDocs1[0].c[0], 0, 'the verified count of documents for verifier');
    assert.equal(verifierDocs1[1].c[0], 0, 'the rejected count of documents for verifier');
    assert.equal(verifierDocs1[2].c[0], 1, 'the total count of documents for verifier');

    const requesterDocs1 = await documents.getCounts.call(requester1, { from: requester1 });
    assert.equal(requesterDocs1[0].c[0], 0, 'the verified count of documents for requester');
    assert.equal(requesterDocs1[1].c[0], 0, 'the rejected count of documents for requester');
    assert.equal(requesterDocs1[2].c[0], 1, 'the total count of documents for requester');

    await documents.verifyDocument(doc1.docAddress, 1, { from: doc1.verifier, value: 10000 });

    const docVerifiedDetails = await documents.getDocument.call(doc1.docAddress, { from: requester1 });
    assert.equal(docVerifiedDetails[0], doc1.name, 'the name of the verified item does match the expected value');
    assert.equal(docVerifiedDetails[1], requester1, 'the requester1 of the verified added item does match the expected value');
    assert.equal(docVerifiedDetails[2], doc1.verifier, 'the verifier of the verified added item does match the expected value');
    assert.equal(docVerifiedDetails[3], doc1.description, 'the description of the verified added item does match the expected value');
    assert.equal(docVerifiedDetails[4].c[0], 1, 'the state of the verified added item does match the expected value');
    // assert.equal(eventVerifiedEmitted, true, 'verifying an item should emit a Verified event');

    const verifierDocs2 = await documents.getCounts.call(doc1.verifier, { from: doc1.verifier });
    assert.equal(verifierDocs2[0].c[0], 1, 'the verified count of documents for verifier after verification');
    assert.equal(verifierDocs2[1].c[0], 0, 'the rejected count of documents for verifier after verification');
    assert.equal(verifierDocs2[2].c[0], 1, 'the total count of documents for verifier after verification');

    const requesterDocs2 = await documents.getCounts.call(requester1, { from: requester1 });
    assert.equal(requesterDocs2[0].c[0], 1, 'the verified count of documents for requester after verification');
    assert.equal(requesterDocs2[1].c[0], 0, 'the rejected count of documents for requester after verification');
    assert.equal(requesterDocs2[2].c[0], 1, 'the total count of documents for requester after verification');

  });

  it('...should add another document and mark as rejected from verifier.', async() => {

    const documents = await Documents.deployed();

    let eventAddEmitted = false;
    const eventAdded = documents.DocumentAdded();
    await eventAdded.watch((err, res) => {
      if (err) {
        assert.fail('error received on event watch');
      }
      eventAddEmitted = true;
    });

    let eventVerifiedEmitted = false; // eslint-disable-line
    const eventVerified = documents.DocumentVerified();
    await eventVerified.watch((err, res) => {
      if (err) {
        assert.fail('error received on event watch');
      }
      eventVerifiedEmitted = true;
    });

    await documents.addDocument(doc2.verifier, doc2.name, doc2.description, doc2.docAddress, { from: requester1 });

    const docDetails = await documents.getDocument.call(doc2.docAddress, { from: requester1 });
    assert.equal(docDetails[0], doc2.name, 'the name of the last added item does match the expected value');
    assert.equal(docDetails[1], requester1, 'the requester1 of the last added item does match the expected value');
    assert.equal(docDetails[2], doc2.verifier, 'the verifier of the last added item does match the expected value');
    assert.equal(docDetails[3], doc2.description, 'the description of the last added item does match the expected value');
    assert.equal(docDetails[4].c[0], 0, 'the state of the last added item does match the expected value');
    assert.equal(eventAddEmitted, true, 'adding an item should emit a Registered event');

    const requesterDocs = await documents.getCounts.call(requester1, { from: requester1 });
    assert.equal(requesterDocs[0].c[0], 1, 'the verified count of documents for requester');
    assert.equal(requesterDocs[1].c[0], 0, 'the rejected count of documents for requester');
    assert.equal(requesterDocs[2].c[0], 2, 'the total count of documents for requester');

    const verifierDocs = await documents.getCounts.call(doc2.verifier, { from: doc2.verifier });
    assert.equal(verifierDocs[0].c[0], 0, 'the verified count of documents for verifier');
    assert.equal(verifierDocs[1].c[0], 0, 'the rejected count of documents for verifier');
    assert.equal(verifierDocs[2].c[0], 1, 'the total count of documents for verifier');

    await documents.verifyDocument(doc2.docAddress, 2, { from: doc2.verifier, value: 30000 });

    const docVerifiedDetails = await documents.getDocument.call(doc2.docAddress, { from: requester1 });
    assert.equal(docVerifiedDetails[0], doc2.name, 'the name of the verified item does match the expected value');
    assert.equal(docVerifiedDetails[1], requester1, 'the requester1 of the verified added item does match the expected value');
    assert.equal(docVerifiedDetails[2], doc2.verifier, 'the verifier of the verified added item does match the expected value');
    assert.equal(docVerifiedDetails[3], doc2.description, 'the description of the verified added item does match the expected value');
    assert.equal(docVerifiedDetails[4].c[0], 2, 'the state of the rejected added item does match the expected value');
    // assert.equal(eventVerifiedEmitted, true, 'verifying an item should emit a Verified event');

    const verifierDocs2 = await documents.getCounts.call(doc2.verifier, { from: doc2.verifier });
    assert.equal(verifierDocs2[0].c[0], 0, 'the verified count of documents for verifier after verification');
    assert.equal(verifierDocs2[1].c[0], 1, 'the rejected count of documents for verifier after verification');
    assert.equal(verifierDocs2[2].c[0], 1, 'the total count of documents for verifier after verification');

    const requesterDocs2 = await documents.getCounts.call(requester1, { from: requester1 });
    assert.equal(requesterDocs2[0].c[0], 1, 'the verified count of documents for requester after verification');
    assert.equal(requesterDocs2[1].c[0], 1, 'the rejected count of documents for requester after verification');
    assert.equal(requesterDocs2[2].c[0], 2, 'the total count of documents for requester after verification');
  });
  // TODO write tests for fail cases.

});
