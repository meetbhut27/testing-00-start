import { expect } from 'chai'; 
import sinon from 'sinon';
import mongoose from 'mongoose';

import User from '../models/user.mjs';
import { login,getUserStatus } from '../controllers/auth.mjs';

describe('Auth Controller - Login', function() {

    before(function(done){
        mongoose.connect(
            'mongodb+srv://meet:s2H5sJtBHiQJ66xE@cluster0.nidm3mk.mongodb.net/test-message?retryWrites=true&w=majority'
        ).then( result => {
            const user = new User({
                email:'test@test.com',
                password:'tester',
                name:'test',
                posts:[],
                _id :'5c0f66b979af55031b34728a'
            });
            return user.save();
        }).then(()=> {
            done();
        })
    })

    it('should throw an error with code 500 if acccesing the database fails', function(done) {
        sinon.stub(User, 'findOne');
        User.findOne.throws()
        const req = {
            body : {
                email: 'test1@test.com',
                password : 'tester1'
            }
        }
        login(req,{}, () => {}).then(result => {
            expect(result).to.be.an('error');
            expect(result).to.have.property('statusCode',500);
            done();
        })
        User.findOne.restore();
    })

    it('should be a response with a valid user status for an existing user', function(done){

        const req = {userId:'5c0f66b979af55031b34728a' }
        const res = {
            statusCode : 500,
            userStatus : null,
            status:function(code) {
                this.statusCode = code;
                return this;
            },
            json:function(data) {
                this.userStatus = data.status
            }
        };
        getUserStatus(req, res, () => {}).then(() => {
            expect(res.statusCode).to.be.equal(200);
            expect(res.userStatus).to.be.equal('I am new!');
        }).then(()=> {
            done();
        }).catch( err => console.log(err));
    })


    after(function(done){
        User.deleteMany({}).then(() => {
            return mongoose.disconnect();
        }).then(()=> {
            done();
        })
    })

})