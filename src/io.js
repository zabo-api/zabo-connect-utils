function parseRequest (data = {}) {
  return {
    requiredCredentials: [...(data.credentials || [])],
    userInput: { ...(data.values || {}) }
  }
}

function formatResponse (data, resp = {}) {
  const { requiredCredentials, userInput } = parseRequest(data)

  if (Array.isArray(resp)) {
    const credentials = {}

    requiredCredentials.concat(resp).forEach(credential => {
      const value = userInput[credential.name]

      credentials[credential.name] = {
        ...credential,
        internal: credential.internal || !requiredCredentials.find(c => c.name === credential.name),
        input: value ? { type: 'hidden', value } : credential.input
      }
    })

    return {
      need_more_credentials: true,
      credentials: Object.values(credentials)
    }
  }

  return {
    values: {
      ...userInput,
      ...resp
    }
  }
}

export default {
  parseRequest,
  formatResponse
}
