var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;
var mongoose = require('mongoose');

module.exports = function(){

  var Usuario = mongoose.model('Usuario');

  passport.use(new GitHubStrategy({
    clientID:'88735f410cc08945a6d3',
    clientSecret:'d0b65ddc475ceee4e2e3867edc72c8d204a9126c',
    callbackURL:'http://localhost:3000/auth/github/callback'
  }, function(accessToken,refreshToken,profile,done){
    Usuario.findOrCreate(
        {"login" : profile.username},
        {"nome" : profile.username},
        function(erro,usuario){
          if(erro){
            console.log(erro);
            return done(erro);
          }
          return done(null,usuario);
        }
    );
  }));

  passport.serializeUser(function(usuario,done){
    done(null,usuario._id);
  });

  passport.deserializeUser(function(id,done){
    Usuario.findById(id).exec()
      .then(function(usuario){
        done(null,usuario)
      });
  });
};
