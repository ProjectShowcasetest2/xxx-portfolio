// XXXPORTFOLIOXXX_COMMENT

(function(){
if(app.documents.length === 0){
alert("XXXPORTFOLIOXXX_STR");
return;
}

// XXXPORTFOLIOXXX_COMMENT
var articles = [
{id: "001", name: "XXXPORTFOLIOXXX_STR", func: process_001, enabled: true},
{id: "002", name: "XXXPORTFOLIOXXX_STR", func: process_002, enabled: true},
{id: "003", name: "XXXPORTFOLIOXXX_STR", func: process_003, enabled: true},
{id: "004", name: "XXXPORTFOLIOXXX_STR", func: process_004, enabled: true},
{id: "005", name: "XXXPORTFOLIOXXX_STR", func: process_005, enabled: true},
{id: "006", name: "XXXPORTFOLIOXXX_STR", func: process_006, enabled: true},
{id: "007", name: "XXXPORTFOLIOXXX_STR", func: process_007, enabled: true},
{id: "008", name: "XXXPORTFOLIOXXX_STR", func: process_008, enabled: true},
{id: "009", name: "XXXPORTFOLIOXXX_STR", func: process_009, enabled: true},
{id: "010", name: "XXXPORTFOLIOXXX_STR", func: process_010, enabled: true},
{id: "011", name: "XXXPORTFOLIOXXX_STR", func: process_011, enabled: true},
{id: "012", name: "XXXPORTFOLIOXXX_STR", func: process_012, enabled: true},
{id: "013", name: "XXXPORTFOLIOXXX_STR", func: process_013, enabled: true},
{id: "014", name: "XXXPORTFOLIOXXX_STR", func: process_014, enabled: true},
{id: "015", name: "XXXPORTFOLIOXXX_STR", func: process_015, enabled: true},
{id: "016", name: "XXXPORTFOLIOXXX_STR", func: process_016, enabled: true}
];

// XXXPORTFOLIOXXX_COMMENT
var dialog = new Window("dialog", "XXXPORTFOLIOXXX_STR");
dialog.orientation = "column";
dialog.alignChildren = ["fill", "top"];
dialog.preferredSize = [550, 850];

// XXXPORTFOLIOXXX_COMMENT
var titleGroup = dialog.add("group");
titleGroup.orientation = "column";
titleGroup.alignChildren = "center";

var titleText = titleGroup.add("statictext", undefined, "XXXPORTFOLIOXXX_STR");
titleText.graphics.font = ScriptUI.newFont(titleText.graphics.font.name, "BOLD", 14);

// XXXPORTFOLIOXXX_COMMENT
var excludePanel = dialog.add("panel", undefined, "XXXPORTFOLIOXXX_STR");
excludePanel.orientation = "column";
excludePanel.alignChildren = "left";
excludePanel.margins = 15;

var excludeInfo = excludePanel.add("statictext", undefined,
"XXXPORTFOLIOXXX_STR",
{multiline: true}
);
excludeInfo.preferredSize = [500, 20];

var checkLocked = excludePanel.add("checkbox", undefined, "XXXPORTFOLIOXXX_STR");
var checkMaster = excludePanel.add("checkbox", undefined, "XXXPORTFOLIOXXX_STR");
var checkEditing = excludePanel.add("checkbox", undefined, "XXXPORTFOLIOXXX_STR");

checkLocked.value = true;
checkMaster.value = true;
checkEditing.value = true;

checkLocked.enabled = false;
checkMaster.enabled = false;
checkEditing.enabled = false;

// XXXPORTFOLIOXXX_COMMENT
var hintText = excludePanel.add("statictext", undefined,
"XXXPORTFOLIOXXX_STR" +
"XXXPORTFOLIOXXX_STR",
{multiline: true}
);
hintText.preferredSize = [500, 35];
hintText.graphics.foregroundColor = hintText.graphics.newPen(
hintText.graphics.PenType.SOLID_COLOR,
[0.2, 0.4, 0.8],
1
);

// XXXPORTFOLIOXXX_COMMENT
var articlesPanel = dialog.add("panel", undefined, "XXXPORTFOLIOXXX_STR");
articlesPanel.orientation = "column";
articlesPanel.alignChildren = ["fill", "top"];
articlesPanel.maximumSize = [530, 450];

// XXXPORTFOLIOXXX_COMMENT
var scrollGroup = articlesPanel.add("group");
scrollGroup.orientation = "column";
scrollGroup.alignChildren = "left";
scrollGroup.spacing = 8;

var checkboxes = [];
for(var i = 0; i < articles.length; i++){
var cb = scrollGroup.add("checkbox", undefined, articles[i].name);
cb.graphics.font = ScriptUI.newFont(cb.graphics.font.name, "BOLD", 13);
cb.value = false;
checkboxes.push(cb);

// XXXPORTFOLIOXXX_COMMENT
if((i + 1) % 5 === 0 && i < articles.length - 1){
var divider = scrollGroup.add("panel");
divider.preferredSize = [-1, 2];
divider.margins = [0, 5, 0, 5];
}
}

// XXXPORTFOLIOXXX_COMMENT
var actionGroup = dialog.add("group");
actionGroup.orientation = "row";
actionGroup.spacing = 10;
var btnOK = actionGroup.add("button", undefined, "XXXPORTFOLIOXXX_STR", {name: "ok"});
var btnCancel = actionGroup.add("button", undefined, "XXXPORTFOLIOXXX_STR", {name: "cancel"});

btnOK.preferredSize = [150, 35];
btnCancel.preferredSize = [150, 35];

// XXXPORTFOLIOXXX_COMMENT
if(dialog.show() == 1){
var selectedArticles = [];
for(var i = 0; i < checkboxes.length; i++){
if(checkboxes[i].value){
selectedArticles.push(articles[i]);
}
}

if(selectedArticles.length === 0){
alert("XXXPORTFOLIOXXX_STR");
return;
}

executeProcessing(selectedArticles);
}

// XXXPORTFOLIOXXX_COMMENT
// XXXPORTFOLIOXXX_COMMENT
// XXXPORTFOLIOXXX_COMMENT
function executeProcessing(selectedArticles){
var doc = app.activeDocument;
var results = [];

// XXXPORTFOLIOXXX_COMMENT
var excludeFrames = collectExcludeFrames(doc);

// XXXPORTFOLIOXXX_COMMENT
if(excludeFrames.total > 0){
var confirmMsg = "XXXPORTFOLIOXXX_STR";
confirmMsg += "XXXPORTFOLIOXXX_STR";
confirmMsg += "XXXPORTFOLIOXXX_STR" + excludeFrames.locked + "XXXPORTFOLIOXXX_STR";
confirmMsg += "XXXPORTFOLIOXXX_STR" + excludeFrames.master + "XXXPORTFOLIOXXX_STR";
confirmMsg += "XXXPORTFOLIOXXX_STR" + excludeFrames.editing + "XXXPORTFOLIOXXX_STR";
confirmMsg += "XXXPORTFOLIOXXX_STR" + excludeFrames.total + "XXXPORTFOLIOXXX_STR";
confirmMsg += "XXXPORTFOLIOXXX_STR";

if(!confirm(confirmMsg)){
return;
}
}

app.doScript(function(){
// XXXPORTFOLIOXXX_COMMENT
var tempLocked = applyTemporaryLock(excludeFrames.frames);

try {
// XXXPORTFOLIOXXX_COMMENT
for(var i = 0; i < selectedArticles.length; i++){
try {
var result = selectedArticles[i].func(doc);
results.push("XXXPORTFOLIOXXX_STR" + selectedArticles[i].name + ": " + result);
} catch(e){
results.push("XXXPORTFOLIOXXX_STR" + selectedArticles[i].name + "XXXPORTFOLIOXXX_STR" + e.message);
}
}
} finally {
// XXXPORTFOLIOXXX_COMMENT
restoreOriginalLock(tempLocked);
}

}, ScriptLanguage.JAVASCRIPT, undefined,
UndoModes.ENTIRE_SCRIPT, "XXXPORTFOLIOXXX_STR");

// XXXPORTFOLIOXXX_COMMENT
showResults(results, excludeFrames);
}

// XXXPORTFOLIOXXX_COMMENT
// XXXPORTFOLIOXXX_COMMENT
// XXXPORTFOLIOXXX_COMMENT
function collectExcludeFrames(doc){
var frames = [];
var counts = {locked: 0, master: 0, editing: 0, total: 0};

// XXXPORTFOLIOXXX_COMMENT
var editingFrame = getEditingFrame();

// XXXPORTFOLIOXXX_COMMENT
for(var i = 0; i < doc.pages.length; i++){
var page = doc.pages[i];

// XXXPORTFOLIOXXX_COMMENT
for(var j = 0; j < page.textFrames.length; j++){
var frame = page.textFrames[j];
var reason = null;

// XXXPORTFOLIOXXX_COMMENT
if(frame.locked || frame.itemLayer.locked){
reason = "locked";
counts.locked++;
}
// XXXPORTFOLIOXXX_COMMENT
else {
try {
if(frame.parent.constructor.name === "MasterSpread"){
reason = "master";
counts.master++;
}
} catch(e) {}
}

// XXXPORTFOLIOXXX_COMMENT
if(!reason && editingFrame && frame === editingFrame){
reason = "editing";
counts.editing++;
}

if(reason){
frames.push({frame: frame, reason: reason, wasLocked: frame.locked});
counts.total++;
}
}
}

// XXXPORTFOLIOXXX_COMMENT
for(var i = 0; i < doc.masterSpreads.length; i++){
var spread = doc.masterSpreads[i];

for(var j = 0; j < spread.textFrames.length; j++){
var frame = spread.textFrames[j];

frames.push({
frame: frame,
reason: "master",
wasLocked: frame.locked
});
counts.master++;
counts.total++;
}
}

return {
frames: frames,
locked: counts.locked,
master: counts.master,
editing: counts.editing,
total: counts.total
};
}

// XXXPORTFOLIOXXX_COMMENT
// XXXPORTFOLIOXXX_COMMENT
// XXXPORTFOLIOXXX_COMMENT
function getEditingFrame(){
try {
if(app.selection.length === 0){
return null;
}

var sel = app.selection[0];

// XXXPORTFOLIOXXX_COMMENT
if(sel.hasOwnProperty("parentTextFrames") &&
sel.parentTextFrames.length > 0){
return sel.parentTextFrames[0];
}

// XXXPORTFOLIOXXX_COMMENT
if(sel.constructor.name === "TextFrame"){
return sel;
}
} catch(e){}

return null;
}

// XXXPORTFOLIOXXX_COMMENT
// XXXPORTFOLIOXXX_COMMENT
// XXXPORTFOLIOXXX_COMMENT
function applyTemporaryLock(frameInfos){
var locked = [];

for(var i = 0; i < frameInfos.length; i++){
var info = frameInfos[i];

// XXXPORTFOLIOXXX_COMMENT
try {
if(!info.frame.locked){
info.frame.locked = true;
locked.push(info);
}
} catch(e){}
}

return locked;
}

// XXXPORTFOLIOXXX_COMMENT
// XXXPORTFOLIOXXX_COMMENT
// XXXPORTFOLIOXXX_COMMENT
function restoreOriginalLock(tempLocked){
for(var i = 0; i < tempLocked.length; i++){
try {
tempLocked[i].frame.locked = false;
} catch(e){}
}
}

// XXXPORTFOLIOXXX_COMMENT
// XXXPORTFOLIOXXX_COMMENT
// XXXPORTFOLIOXXX_COMMENT
function showResults(results, excludeInfo){
var resultWin = new Window("dialog", "XXXPORTFOLIOXXX_STR");
resultWin.orientation = "column";
resultWin.alignChildren = ["fill", "top"];
resultWin.preferredSize = [550, 450];

// XXXPORTFOLIOXXX_COMMENT
var excludePanel = resultWin.add("panel", undefined, "XXXPORTFOLIOXXX_STR");
excludePanel.orientation = "column";
excludePanel.alignChildren = "left";
excludePanel.margins = 10;

var excludeText = excludePanel.add("statictext", undefined,
"XXXPORTFOLIOXXX_STR" + excludeInfo.total + "XXXPORTFOLIOXXX_STR",
{multiline: true}
);
excludeText.preferredSize = [520, 20];
excludeText.graphics.font = ScriptUI.newFont(excludeText.graphics.font.name, "BOLD", 12);

var excludeDetail = excludePanel.add("statictext", undefined,
"XXXPORTFOLIOXXX_STR" + excludeInfo.locked + "XXXPORTFOLIOXXX_STR" + excludeInfo.master + "XXXPORTFOLIOXXX_STR" + excludeInfo.editing + "XXXPORTFOLIOXXX_STR"
);
excludeDetail.preferredSize = [520, 20];

// XXXPORTFOLIOXXX_COMMENT
var resultPanel = resultWin.add("panel", undefined, "XXXPORTFOLIOXXX_STR");
resultPanel.orientation = "column";
resultPanel.alignChildren = ["fill", "top"];

var resultText = resultPanel.add("edittext", undefined,
results.join("\n"),
{multiline: true, scrolling: true}
);
resultText.preferredSize = [530, 300];

var btnClose = resultWin.add("button", undefined, "XXXPORTFOLIOXXX_STR", {name: "ok"});
btnClose.preferredSize = [150, 35];

resultWin.show();
}

// XXXPORTFOLIOXXX_COMMENT
// XXXPORTFOLIOXXX_COMMENT

function process_001(doc){
var results = [];

try {
// XXXPORTFOLIOXXX_COMMENT
applyParagraphStyleToAll(doc, "XXXPORTFOLIOXXX_STR"); // XXXPORTFOLIOXXX_COMMENT
results.push("XXXPORTFOLIOXXX_STR");

// XXXPORTFOLIOXXX_COMMENT
// XXXPORTFOLIOXXX_COMMENT
var count1 = replaceAndApplyStyle(doc, "\u0016", "^y", "XXXPORTFOLIOXXX_STR"); // XXXPORTFOLIOXXX_COMMENT
results.push("XXXPORTFOLIOXXX_STR" + count1 + "XXXPORTFOLIOXXX_STR");

// XXXPORTFOLIOXXX_COMMENT
var count2 = replaceText(doc, "[", "XXXPORTFOLIOXXX_STR");
var count3 = replaceText(doc, "]", "XXXPORTFOLIOXXX_STR");
results.push("XXXPORTFOLIOXXX_STR" + (count2 + count3) + "XXXPORTFOLIOXXX_STR");

// XXXPORTFOLIOXXX_COMMENT
// XXXPORTFOLIOXXX_COMMENT
if(confirm(
"XXXPORTFOLIOXXX_STR" +
"XXXPORTFOLIOXXX_STR" +
"XXXPORTFOLIOXXX_STR" +
"XXXPORTFOLIOXXX_STR" +
"XXXPORTFOLIOXXX_STR" +
"XXXPORTFOLIOXXX_STR" +
"XXXPORTFOLIOXXX_STR" +
"XXXPORTFOLIOXXX_STR"
)){
var count4 = convertToHalfWidthExcludingPatterns(doc);
results.push("XXXPORTFOLIOXXX_STR" + count4 + "XXXPORTFOLIOXXX_STR");
} else {
results.push("XXXPORTFOLIOXXX_STR");
}

// XXXPORTFOLIOXXX_COMMENT
if(confirm("XXXPORTFOLIOXXX_STR")){
var count5 = replaceSpacesToTab(doc);
results.push("XXXPORTFOLIOXXX_STR" + count5 + "XXXPORTFOLIOXXX_STR");
}

// XXXPORTFOLIOXXX_COMMENT
if(confirm("XXXPORTFOLIOXXX_STR")){
var count6 = applyCharStyleToNombre(doc);
results.push("XXXPORTFOLIOXXX_STR" + count6 + "XXXPORTFOLIOXXX_STR");
}

// XXXPORTFOLIOXXX_COMMENT
var count7 = applyCharStyleToSpecificText(doc);
results.push("XXXPORTFOLIOXXX_STR" + count7 + "XXXPORTFOLIOXXX_STR");

return results.join(" / ");

} catch(e){
throw new Error("XXXPORTFOLIOXXX_STR" + e.message);
}
}

// XXXPORTFOLIOXXX_COMMENT

// XXXPORTFOLIOXXX_COMMENT
function applyParagraphStyleToAll(doc, styleName){
var style = doc.paragraphStyles.itemByName(styleName);
if(!style.isValid){
throw new Error("XXXPORTFOLIOXXX_STR" + styleName + "XXXPORTFOLIOXXX_STR");
}

for(var i = 0; i < doc.stories.length; i++){
doc.stories[i].paragraphs.everyItem().applyParagraphStyle(style, true);
}
}

// XXXPORTFOLIOXXX_COMMENT
function replaceText(doc, findText, replaceText){
app.findTextPreferences = NothingEnum.nothing;
app.changeTextPreferences = NothingEnum.nothing;

app.findTextPreferences.findWhat = findText;
app.changeTextPreferences.changeTo = replaceText;

var found = doc.changeText();

app.findTextPreferences = NothingEnum.nothing;
app.changeTextPreferences = NothingEnum.nothing;

return found.length;
}

// XXXPORTFOLIOXXX_COMMENT
function replaceAndApplyStyle(doc, findText, replaceText, styleName){
var style = doc.paragraphStyles.itemByName(styleName);
if(!style.isValid){
throw new Error("XXXPORTFOLIOXXX_STR" + styleName + "XXXPORTFOLIOXXX_STR");
}

app.findTextPreferences = NothingEnum.nothing;
app.changeTextPreferences = NothingEnum.nothing;

app.findTextPreferences.findWhat = findText;
app.changeTextPreferences.changeTo = replaceText;
app.changeTextPreferences.appliedParagraphStyle = style;

var found = doc.changeText();

app.findTextPreferences = NothingEnum.nothing;
app.changeTextPreferences = NothingEnum.nothing;

return found.length;
}

// XXXPORTFOLIOXXX_COMMENT
function convertToHalfWidthExcludingPatterns(doc){
var count = 0;

// XXXPORTFOLIOXXX_COMMENT
var excludePatterns = [
"XXXPORTFOLIOXXX_STR",
"XXXPORTFOLIOXXX_STR",
"XXXPORTFOLIOXXX_STR",
"XXXPORTFOLIOXXX_STR"
];

// XXXPORTFOLIOXXX_COMMENT
var fullWidthDigits = "XXXPORTFOLIOXXX_STR";
var halfWidthDigits = "0123456789";

for(var i = 0; i < doc.stories.length; i++){
var story = doc.stories[i];
var text = story.contents;

// XXXPORTFOLIOXXX_COMMENT
var protectedRanges = [];
for(var j = 0; j < excludePatterns.length; j++){
var regex = new RegExp(excludePatterns[j], "g");
var match;
while((match = regex.exec(text)) !== null){
protectedRanges.push({start: match.index, end: match.index + match[0].length});
}
}

// XXXPORTFOLIOXXX_COMMENT
for(var pos = 0; pos < text.length; pos++){
var isProtected = false;
for(var k = 0; k < protectedRanges.length; k++){
if(pos >= protectedRanges[k].start && pos < protectedRanges[k].end){
isProtected = true;
break;
}
}

if(!isProtected){
var ch = text.charAt(pos);
var digitIndex = fullWidthDigits.indexOf(ch);
if(digitIndex >= 0){
try {
story.characters[pos].contents = halfWidthDigits.charAt(digitIndex);
count++;
} catch(e){}
}
}
}
}

return count;
}

// XXXPORTFOLIOXXX_COMMENT
function replaceSpacesToTab(doc){
app.findGrepPreferences = NothingEnum.nothing;
app.changeGrepPreferences = NothingEnum.nothing;

// XXXPORTFOLIOXXX_COMMENT
app.findGrepPreferences.findWhat = "(~(| ){2,}";
app.changeGrepPreferences.changeTo = "~y";

var found = doc.changeGrep();

app.findGrepPreferences = NothingEnum.nothing;
app.changeGrepPreferences = NothingEnum.nothing;

return found.length;
}

// XXXPORTFOLIOXXX_COMMENT
function applyCharStyleToNombre(doc){
var charStyle = doc.characterStyles.itemByName("XXXPORTFOLIOXXX_STR"); // XXXPORTFOLIOXXX_COMMENT
if(!charStyle.isValid){
throw new Error("XXXPORTFOLIOXXX_STR");
}

app.findGrepPreferences = NothingEnum.nothing;
app.changeGrepPreferences = NothingEnum.nothing;

// XXXPORTFOLIOXXX_COMMENT
app.findGrepPreferences.findWhat = "XXXPORTFOLIOXXX_STR";
app.changeGrepPreferences.appliedCharacterStyle = charStyle;

var found = doc.changeGrep();

app.findGrepPreferences = NothingEnum.nothing;
app.changeGrepPreferences = NothingEnum.nothing;

return found.length;
}

// XXXPORTFOLIOXXX_COMMENT
function applyCharStyleToSpecificText(doc){
var charStyle = doc.characterStyles.itemByName("XXXPORTFOLIOXXX_STR"); // XXXPORTFOLIOXXX_COMMENT
if(!charStyle.isValid){
throw new Error("XXXPORTFOLIOXXX_STR");
}

var count = 0;
var targets = ["XXXPORTFOLIOXXX_STR", "XXXPORTFOLIOXXX_STR"];

for(var i = 0; i < doc.stories.length; i++){
var story = doc.stories[i];
var text = story.contents;

for(var j = 0; j < targets.length; j++){
var searchText = "XXXPORTFOLIOXXX_STR" + targets[j] + "XXXPORTFOLIOXXX_STR";
var pos = text.indexOf(searchText);

while(pos >= 0){
try {
// XXXPORTFOLIOXXX_COMMENT
var startPos = pos + 1; // XXXPORTFOLIOXXX_COMMENT
var endPos = pos + 1 + targets[j].length; // XXXPORTFOLIOXXX_COMMENT

for(var k = startPos; k < endPos; k++){
story.characters[k].appliedCharacterStyle = charStyle;
}
count++;
} catch(e){}

pos = text.indexOf(searchText, pos + 1);
}
}
}

return count;
}

// XXXPORTFOLIOXXX_COMMENT

// XXXPORTFOLIOXXX_COMMENT

function process_002(doc){
var results = [];

try {
// XXXPORTFOLIOXXX_COMMENT
var styleName = "XXXPORTFOLIOXXX_STR"; // XXXPORTFOLIOXXX_COMMENT
var style = doc.paragraphStyles.itemByName(styleName);

if(!style.isValid){
throw new Error("XXXPORTFOLIOXXX_STR" + styleName + "XXXPORTFOLIOXXX_STR");
}

// XXXPORTFOLIOXXX_COMMENT
var storyCount = 0;
for(var i = 0; i < doc.stories.length; i++){
doc.stories[i].paragraphs.everyItem().applyParagraphStyle(style, true);
storyCount++;
}
results.push("XXXPORTFOLIOXXX_STR" + storyCount + "XXXPORTFOLIOXXX_STR");

// XXXPORTFOLIOXXX_COMMENT
app.findGrepPreferences = NothingEnum.nothing;
app.changeGrepPreferences = NothingEnum.nothing;

app.findGrepPreferences.findWhat = "\\r+";
app.changeGrepPreferences.changeTo = "\\r";

var found = doc.changeGrep();
results.push("XXXPORTFOLIOXXX_STR" + found.length + "XXXPORTFOLIOXXX_STR");

app.findGrepPreferences = NothingEnum.nothing;
app.changeGrepPreferences = NothingEnum.nothing;

return results.join(" / ");

} catch(e){
throw new Error("XXXPORTFOLIOXXX_STR" + e.message);
}
}
// XXXPORTFOLIOXXX_COMMENT
// XXXPORTFOLIOXXX_COMMENT
function process_003(doc){
var results = [];

try {
// XXXPORTFOLIOXXX_COMMENT
var styleName = "XXXPORTFOLIOXXX_STR"; // XXXPORTFOLIOXXX_COMMENT
var style = doc.paragraphStyles.itemByName(styleName);

if(!style.isValid){
throw new Error("XXXPORTFOLIOXXX_STR" + styleName + "XXXPORTFOLIOXXX_STR");
}

// XXXPORTFOLIOXXX_COMMENT
var storyCount = 0;
for(var i = 0; i < doc.stories.length; i++){
var story = doc.stories[i];

// XXXPORTFOLIOXXX_COMMENT
try {
if(story.textContainers.length > 0){
var firstFrame = story.textContainers[0];
if(firstFrame.parent.constructor.name === "MasterSpread"){
continue; // XXXPORTFOLIOXXX_COMMENT
}
}
} catch(e) {}

story.paragraphs.everyItem().applyParagraphStyle(style, true);
storyCount++;
}
results.push("XXXPORTFOLIOXXX_STR" + storyCount + "XXXPORTFOLIOXXX_STR");

// XXXPORTFOLIOXXX_COMMENT
if(confirm("XXXPORTFOLIOXXX_STR" +
"XXXPORTFOLIOXXX_STR" +
"XXXPORTFOLIOXXX_STR" +
"XXXPORTFOLIOXXX_STR" +
"XXXPORTFOLIOXXX_STR")){

var result = bulkReplaceSeishin(
doc,
"^(.*?)(\\x{3000}{3})", // XXXPORTFOLIOXXX_COMMENT
"$1\\r", // XXXPORTFOLIOXXX_COMMENT
"XXXPORTFOLIOXXX_STR"
);

results.push(result.message);
} else {
results.push("XXXPORTFOLIOXXX_STR");
}

return results.join(" / ");

} catch(e){
throw new Error("XXXPORTFOLIOXXX_STR" + e.message);
}
}

// XXXPORTFOLIOXXX_COMMENT
// XXXPORTFOLIOXXX_COMMENT
// XXXPORTFOLIOXXX_COMMENT
function bulkReplaceSeishin(doc, findPattern, replacePattern, description) {
app.findGrepPreferences = NothingEnum.nothing;
app.changeGrepPreferences = NothingEnum.nothing;

app.findGrepPreferences.findWhat = findPattern;
app.changeGrepPreferences.changeTo = replacePattern;

// XXXPORTFOLIOXXX_COMMENT
app.findChangeGrepOptions.includeLockedLayersForFind = false;
app.findChangeGrepOptions.includeLockedStoriesForFind = false;
app.findChangeGrepOptions.includeHiddenLayers = false;
app.findChangeGrepOptions.includeMasterPages = false;

// XXXPORTFOLIOXXX_COMMENT
var foundItems = doc.findGrep();

// XXXPORTFOLIOXXX_COMMENT
// XXXPORTFOLIOXXX_COMMENT
var filtered = [];
for (var i = 0; i < foundItems.length; i++) {
var it = foundItems[i];
var tf = null;

try {
if (it.parentTextFrames && it.parentTextFrames.length > 0) {
tf = it.parentTextFrames[0];
}
} catch (e) {}

// XXXPORTFOLIOXXX_COMMENT
if (tf && tf.locked) {
continue;
}

filtered.push(it);
}

if (filtered.length === 0) {
app.findGrepPreferences = NothingEnum.nothing;
app.changeGrepPreferences = NothingEnum.nothing;
return {
processed: 0,
message: description + "XXXPORTFOLIOXXX_STR"
};
}

// XXXPORTFOLIOXXX_COMMENT
var processedCount = 0;
for (var i = 0; i < filtered.length; i++) {
try {
filtered[i].changeGrep();
processedCount++;
} catch (e) {
// XXXPORTFOLIOXXX_COMMENT
}
}

// XXXPORTFOLIOXXX_COMMENT
app.findGrepPreferences = NothingEnum.nothing;
app.changeGrepPreferences = NothingEnum.nothing;

return {
processed: processedCount,
message: description + "XXXPORTFOLIOXXX_STR" + processedCount + "XXXPORTFOLIOXXX_STR"
};
}
// XXXPORTFOLIOXXX_COMMENT
// XXXPORTFOLIOXXX_COMMENT

function process_004(doc){
var results = [];

try {
// XXXPORTFOLIOXXX_COMMENT
var styleName = "XXXPORTFOLIOXXX_STR"; // XXXPORTFOLIOXXX_COMMENT
var style = doc.paragraphStyles.itemByName(styleName);

if(!style.isValid){
throw new Error("XXXPORTFOLIOXXX_STR" + styleName + "XXXPORTFOLIOXXX_STR");
}

// XXXPORTFOLIOXXX_COMMENT
var storyCount = 0;
for(var i = 0; i < doc.stories.length; i++){
doc.stories[i].paragraphs.everyItem().applyParagraphStyle(style, true);
storyCount++;
}
results.push("XXXPORTFOLIOXXX_STR" + storyCount + "XXXPORTFOLIOXXX_STR");

// XXXPORTFOLIOXXX_COMMENT
// XXXPORTFOLIOXXX_COMMENT
// XXXPORTFOLIOXXX_COMMENT
var authorStyle = doc.characterStyles.itemByName("XXXPORTFOLIOXXX_STR"); // XXXPORTFOLIOXXX_COMMENT
if(!authorStyle.isValid){
results.push("XXXPORTFOLIOXXX_STR");
} else {
app.findGrepPreferences = NothingEnum.nothing;
app.changeGrepPreferences = NothingEnum.nothing;

// XXXPORTFOLIOXXX_COMMENT
app.findGrepPreferences.findWhat = "XXXPORTFOLIOXXX_STR";
app.changeGrepPreferences.appliedCharacterStyle = authorStyle;

var foundAuthor = doc.changeGrep();
results.push("XXXPORTFOLIOXXX_STR" + foundAuthor.length + "XXXPORTFOLIOXXX_STR");

app.findGrepPreferences = NothingEnum.nothing;
app.changeGrepPreferences = NothingEnum.nothing;
}

// XXXPORTFOLIOXXX_COMMENT
app.findGrepPreferences = NothingEnum.nothing;
app.changeGrepPreferences = NothingEnum.nothing;

app.findGrepPreferences.findWhat = "(^~(+)|(~(+$)";
app.changeGrepPreferences.changeTo = "";

var found1 = doc.changeGrep();
results.push("XXXPORTFOLIOXXX_STR" + found1.length + "XXXPORTFOLIOXXX_STR");

app.findGrepPreferences = NothingEnum.nothing;
app.changeGrepPreferences = NothingEnum.nothing;

// XXXPORTFOLIOXXX_COMMENT
// XXXPORTFOLIOXXX_COMMENT
// XXXPORTFOLIOXXX_COMMENT
if(confirm(
"XXXPORTFOLIOXXX_STR" +
"XXXPORTFOLIOXXX_STR" +
"XXXPORTFOLIOXXX_STR" +
"XXXPORTFOLIOXXX_STR" +
"XXXPORTFOLIOXXX_STR" +
"XXXPORTFOLIOXXX_STR" +
"XXXPORTFOLIOXXX_STR"
)){
var digitConversionCount = convertFullWidthDigits(doc);
results.push("XXXPORTFOLIOXXX_STR" + digitConversionCount.total + "XXXPORTFOLIOXXX_STR" + digitConversionCount.three + "XXXPORTFOLIOXXX_STR" + digitConversionCount.four + ")");
} else {
results.push("XXXPORTFOLIOXXX_STR");
}

return results.join(" / ");

} catch(e){
throw new Error("XXXPORTFOLIOXXX_STR" + e.message);
}
}

// XXXPORTFOLIOXXX_COMMENT
function convertFullWidthDigits(doc){
var counts = {total: 0, three: 0, four: 0};

// XXXPORTFOLIOXXX_COMMENT
var fullWidthDigits = "XXXPORTFOLIOXXX_STR";
var halfWidthDigits = "0123456789";

// XXXPORTFOLIOXXX_COMMENT
var style4 = doc.characterStyles.itemByName("XXXPORTFOLIOXXX_STR"); // XXXPORTFOLIOXXX_COMMENT
if(style4.isValid){
app.findGrepPreferences = NothingEnum.nothing;
app.changeGrepPreferences = NothingEnum.nothing;

app.findGrepPreferences.findWhat = "XXXPORTFOLIOXXX_STR";

var found4 = doc.findGrep();
for(var i = 0; i < found4.length; i++){
var originalText = found4[i].contents;
var convertedText = convertDigitsToHalfWidth(originalText, fullWidthDigits, halfWidthDigits);
found4[i].contents = convertedText;
found4[i].appliedCharacterStyle = style4;
counts.four++;
counts.total++;
}

app.findGrepPreferences = NothingEnum.nothing;
app.changeGrepPreferences = NothingEnum.nothing;
}

// XXXPORTFOLIOXXX_COMMENT
var style3 = doc.characterStyles.itemByName("XXXPORTFOLIOXXX_STR"); // XXXPORTFOLIOXXX_COMMENT
if(style3.isValid){
app.findGrepPreferences = NothingEnum.nothing;
app.changeGrepPreferences = NothingEnum.nothing;

app.findGrepPreferences.findWhat = "XXXPORTFOLIOXXX_STR";

var found3 = doc.findGrep();
for(var i = 0; i < found3.length; i++){
var originalText = found3[i].contents;
var convertedText = convertDigitsToHalfWidth(originalText, fullWidthDigits, halfWidthDigits);
found3[i].contents = convertedText;
found3[i].appliedCharacterStyle = style3;
counts.three++;
counts.total++;
}

app.findGrepPreferences = NothingEnum.nothing;
app.changeGrepPreferences = NothingEnum.nothing;
}

// XXXPORTFOLIOXXX_COMMENT
app.findGrepPreferences = NothingEnum.nothing;
app.changeGrepPreferences = NothingEnum.nothing;

app.findGrepPreferences.findWhat = "XXXPORTFOLIOXXX_STR";

var found2 = doc.findGrep();
for(var i = 0; i < found2.length; i++){
var originalText = found2[i].contents;
var convertedText = convertDigitsToHalfWidth(originalText, fullWidthDigits, halfWidthDigits);
found2[i].contents = convertedText;
counts.total++;
}

app.findGrepPreferences = NothingEnum.nothing;
app.changeGrepPreferences = NothingEnum.nothing;

return counts;
}

// XXXPORTFOLIOXXX_COMMENT
function convertDigitsToHalfWidth(text, fullWidthDigits, halfWidthDigits){
var result = "";
for(var i = 0; i < text.length; i++){
var ch = text.charAt(i);
var index = fullWidthDigits.indexOf(ch);
if(index >= 0){
result += halfWidthDigits.charAt(index);
} else {
result += ch;
}
}
return result;
}
// XXXPORTFOLIOXXX_COMMENT
// XXXPORTFOLIOXXX_COMMENT

function process_005(doc){
var results = [];

try {
// XXXPORTFOLIOXXX_COMMENT
app.findGrepPreferences = NothingEnum.nothing;
app.changeGrepPreferences = NothingEnum.nothing;

app.findGrepPreferences.findWhat = "~P";
app.changeGrepPreferences.changeTo = "";

var found1 = doc.changeGrep();
results.push("XXXPORTFOLIOXXX_STR" + found1.length + "XXXPORTFOLIOXXX_STR");

app.findGrepPreferences = NothingEnum.nothing;
app.changeGrepPreferences = NothingEnum.nothing;

// XXXPORTFOLIOXXX_COMMENT
app.findGrepPreferences = NothingEnum.nothing;
app.changeGrepPreferences = NothingEnum.nothing;

app.findGrepPreferences.findWhat = "XXXPORTFOLIOXXX_STR";
app.changeGrepPreferences.changeTo = "";

var found2 = doc.changeGrep();
results.push("XXXPORTFOLIOXXX_STR" + found2.length + "XXXPORTFOLIOXXX_STR");

app.findGrepPreferences = NothingEnum.nothing;
app.changeGrepPreferences = NothingEnum.nothing;

// XXXPORTFOLIOXXX_COMMENT
app.findGrepPreferences = NothingEnum.nothing;
app.changeGrepPreferences = NothingEnum.nothing;

app.findGrepPreferences.findWhat = "\\r+";
app.changeGrepPreferences.changeTo = "\\r";

var found3 = doc.changeGrep();
results.push("XXXPORTFOLIOXXX_STR" + found3.length + "XXXPORTFOLIOXXX_STR");

app.findGrepPreferences = NothingEnum.nothing;
app.changeGrepPreferences = NothingEnum.nothing;

// XXXPORTFOLIOXXX_COMMENT
var style02 = doc.paragraphStyles.itemByName("XXXPORTFOLIOXXX_STR"); // XXXPORTFOLIOXXX_COMMENT
if(!style02.isValid){
throw new Error("XXXPORTFOLIOXXX_STR");
}

for(var i = 0; i < doc.stories.length; i++){
doc.stories[i].paragraphs.everyItem().applyParagraphStyle(style02, true);
}
results.push("XXXPORTFOLIOXXX_STR");

// XXXPORTFOLIOXXX_COMMENT
// XXXPORTFOLIOXXX_COMMENT
// XXXPORTFOLIOXXX_COMMENT
app.findGrepPreferences = NothingEnum.nothing;
app.findGrepPreferences.findWhat = "XXXPORTFOLIOXXX_STR";

var foundParen = doc.findGrep();
if(foundParen.length > 0){
alert("XXXPORTFOLIOXXX_STR" + foundParen.length + "XXXPORTFOLIOXXX_STR");
results.push("XXXPORTFOLIOXXX_STR" + foundParen.length + "XXXPORTFOLIOXXX_STR");
} else {
results.push("XXXPORTFOLIOXXX_STR");
}

app.findGrepPreferences = NothingEnum.nothing;

// XXXPORTFOLIOXXX_COMMENT
// XXXPORTFOLIOXXX_COMMENT
// XXXPORTFOLIOXXX_COMMENT
// XXXPORTFOLIOXXX_COMMENT
if(confirm(
"XXXPORTFOLIOXXX_STR" +
"XXXPORTFOLIOXXX_STR" +
"XXXPORTFOLIOXXX_STR" +
"XXXPORTFOLIOXXX_STR" +
"XXXPORTFOLIOXXX_STR" +
"XXXPORTFOLIOXXX_STR" +
"XXXPORTFOLIOXXX_STR"
)){
app.findGrepPreferences = NothingEnum.nothing;
app.changeGrepPreferences = NothingEnum.nothing;

// XXXPORTFOLIOXXX_COMMENT
var titleStyle = doc.paragraphStyles.itemByName("XXXPORTFOLIOXXX_STR"); // XXXPORTFOLIOXXX_COMMENT
if(!titleStyle.isValid){
throw new Error("XXXPORTFOLIOXXX_STR");
}

// XXXPORTFOLIOXXX_COMMENT
app.findGrepPreferences.findWhat = "^(.*?)(\\x{3000}{3})(.*?)(\\x{3000}{3})";
app.changeGrepPreferences.changeTo = "$1\\t$3\\t";
app.changeGrepPreferences.appliedParagraphStyle = titleStyle;

var found5 = doc.changeGrep();
results.push("XXXPORTFOLIOXXX_STR" + found5.length + "XXXPORTFOLIOXXX_STR");

app.findGrepPreferences = NothingEnum.nothing;
app.changeGrepPreferences = NothingEnum.nothing;
} else {
results.push("XXXPORTFOLIOXXX_STR");
}

// XXXPORTFOLIOXXX_COMMENT
// XXXPORTFOLIOXXX_COMMENT
// XXXPORTFOLIOXXX_COMMENT
if(confirm(
"XXXPORTFOLIOXXX_STR" +
"XXXPORTFOLIOXXX_STR" +
"XXXPORTFOLIOXXX_STR" +
"XXXPORTFOLIOXXX_STR"
)){
var count4 = apply4CharStyle(doc, ["XXXPORTFOLIOXXX_STR", "XXXPORTFOLIOXXX_STR"]);
results.push("XXXPORTFOLIOXXX_STR" + count4 + "XXXPORTFOLIOXXX_STR");
} else {
results.push("XXXPORTFOLIOXXX_STR");
}

results.push("XXXPORTFOLIOXXX_STR");

return results.join(" / ");

} catch(e){
throw new Error("XXXPORTFOLIOXXX_STR" + e.message);
}
}

// XXXPORTFOLIOXXX_COMMENT

// XXXPORTFOLIOXXX_COMMENT

function process_006(doc){
var results = [];

try {
// XXXPORTFOLIOXXX_COMMENT
app.findGrepPreferences = NothingEnum.nothing;
app.changeGrepPreferences = NothingEnum.nothing;

app.findGrepPreferences.findWhat = "~P";
app.changeGrepPreferences.changeTo = "";

var found1 = doc.changeGrep();
results.push("XXXPORTFOLIOXXX_STR" + found1.length + "XXXPORTFOLIOXXX_STR");

app.findGrepPreferences = NothingEnum.nothing;
app.changeGrepPreferences = NothingEnum.nothing;

// XXXPORTFOLIOXXX_COMMENT
app.findGrepPreferences = NothingEnum.nothing;
app.changeGrepPreferences = NothingEnum.nothing;

app.findGrepPreferences.findWhat = "XXXPORTFOLIOXXX_STR";
app.changeGrepPreferences.changeTo = "";

var found2 = doc.changeGrep();
results.push("XXXPORTFOLIOXXX_STR" + found2.length + "XXXPORTFOLIOXXX_STR");

app.findGrepPreferences = NothingEnum.nothing;
app.changeGrepPreferences = NothingEnum.nothing;

// XXXPORTFOLIOXXX_COMMENT
app.findGrepPreferences = NothingEnum.nothing;
app.changeGrepPreferences = NothingEnum.nothing;

app.findGrepPreferences.findWhat = "\\r+";
app.changeGrepPreferences.changeTo = "\\r";

var found3 = doc.changeGrep();
results.push("XXXPORTFOLIOXXX_STR" + found3.length + "XXXPORTFOLIOXXX_STR");

app.findGrepPreferences = NothingEnum.nothing;
app.changeGrepPreferences = NothingEnum.nothing;

// XXXPORTFOLIOXXX_COMMENT
app.findGrepPreferences = NothingEnum.nothing;
app.findGrepPreferences.findWhat = "XXXPORTFOLIOXXX_STR";

var foundParen = doc.findGrep();
if(foundParen.length > 0){
alert("XXXPORTFOLIOXXX_STR" + foundParen.length + "XXXPORTFOLIOXXX_STR");
results.push("XXXPORTFOLIOXXX_STR" + foundParen.length + "XXXPORTFOLIOXXX_STR");
} else {
results.push("XXXPORTFOLIOXXX_STR");
}

app.findGrepPreferences = NothingEnum.nothing;

// XXXPORTFOLIOXXX_COMMENT
var style02 = doc.paragraphStyles.itemByName("XXXPORTFOLIOXXX_STR"); // XXXPORTFOLIOXXX_COMMENT
if(!style02.isValid){
throw new Error("XXXPORTFOLIOXXX_STR");
}

for(var i = 0; i < doc.stories.length; i++){
doc.stories[i].paragraphs.everyItem().applyParagraphStyle(style02, true);
}
results.push("XXXPORTFOLIOXXX_STR");

// XXXPORTFOLIOXXX_COMMENT
// XXXPORTFOLIOXXX_COMMENT
if(confirm("XXXPORTFOLIOXXX_STR")){
app.findGrepPreferences = NothingEnum.nothing;
app.changeGrepPreferences = NothingEnum.nothing;

// XXXPORTFOLIOXXX_COMMENT
var titleStyle = doc.paragraphStyles.itemByName("XXXPORTFOLIOXXX_STR"); // XXXPORTFOLIOXXX_COMMENT
if(!titleStyle.isValid){
throw new Error("XXXPORTFOLIOXXX_STR");
}

// XXXPORTFOLIOXXX_COMMENT
app.findGrepPreferences.findWhat = "(^.*?)(~({3})(.+)(~({3})";
app.changeGrepPreferences.changeTo = "$1\\t$3\\t";
app.changeGrepPreferences.appliedParagraphStyle = titleStyle;

var found7 = doc.changeGrep();
results.push("XXXPORTFOLIOXXX_STR" + found7.length + "XXXPORTFOLIOXXX_STR");

app.findGrepPreferences = NothingEnum.nothing;
app.changeGrepPreferences = NothingEnum.nothing;
} else {
results.push("XXXPORTFOLIOXXX_STR");
}

results.push("XXXPORTFOLIOXXX_STR");
return results.join(" / ");

} catch(e){
throw new Error("XXXPORTFOLIOXXX_STR" + e.message);
}
}
// XXXPORTFOLIOXXX_COMMENT
// XXXPORTFOLIOXXX_COMMENT

function process_007(doc){
var results = [];

try {
// XXXPORTFOLIOXXX_COMMENT
app.findGrepPreferences = NothingEnum.nothing;
app.changeGrepPreferences = NothingEnum.nothing;

app.findGrepPreferences.findWhat = "~P";
app.changeGrepPreferences.changeTo = "";

var found1 = doc.changeGrep();
results.push("XXXPORTFOLIOXXX_STR" + found1.length + "XXXPORTFOLIOXXX_STR");

app.findGrepPreferences = NothingEnum.nothing;
app.changeGrepPreferences = NothingEnum.nothing;

// XXXPORTFOLIOXXX_COMMENT
app.findGrepPreferences = NothingEnum.nothing;
app.changeGrepPreferences = NothingEnum.nothing;

app.findGrepPreferences.findWhat = "XXXPORTFOLIOXXX_STR";
app.changeGrepPreferences.changeTo = "";

var found2 = doc.changeGrep();
results.push("XXXPORTFOLIOXXX_STR" + found2.length + "XXXPORTFOLIOXXX_STR");

app.findGrepPreferences = NothingEnum.nothing;
app.changeGrepPreferences = NothingEnum.nothing;

// XXXPORTFOLIOXXX_COMMENT
app.findGrepPreferences = NothingEnum.nothing;
app.changeGrepPreferences = NothingEnum.nothing;

app.findGrepPreferences.findWhat = "\\r+";
app.changeGrepPreferences.changeTo = "\\r";

var found3 = doc.changeGrep();
results.push("XXXPORTFOLIOXXX_STR" + found3.length + "XXXPORTFOLIOXXX_STR");

app.findGrepPreferences = NothingEnum.nothing;
app.changeGrepPreferences = NothingEnum.nothing;

// XXXPORTFOLIOXXX_COMMENT
app.findGrepPreferences = NothingEnum.nothing;
app.findGrepPreferences.findWhat = "XXXPORTFOLIOXXX_STR";

var foundParen = doc.findGrep();
if(foundParen.length > 0){
alert("XXXPORTFOLIOXXX_STR" + foundParen.length + "XXXPORTFOLIOXXX_STR");
results.push("XXXPORTFOLIOXXX_STR" + foundParen.length + "XXXPORTFOLIOXXX_STR");
} else {
results.push("XXXPORTFOLIOXXX_STR");
}

app.findGrepPreferences = NothingEnum.nothing;

// XXXPORTFOLIOXXX_COMMENT
var style02 = doc.paragraphStyles.itemByName("XXXPORTFOLIOXXX_STR"); // XXXPORTFOLIOXXX_COMMENT
if(!style02.isValid){
throw new Error("XXXPORTFOLIOXXX_STR");
}

for(var i = 0; i < doc.stories.length; i++){
doc.stories[i].paragraphs.everyItem().applyParagraphStyle(style02, true);
}
results.push("XXXPORTFOLIOXXX_STR");

// XXXPORTFOLIOXXX_COMMENT
if(confirm("XXXPORTFOLIOXXX_STR")){
app.findGrepPreferences = NothingEnum.nothing;
app.changeGrepPreferences = NothingEnum.nothing;

var titleStyle = doc.paragraphStyles.itemByName("XXXPORTFOLIOXXX_STR"); // XXXPORTFOLIOXXX_COMMENT
if(!titleStyle.isValid){
throw new Error("XXXPORTFOLIOXXX_STR");
}

app.findGrepPreferences.findWhat = "(^.*?)(~({3})(.+)(~({3})";
app.changeGrepPreferences.changeTo = "$1\\t$3\\t";
app.changeGrepPreferences.appliedParagraphStyle = titleStyle;

var found6 = doc.changeGrep();
results.push("XXXPORTFOLIOXXX_STR" + found6.length + "XXXPORTFOLIOXXX_STR");

app.findGrepPreferences = NothingEnum.nothing;
app.changeGrepPreferences = NothingEnum.nothing;
} else {
results.push("XXXPORTFOLIOXXX_STR");
}

// XXXPORTFOLIOXXX_COMMENT
if(confirm("XXXPORTFOLIOXXX_STR")){
var count4 = apply4CharStyle_shunpu(doc, ["XXXPORTFOLIOXXX_STR", "XXXPORTFOLIOXXX_STR"]);
results.push("XXXPORTFOLIOXXX_STR" + count4 + "XXXPORTFOLIOXXX_STR");
} else {
results.push("XXXPORTFOLIOXXX_STR");
}

// XXXPORTFOLIOXXX_COMMENT
if(confirm("XXXPORTFOLIOXXX_STR")){
var count5 = apply5CharStyle_shunpu(doc, ["XXXPORTFOLIOXXX_STR"]);
results.push("XXXPORTFOLIOXXX_STR" + count5 + "XXXPORTFOLIOXXX_STR");
} else {
results.push("XXXPORTFOLIOXXX_STR");
}

results.push("XXXPORTFOLIOXXX_STR");

return results.join(" / ");

} catch(e){
throw new Error("XXXPORTFOLIOXXX_STR" + e.message);
}
}

// XXXPORTFOLIOXXX_COMMENT
function apply4CharStyle_shunpu(doc, targetWords){
var charStyle = doc.characterStyles.itemByName("XXXPORTFOLIOXXX_STR"); // XXXPORTFOLIOXXX_COMMENT
if(!charStyle.isValid){
throw new Error("XXXPORTFOLIOXXX_STR");
}

var count = 0;

for(var w = 0; w < targetWords.length; w++){
app.findTextPreferences = NothingEnum.nothing;
app.changeTextPreferences = NothingEnum.nothing;

app.findTextPreferences.findWhat = targetWords[w];
app.changeTextPreferences.appliedCharacterStyle = charStyle;

var found = doc.changeText();
count += found.length;

app.findTextPreferences = NothingEnum.nothing;
app.changeTextPreferences = NothingEnum.nothing;
}

return count;
}

// XXXPORTFOLIOXXX_COMMENT
function apply5CharStyle_shunpu(doc, targetWords){
var charStyle = doc.characterStyles.itemByName("XXXPORTFOLIOXXX_STR"); // XXXPORTFOLIOXXX_COMMENT
if(!charStyle.isValid){
throw new Error("XXXPORTFOLIOXXX_STR");
}

var count = 0;

for(var w = 0; w < targetWords.length; w++){
app.findTextPreferences = NothingEnum.nothing;
app.changeTextPreferences = NothingEnum.nothing;

app.findTextPreferences.findWhat = targetWords[w];
app.changeTextPreferences.appliedCharacterStyle = charStyle;

var found = doc.changeText();
count += found.length;

app.findTextPreferences = NothingEnum.nothing;
app.changeTextPreferences = NothingEnum.nothing;
}

return count;
}
// XXXPORTFOLIOXXX_COMMENT

// XXXPORTFOLIOXXX_COMMENT

function process_008(doc){
var results = [];

try {
// XXXPORTFOLIOXXX_COMMENT
app.findGrepPreferences = NothingEnum.nothing;
app.changeGrepPreferences = NothingEnum.nothing;

app.findGrepPreferences.findWhat = "~P";
app.changeGrepPreferences.changeTo = "";

var found1 = doc.changeGrep();
results.push("XXXPORTFOLIOXXX_STR" + found1.length + "XXXPORTFOLIOXXX_STR");

app.findGrepPreferences = NothingEnum.nothing;
app.changeGrepPreferences = NothingEnum.nothing;

// XXXPORTFOLIOXXX_COMMENT
app.findGrepPreferences = NothingEnum.nothing;
app.changeGrepPreferences = NothingEnum.nothing;

app.findGrepPreferences.findWhat = "XXXPORTFOLIOXXX_STR";
app.changeGrepPreferences.changeTo = "";

var found2 = doc.changeGrep();
results.push("XXXPORTFOLIOXXX_STR" + found2.length + "XXXPORTFOLIOXXX_STR");

app.findGrepPreferences = NothingEnum.nothing;
app.changeGrepPreferences = NothingEnum.nothing;

// XXXPORTFOLIOXXX_COMMENT
app.findGrepPreferences = NothingEnum.nothing;
app.changeGrepPreferences = NothingEnum.nothing;

app.findGrepPreferences.findWhat = "\\r+";
app.changeGrepPreferences.changeTo = "\\r";

var found3 = doc.changeGrep();
results.push("XXXPORTFOLIOXXX_STR" + found3.length + "XXXPORTFOLIOXXX_STR");

app.findGrepPreferences = NothingEnum.nothing;
app.changeGrepPreferences = NothingEnum.nothing;

// XXXPORTFOLIOXXX_COMMENT
app.findGrepPreferences = NothingEnum.nothing;
app.changeGrepPreferences = NothingEnum.nothing;

app.findGrepPreferences.findWhat = "^~(";
app.changeGrepPreferences.changeTo = "";

var found4 = doc.changeGrep();
results.push("XXXPORTFOLIOXXX_STR" + found4.length + "XXXPORTFOLIOXXX_STR");

app.findGrepPreferences = NothingEnum.nothing;
app.changeGrepPreferences = NothingEnum.nothing;

// XXXPORTFOLIOXXX_COMMENT
if(confirm("XXXPORTFOLIOXXX_STR")){
app.findGrepPreferences = NothingEnum.nothing;
app.changeGrepPreferences = NothingEnum.nothing;

var titleStyle = doc.paragraphStyles.itemByName("XXXPORTFOLIOXXX_STR"); // XXXPORTFOLIOXXX_COMMENT
if(!titleStyle.isValid){
throw new Error("XXXPORTFOLIOXXX_STR");
}

app.findGrepPreferences.findWhat = "~({2,}";
app.changeGrepPreferences.changeTo = "\\t";
app.changeGrepPreferences.appliedParagraphStyle = titleStyle;

var found5 = doc.changeGrep();
results.push("XXXPORTFOLIOXXX_STR" + found5.length + "XXXPORTFOLIOXXX_STR");

app.findGrepPreferences = NothingEnum.nothing;
app.changeGrepPreferences = NothingEnum.nothing;
} else {
results.push("XXXPORTFOLIOXXX_STR");
}

// XXXPORTFOLIOXXX_COMMENT
if(confirm("XXXPORTFOLIOXXX_STR")){
app.findGrepPreferences = NothingEnum.nothing;
app.changeGrepPreferences = NothingEnum.nothing;

var honbunStyle = doc.paragraphStyles.itemByName("XXXPORTFOLIOXXX_STR"); // XXXPORTFOLIOXXX_COMMENT
if(!honbunStyle.isValid){
throw new Error("XXXPORTFOLIOXXX_STR");
}

app.findGrepPreferences.findWhat = "~({2,}";
app.findGrepPreferences.appliedParagraphStyle = honbunStyle;
app.changeGrepPreferences.changeTo = "~y";
app.changeGrepPreferences.appliedParagraphStyle = honbunStyle;

var found6 = doc.changeGrep();
results.push("XXXPORTFOLIOXXX_STR" + found6.length + "XXXPORTFOLIOXXX_STR");

app.findGrepPreferences = NothingEnum.nothing;
app.changeGrepPreferences = NothingEnum.nothing;
} else {
results.push("XXXPORTFOLIOXXX_STR");
}

return results.join(" / ");

} catch(e){
throw new Error("XXXPORTFOLIOXXX_STR" + e.message);
}
}

// XXXPORTFOLIOXXX_COMMENT
// XXXPORTFOLIOXXX_COMMENT

function process_009(doc){
var results = [];

try {
// XXXPORTFOLIOXXX_COMMENT
var styleName = "XXXPORTFOLIOXXX_STR";
var style = doc.paragraphStyles.itemByName(styleName);

if(!style.isValid){
throw new Error("XXXPORTFOLIOXXX_STR" + styleName + "XXXPORTFOLIOXXX_STR");
}

// XXXPORTFOLIOXXX_COMMENT
var storyCount = 0;
for(var i = 0; i < doc.stories.length; i++){
doc.stories[i].paragraphs.everyItem().applyParagraphStyle(style, true);
storyCount++;
}
results.push("XXXPORTFOLIOXXX_STR" + storyCount + "XXXPORTFOLIOXXX_STR");

// XXXPORTFOLIOXXX_COMMENT

// XXXPORTFOLIOXXX_COMMENT
app.findTextPreferences = NothingEnum.nothing;
app.changeTextPreferences = NothingEnum.nothing;

app.findTextPreferences.findWhat = "<";
app.changeTextPreferences.changeTo = "XXXPORTFOLIOXXX_STR";

var found1 = doc.changeText();
results.push("XXXPORTFOLIOXXX_STR" + found1.length + "XXXPORTFOLIOXXX_STR");

app.findTextPreferences = NothingEnum.nothing;
app.changeTextPreferences = NothingEnum.nothing;

// XXXPORTFOLIOXXX_COMMENT
app.findTextPreferences = NothingEnum.nothing;
app.changeTextPreferences = NothingEnum.nothing;

app.findTextPreferences.findWhat = ">";
app.changeTextPreferences.changeTo = "XXXPORTFOLIOXXX_STR";

var found2 = doc.changeText();
results.push("XXXPORTFOLIOXXX_STR" + found2.length + "XXXPORTFOLIOXXX_STR");

app.findTextPreferences = NothingEnum.nothing;
app.changeTextPreferences = NothingEnum.nothing;

// XXXPORTFOLIOXXX_COMMENT

// XXXPORTFOLIOXXX_COMMENT
app.findGrepPreferences = NothingEnum.nothing;
app.changeGrepPreferences = NothingEnum.nothing;

app.findGrepPreferences.findWhat = "(^~(+)|(~(+$)";
app.changeGrepPreferences.changeTo = "";

var found3 = doc.changeGrep();
results.push("XXXPORTFOLIOXXX_STR" + found3.length + "XXXPORTFOLIOXXX_STR");

app.findGrepPreferences = NothingEnum.nothing;
app.changeGrepPreferences = NothingEnum.nothing;

// XXXPORTFOLIOXXX_COMMENT
// XXXPORTFOLIOXXX_COMMENT
if(confirm("XXXPORTFOLIOXXX_STR")){
app.findGrepPreferences = NothingEnum.nothing;
app.changeGrepPreferences = NothingEnum.nothing;

var kuStyle = doc.paragraphStyles.itemByName("XXXPORTFOLIOXXX_STR"); // XXXPORTFOLIOXXX_COMMENT
if(!kuStyle.isValid){
throw new Error("XXXPORTFOLIOXXX_STR");
}

app.findGrepPreferences.findWhat = "(^.*?)(~({2,})";
app.changeGrepPreferences.changeTo = "$1\\t";
app.changeGrepPreferences.appliedParagraphStyle = kuStyle;

var found4 = doc.changeGrep();
results.push("XXXPORTFOLIOXXX_STR" + found4.length + "XXXPORTFOLIOXXX_STR");

app.findGrepPreferences = NothingEnum.nothing;
app.changeGrepPreferences = NothingEnum.nothing;
} else {
results.push("XXXPORTFOLIOXXX_STR");
}

return results.join(" / ");

} catch(e){
throw new Error("XXXPORTFOLIOXXX_STR" + e.message);
}
}

// XXXPORTFOLIOXXX_COMMENT
// XXXPORTFOLIOXXX_COMMENT

function process_010(doc){
var results = [];

try {
// XXXPORTFOLIOXXX_COMMENT
var styleName = "XXXPORTFOLIOXXX_STR"; // XXXPORTFOLIOXXX_COMMENT
var style = doc.paragraphStyles.itemByName(styleName);

if(!style.isValid){
throw new Error("XXXPORTFOLIOXXX_STR" + styleName + "XXXPORTFOLIOXXX_STR");
}

// XXXPORTFOLIOXXX_COMMENT
var storyCount = 0;
for(var i = 0; i < doc.stories.length; i++){
doc.stories[i].paragraphs.everyItem().applyParagraphStyle(style, true);
storyCount++;
}
results.push("XXXPORTFOLIOXXX_STR" + storyCount + "XXXPORTFOLIOXXX_STR");

// XXXPORTFOLIOXXX_COMMENT

// XXXPORTFOLIOXXX_COMMENT
app.findGrepPreferences = NothingEnum.nothing;
app.changeGrepPreferences = NothingEnum.nothing;

app.findGrepPreferences.findWhat = "\\r+";
app.changeGrepPreferences.changeTo = "\\r";

var found1 = doc.changeGrep();
results.push("XXXPORTFOLIOXXX_STR" + found1.length + "XXXPORTFOLIOXXX_STR");

app.findGrepPreferences = NothingEnum.nothing;
app.changeGrepPreferences = NothingEnum.nothing;

// XXXPORTFOLIOXXX_COMMENT
app.findGrepPreferences = NothingEnum.nothing;
app.changeGrepPreferences = NothingEnum.nothing;

app.findGrepPreferences.findWhat = "(^~(+)|(~(+$)";
app.changeGrepPreferences.changeTo = "";

var found2 = doc.changeGrep();
results.push("XXXPORTFOLIOXXX_STR" + found2.length + "XXXPORTFOLIOXXX_STR");

app.findGrepPreferences = NothingEnum.nothing;
app.changeGrepPreferences = NothingEnum.nothing;

// XXXPORTFOLIOXXX_COMMENT
app.findGrepPreferences = NothingEnum.nothing;
app.changeGrepPreferences = NothingEnum.nothing;

app.findGrepPreferences.findWhat = "(^.*?)(~({2,})";
app.changeGrepPreferences.changeTo = "$1\\t";

var found3 = doc.changeGrep();
results.push("XXXPORTFOLIOXXX_STR" + found3.length + "XXXPORTFOLIOXXX_STR");

app.findGrepPreferences = NothingEnum.nothing;
app.changeGrepPreferences = NothingEnum.nothing;

// XXXPORTFOLIOXXX_COMMENT
app.findGrepPreferences = NothingEnum.nothing;
app.changeGrepPreferences = NothingEnum.nothing;

app.findGrepPreferences.findWhat = "XXXPORTFOLIOXXX_STR";
app.changeGrepPreferences.changeTo = "\\t";

var found4 = doc.changeGrep();
results.push("XXXPORTFOLIOXXX_STR" + found4.length + "XXXPORTFOLIOXXX_STR");

app.findGrepPreferences = NothingEnum.nothing;
app.changeGrepPreferences = NothingEnum.nothing;

return results.join(" / ");

} catch(e){
throw new Error("XXXPORTFOLIOXXX_STR" + e.message);
}
}

// XXXPORTFOLIOXXX_COMMENT
// XXXPORTFOLIOXXX_COMMENT

function process_011(doc){
var results = [];

try {
// XXXPORTFOLIOXXX_COMMENT
app.findGrepPreferences = NothingEnum.nothing;
app.changeGrepPreferences = NothingEnum.nothing;

app.findGrepPreferences.findWhat = "~P";
app.changeGrepPreferences.changeTo = "";

var found1 = doc.changeGrep();
results.push("XXXPORTFOLIOXXX_STR" + found1.length + "XXXPORTFOLIOXXX_STR");

app.findGrepPreferences = NothingEnum.nothing;
app.changeGrepPreferences = NothingEnum.nothing;

// XXXPORTFOLIOXXX_COMMENT
app.findGrepPreferences = NothingEnum.nothing;
app.changeGrepPreferences = NothingEnum.nothing;

app.findGrepPreferences.findWhat = "XXXPORTFOLIOXXX_STR";
app.changeGrepPreferences.changeTo = "";

var found2 = doc.changeGrep();
results.push("XXXPORTFOLIOXXX_STR" + found2.length + "XXXPORTFOLIOXXX_STR");

app.findGrepPreferences = NothingEnum.nothing;
app.changeGrepPreferences = NothingEnum.nothing;

// XXXPORTFOLIOXXX_COMMENT
app.findGrepPreferences = NothingEnum.nothing;
app.changeGrepPreferences = NothingEnum.nothing;

app.findGrepPreferences.findWhat = "\\r+";
app.changeGrepPreferences.changeTo = "\\r";

var found3 = doc.changeGrep();
results.push("XXXPORTFOLIOXXX_STR" + found3.length + "XXXPORTFOLIOXXX_STR");

app.findGrepPreferences = NothingEnum.nothing;
app.changeGrepPreferences = NothingEnum.nothing;

// XXXPORTFOLIOXXX_COMMENT
app.findGrepPreferences = NothingEnum.nothing;
app.findGrepPreferences.findWhat = "XXXPORTFOLIOXXX_STR";

var foundParen = doc.findGrep();
if(foundParen.length > 0){
alert("XXXPORTFOLIOXXX_STR" + foundParen.length + "XXXPORTFOLIOXXX_STR");
results.push("XXXPORTFOLIOXXX_STR" + foundParen.length + "XXXPORTFOLIOXXX_STR");
} else {
results.push("XXXPORTFOLIOXXX_STR");
}

app.findGrepPreferences = NothingEnum.nothing;

// XXXPORTFOLIOXXX_COMMENT
var style02 = doc.paragraphStyles.itemByName("XXXPORTFOLIOXXX_STR"); // XXXPORTFOLIOXXX_COMMENT
if(!style02.isValid){
throw new Error("XXXPORTFOLIOXXX_STR");
}

for(var i = 0; i < doc.stories.length; i++){
doc.stories[i].paragraphs.everyItem().applyParagraphStyle(style02, true);
}
results.push("XXXPORTFOLIOXXX_STR");

// XXXPORTFOLIOXXX_COMMENT
if(confirm("XXXPORTFOLIOXXX_STR")){
app.findGrepPreferences = NothingEnum.nothing;
app.changeGrepPreferences = NothingEnum.nothing;

var addressStyle = doc.paragraphStyles.itemByName("XXXPORTFOLIOXXX_STR"); // XXXPORTFOLIOXXX_COMMENT
if(!addressStyle.isValid){
throw new Error("XXXPORTFOLIOXXX_STR");
}

app.findGrepPreferences.findWhat = "(^.*?)(~({3})(.+)";
app.changeGrepPreferences.changeTo = "$1~(~($3";
app.changeGrepPreferences.appliedParagraphStyle = addressStyle;

var found6 = doc.changeGrep();
results.push("XXXPORTFOLIOXXX_STR" + found6.length + "XXXPORTFOLIOXXX_STR");

app.findGrepPreferences = NothingEnum.nothing;
app.changeGrepPreferences = NothingEnum.nothing;
} else {
results.push("XXXPORTFOLIOXXX_STR");
}

// XXXPORTFOLIOXXX_COMMENT
if(confirm("XXXPORTFOLIOXXX_STR")){
var count4 = apply4CharStyle(doc, ["XXXPORTFOLIOXXX_STR", "XXXPORTFOLIOXXX_STR"]);
results.push("XXXPORTFOLIOXXX_STR" + count4 + "XXXPORTFOLIOXXX_STR");
} else {
results.push("XXXPORTFOLIOXXX_STR");
}

// XXXPORTFOLIOXXX_COMMENT
if(confirm("XXXPORTFOLIOXXX_STR")){
var count5 = apply5CharStyle(doc, ["XXXPORTFOLIOXXX_STR", "XXXPORTFOLIOXXX_STR"]);
results.push("XXXPORTFOLIOXXX_STR" + count5 + "XXXPORTFOLIOXXX_STR");
} else {
results.push("XXXPORTFOLIOXXX_STR");
}

results.push("XXXPORTFOLIOXXX_STR");
return results.join(" / ");

} catch(e){
throw new Error("XXXPORTFOLIOXXX_STR" + e.message);
}
}

// XXXPORTFOLIOXXX_COMMENT
function apply4CharStyle(doc, targetWords){
var charStyle = doc.characterStyles.itemByName("XXXPORTFOLIOXXX_STR"); // XXXPORTFOLIOXXX_COMMENT
if(!charStyle.isValid){
throw new Error("XXXPORTFOLIOXXX_STR");
}

var count = 0;

for(var w = 0; w < targetWords.length; w++){
app.findTextPreferences = NothingEnum.nothing;
app.changeTextPreferences = NothingEnum.nothing;

app.findTextPreferences.findWhat = targetWords[w];
app.changeTextPreferences.appliedCharacterStyle = charStyle;

var found = doc.changeText();
count += found.length;

app.findTextPreferences = NothingEnum.nothing;
app.changeTextPreferences = NothingEnum.nothing;
}

return count;
}

// XXXPORTFOLIOXXX_COMMENT
function apply5CharStyle(doc, targetWords){
var charStyle = doc.characterStyles.itemByName("XXXPORTFOLIOXXX_STR"); // XXXPORTFOLIOXXX_COMMENT
if(!charStyle.isValid){
throw new Error("XXXPORTFOLIOXXX_STR");
}

var count = 0;

for(var w = 0; w < targetWords.length; w++){
app.findTextPreferences = NothingEnum.nothing;
app.changeTextPreferences = NothingEnum.nothing;

app.findTextPreferences.findWhat = targetWords[w];
app.changeTextPreferences.appliedCharacterStyle = charStyle;

var found = doc.changeText();
count += found.length;

app.findTextPreferences = NothingEnum.nothing;
app.changeTextPreferences = NothingEnum.nothing;
}

return count;
}
// XXXPORTFOLIOXXX_COMMENT
// XXXPORTFOLIOXXX_COMMENT

function process_012(doc){
var results = [];

try {
// XXXPORTFOLIOXXX_COMMENT
var styleName = "XXXPORTFOLIOXXX_STR"; // XXXPORTFOLIOXXX_COMMENT
var style = doc.paragraphStyles.itemByName(styleName);

if(!style.isValid){
throw new Error("XXXPORTFOLIOXXX_STR" + styleName + "XXXPORTFOLIOXXX_STR");
}

// XXXPORTFOLIOXXX_COMMENT
for(var i = 0; i < doc.stories.length; i++){
doc.stories[i].paragraphs.everyItem().applyParagraphStyle(style, true);
}
results.push("XXXPORTFOLIOXXX_STR");

// XXXPORTFOLIOXXX_COMMENT

// XXXPORTFOLIOXXX_COMMENT
app.findGrepPreferences = NothingEnum.nothing;
app.changeGrepPreferences = NothingEnum.nothing;

app.findGrepPreferences.findWhat = "(^~(+)|(~(+$)";
app.changeGrepPreferences.changeTo = "";

var found1 = doc.changeGrep();
results.push("XXXPORTFOLIOXXX_STR" + found1.length + "XXXPORTFOLIOXXX_STR");

app.findGrepPreferences = NothingEnum.nothing;
app.changeGrepPreferences = NothingEnum.nothing;

// XXXPORTFOLIOXXX_COMMENT
app.findGrepPreferences = NothingEnum.nothing;
app.changeGrepPreferences = NothingEnum.nothing;

app.findGrepPreferences.findWhat = "\\r+";
app.changeGrepPreferences.changeTo = "\\r";

var found2 = doc.changeGrep();
results.push("XXXPORTFOLIOXXX_STR" + found2.length + "XXXPORTFOLIOXXX_STR");

app.findGrepPreferences = NothingEnum.nothing;
app.changeGrepPreferences = NothingEnum.nothing;

// XXXPORTFOLIOXXX_COMMENT
if(confirm("XXXPORTFOLIOXXX_STR")){
app.findGrepPreferences = NothingEnum.nothing;
app.changeGrepPreferences = NothingEnum.nothing;

// XXXPORTFOLIOXXX_COMMENT
var kuStyle = doc.paragraphStyles.itemByName("XXXPORTFOLIOXXX_STR");
if(!kuStyle.isValid){
throw new Error("XXXPORTFOLIOXXX_STR");
}

app.findGrepPreferences.findWhat = "(^.*?)(~({2,})";
app.changeGrepPreferences.changeTo = "$1\\t";
app.changeGrepPreferences.appliedParagraphStyle = kuStyle;

var found3 = doc.changeGrep();
results.push("XXXPORTFOLIOXXX_STR" + found3.length + "XXXPORTFOLIOXXX_STR");

app.findGrepPreferences = NothingEnum.nothing;
app.changeGrepPreferences = NothingEnum.nothing;
} else {
results.push("XXXPORTFOLIOXXX_STR");
}

return results.join(" / ");

} catch(e){
throw new Error("XXXPORTFOLIOXXX_STR" + e.message);
}
}
// XXXPORTFOLIOXXX_COMMENT
// XXXPORTFOLIOXXX_COMMENT

function process_013(doc){
var results = [];

try {
// XXXPORTFOLIOXXX_COMMENT
var styleName = "XXXPORTFOLIOXXX_STR"; // XXXPORTFOLIOXXX_COMMENT
var style = doc.paragraphStyles.itemByName(styleName);

if(!style.isValid){
throw new Error("XXXPORTFOLIOXXX_STR" + styleName + "XXXPORTFOLIOXXX_STR");
}

for(var i = 0; i < doc.stories.length; i++){
doc.stories[i].paragraphs.everyItem().applyParagraphStyle(style, true);
}
results.push("XXXPORTFOLIOXXX_STR");

// XXXPORTFOLIOXXX_COMMENT

// XXXPORTFOLIOXXX_COMMENT
app.findGrepPreferences = NothingEnum.nothing;
app.changeGrepPreferences = NothingEnum.nothing;

app.findGrepPreferences.findWhat = "(^~(+)|(~(+$)";
app.changeGrepPreferences.changeTo = "";

var found1 = doc.changeGrep();
results.push("XXXPORTFOLIOXXX_STR" + found1.length + "XXXPORTFOLIOXXX_STR");

app.findGrepPreferences = NothingEnum.nothing;
app.changeGrepPreferences = NothingEnum.nothing;

// XXXPORTFOLIOXXX_COMMENT
app.findGrepPreferences = NothingEnum.nothing;
app.changeGrepPreferences = NothingEnum.nothing;

app.findGrepPreferences.findWhat = "(^ +)|( +$)";
app.changeGrepPreferences.changeTo = "";

var found2 = doc.changeGrep();
results.push("XXXPORTFOLIOXXX_STR" + found2.length + "XXXPORTFOLIOXXX_STR");

app.findGrepPreferences = NothingEnum.nothing;
app.changeGrepPreferences = NothingEnum.nothing;

// XXXPORTFOLIOXXX_COMMENT
app.findGrepPreferences = NothingEnum.nothing;
app.changeGrepPreferences = NothingEnum.nothing;

app.findGrepPreferences.findWhat = "\\r+";
app.changeGrepPreferences.changeTo = "\\r";

var found3 = doc.changeGrep();
results.push("XXXPORTFOLIOXXX_STR" + found3.length + "XXXPORTFOLIOXXX_STR");

app.findGrepPreferences = NothingEnum.nothing;
app.changeGrepPreferences = NothingEnum.nothing;

// XXXPORTFOLIOXXX_COMMENT
app.findGrepPreferences = NothingEnum.nothing;
app.changeGrepPreferences = NothingEnum.nothing;

app.findGrepPreferences.findWhat = "XXXPORTFOLIOXXX_STR";

var daiStyle = doc.paragraphStyles.itemByName("XXXPORTFOLIOXXX_STR"); // XXXPORTFOLIOXXX_COMMENT
if(!daiStyle.isValid){
throw new Error("XXXPORTFOLIOXXX_STR");
}

app.changeGrepPreferences.appliedParagraphStyle = daiStyle;
app.changeGrepPreferences.changeTo = "$0";

var found4 = doc.changeGrep();
results.push("XXXPORTFOLIOXXX_STR" + found4.length + "XXXPORTFOLIOXXX_STR");

app.findGrepPreferences = NothingEnum.nothing;
app.changeGrepPreferences = NothingEnum.nothing;

// XXXPORTFOLIOXXX_COMMENT
if(confirm("XXXPORTFOLIOXXX_STR")){
app.findGrepPreferences = NothingEnum.nothing;
app.changeGrepPreferences = NothingEnum.nothing;

app.findGrepPreferences.findWhat = "XXXPORTFOLIOXXX_STR";

var senStyle = doc.paragraphStyles.itemByName("XXXPORTFOLIOXXX_STR"); // XXXPORTFOLIOXXX_COMMENT
if(!senStyle.isValid){
throw new Error("XXXPORTFOLIOXXX_STR");
}

app.changeGrepPreferences.appliedParagraphStyle = senStyle;
app.changeGrepPreferences.changeTo = "$0";

var found5 = doc.changeGrep();
results.push("XXXPORTFOLIOXXX_STR" + found5.length + "XXXPORTFOLIOXXX_STR");

app.findGrepPreferences = NothingEnum.nothing;
app.changeGrepPreferences = NothingEnum.nothing;
} else {
results.push("XXXPORTFOLIOXXX_STR");
}

// XXXPORTFOLIOXXX_COMMENT
if(confirm("XXXPORTFOLIOXXX_STR")){
app.findGrepPreferences = NothingEnum.nothing;
app.changeGrepPreferences = NothingEnum.nothing;

app.findGrepPreferences.findWhat = "(^.*?)(~({2,})";
app.changeGrepPreferences.changeTo = "$1\\t";

var found6 = doc.changeGrep();
results.push("XXXPORTFOLIOXXX_STR" + found6.length + "XXXPORTFOLIOXXX_STR");

app.findGrepPreferences = NothingEnum.nothing;
app.changeGrepPreferences = NothingEnum.nothing;
} else {
results.push("XXXPORTFOLIOXXX_STR");
}

// XXXPORTFOLIOXXX_COMMENT
// XXXPORTFOLIOXXX_COMMENT
app.findTextPreferences = NothingEnum.nothing;
app.changeTextPreferences = NothingEnum.nothing;

app.findTextPreferences.findWhat = "XXXPORTFOLIOXXX_STR";

var hyoStyle = doc.paragraphStyles.itemByName("XXXPORTFOLIOXXX_STR"); // XXXPORTFOLIOXXX_COMMENT
if(!hyoStyle.isValid){
throw new Error("XXXPORTFOLIOXXX_STR");
}

app.changeTextPreferences.appliedParagraphStyle = hyoStyle;
app.changeTextPreferences.changeTo = "XXXPORTFOLIOXXX_STR";

var found7 = doc.changeText();
results.push("XXXPORTFOLIOXXX_STR" + found7.length + "XXXPORTFOLIOXXX_STR");

app.findTextPreferences = NothingEnum.nothing;
app.changeTextPreferences = NothingEnum.nothing;

return results.join(" / ");

} catch(e){
throw new Error("XXXPORTFOLIOXXX_STR" + e.message);
}
}
// XXXPORTFOLIOXXX_COMMENT
// XXXPORTFOLIOXXX_COMMENT

function process_014(doc){
var results = [];

try {
// XXXPORTFOLIOXXX_COMMENT
var styleName = "XXXPORTFOLIOXXX_STR"; // XXXPORTFOLIOXXX_COMMENT
var style = doc.paragraphStyles.itemByName(styleName);

if(!style.isValid){
throw new Error("XXXPORTFOLIOXXX_STR" + styleName + "XXXPORTFOLIOXXX_STR");
}

for(var i = 0; i < doc.stories.length; i++){
doc.stories[i].paragraphs.everyItem().applyParagraphStyle(style, true);
}
results.push("XXXPORTFOLIOXXX_STR");

// XXXPORTFOLIOXXX_COMMENT

// XXXPORTFOLIOXXX_COMMENT
app.findGrepPreferences = NothingEnum.nothing;
app.changeGrepPreferences = NothingEnum.nothing;

app.findGrepPreferences.findWhat = "(^~(+)|(~(+$)";
app.changeGrepPreferences.changeTo = "";

var found1 = doc.changeGrep();
results.push("XXXPORTFOLIOXXX_STR" + found1.length + "XXXPORTFOLIOXXX_STR");

app.findGrepPreferences = NothingEnum.nothing;
app.changeGrepPreferences = NothingEnum.nothing;

// XXXPORTFOLIOXXX_COMMENT
app.findGrepPreferences = NothingEnum.nothing;
app.changeGrepPreferences = NothingEnum.nothing;

app.findGrepPreferences.findWhat = "(^ +)|( +$)";
app.changeGrepPreferences.changeTo = "";

var found2 = doc.changeGrep();
results.push("XXXPORTFOLIOXXX_STR" + found2.length + "XXXPORTFOLIOXXX_STR");

app.findGrepPreferences = NothingEnum.nothing;
app.changeGrepPreferences = NothingEnum.nothing;

// XXXPORTFOLIOXXX_COMMENT
app.findGrepPreferences = NothingEnum.nothing;
app.changeGrepPreferences = NothingEnum.nothing;

app.findGrepPreferences.findWhat = "\\r+";
app.changeGrepPreferences.changeTo = "\\r";

var found3 = doc.changeGrep();
results.push("XXXPORTFOLIOXXX_STR" + found3.length + "XXXPORTFOLIOXXX_STR");

app.findGrepPreferences = NothingEnum.nothing;
app.changeGrepPreferences = NothingEnum.nothing;

// XXXPORTFOLIOXXX_COMMENT
if(confirm("XXXPORTFOLIOXXX_STR")){
app.findGrepPreferences = NothingEnum.nothing;
app.changeGrepPreferences = NothingEnum.nothing;

// XXXPORTFOLIOXXX_COMMENT
app.findGrepPreferences.findWhat = "XXXPORTFOLIOXXX_STR";

var senStyle = doc.paragraphStyles.itemByName("XXXPORTFOLIOXXX_STR"); // XXXPORTFOLIOXXX_COMMENT
if(!senStyle.isValid){
throw new Error("XXXPORTFOLIOXXX_STR");
}

app.changeGrepPreferences.appliedParagraphStyle = senStyle;
// XXXPORTFOLIOXXX_COMMENT
app.changeGrepPreferences.changeTo = "$0";

var found2 = doc.changeGrep();
results.push("XXXPORTFOLIOXXX_STR" + found2.length + "XXXPORTFOLIOXXX_STR");

app.findGrepPreferences = NothingEnum.nothing;
app.changeGrepPreferences = NothingEnum.nothing;
} else {
results.push("XXXPORTFOLIOXXX_STR");
}

// XXXPORTFOLIOXXX_COMMENT
if(confirm("XXXPORTFOLIOXXX_STR")){
app.findGrepPreferences = NothingEnum.nothing;
app.changeGrepPreferences = NothingEnum.nothing;

app.findGrepPreferences.findWhat = "XXXPORTFOLIOXXX_STR";

var kuStyle = doc.paragraphStyles.itemByName("XXXPORTFOLIOXXX_STR"); // XXXPORTFOLIOXXX_COMMENT
if(!kuStyle.isValid){
throw new Error("XXXPORTFOLIOXXX_STR");
}

app.changeGrepPreferences.appliedParagraphStyle = kuStyle;
app.changeGrepPreferences.changeTo = "$0";

var found5 = doc.changeGrep();
results.push("XXXPORTFOLIOXXX_STR" + found5.length + "XXXPORTFOLIOXXX_STR");

app.findGrepPreferences = NothingEnum.nothing;
app.changeGrepPreferences = NothingEnum.nothing;
} else {
results.push("XXXPORTFOLIOXXX_STR");
}

// XXXPORTFOLIOXXX_COMMENT
if(confirm("XXXPORTFOLIOXXX_STR")){
app.findGrepPreferences = NothingEnum.nothing;
app.changeGrepPreferences = NothingEnum.nothing;

var kuStyle = doc.paragraphStyles.itemByName("XXXPORTFOLIOXXX_STR"); // XXXPORTFOLIOXXX_COMMENT
if(kuStyle.isValid){
app.findGrepPreferences.findWhat = "~({2,}";
app.findGrepPreferences.appliedParagraphStyle = kuStyle;
app.changeGrepPreferences.changeTo = "\\t";

var found6 = doc.changeGrep();
results.push("XXXPORTFOLIOXXX_STR" + found6.length + "XXXPORTFOLIOXXX_STR");
}

app.findGrepPreferences = NothingEnum.nothing;
app.changeGrepPreferences = NothingEnum.nothing;
} else {
results.push("XXXPORTFOLIOXXX_STR");
}

// XXXPORTFOLIOXXX_COMMENT
if(confirm("XXXPORTFOLIOXXX_STR")){
app.findGrepPreferences = NothingEnum.nothing;
app.changeGrepPreferences = NothingEnum.nothing;

app.findGrepPreferences.findWhat = "(^.*?)(~({2,})";
app.changeGrepPreferences.changeTo = "$1\\t";

var found7 = doc.changeGrep();
results.push("XXXPORTFOLIOXXX_STR" + found7.length + "XXXPORTFOLIOXXX_STR");

app.findGrepPreferences = NothingEnum.nothing;
app.changeGrepPreferences = NothingEnum.nothing;
} else {
results.push("XXXPORTFOLIOXXX_STR");
}

// XXXPORTFOLIOXXX_COMMENT
if(confirm("XXXPORTFOLIOXXX_STR")){
app.findGrepPreferences = NothingEnum.nothing;
app.changeGrepPreferences = NothingEnum.nothing;

app.findGrepPreferences.findWhat = "XXXPORTFOLIOXXX_STR";
app.changeGrepPreferences.changeTo = "$1~(~($3";

var found8 = doc.changeGrep();
results.push("XXXPORTFOLIOXXX_STR" + found8.length + "XXXPORTFOLIOXXX_STR");

app.findGrepPreferences = NothingEnum.nothing;
app.changeGrepPreferences = NothingEnum.nothing;
} else {
results.push("XXXPORTFOLIOXXX_STR");
}

// XXXPORTFOLIOXXX_COMMENT

// XXXPORTFOLIOXXX_COMMENT
app.findGrepPreferences = NothingEnum.nothing;
app.changeGrepPreferences = NothingEnum.nothing;

app.findGrepPreferences.findWhat = " +"; // XXXPORTFOLIOXXX_COMMENT
app.findGrepPreferences.appliedParagraphStyle = kuStyle;
app.changeGrepPreferences.changeTo = "";

var found7 = doc.changeGrep(); // XXXPORTFOLIOXXX_COMMENT
results.push("XXXPORTFOLIOXXX_STR" + found7.length + "XXXPORTFOLIOXXX_STR");

app.findGrepPreferences = NothingEnum.nothing;
app.changeGrepPreferences = NothingEnum.nothing;

// XXXPORTFOLIOXXX_COMMENT

// XXXPORTFOLIOXXX_COMMENT
if(confirm("XXXPORTFOLIOXXX_STR")){
app.findGrepPreferences = NothingEnum.nothing;
app.changeGrepPreferences = NothingEnum.nothing;

app.findGrepPreferences.findWhat = "XXXPORTFOLIOXXX_STR";

var found10 = doc.findGrep();
var convertCount = 0;

for(var j = 0; j < found10.length; j++){
try {
var text = found10[j].contents;
var halfText = convertToHalfWidth_1(text);
found10[j].contents = halfText;
convertCount++;
} catch(e){}
}

results.push("XXXPORTFOLIOXXX_STR" + convertCount + "XXXPORTFOLIOXXX_STR");

app.findGrepPreferences = NothingEnum.nothing;
app.changeGrepPreferences = NothingEnum.nothing;
} else {
results.push("XXXPORTFOLIOXXX_STR");
}

return results.join(" / ");

} catch(e){
throw new Error("XXXPORTFOLIOXXX_STR" + e.message);
}
}

// XXXPORTFOLIOXXX_COMMENT
function convertToHalfWidth_1(text){
var result = "";
for(var i = 0; i < text.length; i++){
var c = text.charAt(i);
var code = text.charCodeAt(i);

// XXXPORTFOLIOXXX_COMMENT
if(code >= 0xFF10 && code <= 0xFF19){
result += String.fromCharCode(code - 0xFEE0);
}
// XXXPORTFOLIOXXX_COMMENT
else if(code >= 0xFF21 && code <= 0xFF3A){
result += String.fromCharCode(code - 0xFEE0);
}
// XXXPORTFOLIOXXX_COMMENT
else if(code >= 0xFF41 && code <= 0xFF5A){
result += String.fromCharCode(code - 0xFEE0);
} else {
result += c;
}
}
return result;
}
// XXXPORTFOLIOXXX_COMMENT
// XXXPORTFOLIOXXX_COMMENT

function process_015(doc){
var results = [];

try {
// XXXPORTFOLIOXXX_COMMENT
var styleName = "XXXPORTFOLIOXXX_STR"; // XXXPORTFOLIOXXX_COMMENT
var style = doc.paragraphStyles.itemByName(styleName);

if(!style.isValid){
throw new Error("XXXPORTFOLIOXXX_STR" + styleName + "XXXPORTFOLIOXXX_STR");
}

for(var i = 0; i < doc.stories.length; i++){
doc.stories[i].paragraphs.everyItem().applyParagraphStyle(style, true);
}
results.push("XXXPORTFOLIOXXX_STR");

// XXXPORTFOLIOXXX_COMMENT
// XXXPORTFOLIOXXX_COMMENT
// XXXPORTFOLIOXXX_COMMENT
var styleComment = doc.paragraphStyles.itemByName("XXXPORTFOLIOXXX_STR"); // XXXPORTFOLIOXXX_COMMENT
if(!styleComment.isValid){
results.push("XXXPORTFOLIOXXX_STR");
} else {
app.findGrepPreferences = NothingEnum.nothing;
app.changeGrepPreferences = NothingEnum.nothing;

app.findGrepPreferences.findWhat = "XXXPORTFOLIOXXX_STR"; // XXXPORTFOLIOXXX_COMMENT
app.changeGrepPreferences.appliedParagraphStyle = styleComment;

var foundClub = doc.changeGrep();
results.push("XXXPORTFOLIOXXX_STR" + foundClub.length + "XXXPORTFOLIOXXX_STR");

app.findGrepPreferences = NothingEnum.nothing;
app.changeGrepPreferences = NothingEnum.nothing;
}
// XXXPORTFOLIOXXX_COMMENT

// XXXPORTFOLIOXXX_COMMENT

// XXXPORTFOLIOXXX_COMMENT
if(confirm("XXXPORTFOLIOXXX_STR")){
app.findGrepPreferences = NothingEnum.nothing;
app.changeGrepPreferences = NothingEnum.nothing;

app.findGrepPreferences.findWhat = "~(+";
app.changeGrepPreferences.changeTo = "~y";

var found1 = doc.changeGrep();
results.push("XXXPORTFOLIOXXX_STR" + found1.length + "XXXPORTFOLIOXXX_STR");

app.findGrepPreferences = NothingEnum.nothing;
app.changeGrepPreferences = NothingEnum.nothing;
} else {
results.push("XXXPORTFOLIOXXX_STR");
}

// XXXPORTFOLIOXXX_COMMENT
if(confirm("XXXPORTFOLIOXXX_STR")){
app.findGrepPreferences = NothingEnum.nothing;
app.changeGrepPreferences = NothingEnum.nothing;

app.findGrepPreferences.findWhat = " +";
app.changeGrepPreferences.changeTo = "";

var found2 = doc.changeGrep();
results.push("XXXPORTFOLIOXXX_STR" + found2.length + "XXXPORTFOLIOXXX_STR");

app.findGrepPreferences = NothingEnum.nothing;
app.changeGrepPreferences = NothingEnum.nothing;
} else {
results.push("XXXPORTFOLIOXXX_STR");
}

// XXXPORTFOLIOXXX_COMMENT

// XXXPORTFOLIOXXX_COMMENT
if(confirm("XXXPORTFOLIOXXX_STR")){
app.findGrepPreferences = NothingEnum.nothing;
app.changeGrepPreferences = NothingEnum.nothing;

// XXXPORTFOLIOXXX_COMMENT
app.findGrepPreferences.findWhat = "XXXPORTFOLIOXXX_STR";

var found3 = doc.findGrep();
var convertCount = 0;

for(var j = 0; j < found3.length; j++){
try {
var text = found3[j].contents;
var halfText = convertToHalfWidth_2(text);
found3[j].contents = halfText;
convertCount++;
} catch(e){}
}

results.push("XXXPORTFOLIOXXX_STR" + convertCount + "XXXPORTFOLIOXXX_STR");

app.findGrepPreferences = NothingEnum.nothing;
app.changeGrepPreferences = NothingEnum.nothing;
} else {
results.push("XXXPORTFOLIOXXX_STR");
}

return results.join(" / ");

} catch(e){
throw new Error("XXXPORTFOLIOXXX_STR" + e.message);
}
}

// XXXPORTFOLIOXXX_COMMENT
function convertToHalfWidth_2(text){
var result = "";
for(var i = 0; i < text.length; i++){
var c = text.charAt(i);
var code = text.charCodeAt(i);

// XXXPORTFOLIOXXX_COMMENT
if(code >= 0xFF10 && code <= 0xFF19){
result += String.fromCharCode(code - 0xFEE0);
}
// XXXPORTFOLIOXXX_COMMENT
else if(code >= 0xFF21 && code <= 0xFF3A){
result += String.fromCharCode(code - 0xFEE0);
}
// XXXPORTFOLIOXXX_COMMENT
else if(code >= 0xFF41 && code <= 0xFF5A){
result += String.fromCharCode(code - 0xFEE0);
} else {
result += c;
}
}
return result;
}
// XXXPORTFOLIOXXX_COMMENT
// XXXPORTFOLIOXXX_COMMENT

function process_016(doc){
var results = [];

try {
// XXXPORTFOLIOXXX_COMMENT
var styleName = "XXXPORTFOLIOXXX_STR"; // XXXPORTFOLIOXXX_COMMENT
var style = doc.paragraphStyles.itemByName(styleName);

if(!style.isValid){
throw new Error("XXXPORTFOLIOXXX_STR" + styleName + "XXXPORTFOLIOXXX_STR");
}

for(var i = 0; i < doc.stories.length; i++){
doc.stories[i].paragraphs.everyItem().applyParagraphStyle(style, true);
}
results.push("XXXPORTFOLIOXXX_STR");

// XXXPORTFOLIOXXX_COMMENT

// XXXPORTFOLIOXXX_COMMENT
app.findGrepPreferences = NothingEnum.nothing;
app.changeGrepPreferences = NothingEnum.nothing;

app.findGrepPreferences.findWhat = "\\r+";
app.changeGrepPreferences.changeTo = "\\r";

var found1 = doc.changeGrep();
results.push("XXXPORTFOLIOXXX_STR" + found1.length + "XXXPORTFOLIOXXX_STR");

app.findGrepPreferences = NothingEnum.nothing;
app.changeGrepPreferences = NothingEnum.nothing;

// XXXPORTFOLIOXXX_COMMENT
app.findGrepPreferences = NothingEnum.nothing;
app.changeGrepPreferences = NothingEnum.nothing;

app.findGrepPreferences.findWhat = " +";
app.changeGrepPreferences.changeTo = "";

var found2 = doc.changeGrep();
results.push("XXXPORTFOLIOXXX_STR" + found2.length + "XXXPORTFOLIOXXX_STR");

app.findGrepPreferences = NothingEnum.nothing;
app.changeGrepPreferences = NothingEnum.nothing;

// XXXPORTFOLIOXXX_COMMENT
// XXXPORTFOLIOXXX_COMMENT
// XXXPORTFOLIOXXX_COMMENT
app.findGrepPreferences = NothingEnum.nothing;
app.changeGrepPreferences = NothingEnum.nothing;

// XXXPORTFOLIOXXX_COMMENT
app.findGrepPreferences.findWhat = "XXXPORTFOLIOXXX_STR";
app.changeGrepPreferences.changeTo = "XXXPORTFOLIOXXX_STR";

var found_note = doc.changeGrep();
results.push("XXXPORTFOLIOXXX_STR" + found_note.length + "XXXPORTFOLIOXXX_STR");

app.findGrepPreferences = NothingEnum.nothing;
app.changeGrepPreferences = NothingEnum.nothing;
// XXXPORTFOLIOXXX_COMMENT

// XXXPORTFOLIOXXX_COMMENT

// XXXPORTFOLIOXXX_COMMENT
if(confirm("XXXPORTFOLIOXXX_STR")){
app.findGrepPreferences = NothingEnum.nothing;
app.changeGrepPreferences = NothingEnum.nothing;

app.findGrepPreferences.findWhat = "XXXPORTFOLIOXXX_STR";

var found3 = doc.findGrep();
var convertCount = 0;

for(var j = 0; j < found3.length; j++){
try {
var text = found3[j].contents;

// XXXPORTFOLIOXXX_COMMENT
if(text === "XXXPORTFOLIOXXX_STR"){
continue;
}

var halfText = convertToHalfWidth_3(text);
found3[j].contents = halfText;
convertCount++;
} catch(e){}
}

results.push("XXXPORTFOLIOXXX_STR" + convertCount + "XXXPORTFOLIOXXX_STR");

app.findGrepPreferences = NothingEnum.nothing;
app.changeGrepPreferences = NothingEnum.nothing;
} else {
results.push("XXXPORTFOLIOXXX_STR");
}

// XXXPORTFOLIOXXX_COMMENT
// XXXPORTFOLIOXXX_COMMENT
// XXXPORTFOLIOXXX_COMMENT
app.findGrepPreferences = NothingEnum.nothing;
app.changeGrepPreferences = NothingEnum.nothing;

// XXXPORTFOLIOXXX_COMMENT
// XXXPORTFOLIOXXX_COMMENT
app.findGrepPreferences.findWhat = "XXXPORTFOLIOXXX_STR";
app.changeGrepPreferences.changeTo = "XXXPORTFOLIOXXX_STR";

var found_note = doc.changeGrep();
results.push("XXXPORTFOLIOXXX_STR" + found_note.length + "XXXPORTFOLIOXXX_STR");

app.findGrepPreferences = NothingEnum.nothing;
app.changeGrepPreferences = NothingEnum.nothing;
// XXXPORTFOLIOXXX_COMMENT

return results.join(" / ");

} catch(e){
throw new Error("XXXPORTFOLIOXXX_STR" + e.message);
}
}

// XXXPORTFOLIOXXX_COMMENT
function convertToHalfWidth_3(text){
var result = "";
for(var i = 0; i < text.length; i++){
var c = text.charAt(i);
var code = text.charCodeAt(i);

// XXXPORTFOLIOXXX_COMMENT
if(code >= 0xFF10 && code <= 0xFF19){
result += String.fromCharCode(code - 0xFEE0);
}
// XXXPORTFOLIOXXX_COMMENT
else if(code >= 0xFF21 && code <= 0xFF3A){
result += String.fromCharCode(code - 0xFEE0);
}
// XXXPORTFOLIOXXX_COMMENT
else if(code >= 0xFF41 && code <= 0xFF5A){
result += String.fromCharCode(code - 0xFEE0);
} else {
result += c;
}
}
return result;
}

// XXXPORTFOLIOXXX_COMMENT


})();

