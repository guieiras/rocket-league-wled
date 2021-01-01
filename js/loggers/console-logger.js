class ConsoleLogger {
  info(namespace, message) {
    console.log(`${new Date().toISOString()}: [${namespace}] ${message}`)
  }
}
