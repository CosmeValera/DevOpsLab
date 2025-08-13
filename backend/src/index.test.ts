import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import app from './index'

describe('DevOpsLab Backend API', () => {
  describe('Health Check', () => {
    it('should return health status', async () => {
      const response = await request(app)
        .get('/health')
        .expect(200)

      expect(response.body).toHaveProperty('status', 'OK')
      expect(response.body).toHaveProperty('timestamp')
      expect(response.body).toHaveProperty('uptime')
      expect(response.body).toHaveProperty('environment')
    })
  })

  describe('Metrics', () => {
    it('should return service metrics', async () => {
      const response = await request(app)
        .get('/metrics')
        .expect(200)

      expect(response.body).toHaveProperty('service', 'devopslab-backend')
      expect(response.body).toHaveProperty('version', '1.0.0')
      expect(response.body).toHaveProperty('timestamp')
      expect(response.body).toHaveProperty('memory')
      expect(response.body).toHaveProperty('uptime')
    })
  })

  describe('API Documentation', () => {
    it('should return API information', async () => {
      const response = await request(app)
        .get('/api')
        .expect(200)

      expect(response.body).toHaveProperty('message', 'DevOpsLab Backend API')
      expect(response.body).toHaveProperty('version', '1.0.0')
      expect(response.body).toHaveProperty('endpoints')
      expect(response.body.endpoints).toHaveProperty('health')
      expect(response.body.endpoints).toHaveProperty('users')
      expect(response.body.endpoints).toHaveProperty('projects')
      expect(response.body.endpoints).toHaveProperty('deployments')
    })
  })

  describe('Users API', () => {
    it('should return users list', async () => {
      const response = await request(app)
        .get('/api/users')
        .expect(200)

      expect(response.body).toHaveProperty('success', true)
      expect(response.body).toHaveProperty('data')
      expect(response.body).toHaveProperty('count')
      expect(Array.isArray(response.body.data)).toBe(true)
    })
  })

  describe('Projects API', () => {
    it('should return projects list', async () => {
      const response = await request(app)
        .get('/api/projects')
        .expect(200)

      expect(response.body).toHaveProperty('success', true)
      expect(response.body).toHaveProperty('data')
      expect(response.body).toHaveProperty('count')
      expect(Array.isArray(response.body.data)).toBe(true)
    })
  })

  describe('Deployments API', () => {
    it('should return deployments list', async () => {
      const response = await request(app)
        .get('/api/deployments')
        .expect(200)

      expect(response.body).toHaveProperty('success', true)
      expect(response.body).toHaveProperty('data')
      expect(response.body).toHaveProperty('count')
      expect(Array.isArray(response.body.data)).toBe(true)
    })

    it('should create a new deployment', async () => {
      const deploymentData = {
        project_id: 1,
        environment: 'staging',
        version: '1.0.1'
      }

      const response = await request(app)
        .post('/api/deployments')
        .send(deploymentData)
        .expect(201)

      expect(response.body).toHaveProperty('success', true)
      expect(response.body).toHaveProperty('data')
      expect(response.body.data).toHaveProperty('project_id', 1)
      expect(response.body.data).toHaveProperty('environment', 'staging')
      expect(response.body.data).toHaveProperty('version', '1.0.1')
      expect(response.body.data).toHaveProperty('status', 'pending')
    })

    it('should reject deployment creation with missing fields', async () => {
      const invalidData = {
        project_id: 1
        // missing environment and version
      }

      const response = await request(app)
        .post('/api/deployments')
        .send(invalidData)
        .expect(400)

      expect(response.body).toHaveProperty('success', false)
      expect(response.body).toHaveProperty('error')
    })

    it('should update deployment status', async () => {
      // First create a deployment
      const deploymentData = {
        project_id: 1,
        environment: 'production',
        version: '1.0.2'
      }

      const createResponse = await request(app)
        .post('/api/deployments')
        .send(deploymentData)
        .expect(201)

      const deploymentId = createResponse.body.data.id

      // Update the deployment status
      const updateResponse = await request(app)
        .patch(`/api/deployments/${deploymentId}`)
        .send({ status: 'completed' })
        .expect(200)

      expect(updateResponse.body).toHaveProperty('success', true)
      expect(updateResponse.body.data).toHaveProperty('status', 'completed')
    })

    it('should reject status update with missing status field', async () => {
      const response = await request(app)
        .patch('/api/deployments/1')
        .send({})
        .expect(400)

      expect(response.body).toHaveProperty('success', false)
      expect(response.body).toHaveProperty('error')
    })

    it('should return 404 for non-existent deployment', async () => {
      const response = await request(app)
        .patch('/api/deployments/999999')
        .send({ status: 'completed' })
        .expect(404)

      expect(response.body).toHaveProperty('success', false)
      expect(response.body).toHaveProperty('error', 'Deployment not found')
    })
  })

  describe('Metrics Data API', () => {
    it('should return metrics data', async () => {
      const response = await request(app)
        .get('/api/metrics')
        .expect(200)

      expect(response.body).toHaveProperty('success', true)
      expect(response.body).toHaveProperty('data')
      expect(response.body).toHaveProperty('count')
      expect(Array.isArray(response.body.data)).toBe(true)
    })
  })

  describe('Error Handling', () => {
    it('should return 404 for non-existent endpoints', async () => {
      const response = await request(app)
        .get('/api/non-existent')
        .expect(404)

      expect(response.body).toHaveProperty('success', false)
      expect(response.body).toHaveProperty('error', 'Endpoint not found')
    })
  })

  describe('Rate Limiting', () => {
    it('should enforce rate limiting', async () => {
      // Make multiple requests quickly to trigger rate limiting
      const requests = Array.from({ length: 105 }, () =>
        request(app).get('/api/users')
      )

      const responses = await Promise.all(requests)
      const rateLimitedResponses = responses.filter(res => res.status === 429)

      // Should have some rate limited responses
      expect(rateLimitedResponses.length).toBeGreaterThan(0)
    })
  })
})
