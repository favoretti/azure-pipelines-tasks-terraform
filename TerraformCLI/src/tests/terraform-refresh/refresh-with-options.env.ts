const terraformCommand: string = "refresh";
const commandOptions:string = "-input=true -lock=false -no-color"
const expectedCommand: string = `${terraformCommand} ${commandOptions}`

export let env: any = {
    taskScenarioPath:       require.resolve('./refresh-with-options'),
    terraformCommand:       terraformCommand,
    commandOptions:         commandOptions,
    expectedCommand:        expectedCommand
}