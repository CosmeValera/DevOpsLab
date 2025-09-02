import React, { useState, useEffect } from "react";
import { 
  AlertTriangle, 
  Play, 
  CheckCircle, 
  Clock, 
  Pause,
  ExternalLink,
  RefreshCw,
  XCircle
} from "lucide-react";

// API Configuration
const API_BASE_URL = 'http://localhost:3001';

// Types for pipeline status
interface PipelineStatus {
  name: string;
  status: 'running' | 'success' | 'failure' | 'pending' | 'error' | 'aborted' | 'unstable' | 'unknown' | 'never_built';
  statusText: string;
  building: boolean;
  result: string | null;
  timestamp: number | null;
  duration: number | null;
  url: string | null;
  consoleUrl: string | null;
  jobUrl: string;
  lastBuildNumber: number | null;
  estimatedDuration: number | null;
  description: string;
  error?: boolean;
  errorType?: 'auth_required' | 'auth_invalid' | 'not_found' | 'server_error' | 'connection_failed' | 'host_not_found' | 'timeout' | 'unknown';
  stages?: PipelineStages | null;
}



interface PipelineStage {
  id: string;
  name: string;
  status: 'success' | 'failure' | 'running' | 'paused' | 'pending' | 'unknown';
  startTimeMillis: number;
  durationMillis: number;
  isCurrent: boolean;
}

interface PipelineStages {
  stages: PipelineStage[];
  currentStageIndex: number;
  runId: string;
  runName: string;
  runStatus: string;
  startTimeMillis: number;
  endTimeMillis: number;
  durationMillis: number;
  lastSuccessfulRun?: {
    durationMillis: number;
    stages: {
      name: string;
      durationMillis: number;
    }[];
  } | null;
}

const PipelineStatus: React.FC = () => {

  const [pipelineData, setPipelineData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  // Function to fetch pipeline status from backend
  const fetchPipelineStatus = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`${API_BASE_URL}/api/pipelines/status`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setPipelineData(data);
      setLastUpdated(new Date());
    } catch (err) {
      console.error('Error fetching pipeline status:', err);
      
      // Provide more specific error messages
      let errorMessage = 'Failed to fetch pipeline status';
      
      if (err instanceof Error) {
        if (err.message.includes('Failed to fetch')) {
          errorMessage = 'Cannot connect to backend server. Please check if the backend is running on port 3001.';
        } else if (err.message.includes('HTTP error! status: 500')) {
          errorMessage = 'Backend server error. Please check backend logs.';
        } else if (err.message.includes('HTTP error! status: 404')) {
          errorMessage = 'Backend endpoint not found. Please check backend configuration.';
        } else {
          errorMessage = err.message;
        }
      }
      
      // Clear pipeline data when we get a backend error to prevent flickering
      setPipelineData(null);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchPipelineStatus();
  }, []);

  // Auto-refresh every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      fetchPipelineStatus();
    }, 2000);

    return () => clearInterval(interval);
  }, []);


  // Function to get status icon based on pipeline status
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'running':
        return <Clock size={16} />;
      case 'success':
        return <CheckCircle size={16} />;
      case 'failure':
      case 'error':
        return <XCircle size={16} />;
      case 'pending':
        return <Pause size={16} />;
      case 'aborted':
      case 'unstable':
        return <AlertTriangle size={16} />;
      case 'never_built':
        return <Play size={16} />;
      default:
        return <Clock size={16} />;
    }
  };

  // Function to get status badge class
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'running':
        return 'status-badge status-running';
      case 'success':
        return 'status-badge status-success';
      case 'failure':
      case 'error':
        return 'status-badge status-failure';
      case 'pending':
        return 'status-badge status-pending';
      case 'aborted':
      case 'unstable':
        return 'status-badge status-warning';
      case 'never_built':
        return 'status-badge status-neutral';
      default:
        return 'status-badge status-unknown';
    }
  };

  // Function to get stage status badge class
  const getStageStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'running':
        return 'stage-status-badge stage-status-running';
      case 'success':
        return 'stage-status-badge stage-status-success';
      case 'failure':
        return 'stage-status-badge stage-status-failure';
      case 'paused':
        return 'stage-status-badge stage-status-paused';
      case 'pending':
        return 'stage-status-badge stage-status-pending';
      default:
        return 'stage-status-badge stage-status-unknown';
    }
  };

  // Function to get stage status icon
  const getStageStatusIcon = (status: string) => {
    switch (status) {
      case 'running':
        return <Clock size={14} />;
      case 'success':
        return <CheckCircle size={14} />;
      case 'failure':
        return <XCircle size={14} />;
      case 'paused':
        return <Pause size={14} />;
      case 'pending':
        return <Clock size={14} />;
      default:
        return <Clock size={14} />;
    }
  };

  // Function to format duration
  const formatDuration = (millis: number) => {
    if (millis < 1000) return `${millis}ms`;
    return `${Math.round(millis / 1000)}s`;
  };

  // Function to calculate elapsed time for running pipelines
  const calculateElapsedTime = (startTimeMillis: number) => {
    const now = Date.now();
    const elapsed = now - startTimeMillis;
    return Math.max(0, elapsed);
  };

  // Function to calculate progress percentage for pipeline
  const calculatePipelineProgress = (pipeline: PipelineStatus) => {
    if (!pipeline.building || !pipeline.stages?.lastSuccessfulRun) {
      return 0;
    }
    
    const elapsed = calculateElapsedTime(pipeline.stages.startTimeMillis);
    const estimatedTotal = pipeline.stages.lastSuccessfulRun.durationMillis;
    
    if (estimatedTotal <= 0) return 0;
    
    const progress = Math.min((elapsed / estimatedTotal) * 100, 100);
    return Math.round(progress);
  };

  // Function to calculate progress percentage for stage
  const calculateStageProgress = (stage: PipelineStage, stages: PipelineStages) => {
    if (stage.status !== 'running' || !stages.lastSuccessfulRun) {
      return 0;
    }
    
    const elapsed = calculateElapsedTime(stage.startTimeMillis);
    const estimatedTotal = stages.lastSuccessfulRun.stages.find(s => s.name === stage.name)?.durationMillis || 0;
    
    if (estimatedTotal <= 0) return 0;
    
    const progress = Math.min((elapsed / estimatedTotal) * 100, 100);
    return Math.round(progress);
  };

  // Component to render pipeline stages
  const PipelineStages: React.FC<{ stages: PipelineStages }> = ({ stages }) => {
    return (
      <div className="pipeline-stages">
        <div className="pipeline-stages__header">
          <h5>Pipeline Stages ({stages.stages.length})</h5>
          <small>Run: {stages.runName}</small>
        </div>
        <div className="pipeline-stages__list">
          {stages.stages.map((stage, index) => (
            <div 
              key={stage.id}
              className={`pipeline-stage ${index === stages.currentStageIndex ? 'pipeline-stage--current' : ''} ${stage.status === 'running' ? 'pipeline-stage--running' : ''}`}
            >
              <div className="pipeline-stage__header">
                <div className="pipeline-stage__status">
                  {getStageStatusIcon(stage.status)}
                  <span className={getStageStatusBadgeClass(stage.status)}>
                    {stage.status}
                  </span>
                </div>
                <div className="pipeline-stage__name">
                  <span className="pipeline-stage__number">{index + 1}</span>
                  <span className="pipeline-stage__title">{stage.name}</span>
                </div>
              </div>
              <div className="pipeline-stage__details">
                {stage.durationMillis > 0 && (
                  <small className="pipeline-stage__duration">
                    Duration: {formatDuration(stage.durationMillis)}
                  </small>
                )}
                {stage.status === 'running' && (
                  <div className="pipeline-stage__progress">
                    <div className="stage-progress-bar">
                      <div 
                        className="stage-progress-fill"
                        style={{ width: `${calculateStageProgress(stage, stages)}%` }}
                      ></div>
                    </div>
                    <div className="stage-timing">
                      <small>Elapsed: {formatDuration(calculateElapsedTime(stage.startTimeMillis))}</small>
                      {stages.lastSuccessfulRun && (
                        <small>Estimated: {formatDuration(
                          stages.lastSuccessfulRun.stages.find(s => s.name === stage.name)?.durationMillis || 0
                        )}</small>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Function to determine if a pipeline should be treated as an error
  const isPipelineError = (pipeline: PipelineStatus) => {
    if (!pipeline.error || !pipeline.errorType) {
      return false;
    }
    
    // 'not_found' means pipeline has never been built - this is not an error
    if (pipeline.errorType === 'not_found') {
      return false;
    }
    
    return true;
  }

  // Function to get user-friendly error message for pipeline errors
  const getPipelineErrorMessage = (pipeline: PipelineStatus) => {
    if (!pipeline.error || !pipeline.errorType) {
      return pipeline.description;
    }

    switch (pipeline.errorType) {
      case 'auth_required':
        return 'Authentication required. Please configure Jenkins credentials in backend/.env file.';
      case 'auth_invalid':
        return 'Invalid Jenkins credentials. Please check your username and token. Hint: Configure Backend Authentication which corresponds to step 4 of the Jenkins Configuration and then reload the backend server.';
      case 'connection_failed':
        return 'Cannot connect to Jenkins. Please check if Jenkins is running on port 8080.';
      case 'host_not_found':
        return 'Jenkins host not found. Please check JENKINS_HOST configuration.';
      case 'timeout':
        return 'Connection to Jenkins timed out. Please check if Jenkins is accessible.';
      case 'server_error':
        return 'Jenkins server error. Please check Jenkins logs.';
      default:
        return pipeline.description;
    }
  };

  // Function to handle pipeline card click
  const handlePipelineClick = (pipeline: PipelineStatus) => {
    if (isPipelineError(pipeline)) {
      // For error states, open Jenkins main page to help user troubleshoot
      window.open('http://localhost:8080', '_blank');
      return;
    }
    
    if (pipeline.building && pipeline.consoleUrl) {
      // If building, open console URL
      window.open(pipeline.consoleUrl, '_blank');
    } else if (pipeline.jobUrl) {
      // Otherwise, open job URL
      window.open(pipeline.jobUrl, '_blank');
    }
  };

  return (
    <div className="jenkins-section">
      <div className="section-header-pipeline-status">
        <div className="section-header__left">
          <h2 className="section-title">
            <Play size={20} />
            Pipeline Status
          </h2>
          <p className="section-description">
            Monitor the status of your automated deployment pipelines
          </p>
        </div>
        <div className="section-header__right">
          <button 
            className="refresh-button"
            onClick={fetchPipelineStatus}
            disabled={loading}
          >
            <RefreshCw size={16} className={loading ? 'spinning' : ''} />
            Refresh
          </button>
          {lastUpdated && (
            <div className="last-updated">
              Last updated: {lastUpdated.toLocaleTimeString()}
            </div>
          )}
        </div>
      </div>

      {/* Show loading only on initial load when we have no data */}
      {loading && !pipelineData && !error && (
        <div className="loading-message">
          <RefreshCw size={20} className="spinning" />
          <span>Loading pipeline status...</span>
        </div>
      )}

      {/* Show error message when there's a backend connection error */}
      {error && (
        <div className="global-error-message">
          <div className="error-icon-container">
            <AlertTriangle size={24} />
          </div>
          <div className="global-error-content">
            <h4>Backend Connection Issue</h4>
            <p className="error-description">{error}</p>
            <div className="global-error-actions">
              <button onClick={fetchPipelineStatus} className="retry-button">
                <RefreshCw size={16} />
                Retry Connection
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Show pipeline data only when we have data AND no backend errors */}
      {pipelineData && !error && (
        <>
          {/* Check if all pipelines have the same error type (Jenkins issues) - excluding never-built pipelines */}
          {pipelineData.pipelines.every((p: PipelineStatus) => isPipelineError(p)) && pipelineData.pipelines.length > 0 ? (
            <div className="global-error-message">
              <div className="error-icon-container">
                <AlertTriangle size={24} />
              </div>
              <div className="global-error-content">
                <h4>Jenkins Connection Issue</h4>
                <p className="error-description">{getPipelineErrorMessage(pipelineData.pipelines[0])}</p>
                <div className="global-error-actions">
                  <button onClick={fetchPipelineStatus} className="retry-button">
                    <RefreshCw size={16} />
                    Retry Connection
                  </button>
                  <a href="http://localhost:8080" target="_blank" rel="noopener noreferrer" className="jenkins-link">
                    <ExternalLink size={16} />
                    Open Jenkins
                  </a>
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* Only show summary stats and pipeline grid if there are no global Jenkins errors */}
              {!pipelineData.pipelines.every((p: PipelineStatus) => isPipelineError(p)) && (
                <>
                  {/* Summary Stats */}
                  <div className="pipeline-summary">
                    <div className="summary-stat">
                      <span className="summary-label">Total:</span>
                      <span className="summary-value">{pipelineData.summary.total}</span>
                    </div>
                    <div className="summary-stat">
                      <span className="summary-label">Running:</span>
                      <span className="summary-value summary-running">{pipelineData.summary.running}</span>
                    </div>
                    <div className="summary-stat">
                      <span className="summary-label">Success:</span>
                      <span className="summary-value summary-success">{pipelineData.summary.success}</span>
                    </div>
                    <div className="summary-stat">
                      <span className="summary-label">Failed:</span>
                      <span className="summary-value summary-failed">{pipelineData.summary.failed}</span>
                    </div>
                    <div className="summary-stat">
                      <span className="summary-label">Never Built:</span>
                      <span className="summary-value summary-neutral">{pipelineData.summary.neverBuilt}</span>
                    </div>
                    <div className="summary-stat">
                      <span className="summary-label">Pending:</span>
                      <span className="summary-value summary-pending">{pipelineData.summary.pending}</span>
                    </div>
                  </div>

                  <div className="pipelines-grid">
                    {pipelineData.pipelines.map((pipeline: PipelineStatus) => (
                      <div 
                        key={pipeline.name}
                        className={`pipeline-card ${pipeline.name === 'MasterPipeline' ? 'pipeline-card--master' : ''} ${isPipelineError(pipeline) ? 'pipeline-card--error' : ''}`}
                        onClick={() => handlePipelineClick(pipeline)}
                        style={{ cursor: 'pointer' }}
                      >
                        <div className="pipeline-card__header">
                          <div className="pipeline-card__title">
                            <h3>{pipeline.name}</h3>
                            <p>{pipeline.status === 'never_built' ? 'Pipeline has never been executed. Run it for the first time in Jenkins.' : (pipeline.description || 'Pipeline job')}</p>
                            {pipeline.lastBuildNumber && !isPipelineError(pipeline) && (
                              <small>Build #{pipeline.lastBuildNumber}</small>
                            )}
                          </div>
                          <div className="pipeline-card__status">
                            {getStatusIcon(pipeline.status)}
                            <span className={getStatusBadgeClass(pipeline.status)}>
                              {pipeline.statusText}
                            </span>
                          </div>
                        </div>
                        {pipeline.building && (
                          <div className="pipeline-card__progress">
                            <div className="progress-bar">
                              <div 
                                className="progress-fill" 
                                style={{ width: `${calculatePipelineProgress(pipeline)}%` }}
                              ></div>
                            </div>
                            <div className="pipeline-timing">
                              {pipeline.stages?.lastSuccessfulRun ? (
                                <>
                                  <small>Elapsed: {formatDuration(calculateElapsedTime(pipeline.stages.startTimeMillis))}</small>
                                  <small>Estimated: {formatDuration(pipeline.stages.lastSuccessfulRun.durationMillis)}</small>
                                </>
                              ) : (
                                <small>Running...</small>
                              )}
                            </div>
                          </div>
                        )}
                        {pipeline.duration !== null && !pipeline.building && (
                          <div className="pipeline-card__duration">
                            <small>Duration: {Math.round(pipeline.duration / 1000)}s</small>
                          </div>
                        )}
                        
                        {/* Show pipeline stages if available */}
                        {pipeline.stages && pipeline.stages.stages.length > 0 ? (
                          <PipelineStages stages={pipeline.stages} />
                        ) : null}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default PipelineStatus;
