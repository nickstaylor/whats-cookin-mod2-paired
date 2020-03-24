const chai = require('chai');
const expect = chai.expect;

const User = require('../src/user');

const data = require('../data/users');


describe('User', function(){
  let user;
  let userInfo;
  let recipe;

  beforeEach(function() {
    userInfo = data[0];
    user = new User(userInfo);

  })

  it('should be a function', function(){
    expect(User).to.be.a('function');
  });

  it('should be instance of User', function(){
    expect(user).to.be.an.instanceof(User);
  });

  it('should initialize with a name', function(){
    expect(user.name).to.equal('Saige O\'Kon')
  });

  it('should initialize with an id', function(){
    expect(user.id).to.equal(1);
  });

  it('should initilize with a personal pantry', function(){
    expect(user.pantry).to.equal(userInfo.pantry)
  });



});
