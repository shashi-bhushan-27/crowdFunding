require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.20",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545"
    }
  },
  paths: {
    artifacts: "./frontend/src/contracts",
  },
};

task("faucet", "Sends ETH to an address")
  .addParam("address", "The address to send ETH to")
  .setAction(async (taskArgs) => {
    const [signer] = await ethers.getSigners();
    const tx = await signer.sendTransaction({
      to: taskArgs.address,
      value: ethers.parseEther("100")
    });
    await tx.wait();
    console.log(`Sent 100 ETH to ${taskArgs.address}`);
  });

task("balance", "Prints an account's balance")
  .addParam("address", "The account's address")
  .setAction(async (taskArgs) => {
    const balance = await ethers.provider.getBalance(taskArgs.address);
    console.log(ethers.formatEther(balance), "ETH");
  });
