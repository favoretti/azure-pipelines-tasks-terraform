import tasks = require("azure-pipelines-task-lib/task");
import { TerraformCommand, TerraformInterfaces, ITaskAgent, ILogger } from "./terraform";
import { IHandleCommandString } from "./command-handler";
import { injectable, inject } from "inversify";
import { TerraformRunner } from "./terraform-runner";

export class TerraformRefresh extends TerraformCommand{
    readonly secureVarsFile: string | undefined;
    constructor(
        name: string, 
        workingDirectory: string,
        options?: string, 
        secureVarsFile?: string) {
        super(name, workingDirectory, options);
        this.secureVarsFile = secureVarsFile;
    }
}

@injectable()
export class TerraformRefreshHandler implements IHandleCommandString{
    private readonly taskAgent: ITaskAgent;
    private readonly log: ILogger;

    constructor(
        @inject(TerraformInterfaces.ITaskAgent) taskAgent: ITaskAgent,
        @inject(TerraformInterfaces.ILogger) log: ILogger
    ) {
        this.taskAgent = taskAgent; 
        this.log = log;
    }

    public async execute(command: string): Promise<number> {
        let validate = new TerraformRefresh(
            command,
            tasks.getInput("workingDirectory"),
            tasks.getInput("commandOptions"),
            tasks.getInput("secureVarsFile")
        );

        let loggedProps = {
            "secureVarsFileDefined": validate.secureVarsFile !== undefined && validate.secureVarsFile !== '' && validate.secureVarsFile !== null,
            "commandOptionsDefined": validate.options !== undefined && validate.options !== '' && validate.options !== null
        }        
        
        return this.log.command(validate, (command: TerraformRefresh) => this.onExecute(command), loggedProps);
    }

    private async onExecute(command: TerraformRefresh): Promise<number> {
        return new TerraformRunner(command)
            .withSecureVarsFile(this.taskAgent, command.secureVarsFile)
            .exec();
    }
}