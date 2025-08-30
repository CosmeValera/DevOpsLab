import jenkins.model.*
import org.jenkinsci.plugins.workflow.job.WorkflowJob
import org.jenkinsci.plugins.workflow.cps.CpsScmFlowDefinition
import hudson.plugins.git.*

// Jenkins instance
def jenkins = Jenkins.get()

// Repo + branch config
def repoUrl = "https://github.com/CosmeValera/DevOpsLab"
def branchSpec = "*/dev"

// Map of jobName -> Jenkinsfile path
def pipelines = [
    "MasterPipeline"    : "jenkins/master.Jenkinsfile",
    "DockerPipeline"    : "jenkins/docker.Jenkinsfile",
    "KubernetesPipeline": "jenkins/k8s.Jenkinsfile",
    "KustomizePipeline" : "jenkins/kustomize.Jenkinsfile",
    "HelmPipeline"      : "jenkins/helm.Jenkinsfile"
]

pipelines.each { jobName, jenkinsfilePath ->
    def job = jenkins.getItem(jobName)

    if (job == null) {
        println "--> Creating pipeline job '${jobName}'"

        job = jenkins.createProject(WorkflowJob, jobName)

        // Define SCM (Git)
        def scm = new GitSCM(repoUrl)
        scm.branches = [new BranchSpec(branchSpec)]
        scm.doGenerateSubmoduleConfigurations = false

        // Pipeline definition from SCM
        def flowDefinition = new CpsScmFlowDefinition(scm, jenkinsfilePath)
        flowDefinition.setLightweight(true)

        job.setDefinition(flowDefinition)
        job.save()

        println "--> Pipeline job '${jobName}' created"
    } else {
        println "--> Pipeline job '${jobName}' already exists, skipping creation"
    }
}
