class TextAreaLogger {
  constructor(textArea) {
    this.textArea = textArea;
  }

  info(namespace, message) {
    this.textArea.value += `${new Date().toISOString()}: [${namespace}] ${message}` + '\n'
  }
}
