var MAX_EMOJIS_PER_BLOCK = 2;

function generateEmojipasta(text) {
    var blocks = splitIntoBlocks(text);
    var newBlocks = [];
    blocks.forEach(block => {
        newBlocks.push(block);
        emojis = generateEmojisFrom(block);
        if (emojis) {
            newBlocks.push(" " + emojis);
        }
    });
    return newBlocks.join("");
}

function splitIntoBlocks(text) {
    return text.match(/\s*[^\s]*/g);
}

function generateEmojisFrom(block) {
    var trimmedBlock = trimNonAlphanumericalChars(block);
    var matchingEmojis = getMatchingEmojis(trimmedBlock);
    var emojis = [];
    if (matchingEmojis) {
        var numEmojis = Math.floor(Math.random() * (MAX_EMOJIS_PER_BLOCK + 1));
        for (var i = 0; i < numEmojis; i++) {
            emojis.push(matchingEmojis[Math.floor(Math.random() * matchingEmojis.length)]);
        }
    }
    return emojis.join("");
}

function trimNonAlphanumericalChars(text) {
    return text.replace(/^\W*/, "").replace(/\W*$/, "");
}

function getMatchingEmojis(word) {
    var key = getAlphanumericPrefix(word.toLowerCase());
    if (key in EMOJI_MAPPINGS) {
        return EMOJI_MAPPINGS[key];
    }
    return [];
}

function getAlphanumericPrefix(s) {
    return s.match(/^[a-z0-9]*/i);
}

function writeEmojipasta() {
    var text = document.getElementById("emojipastainput").value;
    document.getElementById("emojipastaoutput").innerHTML = generateEmojipasta(text);
}
function copyEmojiPasta() {
    var hiddenCopyText = document.getElementById("hidden-copy-text");
    var emojiOutput = document.getElementById("emoji-output");
    hiddenCopyText.innerHTML = "COPIED";
    setTimeout(function(){
        hiddenCopyText.innerHTML = "CLICK TO COPY";
    }, 1500);
}
var today = new Date();
var time = today.getHours();
if(time>17 || time<6){
    document.body.classList.toggle("dark-mode");
}