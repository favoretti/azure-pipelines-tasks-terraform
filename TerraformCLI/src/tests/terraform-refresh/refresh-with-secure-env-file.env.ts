const terraformCommand: string = "refresh";
const secureVarsFileId: string = "6b4ef608-ca4c-4185-92fb-0554b8a2ec72"
const secureVarsFileName: string = "./.bin/tests/terraform-refresh/default.env";
const expectedCommand: string = `${terraformCommand}`

export let env: any = {
    taskScenarioPath: require.resolve('./refresh-with-secure-env-file'),
    terraformCommand,
    secureVarsFileId,
    secureVarsFileName,
    expectedCommand
}