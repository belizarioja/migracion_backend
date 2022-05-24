const dynamicHash = require("../index");
const assert = require("chai").assert;

// Value to encrypt:
const value = 'test value to hash';
// Generate a salt object at ./salt/prase.json
const genSalt = dynamicHash.genSalt(); // ---> Returns the salt object
// Get the current salt
const salt = dynamicHash.getSalt(); // ---> Returns salt
// Encrypting the given value
const encrypted = dynamicHash.encrypt(value, salt); // ---> Returns hash value
// Checking given value versus the encrypted value
const check = dynamicHash.compare(value, encrypted, salt); // ---> Returns Boolean
// Decrypting the given hash value
const decrypted = dynamicHash.decrypt(encrypted, salt); // ---> Returns original value

describe("Dynamic-Hash Testing", () => {
  it("Succesfully create a salt object at ./salt/prase.json", () => {
    assert.isObject(genSalt);
  });
  it("Get the current salt value from ./salt/prase.json", () => {
    assert.lengthOf(salt,64);
    assert.typeOf(salt, "string");
  });

  it("Testing if salt  is equal to current salt at ./salt/prase.json", () => {
    assert.equal(salt, genSalt.salt);
  });

  it("Testing if a given value is equal to a given hash", () => {
    assert.isTrue(check);
  });

  it("Testing if the decrypted value is equal to the orignal encrypted value", () => {
    assert.equal(decrypted,value)
  });
});

describe("Dynamic-Hash Async Testing", async () => {
  it("Succesfully create a salt object at ./salt/prase.json", async () => {
    const genSalt = await dynamicHash.genSaltSync(); // ---> Returns the salt object
    assert.isObject(genSalt);
  });
  it("Get the current salt value from ./salt/prase.json", async () => {
    const salt = await dynamicHash.getSaltSync(); // ---> Returns salt
    assert.lengthOf(salt,64);
    assert.typeOf(salt, "string");
  });

  it("Testing if salt  is equal to current salt at ./salt/prase.json", async () => {
    const genSalt = await dynamicHash.genSaltSync(); // ---> Returns the salt object
    const salt = await dynamicHash.getSaltSync(); // ---> Returns salt
    assert.equal(salt, genSalt.salt);
  });

  it("Testing if a given value is equal to a given hash", async () => {
    const genSalt = await dynamicHash.genSaltSync(); // ---> Returns the salt object
    const salt = await dynamicHash.getSaltSync(); // ---> Returns salt
    const encrypted = await dynamicHash.encryptSync(value, salt); // ---> Returns hash value
    const check = await dynamicHash.compareSync(value, encrypted, salt); // ---> Returns Boolean
    assert.isTrue(check);
  });

  it("Testing if the decrypted value is equal to the orignal encrypted value", async () => {
    const genSalt = await dynamicHash.genSaltSync(); // ---> Returns the salt object
    const salt = await dynamicHash.getSaltSync(); // ---> Returns salt
    const encrypted = await dynamicHash.encryptSync(value, salt); // ---> Returns hash value
    const decrypted = await dynamicHash.decryptSync(encrypted, salt); // ---> Returns original value
    assert.equal(decrypted,value);
  });
});

