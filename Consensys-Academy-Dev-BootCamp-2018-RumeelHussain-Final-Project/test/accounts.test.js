'use strict';

const Accounts = artifacts.require('Accounts');
const expect = require('./helpers/expect');

contract('Accounts', function(accounts) {

  const verifier1 = accounts[1];
  const verifier2 = accounts[2];
  const requester = accounts[3];
  const requester2 = accounts[4];

  const account = {
    name: 'Sindh',
    email: 'rumeel@edu.pk',
    logo: 'logo-url',
    description: 'Jamshoro',
    type: 0,
    verificationPrice: 10000
  };
  const account2 = {
    name: 'NUST',
    email: 'nust@edu.pk',
    logo: 'logo-url',
    description: 'Karachi',
    type: 0,
    verificationPrice: 10000
  };
  const account3 = {
    name: 'Rumeel',
    email: 'Rumeel@edu.pk',
    logo: 'logo-url',
    description: 'Lahore',
    type: 1,
    verificationPrice: 0
  };
  const account4 = {
    name: 'Hussain',
    email: 'Hussain@edu.pk',
    logo: 'logo-url',
    description: 'Lahore',
    type: 1,
    verificationPrice: 0
  };

  it('...should register a valid verifier information.', async() => {

    const accounts = await Accounts.deployed();

    let countBefore = await accounts.verifiersCount.call({ from: verifier1 });
    countBefore = countBefore.c[0];

    let eventEmitted = false;
    const event = accounts.Registered();

    await event.watch((err, res) => {
      if (err) {
        assert.fail('error received on event watch');
      }
      eventEmitted = true;
    });

    await accounts.register(account.name, account.email, account.logo, account.description, account.type, account.verificationPrice, { from: verifier1 });

    const result = await accounts.getAccount.call({ from: verifier1 });

    assert.equal(result[0], account.name, 'the name of the last added item does match the expected value');
    assert.equal(result[1], account.email, 'the email of the last added item does match the expected value');
    assert.equal(result[2], account.logo, 'the logo of the last added item does match the expected value');
    assert.equal(result[3], account.description, 'the description of the last added item does match the expected value');
    assert.equal(result[4].c[0], account.type, 'the type of the last added item does match the expected value');
    assert.equal(result[5].c[0], account.verificationPrice, 'the verificationPrice of the last added item does match the expected value');
    assert.equal(eventEmitted, true, 'adding an item should emit a Registered event');

    let countAfter = await accounts.verifiersCount.call({ from: verifier1 });
    countAfter = countAfter.c[0];

    assert.equal(countAfter, (countBefore + 1), 'verifiers count should be increased');

    const price = await accounts.getPrice.call(verifier1, { from: verifier1 });

    const getVerifier = await accounts.getVerifier.call(countBefore, { from: verifier1 });

    assert.equal(verifier1, getVerifier[0], 'getVerifier should return valid verifier address');

    assert.equal(price.c[0], account.verificationPrice, 'getPrice should return valid verifier price');

  });

  it('...should not register with invalid email address.', async() => {

    const accounts = await Accounts.deployed();

    await expect.throwError(accounts.register(account.name, 'invalid-email', account.logo, account.description, account.type, account.verificationPrice, { from: verifier1 }));

  });

  it('...should register a another valid verifier information.', async() => {

    const accounts = await Accounts.deployed();

    let countBefore = await accounts.verifiersCount.call({ from: verifier2 });
    countBefore = countBefore.c[0];

    let eventEmitted = false;
    const event = accounts.Registered();

    await event.watch((err, res) => {
      if (err) {
        assert.fail('error received on event watch');
      }
      eventEmitted = true;
    });

    await accounts.register(account2.name, account2.email, account2.logo, account2.description, account2.type, account2.verificationPrice, { from: verifier2 });

    const result = await accounts.getAccount.call({ from: verifier2 });

    assert.equal(result[0], account2.name, 'the name of the last added item does match the expected value');
    assert.equal(result[1], account2.email, 'the email of the last added item does match the expected value');
    assert.equal(result[2], account2.logo, 'the logo of the last added item does match the expected value');
    assert.equal(result[3], account2.description, 'the description of the last added item does match the expected value');
    assert.equal(result[4].c[0], account2.type, 'the type of the last added item does match the expected value');
    assert.equal(result[5].c[0], account2.verificationPrice, 'the verificationPrice of the last added item does match the expected value');
    assert.equal(eventEmitted, true, 'adding an item should emit a Registered event');

    let countAfter = await accounts.verifiersCount.call({ from: verifier2 });
    countAfter = countAfter.c[0];

    assert.equal(countAfter, (countBefore + 1), 'verifiers count should be increased');

    const price = await accounts.getPrice.call(verifier2, { from: verifier2 });

    const getVerifier = await accounts.getVerifier.call(countBefore, { from: verifier2 });

    assert.equal(verifier2, getVerifier[0], 'getVerifier should return valid verifier address');

    assert.equal(price.c[0], account.verificationPrice, 'getPrice should return valid verifier price');

  });

  it('...should register a valid requester information.', async() => {

    const accounts = await Accounts.deployed();

    let countBefore = await accounts.verifiersCount.call({ from: requester });
    countBefore = countBefore.c[0];

    let eventEmitted = false;
    const event = accounts.Registered();

    await event.watch((err, res) => {
      if (err) {
        assert.fail('error received on event watch');
      }
      eventEmitted = true;
    });

    await accounts.register(account3.name, account3.email, account3.logo, account3.description, account3.type, account3.verificationPrice, { from: requester });

    const result = await accounts.getAccount.call({ from: requester });

    assert.equal(result[0], account3.name, 'the name of the last added item does match the expected value');
    assert.equal(result[1], account3.email, 'the email of the last added item does match the expected value');
    assert.equal(result[2], account3.logo, 'the logo of the last added item does match the expected value');
    assert.equal(result[3], account3.description, 'the description of the last added item does match the expected value');
    assert.equal(result[4].c[0], account3.type, 'the type of the last added item does match the expected value');
    assert.equal(result[5].c[0], account3.verificationPrice, 'the verificationPrice of the last added item does match the expected value');
    assert.equal(eventEmitted, true, 'adding an item should emit a Registered event');

    let countAfter = await accounts.verifiersCount.call({ from: requester });
    countAfter = countAfter.c[0];

    assert.equal(countAfter, countBefore, 'verifiers count should not be increased');

    const price = await accounts.getPrice.call(requester, { from: requester });
    assert.equal(price.c[0], account3.verificationPrice, 'getPrice should return valid verifier price');

  });

  it('...should register another valid requester information.', async() => {

    const accounts = await Accounts.deployed();

    let countBefore = await accounts.verifiersCount.call({ from: requester2 });
    countBefore = countBefore.c[0];

    let eventEmitted = false;
    const event = accounts.Registered();

    await event.watch((err, res) => {
      if (err) {
        assert.fail('error received on event watch');
      }
      eventEmitted = true;
    });

    await accounts.register(account4.name, account4.email, account4.logo, account4.description, account4.type, account4.verificationPrice, { from: requester2 });

    const result = await accounts.getAccount.call({ from: requester2 });

    assert.equal(result[0], account4.name, 'the name of the last added item does match the expected value');
    assert.equal(result[1], account4.email, 'the email of the last added item does match the expected value');
    assert.equal(result[2], account4.logo, 'the logo of the last added item does match the expected value');
    assert.equal(result[3], account4.description, 'the description of the last added item does match the expected value');
    assert.equal(result[4].c[0], account4.type, 'the type of the last added item does match the expected value');
    assert.equal(result[5].c[0], account4.verificationPrice, 'the verificationPrice of the last added item does match the expected value');
    assert.equal(eventEmitted, true, 'adding an item should emit a Registered event');

    let countAfter = await accounts.verifiersCount.call({ from: requester2 });
    countAfter = countAfter.c[0];

    assert.equal(countAfter, countBefore, 'verifiers count should not be increased');

    const price = await accounts.getPrice.call(requester2, { from: requester2 });
    assert.equal(price.c[0], account3.verificationPrice, 'getPrice should return valid verifier price');

  });

});
