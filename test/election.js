var Election = artifacts.require("Election");

contract("Election", function(accounts) {
  var electionInstance;

  it("initializes with two candidates", async function() {
    const instance = await Election.deployed()
    const candidatesCount = await instance.candidatesCount()
    assert.equal(candidatesCount, 2)
  });

  it("it initializes the candidates with the correct values", async function() {
    const instance = await Election.deployed()

    const candidate1 = await instance.candidates(1)
    assert.equal(candidate1[0], 1, "contains the correct id");
    assert.equal(candidate1[1], "Candidate 1", "contains the correct name");
    assert.equal(candidate1[2], 0, "contains the correct votes count");

    const candidate2 = await instance.candidates(2)
    assert.equal(candidate2[0], 2, "contains the correct id");
    assert.equal(candidate2[1], "Candidate 2", "contains the correct name");
    assert.equal(candidate2[2], 0, "contains the correct votes count");
  });

  it("allows a voter to cast a vote", async function() {
    const instance = await Election.deployed()
    const candidateId = 1

    const receipt = await instance.vote(candidateId, { from: accounts[0] });
    assert.equal(receipt.logs.length, 1, "an event was triggered");
    assert.equal(receipt.logs[0].event, "votedEvent", "the event type is correct");
    assert.equal(receipt.logs[0].args._candidateId.toNumber(), candidateId, "the candidate id is correct");

    assert(instance.voters(accounts[0]), "the voter was marked as voted");

    const candidate = await instance.candidates(candidateId)
    const voteCount = candidate[2]
    assert.equal(voteCount, 1, "increments the candidate's vote count");
  });

  it("throws an exception for invalid candidates", async function() {
    const instance = await Election.deployed()
    try {
      await instance.vote(99, { from: accounts[1] })
    } catch (error) {
      assert(error.message.indexOf('revert') >= 0, "error message must contain revert");
    }

    const candidate1 = await instance.candidates(1)
    var voteCount1 = candidate1[2];
    assert.equal(voteCount1, 1, "candidate 1 did not receive any votes");
    
    const candidate2 = await instance.candidates(2)
    var voteCount2 = candidate2[2];
    assert.equal(voteCount2, 0, "candidate 2 did not receive any votes");
  });

  it("throws an exception for double voting", async function() {
    const instance = await Election.deployed()
    const candidateId = 2
    instance.vote(candidateId, { from: accounts[1] })
    
    const candidate = await instance.candidates(candidateId)
    const voteCount = candidate[2];
    assert.equal(voteCount, 1, "accepts first vote");

    try {
      await instance.vote(candidateId, { from: accounts[1] })
    } catch (error) {
      assert(error.message.indexOf('revert') >= 0, "error message must contain revert");
    }

    const candidate1 = await instance.candidates(1)
    var voteCount1 = candidate1[2];
    assert.equal(voteCount1, 1, "candidate 1 did not receive any votes");
    
    const candidate2 = await instance.candidates(2)
    var voteCount2 = candidate2[2];
    assert.equal(voteCount2, 1, "candidate 2 did not receive any votes");
  });
});