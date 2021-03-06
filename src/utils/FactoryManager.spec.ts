import { expect } from 'chai';
import { FactoryManager, IFactoryEntry } from './FactoryManager';

// A simple factory stub
class FactoryStub {

  public args: any[];

  constructor(...args: any[]) {
    this.args = args;
  }
}

describe('FactoryManager', () => {
  var factoryMgr: FactoryManager = undefined;

  beforeEach(() => {
    factoryMgr = new FactoryManager();
  });

  describe('index()', () => {

    it('should return the index of the factory entry', () => {

    factoryMgr.register('stub1', FactoryStub);
      factoryMgr.register('stub2', FactoryStub);

      expect(factoryMgr.index('stub1')).to.equal(0);
      expect(factoryMgr.index('stub2')).to.equal(1);
    });

    it('should return -1 if index of the factory does not exist', () => {

      factoryMgr.register('stub1', FactoryStub);

      expect(factoryMgr.index('stub2')).to.equal(-1);
    });
  });

  describe('get()', () => {

    it('should return the factory instance by key', () => {

      factoryMgr.register('stub1', FactoryStub);
      factoryMgr.register('stub2', FactoryStub);

      expect(factoryMgr.get('stub1')).to.be.an.instanceof(FactoryStub);
      expect(factoryMgr.get('stub2')).to.be.an.instanceof(FactoryStub);
      expect(factoryMgr.get('stub1')).not.to.equal(factoryMgr.get('stub2'));
    });
  });

  describe('all()', () => {

    it('should return all factory entries', () => {

      var enties: IFactoryEntry[] = undefined;

      factoryMgr.register('stub1', FactoryStub);
      factoryMgr.register('stub2', FactoryStub);

      enties = factoryMgr.all();

      expect(enties[0].key).to.equal('stub1');
      expect(enties[0].instance).to.be.an.instanceof(FactoryStub);

      expect(enties[1].key).to.equal('stub2');
      expect(enties[1].instance).to.be.an.instanceof(FactoryStub);

      expect(enties[0].instance).not.to.equal(enties[1].instance);
    });
  });

  describe('registerMany()', () => {

    it('should register many factories', () => {

      var factoryStub1 = undefined;
      var factoryStub2 = undefined;

      factoryMgr.registerMany([
        ['stub1', FactoryStub, 'arg1', 2, true],
        ['stub2', FactoryStub, 'arg2', 3, false]
      ]);

      factoryStub1 = factoryMgr.get('stub1');
      expect(factoryStub1).to.be.an.instanceof(FactoryStub);
      expect(factoryStub1.args[0]).to.equal('arg1');
      expect(factoryStub1.args[1]).to.equal(2);
      expect(factoryStub1.args[2]).to.equal(true);

      factoryStub2 = factoryMgr.get('stub2');
      expect(factoryStub2).to.be.an.instanceof(FactoryStub);
      expect(factoryStub2.args[0]).to.equal('arg2');
      expect(factoryStub2.args[1]).to.equal(3);
      expect(factoryStub2.args[2]).to.equal(false);
    });

    it('should return the instance', () => {

      expect(factoryMgr.registerMany([])).to.equal(factoryMgr);
    });
  });

  describe('register()', () => {

    it('should pass additional arguments to constructor', () => {

      var factoryStub = undefined;

      factoryMgr.register('stub', FactoryStub, 'arg1', 2, true);
      factoryStub = factoryMgr.get('stub');

      expect(factoryStub.args[0]).to.equal('arg1');
      expect(factoryStub.args[1]).to.equal(2);
      expect(factoryStub.args[2]).to.equal(true);
    });

    it('should return the instance of the factory', () => {

      var f = factoryMgr.register('stub', FactoryStub);

      expect(f).to.be.an.instanceof(FactoryStub);
    });
  });

  describe('unregister()', () => {

    it('should remove the factory entry', () => {

      factoryMgr.register('stub', FactoryStub);

      expect(factoryMgr.index('stub')).to.equal(0);
      expect(factoryMgr.get('stub')).to.be.an.instanceof(FactoryStub);

      factoryMgr.unregister('stub');

      expect(factoryMgr.index('stub')).to.equal(-1);
      expect(factoryMgr.get('stub')).to.equal(null);
    });

    it('should return the instance', () => {

      factoryMgr.register('stub', FactoryStub);

      expect(factoryMgr.unregister('stub')).to.equal(factoryMgr);
    });
  });
});
