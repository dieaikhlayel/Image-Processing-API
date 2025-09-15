// src/tests/helpers/reporter.ts
const { DisplayProcessor, SpecReporter, StacktraceOption } = require('jasmine-spec-reporter');

/**
 * CustomProcessor
 * ----------------
 * Extends the default DisplayProcessor to customize how Jasmine messages
 * (like "Jasmine started") are shown in the console.
 */
class CustomProcessor extends DisplayProcessor {
  // Override the displayJasmineStarted method
  // This runs when Jasmine test execution begins
  public displayJasmineStarted(info: jasmine.SuiteInfo, log: string): string {
    // Add "TypeScript" prefix to the default Jasmine start message
    return `TypeScript ${log}`;
  }
}

// Export a setup function for Jasmine to call
module.exports.setupReporter = function () {
  // Remove any default reporters Jasmine has set up
  jasmine.getEnv().clearReporters();

  // Add our custom SpecReporter with configuration
  jasmine.getEnv().addReporter(
    new SpecReporter({
      // Configure how specs (tests) are displayed
      spec: {
        // Don’t show stack traces for failed specs in the console
        displayStacktrace: StacktraceOption.NONE
      },
      // Add our custom processor to tweak the output
      customProcessors: [CustomProcessor]
    })
  );
};