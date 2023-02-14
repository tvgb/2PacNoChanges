// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { GitExtension } from './api/git';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	const git = getGitExtension();

	if (!git) {
		vscode.window.showErrorMessage('Git extension not found.');
		return;
	}

	const repo = git.getRepository(vscode.workspace.workspaceFolders![0].uri);

	if (!repo) {
		vscode.window.showErrorMessage('Git repository not found.');
		return;
	}

	const changes = repo.state.workingTreeChanges;

	if (changes.length === 0) {
		vscode.window.showErrorMessage('No changes found.');
		return;
	}

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "2pacnochanges" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('2pacnochanges.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from 2PacNoChanges!');
	});

	context.subscriptions.push(disposable);
}

function getGitExtension() {
    const vscodeGit = vscode.extensions.getExtension<GitExtension>('vscode.git');
    const gitExtension = vscodeGit && vscodeGit.exports;
    return gitExtension && gitExtension.getAPI(1);
}

// This method is called when your extension is deactivated
export function deactivate() {}
