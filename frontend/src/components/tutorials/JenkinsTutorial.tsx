import React from "react";
import { Settings, Info, AlertTriangle, CheckCircle, Play, GitBranch, Globe, FileText, Package, Zap } from "lucide-react";
import TutorialLayout from "./TutorialLayout";
import CrossReferenceLinks from "../shared/CrossReferenceLinks";
import VideoResource from "../shared/VideoResource";

const JenkinsTutorial: React.FC = () => {
  const crossReferenceLinks = [
    {
      title: "Jenkins Configuration",
      path: "/jenkins",
      description: "Set up and configure Jenkins for this application with detailed configuration steps",
      icon: Zap,
      type: 'page' as const
    }
  ];

  return (
    <TutorialLayout
      title="Jenkins CI/CD"
      description="Automate your development workflow"
      estimatedReadingTime="5 minutes"
      prerequisites="Git basics"
      currentTutorial="jenkins"
      customNextSteps={
        <CrossReferenceLinks 
          title="Ready to Configure?"
          links={crossReferenceLinks as any}
        />
      }
    >
      <div className="tutorial-section">
        <h2>What is Jenkins?</h2>
        <p>
          Jenkins is an open-source automation server that enables developers to build, test, and deploy applications 
          automatically. It's the leading automation server for continuous integration (CI) and continuous deployment (CD), 
          helping teams deliver software faster and more reliably.
        </p>
        
        <div className="info-box">
          <Info size={20} />
          <div>
            <h4>Why Jenkins?</h4>
            <p>
              Jenkins provides a robust, extensible platform for automating your entire software delivery pipeline. 
              With thousands of plugins available, it can integrate with virtually any tool in your development ecosystem.
            </p>
          </div>
        </div>
      </div>

      <div className="tutorial-section">
        <h2>Core Concepts</h2>
        
        <div className="concept-grid">
          <div className="concept-card">
            <div className="concept-card__icon">
              <Play size={24} />
            </div>
            <h3>Pipeline</h3>
            <p>
              A suite of plugins that supports implementing CI/CD pipelines as code. Pipelines define the entire 
              workflow from code commit to production deployment.
            </p>
          </div>
          
          <div className="concept-card">
            <div className="concept-card__icon">
              <Settings size={24} />
            </div>
            <h3>Job</h3>
            <p>
              A runnable task that Jenkins can execute. Jobs can be freestyle projects, pipelines, or other 
              types of automation tasks.
            </p>
          </div>
          
          <div className="concept-card">
            <div className="concept-card__icon">
              <GitBranch size={24} />
            </div>
            <h3>Build</h3>
            <p>
              A single execution of a job with specific parameters. Each build has a unique number and can 
              be tracked, logged, and archived.
            </p>
          </div>
        </div>
      </div>

      <div className="tutorial-section">
        <h2>Pipeline Types</h2>
        
        <p>
          Jenkins supports different ways to define your automation. The most common and recommended approach is 
          the Declarative Pipeline.
        </p>

        <div className="concept-grid">
          <div className="concept-card">
            <div className="concept-card__icon">
              <FileText size={24} />
            </div>
            <h3>Declarative Pipeline</h3>
            <p>
              The recommended approach. Uses a simple, structured syntax that's easy to read and write. 
              Perfect for most automation needs.
            </p>
          </div>
          
          <div className="concept-card">
            <div className="concept-card__icon">
              <Settings size={24} />
            </div>
            <h3>Freestyle Jobs</h3>
            <p>
              Traditional Jenkins jobs configured through the web interface. Good for simple tasks but 
              harder to version control and share.
            </p>
          </div>
        </div>
      </div>

      <div className="tutorial-section">
        <h2>Creating Your First Pipeline</h2>
        
        <p>
          A Jenkins pipeline is defined in a file called Jenkinsfile. Here's a simple example that shows the basic structure:
        </p>

        <div className="code-example">
          <h4>Simple Jenkinsfile</h4>
          <pre className="code-block">
{`pipeline {
    agent any
    
    stages {
        stage('Install') {
            steps {
                echo 'Installing the application...'
                sh 'npm install'
            }
        }
        
        stage('Test') {
            steps {
                echo 'Running tests...'
                sh 'npm test'
            }
        }
        
        stage('Create image') {
            steps {
                echo 'Creating image...'
                sh 'docker build -t myapp .'
            }
        }
    }
}`}
          </pre>
        </div>

        <div className="info-box">
          <Info size={20} />
          <div>
            <h4>Pipeline Structure</h4>
            <p>
              <strong>agent any:</strong> Run on any available Jenkins agent<br/>
              <strong>stages:</strong> Define the steps of your pipeline<br/>
              <strong>steps:</strong> The actual commands to run in each stage
            </p>
          </div>
        </div>
      </div>

      <div className="tutorial-section">
        <h2>Understanding Jenkinsfiles</h2>
        
        <p>
          A Jenkinsfile is a text file that defines your pipeline. It's stored in your code repository 
          and version controlled along with your application code.
        </p>

        <div className="info-box">
          <Info size={20} />
          <div>
            <h4>Key Benefits</h4>
            <p>
              <strong>Version Control:</strong> Your pipeline is stored with your code<br/>
              <strong>Reproducible:</strong> Same pipeline runs the same way every time<br/>
              <strong>Collaborative:</strong> Team can review and modify pipeline changes
            </p>
          </div>
        </div>
      </div>

      <div className="tutorial-section">
        <h2>Essential Jenkins Commands</h2>
        
        <div className="commands-grid">
          <div className="command-card">
            <h4>Pipeline Management</h4>
            <div className="command-list">
              <div className="command-item">
                <code>jenkins-cli build</code>
                <span>Trigger a build</span>
              </div>
              <div className="command-item">
                <code>jenkins-cli console</code>
                <span>View build logs</span>
              </div>
              <div className="command-item">
                <code>jenkins-cli stop-build</code>
                <span>Stop running build</span>
              </div>
            </div>
          </div>
          
          <div className="command-card">
            <h4>Job Management</h4>
            <div className="command-list">
              <div className="command-item">
                <code>jenkins-cli create-job</code>
                <span>Create new job</span>
              </div>
              <div className="command-item">
                <code>jenkins-cli update-job</code>
                <span>Update existing job</span>
              </div>
              <div className="command-item">
                <code>jenkins-cli delete-job</code>
                <span>Delete job</span>
              </div>
            </div>
          </div>
          
          <div className="command-card">
            <h4>System Management</h4>
            <div className="command-list">
              <div className="command-item">
                <code>jenkins-cli install-plugin</code>
                <span>Install plugin</span>
              </div>
              <div className="command-item">
                <code>jenkins-cli restart</code>
                <span>Restart Jenkins</span>
              </div>
              <div className="command-item">
                <code>jenkins-cli safe-restart</code>
                <span>Safe restart</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="tutorial-section">
        <h2>Jenkinsfile Best Practices</h2>
        
        <div className="best-practices">
          <div className="practice-item practice-item--good">
            <CheckCircle size={20} />
            <div>
              <h4>Use Declarative Pipelines</h4>
              <p>Prefer declarative pipelines over scripted ones for better readability and maintainability.</p>
            </div>
          </div>
          
          <div className="practice-item practice-item--good">
            <CheckCircle size={20} />
            <div>
              <h4>Implement Proper Error Handling</h4>
              <p>Use try-catch blocks and post actions to handle failures gracefully and provide meaningful feedback.</p>
            </div>
          </div>
          
          <div className="practice-item practice-item--good">
            <CheckCircle size={20} />
            <div>
              <h4>Use Parallel Execution</h4>
              <p>Run independent stages in parallel to reduce pipeline execution time and improve efficiency.</p>
            </div>
          </div>
          
          <div className="practice-item practice-item--warning">
            <AlertTriangle size={20} />
            <div>
              <h4>Keep Pipelines Simple</h4>
              <p>Avoid overly complex pipelines. Break them into smaller, manageable pieces when possible.</p>
            </div>
          </div>
          
          <div className="practice-item practice-item--warning">
            <AlertTriangle size={20} />
            <div>
              <h4>Secure Sensitive Data</h4>
              <p>Use Jenkins credentials and environment variables for sensitive information like passwords and API keys.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="tutorial-section">
        <h2>Integration with Other Tools</h2>
        
        <p>
          Jenkins integrates seamlessly with a wide variety of development and deployment tools.
        </p>

        <div className="concept-grid">
          <div className="concept-card">
            <div className="concept-card__icon">
              <GitBranch size={24} />
            </div>
            <h3>Version Control</h3>
            <p>
              Git: Jenkins can trigger builds on code changes, pull requests, and merges.
            </p>
          </div>
          
          <div className="concept-card">
            <div className="concept-card__icon">
              <Package size={24} />
            </div>
            <h3>Container Platforms</h3>
            <p>
              Docker, Kubernetes: Build and deploy containerized applications with automated pipelines.
            </p>
          </div>
          
          <div className="concept-card">
            <div className="concept-card__icon">
              <Globe size={24} />
            </div>
            <h3>Cloud Platforms</h3>
            <p>
              AWS, Azure, GCP: Deploy to cloud platforms with native integrations and plugins.
            </p>
          </div>
        </div>

        <div className="code-example">
          <h4>Docker Integration Example</h4>
          <pre className="code-block">
{`pipeline {
    agent any
    
    stages {
        stage('Build Docker Image') {
            steps {
                script {
                    docker.build(\`myapp:\${BUILD_NUMBER}\`)
                }
            }
        }
        
        stage('Push to Registry') {
            steps {
                script {
                    docker.withRegistry('https://registry.example.com', 'registry-credentials') {
                        docker.image(\`myapp:\${BUILD_NUMBER}\`).push()
                        docker.image(\`myapp:\${BUILD_NUMBER}\`).push('latest')
                    }
                }
            }
        }
        
        stage('Deploy to Kubernetes') {
            steps {
                sh \`kubectl set image deployment/myapp myapp=registry.example.com/myapp:\${BUILD_NUMBER}\`
            }
        }
    }
}`}
          </pre>
        </div>
      </div>

      <div className="tutorial-section">
        <h2>Monitoring and Notifications</h2>
        
        <p>
          Jenkins provides comprehensive monitoring and notification capabilities to keep your team informed 
          about build status and pipeline health.
        </p>

        <div className="commands-grid">
          <div className="command-card">
            <h4>Built-in Notifications</h4>
            <div className="command-list">
              <div className="command-item">
                <code>email</code>
                <span>Send email notifications</span>
              </div>
              <div className="command-item">
                <code>slackSend</code>
                <span>Send Slack messages</span>
              </div>
              <div className="command-item">
                <code>junit</code>
                <span>Publish test results</span>
              </div>
            </div>
          </div>
          
          <div className="command-card">
            <h4>Monitoring</h4>
            <div className="command-list">
              <div className="command-item">
                <code>archiveArtifacts</code>
                <span>Archive build artifacts</span>
              </div>
              <div className="command-item">
                <code>publishHTML</code>
                <span>Publish HTML reports</span>
              </div>
              <div className="command-item">
                <code>recordCoverage</code>
                <span>Record code coverage</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="tutorial-section">
        <h2>Key Takeaways</h2>
        
        <div className="best-practices">
          <div className="practice-item practice-item--good">
            <CheckCircle size={20} />
            <div>
              <h4>Pipelines Automate Your Workflow</h4>
              <p>Pipelines define the steps to build, test, and deploy your application automatically.</p>
            </div>
          </div>
          
          <div className="practice-item practice-item--good">
            <CheckCircle size={20} />
            <div>
              <h4>Jobs are Individual Tasks</h4>
              <p>Jobs are the individual automation tasks that Jenkins can run. Pipelines are made up of multiple jobs.</p>
            </div>
          </div>
          
          <div className="practice-item practice-item--good">
            <CheckCircle size={20} />
            <div>
              <h4>Jenkinsfiles Define Your Pipeline</h4>
              <p>Jenkinsfiles are text files that define your pipeline. They're stored in your code repository and version controlled.</p>
            </div>
          </div>
          
          <div className="practice-item practice-item--warning">
            <AlertTriangle size={20} />
            <div>
              <h4>Start Simple</h4>
              <p>Begin with basic pipelines that build and test your application. Learn advanced features like parallel execution later.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Video Resource */}
      <VideoResource
        title="Jenkins CI/CD Tutorial"
        url="https://www.youtube.com/watch?v=6YZvp2GwT0A"
        description="Master Jenkins CI/CD with this comprehensive video tutorial covering pipelines, Jenkinsfiles, automation, and best practices."
        thumbnail="https://img.youtube.com/vi/6YZvp2GwT0A/hqdefault.jpg"
      />
    </TutorialLayout>
  );
};

export default JenkinsTutorial;
