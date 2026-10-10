/**
 * Art by Nuella: email a copy of every quote request.
 * Bound to the Google Form (Form editor > three dots > Script editor).
 *
 * One-time setup:
 *  1. Paste this file into the script editor and save.
 *  2. Run setup() once and click Allow on the consent screen (lets the script read form responses and send email).
 *  3. Done. Every new response is emailed to NOTIFY_TO.
 */
var NOTIFY_TO = ['artbynuella@gmail.com']; // add more addresses if wanted

function setup() {
  var form = FormApp.getActiveForm();
  ScriptApp.getProjectTriggers().forEach(function (t) { ScriptApp.deleteTrigger(t); });
  ScriptApp.newTrigger('notify').forForm(form).onFormSubmit().create();
}

function notify(e) {
  var items = e.response.getItemResponses();
  var get = function (title) {
    for (var i = 0; i < items.length; i++) if (items[i].getItem().getTitle() === title) return String(items[i].getResponse());
    return '';
  };
  var name = get('Name') || 'someone';
  var type = get('Project type');
  var body = items.map(function (it) { return it.getItem().getTitle() + ': ' + it.getResponse(); }).join('\n');
  MailApp.sendEmail({
    to: NOTIFY_TO.join(','),
    subject: 'New quote request from ' + name + (type ? ' (' + type + ')' : ''),
    body: body + '\n\nAll responses: ' + FormApp.getActiveForm().getEditUrl().replace('/edit', '/edit#responses')
  });
}
