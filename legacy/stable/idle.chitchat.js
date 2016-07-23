/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('idle.chitchat');
 * mod.thing == 'a thing'; // true
 */
var idleChitchat = {
    converse: function(c) {
        if( Math.random() > 0.97 ) {
            myPhrases = ["💪💦", "😄", "😎","😁","🍎🍷", "🏆", "辻🐺!!"];
            c.say(myPhrases[Math.floor(Math.random()*myPhrases.length)],true);
        }
    }
}


module.exports = idleChitchat;