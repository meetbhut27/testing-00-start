import { expect } from 'chai'; 
import  jwt from 'jsonwebtoken';
import sinon from 'sinon';

import isAuthenticated from '../middleware/is-auth.mjs';

describe('Auth middleware', function(){

    it('should throw an error if no auth middleware is defined', function(){
        const req = {
            get: function(headername){
                return null;
            }
        };
        expect(isAuthenticated.bind(this,req,{},()=>{})).to.throw('Not authenticated.');
    });
    
    it('should throw an error if authorization middleware is only one string', function(){
        const req = {
            get: function(headername){
                return 'xyz';
            }
        };
        expect(isAuthenticated.bind(this,req,{},()=>{})).to.throw();
    });

    it('should yield an userId after decoding the token', function(){
        const req ={
            get: function(headername){
                return 'Bearer djfkalsajbjrkfdn'
            }
        }
        sinon.stub(jwt,'verify');
        jwt.verify.returns({ userId: 'abc'});
        isAuthenticated(req,{},() => {});
        expect(req).to.have.property('userId');
        expect(req).to.have.property('userId','abc');
        expect(jwt.verify.called).to.be.true;
        jwt.verify.restore();
    })
    
    it('should throw an error if the token cannot be verified', function(){
        const req ={
            get: function(headername){
                return 'Bearer xyz'
            }
        }
        expect(isAuthenticated.bind(this,req,{},()=>{})).to.throw();
    })

})