const chai = require('chai');
const expect = chai.expect;

const User = require('../src/user');

describe('User', function(){

  it('should be a function', function(){
    expect(User).to.be.a('function');
  });

  it('should be instance of User', function(){
    const user = new User();
    expect(user).to.be.an.instanceof(User);
  });

  it('should initilize with an id', function(){
    
  });

});
