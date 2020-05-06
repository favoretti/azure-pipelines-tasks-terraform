import { TaskScenario } from '../scenarios';
import { TerraformInputs } from '../scenarios-terraform';
import '../scenarios-terraform';
import { env } from './refresh-with-secure-var-file.env';

export let refreshWithNoArgs = new TaskScenario<TerraformInputs>()
    .inputTerraformCommand(env.terraformCommand)
    .inputTerraformSecureVarsFile(env.secureVarsFileId, env.secureVarsFileName)
    .inputApplicationInsightsInstrumentationKey()    
    .answerTerraformExists()
    .answerTerraformCommandIsSuccessful(env.commandOptions)
    .run();

