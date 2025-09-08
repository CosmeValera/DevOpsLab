import React from "react";
import { Settings, Info, AlertTriangle, CheckCircle, Play, GitBranch, Database, Globe, FileText, Code, Package, Zap } from "lucide-react";
import TutorialLayout from "./TutorialLayout";
import CrossReferenceLinks from "../shared/CrossReferenceLinks";

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
          Jenkins supports different types of pipelines, each with its own advantages and use cases.
        </p>

        <div className="concept-grid">
          <div className="concept-card">
            <div className="concept-card__icon">
              <FileText size={24} />
            </div>
            <h3>Declarative Pipeline</h3>
            <p>
              A newer, more structured approach using a simplified syntax. Easier to read and write, with 
              built-in error handling and parallel execution support.
            </p>
          </div>
          
          <div className="concept-card">
            <div className="concept-card__icon">
              <Code size={24} />
            </div>
            <h3>Scripted Pipeline</h3>
            <p>
              Traditional Groovy-based pipelines with full programming flexibility. More powerful but 
              requires more Groovy knowledge.
            </p>
          </div>
          
          <div className="concept-card">
            <div className="concept-card__icon">
              <Database size={24} />
            </div>
            <h3>Freestyle Projects</h3>
            <p>
              GUI-based job configuration. Good for simple automation tasks but less flexible than 
              pipeline-based approaches.
            </p>
          </div>
        </div>
      </div>

      <div className="tutorial-section">
        <h2>Creating Your First Pipeline</h2>
        
        <p>
          Let's create a simple declarative pipeline that demonstrates the basic CI/CD workflow.
        </p>

        <div className="code-example">
          <h4>Basic Declarative Pipeline</h4>
          <pre className="code-block">
{`pipeline {
    agent any
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Build') {
            steps {
                echo 'Building the application...'
                sh 'npm install'
                sh 'npm run build'
            }
        }
        
        stage('Test') {
            steps {
                echo 'Running tests...'
                sh 'npm test'
            }
        }
        
        stage('Deploy') {
            steps {
                echo 'Deploying to staging...'
                sh 'docker build -t myapp .'
                sh 'docker push myapp:latest'
            }
        }
    }
    
    post {
        always {
            echo 'Pipeline completed!'
        }
        success {
            echo 'Pipeline succeeded!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}`}
          </pre>
        </div>

        <div className="workflow-steps">
          <div className="workflow-step">
            <div className="workflow-step__number">1</div>
            <div className="workflow-step__content">
              <h4>Checkout</h4>
              <p>Pull the latest code from your version control system (Git, SVN, etc.).</p>
            </div>
          </div>
          
          <div className="workflow-step">
            <div className="workflow-step__number">2</div>
            <div className="workflow-step__content">
              <h4>Build</h4>
              <p>Compile your code, install dependencies, and create artifacts.</p>
            </div>
          </div>
          
          <div className="workflow-step">
            <div className="workflow-step__number">3</div>
            <div className="workflow-step__content">
              <h4>Test</h4>
              <p>Run automated tests to ensure code quality and functionality.</p>
            </div>
          </div>
          
          <div className="workflow-step">
            <div className="workflow-step__number">4</div>
            <div className="workflow-step__content">
              <h4>Deploy</h4>
              <p>Deploy the application to target environments (staging, production).</p>
            </div>
          </div>
        </div>
      </div>

      <div className="tutorial-section">
        <h2>Pipeline Stages and Steps</h2>
        
        <p>
          Understanding the structure of pipelines is crucial for creating effective CI/CD workflows.
        </p>

        <div className="dockerfile-instructions">
          <h4>Pipeline Components</h4>
          <div className="instruction-list">
            <div className="instruction-item">
              <code>pipeline</code>
              <span>Top-level block that defines the entire pipeline</span>
            </div>
            <div className="instruction-item">
              <code>agent</code>
              <span>Specifies where the pipeline will execute</span>
            </div>
            <div className="instruction-item">
              <code>stages</code>
              <span>Contains a sequence of stage blocks</span>
            </div>
            <div className="instruction-item">
              <code>stage</code>
              <span>Defines a conceptual segment of the pipeline</span>
            </div>
            <div className="instruction-item">
              <code>steps</code>
              <span>Contains the actual commands to execute</span>
            </div>
            <div className="instruction-item">
              <code>post</code>
              <span>Defines actions to run after pipeline completion</span>
            </div>
          </div>
        </div>

        <div className="code-example">
          <h4>Advanced Pipeline with Parallel Execution</h4>
          <pre className="code-block">
{`pipeline {
    agent any
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Build and Test') {
            parallel {
                stage('Unit Tests') {
                    steps {
                        sh 'npm run test:unit'
                    }
                }
                stage('Integration Tests') {
                    steps {
                        sh 'npm run test:integration'
                    }
                }
                stage('Build') {
                    steps {
                        sh 'npm run build'
                    }
                }
            }
        }
        
        stage('Security Scan') {
            steps {
                sh 'npm audit'
                sh 'snyk test'
            }
        }
        
        stage('Deploy to Staging') {
            when {
                branch 'develop'
            }
            steps {
                sh 'kubectl apply -f k8s/staging/'
            }
        }
        
        stage('Deploy to Production') {
            when {
                branch 'main'
            }
            steps {
                input 'Deploy to production?'
                sh 'kubectl apply -f k8s/production/'
            }
        }
    }
}`}
          </pre>
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
              Git, SVN, Mercurial - Jenkins can trigger builds on code changes, pull requests, and merges.
            </p>
          </div>
          
          <div className="concept-card">
            <div className="concept-card__icon">
              <Package size={24} />
            </div>
            <h3>Container Platforms</h3>
            <p>
              Docker, Kubernetes - Build and deploy containerized applications with automated pipelines.
            </p>
          </div>
          
          <div className="concept-card">
            <div className="concept-card__icon">
              <Globe size={24} />
            </div>
            <h3>Cloud Platforms</h3>
            <p>
              AWS, Azure, GCP - Deploy to cloud platforms with native integrations and plugins.
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
        <h2>Next Steps</h2>
        
        <p>
          You now understand the fundamentals of Jenkins CI/CD! You've learned how to create pipelines, 
          integrate with various tools, and implement best practices for automated software delivery.
        </p>
        
        <div className="next-steps">
          <div className="next-step">
            <h4>Practice</h4>
            <p>Set up a Jenkins server and create your first pipeline for a real project</p>
          </div>
          <div className="next-step">
            <h4>Explore</h4>
            <p>Learn about Jenkins plugins, shared libraries, and advanced pipeline features</p>
          </div>
          <div className="next-step">
            <h4>Master</h4>
            <p>Combine all the DevOps tools you've learned to create comprehensive CI/CD pipelines</p>
          </div>
        </div>
      </div>
    </TutorialLayout>
  );
};

export default JenkinsTutorial;
