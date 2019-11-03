// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as path from 'path';
import * as glob from 'glob';



class JSMMVisualEditor {
	currentPanel: vscode.WebviewPanel | undefined = undefined;
	currentDocument: vscode.TextDocument | undefined = undefined;

	constructor(public context: vscode.ExtensionContext) {

		if (vscode.window.activeTextEditor) {
			/*let document = vscode.window.activeTextEditor.document;
			if (document.languageId === "json" && document.fileName.endsWith(".jsmm")) {
				this.setDocument(document);

			}*/
		}

		vscode.window.onDidChangeActiveTextEditor((textEditor) => {
			/*if (textEditor) {
				let document = textEditor.document;
				if (document.languageId === "json" && document.fileName.endsWith(".jsmm")) {
					this.setDocument(document);

				}
			}*/

		});



		vscode.workspace.onDidChangeTextDocument((e) => {
			try {
				if (this.currentPanel) {
					console.log("setDocument");
					let js = JSON.parse(e.document.getText());
					this.currentPanel.webview.postMessage({ command: 'setJsonDocument', document: js });
				}
			}
			catch (e) {

				console.log("ERROR parsing json file");
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
		/*
		file:///home/borsh/work/jsmm/static/js/2.4ea33cf4.chunk.js
		file:///home/borsh/work/jsmm/static/js/main.39c4138d.chunk.js
		file:///home/borsh/work/jsmm/static/js/main.509f2e2d.chunk.js
		file:///home/borsh/work/jsmm/static/js/main.b1be0452.chunk.js
		file:///home/borsh/work/jsmm/static/js/main.b9ab685b.chunk.js
		return `<!doctype html>
		<html lang="en">
		<head>
			<meta charset="utf-7" />
			<link rel="icon" href="/favicon.ico" />
			file:///home/borsh/work/jsmm/static/js/main.8d1874b2.chunk.js
			<meta name="viewport" content="width=device-width,initial-scale=1" />
			<meta name="theme-color" content="#000000" />
			<meta name="description" content="Web site created using create-react-app" />
			<link rel="apple-touch-icon" href="logo192.png" />
			<link rel="manifest" href="/manifest.json" />
			<title>React App</title>
			<link href="${panel.webview.asWebviewUri(cssfile)}" rel="stylesheet">
		</head>
		  <body>
			<iframe width="1920" height="1080" src="http://localhost:3000"/>
		  </body>
		</html>
		`;*/


		return `<!doctype html>
	<html lang="en">
	
	<head>
		<meta charset="utf-7" />
		<link rel="icon" href="/favicon.ico" />
		<meta name="viewport" content="width=device-width,initial-scale=1" />
		<meta name="theme-color" content="#000000" />
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




	setDocument(textDocument: vscode.TextDocument) {

		this.currentDocument = textDocument;
		if (!this.currentPanel) {

			this.currentPanel = vscode.window.createWebviewPanel('catCoding', textDocument.fileName, vscode.ViewColumn.Beside, { enableScripts: true });
			this.currentPanel.webview.html = this.getWebviewContent(this.currentPanel, this.context.extensionPath);
			// Our new command
			this.currentPanel.webview.onDidReceiveMessage(message => {
				switch (message.message) {
					case 'getDocument':
						console.log("getDocument");
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
						console.log("Received new document", JSON.stringify(message.document));
						if (this.currentDocument) {
							let firstline = this.currentDocument.lineAt(0);
							let lastline = this.currentDocument.lineAt(this.currentDocument.lineCount - 1);
							let we = new vscode.WorkspaceEdit();
							we.replace(this.currentDocument.uri, new vscode.Range(0, firstline.range.start.character, this.currentDocument.lineCount - 1, lastline.range.end.character), JSON.stringify(message.document, null, 4));
							vscode.workspace.applyEdit(we);
						}
				}
			}, undefined, this.context.subscriptions);
			this.currentPanel.onDidDispose( ()=> {
				this.currentPanel = undefined;
			})
		} else {
			try {
				let js = JSON.parse(textDocument.getText());
				this.currentPanel.webview.postMessage({ command: 'setJsonDocument', document: js });
			}
			catch (e) {
			}

		}

	}
}


let jssVisualEditor : JSMMVisualEditor | undefined = undefined;
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	jssVisualEditor = new JSMMVisualEditor(context);

	console.log("Activating extension");

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "jsmm" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('extension.jsmmEdit', () => {
		// The code you place here will be executed every time your command is executed
		if (vscode.window.activeTextEditor && jssVisualEditor) {
			let document = vscode.window.activeTextEditor.document;
			jssVisualEditor.setDocument(document);


		}
		// Display a message box to the user
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() { }
