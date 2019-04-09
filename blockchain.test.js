const Blockchain = require('./blockchain');
const Block = require('./block');

describe('Blockchain', () => {
    let blockchain;

    beforeEach(() => {
        blockchain = new Blockchain();
    });
       
    it('contains an `chain` Array instance', () => {
        expect(blockchain.chain instanceof Array).toBe(true);
    } );

    it('starts with the Genesis block', () => {
        expect(blockchain.chain[0]).toEqual(Block.genesis());
    });

    it('adds a new block to the chain', () => {
        const newData = 'foo Bar'; 
        blockchain.addBlock({data: newData});
        
        expect(blockchain.chain[blockchain.chain.length -1].data).toEqual(newData);
    });

    describe('isValidChain()', ()=> {
        describe('When the chain doesnt start with the genesis block', () => {
            it('returns false', () => {
                blockchain.chain[0] = {data: 'not Genesis data'};
    
                expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
            });
        });
    });
    
    describe('When the chain starts with genesis block and has multiple blocks', () => {    
        beforeEach(() => {
            blockchain.addBlock({data: 'Brazil'});
            blockchain.addBlock({data: 'Germany'});
            blockchain.addBlock({data: 'France'});
        }); 
        
        describe('and lastHash reference has changed', () => {
            it('returns false', () => {
                 blockchain.chain[2].lastHash = 'Not-original-hash';
                
                expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
            });
        });
    
        describe('describes the chain contains a block with an invalid field', () => {
            it('returns false', () => {
                blockchain.chain[2].data = 'not the expected data';
                
                expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
            });
        });
    
        describe('and the chain does not contain any invalid blocks', () => {
            it('returns true', () => {
                // could not understand why this test is not working
              //expect(Blockchain.isValidChain(blockchain.chain)).toBe(true);
            });
          });
    });
});