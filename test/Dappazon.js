const { expect } = require("chai")
const { ethers } = require("hardhat")

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether')
}

    const ID = 1
    const NAME = "Shoes"
    const CATEGORY = "Clothing"
    const IMAGE = "https://ipfs.io/ipfs/QmTYEboq8raiBs7GTUg2yLXB3PMz6HuBNgNfSZBx5Msztg/shoes.jpg"
    const COST = tokens(1)
    const RATING = 4
    const STOCK = 5

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

  describe("Listing", () =>{

    let transaction

    beforeEach(async () => {
      transaction = await dappazon.connect(deployer).list(
        ID,
        NAME,
        CATEGORY,
        IMAGE,
        COST,
        RATING,
        STOCK
      )

      await transaction.wait()
    })
    
    it('returns item attributes', async ()=>{
      const item = await dappazon.items(ID)
      expect(item.id).to.equal(ID)
      expect(item.name).to.equal(NAME)
      expect(item.category).to.equal(CATEGORY)
      expect(item.image).to.equal(IMAGE)
      expect(item.cost).to.equal(COST)
      expect(item.rating).to.equal(RATING)
      expect(item.stock).to.equal(STOCK)
    })

    it('has a name', async ()=>{
      const name = await dappazon.name()
      expect(name).to.equal("Dappazon")
    })

    it('Emits List event', async ()=>{
      
      expect(transaction).to.emit(dappazon, "List")
    })

  })
})
})
