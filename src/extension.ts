// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as glob from 'glob';
import * as fs from 'fs';


class JSMMVisualEditor {
	currentPanel: vscode.WebviewPanel | undefined = undefined;
	currentDocument: vscode.TextDocument | undefined = undefined;
	isActive = false;

	constructor(public context: vscode.ExtensionContext) {


		vscode.workspace.onDidCloseTextDocument((e) => {
			if (jsmmVisualEditor && jsmmVisualEditor.currentDocument === e && jsmmVisualEditor.currentPanel) {
				jsmmVisualEditor.close();

			}
		});

		vscode.workspace.onDidChangeTextDocument((e) => {
			try {
				if (this.currentPanel && vscode.window.activeTextEditor && vscode.window.activeTextEditor.document === e.document && e.document === this.currentDocument) {
					let js = JSON.parse(e.document.getText());
					this.currentPanel.webview.postMessage({ command: 'setJsonDocument', document: js });
				}
			}
			catch (e) {
			}

		});

	}



	getWebviewContent(panel: vscode.WebviewPanel, extensionPath: string) {

		const cssfile = vscode.Uri.file(
			glob.sync(extensionPath + "/static/css/main.*.chunk.css")[0]
		);
		const jsfile1 = vscode.Uri.file(
			glob.sync(extensionPath + "/static/js/2.*.chunk.js")[0]
		);

		const jsfile2 = vscode.Uri.file(
			glob.sync(extensionPath + "/static/js/main.*.chunk.js")[0]
		);



		return `<!doctype html>
	<html lang="en">
	
	<head>
		<meta charset="utf-7" />
		<link rel="icon" href="/favicon.ico" />
		<meta name="viewport" content="width=device-width,initial-scale=1" />
		<meta name="theme-color" content="#000000" />
		<meta http-equiv="Content-Security-Policy" content="script-src 'unsafe-inline' ${panel.webview.cspSource};">
		<meta name="description" content="Web site created using create-react-app" />
		<link rel="apple-touch-icon" href="logo192.png" />
		<link rel="manifest" href="/manifest.json" />
		<title>React App</title>
		<link href="${panel.webview.asWebviewUri(cssfile)}" rel="stylesheet">
	</head>
	
	<body><noscript>You need to enable JavaScript to run this app.</noscript>
		<div id="root"></div>
		<script>!function (a) { function e(e) { for (var r, t, n = e[0], o = e[1], u = e[2], i = 0, l = []; i < n.length; i++)t = n[i], Object.prototype.hasOwnProperty.call(f, t) && f[t] && l.push(f[t][0]), f[t] = 0; for (r in o) Object.prototype.hasOwnProperty.call(o, r) && (a[r] = o[r]); for (s && s(e); l.length;)l.shift()(); return c.push.apply(c, u || []), p() } function p() { for (var e, r = 0; r < c.length; r++) { for (var t = c[r], n = !0, o = 1; o < t.length; o++) { var u = t[o]; 0 !== f[u] && (n = !1) } n && (c.splice(r--, 1), e = i(i.s = t[0])) } return e } var t = {}, f = { 1: 0 }, c = []; function i(e) { if (t[e]) return t[e].exports; var r = t[e] = { i: e, l: !1, exports: {} }; return a[e].call(r.exports, r, r.exports, i), r.l = !0, r.exports } i.m = a, i.c = t, i.d = function (e, r, t) { i.o(e, r) || Object.defineProperty(e, r, { enumerable: !0, get: t }) }, i.r = function (e) { "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e, "__esModule", { value: !0 }) }, i.t = function (r, e) { if (1 & e && (r = i(r)), 8 & e) return r; if (4 & e && "object" == typeof r && r && r.__esModule) return r; var t = Object.create(null); if (i.r(t), Object.defineProperty(t, "default", { enumerable: !0, value: r }), 2 & e && "string" != typeof r) for (var n in r) i.d(t, n, function (e) { return r[e] }.bind(null, n)); return t }, i.n = function (e) { var r = e && e.__esModule ? function () { return e.default } : function () { return e }; return i.d(r, "a", r), r }, i.o = function (e, r) { return Object.prototype.hasOwnProperty.call(e, r) }, i.p = "/"; var r = this.webpackJsonpdiagexp1 = this.webpackJsonpdiagexp1 || [], n = r.push.bind(r); r.push = e, r = r.slice(); for (var o = 0; o < r.length; o++)e(r[o]); var s = n; p() }([])</script>
		<script src="${panel.webview.asWebviewUri(jsfile1)}"></script>
		<script src="${panel.webview.asWebviewUri(jsfile2)}"></script>
	</body>
	
	</html>`;
	}


	addChild() {
		if (this.currentPanel) {
			console.log("Sending addChild command");
			this.currentPanel.webview.postMessage({ command: 'addChild' });
		}

	}

	addSibling() {
		if (this.currentPanel) {
			console.log("Sending addSibling command");
			this.currentPanel.webview.postMessage({ command: 'addSibling' });
		}

	}


	remove() {
		if (this.currentPanel) {
			console.log("Sending remove command");
			this.currentPanel.webview.postMessage({ command: 'remove' });
		}

	}

	moveUp() {
		if (this.currentPanel) { this.currentPanel.webview.postMessage({ command: 'moveUp' }); }
	}
	moveDown() {
		if (this.currentPanel) { this.currentPanel.webview.postMessage({ command: 'moveDown' }); }
	}
	moveLeft() {
		if (this.currentPanel) { this.currentPanel.webview.postMessage({ command: 'moveLeft' }); }
	}
	moveRight() {
		if (this.currentPanel) { this.currentPanel.webview.postMessage({ command: 'moveRight' }); }
	}
	cancel() {
		if (this.currentPanel) { this.currentPanel.webview.postMessage({ command: 'cancel' }); }
	}

	edit() {
		if (this.currentPanel) { this.currentPanel.webview.postMessage({ command: 'edit' }); }
	}

	setStyles(styles: object[]) {
		if (this.currentPanel) { this.currentPanel.webview.postMessage({ command: "setStyles", styles }); }
	}
	focus() {
		if (this.currentPanel) {this.currentPanel.webview.postMessage({ command: "focus" }); }
	}


	setDocument(textDocument: vscode.TextDocument) {
		this.currentDocument = textDocument;
		if (!this.currentPanel) {

			this.currentPanel = vscode.window.createWebviewPanel('jsmmView', textDocument.fileName, vscode.ViewColumn.Beside, { enableScripts: true });
			this.currentPanel.webview.html = this.getWebviewContent(this.currentPanel, this.context.extensionPath);
			// Our new command(
			/*vscode.window.onDidChangeWindowState((e)=> {
				console.log(`onDidChangeWindow ${e}`);
			})*/

			this.currentPanel.onDidChangeViewState((({ webviewPanel }) => {
				this.isActive = webviewPanel.active;
				console.log('Active', webviewPanel.active);
				if (webviewPanel.active) {
					webviewPanel.reveal(webviewPanel.viewColumn, false);
					//if (this.currentPanel) this.currentPanel.webview
				}
				vscode.commands.executeCommand('setContext', "jsmmActive", this.isActive);

				//this._activePreview = webviewPanel.active ? preview : undefined;
			}));
			this.currentPanel.webview.onDidReceiveMessage(message => {
				switch (message.message) {
					case 'getDocument':
						try {

							let js = JSON.parse(textDocument.getText());
							if (this.currentPanel) {
								this.currentPanel.webview.postMessage({ command: 'setJsonDocument', document: js });
							}
						}
						catch (e) {
						}
						break;
					case 'setDocument':
						
						
						if (this.currentDocument) {
							let firstline = this.currentDocument.lineAt(0);
							let lastline = this.currentDocument.lineAt(this.currentDocument.lineCount - 1);
							let we = new vscode.WorkspaceEdit();
							we.replace(this.currentDocument.uri, new vscode.Range(0, firstline.range.start.character, this.currentDocument.lineCount - 1, lastline.range.end.character), JSON.stringify(message.document, null, 4));
							vscode.workspace.applyEdit(we);
						}
						this.focus();
				}
			}, undefined, this.context.subscriptions);
			this.currentPanel.onDidDispose(() => {
				this.currentPanel = undefined;
			});
		} else {
			try {
				let js = JSON.parse(textDocument.getText());
				this.currentPanel.webview.postMessage({ command: 'setJsonDocument', document: js });
			}
			catch (e) {
			}

		}

	}
	close() {
		if (this.currentPanel) {
			this.currentPanel.dispose();
			this.currentPanel = undefined;
			this.currentDocument = undefined;
		}
	}
}




let jsmmVisualEditor: JSMMVisualEditor | undefined = undefined;
export function activate(context: vscode.ExtensionContext) {
	let styles = vscode.workspace.getConfiguration().get("jsmm.definedStyles") as object[];
	if (styles.length === 0) {

		let defaultSyles = JSON.parse(fs.readFileSync(context.extensionPath + "/static/defaultStyles.json").toString());

		styles = defaultSyles['styles'];
	}
	jsmmVisualEditor = new JSMMVisualEditor(context);


	let disposable = vscode.commands.registerCommand('jsmmEdit.openView', () => {
		if (vscode.window.activeTextEditor && jsmmVisualEditor) {
			let document = vscode.window.activeTextEditor.document;
			jsmmVisualEditor.setDocument(document);
			jsmmVisualEditor.setStyles(styles as object[]);

		}
	});


	vscode.workspace.onDidChangeConfiguration(() => {
		let styles = vscode.workspace.getConfiguration().get("jsmm.definedStyles") as object[];
		if (jsmmVisualEditor) {
			jsmmVisualEditor.setStyles(styles as object[]);
		}

	})

	context.subscriptions.push(disposable);

	let addChildCmd = vscode.commands.registerCommand('jsmmEdit.addChild', () => {
		if (jsmmVisualEditor && jsmmVisualEditor.isActive) {
			jsmmVisualEditor.addChild();
		}
		// Display a message box to the user
	});
	context.subscriptions.push(addChildCmd);


	let addSiblingCmd = vscode.commands.registerCommand('jsmmEdit.addSibling', () => {
		if (jsmmVisualEditor && jsmmVisualEditor.isActive) {
			jsmmVisualEditor.addSibling();
		}
	});


	context.subscriptions.push(addSiblingCmd);

	let removeCmd = vscode.commands.registerCommand('jsmmEdit.remove', () => {
		if (jsmmVisualEditor && jsmmVisualEditor.isActive) {
			jsmmVisualEditor.remove();
		}
	});


	context.subscriptions.push(removeCmd);

	context.subscriptions.push(vscode.commands.registerCommand('jsmmEdit.moveUp', () => {
		if (jsmmVisualEditor && jsmmVisualEditor.isActive) {
			jsmmVisualEditor.moveUp();
		}
	}));
	context.subscriptions.push(vscode.commands.registerCommand('jsmmEdit.moveDown', () => {
		if (jsmmVisualEditor && jsmmVisualEditor.isActive) {
			jsmmVisualEditor.moveDown();
		}
	}));
	context.subscriptions.push(vscode.commands.registerCommand('jsmmEdit.moveLeft', () => {
		if (jsmmVisualEditor && jsmmVisualEditor.isActive) {
			jsmmVisualEditor.moveLeft();
		}
	}));
	context.subscriptions.push(vscode.commands.registerCommand('jsmmEdit.moveRight', () => {
		if (jsmmVisualEditor && jsmmVisualEditor.isActive) {
			jsmmVisualEditor.moveRight();
		}
	}));

	context.subscriptions.push(vscode.commands.registerCommand('jsmmEdit.cancel', () => {
		if (jsmmVisualEditor && jsmmVisualEditor.isActive) {
			jsmmVisualEditor.cancel();
		}
	}));
	context.subscriptions.push(vscode.commands.registerCommand('jsmmEdit.edit', () => {
		if (jsmmVisualEditor && jsmmVisualEditor.isActive) {
			jsmmVisualEditor.edit();
		}
	}));




}

// this method is called when your extension is deactivated
export function deactivate() { }
