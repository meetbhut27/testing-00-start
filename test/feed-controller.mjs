import { expect } from 'chai'; 
import sinon from 'sinon';
import mongoose from 'mongoose';

import User from '../models/user.mjs';
import Post from '../models/post.mjs';

import { createPost } from '../controllers/feed.mjs';

describe('Feed Controller - Login', function() {

    before(function(done){
        mongoose.connect(
            'mongodb+srv://meet:s2H5sJtBHiQJ66xE@cluster0.nidm3mk.mongodb.net/test-message?retryWrites=true&w=majority'
        ).then(result => {
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

    it('should add  the created post to the posts of the creator', function(done) {
        const req = {
            body : {
                title: 'test Post',
                content : 'A Test Post'
            },
            file : {
                path: 'abc'
            },
            userId: '5c0f66b979af55031b34728a'
        };
        const res = {
            status:function() {
                return this;
            },
            json:function(){}
        }

        createPost(req, res, () => {}).then((savedUser)=> {
            expect(savedUser).to.have.property('posts');
            expect(savedUser.posts).to.have.length(1);
            done();
        }).catch(err=> console.log(err));
    })

    after(function(done){
        User.deleteMany({}).then(() => {
            return mongoose.disconnect();
        }).then(()=> {
            done();
        })
    })

})