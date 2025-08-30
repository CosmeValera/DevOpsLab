import jenkins.model.*
import org.jenkinsci.plugins.workflow.job.WorkflowJob
import org.jenkinsci.plugins.workflow.cps.CpsScmFlowDefinition
import hudson.plugins.git.*

// Get Jenkins instance
def jenkins = Jenkins.get()

def jobName = "MySCMPipeline"
def job = jenkins.getItem(jobName)

if (job == null) {
    println "--> Creating pipeline job '${jobName}'"

    job = jenkins.createProject(WorkflowJob, jobName)

    // Define SCM (Git)
    def scm = new GitSCM("https://github.com/CosmeValera/DevOpsLab")
    scm.branches = [new BranchSpec("*/dev")]
    scm.doGenerateSubmoduleConfigurations = false

    // Pipeline definition from SCM
    def flowDefinition = new CpsScmFlowDefinition(scm, "jenkins/Jenkinsfile")
    flowDefinition.setLightweight(true)

    job.setDefinition(flowDefinition)
    job.save()

    println "--> Pipeline job '${jobName}' created"
} else {
    println "--> Pipeline job '${jobName}' already exists, skipping creation"
}
