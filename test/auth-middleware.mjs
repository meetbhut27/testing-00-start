import { expect } from 'chai'; 

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

})