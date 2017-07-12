var supertest = require("supertest");
var should = require("should");
var server = supertest.agent("http://localhost:3000");

var validUser, invalidUser, emptyPass, emptyEmail, invalidEmail, inCorrectPasswordLength;

describe("USER Login API unit test", function () {
 before(function(done) {
    validUser = {
      email: 'devendiran@gmail.com',
      password: 'test1234'
    };
    invalidUser = {
      email: 'devendiran@gmail.com',
      password: 'failword'
    };
    emptyPass = {
      email: 'admin@profecta.io',
      password: ''
    };
    emptyEmail = {
      email: '',
      password: 'test1234'
    };
    invalidEmail = {
      email: 'qwety',
      password: 'test1234'
    };
    inCorrectPasswordLength = {
      email: 'qwety',
      password: 'te'
    };
    done();
  });
    it("Login with correct credentials", function (done) {
        server
            .post("/api/auth/login")
            .send(validUser)
            .expect("Content-type", /json/)
            .expect(200)
            .end(function (err, res) {
                res.status.should.equal(200);
                res.body.token.should.not.be.false;
                done();
            });
    });

    it("Login with with invalid credentials", function (done) {
        server
            .post("/api/auth/login")
            .send(invalidUser)
            .expect("Content-type", /json/)
            .expect(401)
            .end(function (err, res) {
                res.status.should.equal(401);
                console.log(res.body)
                res.body.msg.should.equal('Authentication Failed');
                done();
            });
    });

    it("Login with empty password", function(done) {

        // calling login page api
        server
        .post("/api/auth/login")
        .send(emptyPass)
        .expect(400)
        .end(function(err, res) {
            if (err) return done(err);
            res.status.should.equal(400);
            console.log(res.body);
            res.body.msg.should.equal('Bad request');
            res.body.err.password.msg.should.equal('Password must have atleast 6 to 20 char');
            // res.body.err.password.msg.should.equal('Password address should not be empty');
            done();
        });
    });

    it("Login with empty email address", function(done) {

        // calling login page api
        server
        .post("/api/auth/login")
        .send(emptyEmail)
        .expect(400)
        .end(function(err, res) {
            if (err) return done(err);
            res.status.should.equal(400);
            res.body.msg.should.equal('Bad request');
            done();
        });
    });

        it("Login with incorrect email format", function(done) {

        // calling login page api
        server
        .post("/api/auth/login")
        .send(invalidEmail)
        .expect(400)
        .end(function(err, res) {
            if (err) return done(err);
            res.status.should.equal(400);
            res.body.msg.should.equal('Bad request');
            res.body.err.email.msg.should.equal('Enter a valid email.');
            done();
        });
    });

        it("Login with incorrect password length", function(done) {

        // calling login page api
        server
        .post("/api/auth/login")
        .send(inCorrectPasswordLength)
        .expect(400)
        .end(function(err, res) {
            if (err) return done(err);
            res.status.should.equal(400);
            res.body.msg.should.equal('Bad request');
            res.body.err.password.msg.should.equal('Password must have atleast 6 to 20 char');
            done();
        });
    });
            
});


describe("USER Signup API unit test", function () {
 before(function(done) {
    validUser = {
      email: 'admn'+new Date()+'@mail.com',
      password: 'test1234',
      username:'deva',
      password:'test1234',
      confirmPassword:'test1234'
    };
    invalidEmail = {
      email: 'admin',
      password: 'test1234',
      username:'deva',
      password:'test1234',
      confirmPassword:'test1234'
    };
    invalidPasswprd = {
      email: 'admin@admin.io',
      password: '133',
      username:'deva',
      confirmPassword:'test1234'
    };
    incorrectConfirmPassword = {
      email: 'admin@gmail.com',
      password: 'test1234',
      username:'deva',
      password:'test1234',
      confirmPassword:'test'
    };
    done();
  });
    it("Signup with correct credentials", function (done) {
        server
            .post("/api/auth/signup")
            .send(validUser)
            .expect("Content-type", /json/)
            .expect(200)
            .end(function (err, res) {
                res.status.should.equal(200);
                res.body.token.should.not.be.false;
                done();
            });
    });

    it("Signup with invalid email", function (done) {
        server
            .post("/api/auth/signup")
            .send(invalidEmail)
            .expect("Content-type", /json/)
            .expect(401)
            .end(function (err, res) {
                res.status.should.equal(400);
                res.body.err.email.msg.should.equal('Enter a valid email.');
                done();
            });
    });

    it("Signup with invalid password", function(done) {

        // calling login page api
        server
        .post("/api/auth/signup")
        .send(invalidPasswprd)
        .expect(400)
        .end(function(err, res) {
            if (err) return done(err);
            res.status.should.equal(400);
            res.body.msg.should.equal('Bad request');
            res.body.err.password.msg.should.equal('Password must have atleast 6 to 20 char');
            done();
        });
    });

    it("Signup with incorrect confirmpassword", function(done) {

        // calling login page api
        server
        .post("/api/auth/signup")
        .send(incorrectConfirmPassword)
        .expect(400)
        .end(function(err, res) {
            if (err) return done(err);
            res.status.should.equal(400);
            res.body.msg.should.equal('Bad request');
            res.body.err.confirmPassword.msg.should.equal('Passwords do not match');
            done();
        });
    });
            
});

describe("Bookmark API unit test", function () {
var token, bookmark;
 before(function(done) {
    createValidBookmark = {
      title: 'test'+new Date(),
      url:'http://google.com',
      tags:"js, jsva"
    };
    createInValidBookmark = {
      title: '',
      url:'http://google.com',
      tags:"js, jsva"
    };
    createInValidUrl = {
      title: 'test'+new Date(),
      url:'',
      tags:"js, jsva"
    };
    done();
  });

    beforeEach(function (done) {
        if(token) {
            return done();
        }
       server
        .post("/api/auth/login")
        .send(validUser)
        .expect("Content-type", /json/)
        .expect(200)
        .end(function (err, res) {
            token = 'Bearer '+res.body.token;
            done();
        });
    });
    it("Create Bookmark with correct data", function (done) {
        this.timeout(5000);
        server
            .post("/api/bookmarks/create")
            .set('Authorization', token)
            .send(createValidBookmark)
            .expect("Content-type", /json/)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                res.status.should.equal(200);
                res.body._id.should.not.be.false;
                bookmark = res.body;
                done();
            });
    });
    it("Create Bookmark with duplicate title", function (done) {
        this.timeout(5000);
        server
            .post("/api/bookmarks/create")
            .set('Authorization', token)
            .send(createValidBookmark)
            .expect("Content-type", /json/)
            .expect(500)
            .end(function (err, res) {
                if (err) return done(err);
                res.status.should.equal(500);
                done();
            });
    });
    it("Create Bookmark with empty title", function (done) {
        this.timeout(5000);
        server
            .post("/api/bookmarks/create")
            .set('Authorization', token)
            .send(createInValidBookmark)
            .expect("Content-type", /json/)
            .expect(400)
            .end(function (err, res) {
                if (err) return done(err);
                res.status.should.equal(400);
                res.body.err.title.msg.should.equal('Please enter a title');
                done();
            });
    });

    it("Create Bookmark with empty title", function (done) {
        this.timeout(5000);
        server
            .post("/api/bookmarks/create")
            .set('Authorization', token)
            .send(createInValidUrl)
            .expect("Content-type", /json/)
            .expect(400)
            .end(function (err, res) {
                if (err) return done(err);
                res.status.should.equal(400);
                res.body.err.url.msg.should.equal('Please enter a url');
                done();
            });
    });

    it("Fetch all Bookmark ", function (done) {
        this.timeout(5000);
        server
            .get("/api/bookmarks")
            .set('Authorization', token)
            .expect("Content-type", /json/)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                res.status.should.equal(200);
                done();
            });
    });     

    it("Fetch all Bookmark by tag ", function (done) {
        this.timeout(5000);
        server
            .get("/api/bookmarks/js")
            .set('Authorization', token)
            .expect("Content-type", /json/)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                res.status.should.equal(200);
                done();
            });
    });  

    it("Update Bookmark with valid title ", function (done) {
        this.timeout(5000);
        //updating create bookmark with new title
        bookmark.title = 'check'+new Date();
        server
            .put("/api/bookmarks/"+bookmark._id)
            .set('Authorization', token)
            .send(bookmark)
            .expect("Content-type", /json/)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                res.status.should.equal(200);
                console.log(res.body)
                res.body.title.should.equal(bookmark.title);
                done();
            });
    }); 
});