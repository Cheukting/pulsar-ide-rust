const cp = require('child_process');
const { shell } = require("electron");
const {AutoLanguageClient} = require('@savetheclocktower/atom-languageclient')

const PACKAGE_NAME = require('../package.json').name;

class RustClient extends AutoLanguageClient {

  constructor () {
    // enable debug output
    // atom.config.set('core.debugLSP', true);
    super();
  }
  getGrammarScopes () { return ['source.rust', 'rust']; }
  getLanguageName () { return 'Rust'; }
  getServerName () { return 'rust-analyzer'; }
  getPackageName() { return PACKAGE_NAME; }

  startServerProcess (projectPath) {
    const config = atom.config.get(PACKAGE_NAME);

    const platform = { 'linux': 'linux', 'darwin': 'mac', 'win32': 'windows' }[process.platform];
    if (platform == null) {
      throw Error (`${this.getServerName()} not supported on ${process.platform}`);
    }

    const rawArgs = config.commandArguments;
    let args = []
    if (config.commandArguments && config.commandArguments.length > 0) {
      args = config.commandArguments.split(',');
    }

    const childProcess = cp.spawn(config.rustAnalyzerCommand, {cwd: projectPath});

    childProcess.on("error", err =>
      atom.notifications.addError(
        "Unable to start the rust-analyzer language server.",
        {
          dismissable: true,
          buttons: [
            {
              text: "View README",
              onDidClick: () =>
                shell.openExternal("https://github.com/Cheukting/pulsar-ide-rust")
            },
            {
              text: "Download rust-analyzer",
              onDidClick: () =>
                shell.openExternal("https://rust-analyzer.github.io/manual.html#installation")
            }
          ],
          description:
            "This can occur if you do not have rust-analyzer  installed or if it is not in your path.\n\nViewing the README is strongly recommended."
        }
      )
    );

    return childProcess;
  }
}

module.exports = new RustClient();

module.exports.config = {
  rustAnalyzerCommand: {
    type: 'string',
    title: 'rust-analyzer executable',
    description: 'Specify the location of rust-analyzer if it is not in your $PATH. Reload or restart to take effect',
    default: 'rust-analyzer'
  },
  commandArguments: {
    type: 'string',
    title: 'Command-line arguments',
    description: 'Specify arguments passed to rust-analyzer  at launch, separated by comma (`,`). Format as `-arg1=value1,-arg2=value2`. Reload or restart to take effect',
    default: ''
  }
};
