const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { assert } = require("chai");

describe("Game5", function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory("Game5");
    const game = await Game.deploy();
    const signer = ethers.provider.getSigner(0);

    return { game, signer };
  }
  it("should be a winner", async function () {
    const { game, signer } = await loadFixture(deployContractAndSetVariables);

    // good luck
    let threshold = 0x00ffffffffffffffffffffffffffffffffffffff;
    let address;
    let wallet;
    while (true) {
      wallet = ethers.Wallet.createRandom();
      address = await wallet.getAddress();

      if (address < threshold) {
        await signer.sendTransaction({
          to: address,
          value: ethers.utils.parseEther("0.1"), // 1 ether
        });
        wallet = wallet.connect(ethers.provider);
        await game.connect(wallet).win();

        // leave this assertion as-is
        assert(await game.connect(wallet).isWon(), "You did not win the game");
        break;
      }
    }
  });
});
