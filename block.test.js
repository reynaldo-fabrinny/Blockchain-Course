const Block = require('./block');
const { GENESIS_DATA } = require('./config');


describe('Block', () => {
    const timestamp = 'a-date';
    const lastHash = 'foo-hash';
    const hash = 'bar-hash';
    const data = ['blockchain', 'data'];
    const block = new Block({
        timestamp: timestamp,
        lastHash: lastHash,
        hash: hash,
        data: data
    });

    it('it has a timestamp, lastHash, hash, and data property', () => {
        expect(block.timestamp).toEqual(timestamp); 
        expect(block.lastHash).toEqual(lastHash);
        expect(block.hash).toEqual(hash);
        expect(block.data).toEqual(data);
    });

    describe('genesis()' , () => {  
        const genesisBlock = Block.genesis();
        
        it('return a Block instance', ()=> {
            expect(genesisBlock instanceof Block).toBe(true);
        });

        it('return the Genesis DATA', ()=> {
            expect(genesisBlock).toEqual(GENESIS_DATA);
        });
    });

    describe('mineBlock', () => {
        const lastBlock = Block.genesis();
        const data = 'mineData';
        const minedBlock = Block.mineBlock({lastBlock, data});

        it('return a Block instance', ()=> {
            expect(minedBlock instanceof Block).toBe(true);
        });
        
        it('sets the `lastHash` to be equal to `hash` of the lastBlock', () => {
            expect(minedBlock.lastHash).toEqual(lastBlock.hash);
        });

        it('sets the `data`', () => {
            expect(minedBlock.data).toEqual(data);
        });

        it('sets a timeStamp', ()=> {
            expect(minedBlock.timestamp).not.toEqual(undefined);
        });
    });
});

