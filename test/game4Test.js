const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { assert } = require('chai');

describe('Game4', function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory('Game4');
    const game = await Game.deploy();
    const user1 = ethers.provider.getSigner(0);
    const user2 = ethers.provider.getSigner(1);

    return { game, user1, user2 };
  }
  it('should be a winner', async function () {
    const { game, user1, user2 } = await loadFixture(deployContractAndSetVariables);

    // nested mappings are rough :}
    await game.connect(user2).write(user1.getAddress()); 
    await game.connect(user1).win(user2.getAddress());

    // leave this assertion as-is
    assert(await game.isWon(), 'You did not win the game');
  });
});
