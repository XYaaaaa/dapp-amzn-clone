const { expect } = require("chai")
const { ethers } = require("hardhat")

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether')
}

describe("Dappazon", () => {

  let dappazon
  let deployer, buyer

  beforeEach(async () => {

    //setup accounts
    [deployer, buyer] = await ethers.getSigners()
    

    //Deploy contract
    const Dappazon = await ethers.getContractFactory("Dappazon")
    dappazon = await Dappazon.deploy()
  })

  describe("Deployment", () =>{

    it('Sets the owner', async() => {
      expect(await dappazon.owner()).to.equal(deployer.address)
    })

    it('has a name', async ()=>{
      const name = await dappazon.name()
      expect(name).to.equal("Dappazon")
    })
  })
})
