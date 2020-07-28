define(['bslGlobals', 'bslMetadata', 'snippets', 'bsl_language', 'vs/editor/editor.main', 'actions'], function () {

  selectionText = '';
  engLang = false;

  sendEvent = function(eventName, eventParams) {

    let lastEvent = new MouseEvent('click');
    lastEvent.eventData1C = {event : eventName, params: eventParams};
    return dispatchEvent(lastEvent);
    
  }

  setText = function(txt, range) {

    let insertRange = range ? range : monaco.Range.fromPositions(editor.getPosition());    
    let operation = {
      range: insertRange,
      text: txt,
      forceMoveMarkers: true
    };
    editor.executeEdits(txt, [operation]);

  }

  eraseText = function () {
    
    setText('', editor.getModel().getFullModelRange());    

  }

  getText = function(txt) {

    return editor.getValue();

  }

  getQuery = function () {

    let bsl = new bslHelper(editor.getModel(), editor.getPosition());		
    return bsl.getQuery();

  }

  getFormatString = function () {

    let bsl = new bslHelper(editor.getModel(), editor.getPosition());		
    return bsl.getFormatString();

  }

  updateMetadata = function (metadata) {
        
    return bslHelper.updateMetadata(metadata);    

  }

  updateSnippets = function (snips, replace = false) {
        
    return bslHelper.updateSnippets(snips, replace);    

  }

  updateCustomFunctions = function (data) {
        
    return bslHelper.updateCustomFunctions(data);

  }

  setTheme = function (theme) {
        
    monaco.editor.setTheme(theme);    

  }

  setReadOnly = function (readOnly) {

    editor.updateOptions({ readOnly: readOnly })
    
  }

  switchLang = function () {
    engLang = !engLang;
  }

  // Register a new language
  monaco.languages.register({ id: language.id });

  // Register a tokens provider for the language
  monaco.languages.setMonarchTokensProvider(language.id, language.rules);


  // Register a completion item provider for the new language
  monaco.languages.registerCompletionItemProvider(language.id, {

    triggerCharacters: [' ', '.', '"'],

    provideCompletionItems: function (model, position) {
      let bsl = new bslHelper(model, position);
      return bsl.getCompletition();
    }

  });

  monaco.languages.registerFoldingRangeProvider(language.id, {

    provideFoldingRanges: function (model, context, token) {
      return bslHelper.getFoldingRanges(model);
    }

  });

  monaco.languages.registerSignatureHelpProvider(language.id, {

    signatureHelpTriggerCharacters: ['(', ','],
    signatureHelpRetriggerCharacters: [')'],

    provideSignatureHelp: (model, position) => {
      let bsl = new bslHelper(model, position);
      return bsl.getSigHelp();
    }

  });

  monaco.languages.registerHoverProvider(language.id, {

    provideHover: function (model, position) {      
      let bsl = new bslHelper(model, position);
      return bsl.getHover();
    }

  });  

  for (const [key, value] of Object.entries(language.themes)) {
    monaco.editor.defineTheme(value.name, value);
    monaco.editor.setTheme(value.name);
  }

  editor = monaco.editor.create(document.getElementById("container"), {
    theme: "bsl-white",
    value: getCode(),
    language: language.id,
    contextmenu: true
  });
  
  for (const [action_id, action] of Object.entries(actions)) {
    editor.addAction({
      id: action_id,
      label: action.label,
      keybindings: [action.key, action.cmd],
      precondition: null,
      keybindingContext: null,
      contextMenuGroupId: 'navigation',
      contextMenuOrder: action.order,
      run: action.callback
    });

  }

});