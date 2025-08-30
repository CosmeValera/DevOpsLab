import jenkins.model.*
import org.jenkinsci.plugins.workflow.job.WorkflowJob
import org.jenkinsci.plugins.workflow.cps.CpsFlowDefinition

def jenkins = Jenkins.instance

// Create a Pipeline job called "MyPipeline"
def jobName = "MyPipeline"
def job = jenkins.getItem(jobName)
if (job == null) {
    job = new WorkflowJob(jenkins, jobName)
    def pipelineScript = """
pipeline {
    agent any
    
    stages {
        stage ("TEST") {
            steps {
                echo "Hello World!"
            }
        }
    }
}
"""
    job.setDefinition(new CpsFlowDefinition(pipelineScript, true))
    jenkins.add(job, jobName)
    job.save()
    println("Created pipeline job: ${jobName}")
} else {
    println("Pipeline job '${jobName}' already exists, skipping creation.")
}
