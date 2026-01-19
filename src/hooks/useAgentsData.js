import { useState, useEffect } from 'react'
import agentsData from '../data/agents-detailed.json'

const useAgentsData = () => {
  const [agents, setAgents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    try {
      // Transform detailed data to flat structure for compatibility
      const transformedAgents = agentsData.map(agent => ({
        name: agent.name,
        type: agent.type,
        github: agent.github?.value || null,
        githubDetail: agent.github?.detail || null,
        ghStars: agent.ghStars?.value || null,
        ghStarsDetail: agent.ghStars?.detail || null,
        website: agent.website?.value || null,
        websiteDetail: agent.website?.detail || null,
        firstRelease: agent.firstRelease?.value || null,
        firstReleaseDetail: agent.firstRelease?.detail || null,
        cli: agent.cli.value,
        cliDetail: agent.cli.detail,
        dedicatedIde: agent.dedicatedIde.value,
        dedicatedIdeDetail: agent.dedicatedIde.detail,
        ideExtension: agent.ideExtension.value,
        ideExtensionDetail: agent.ideExtension.detail,
        byoLlm: agent.byoLlm.value,
        byoLlmDetail: agent.byoLlm.detail,
        mcpSupport: agent.mcpSupport.value,
        mcpSupportDetail: agent.mcpSupport.detail,
        customRules: agent.customRules.value,
        customRulesDetail: agent.customRules.detail,
        agentsMdSupport: agent.agentsMdSupport.value,
        agentsMdSupportDetail: agent.agentsMdSupport.detail,
        agentSkillsSupport: agent.agentSkillsSupport.value,
        agentSkillsSupportDetail: agent.agentSkillsSupport.detail,
        commandsReusablePrompts: agent.commandsReusablePrompts.value,
        commandsReusablePromptsDetail: agent.commandsReusablePrompts.detail,
        subagentsSupport: agent.subagentsSupport.value,
        subagentsSupportDetail: agent.subagentsSupport.detail,
        planMode: agent.planMode.value,
        planModeDetail: agent.planMode.detail,
        additionalInfo: agent.additionalInfo
      }))
      setAgents(transformedAgents)
      setLoading(false)
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }, [])

  return { agents, loading, error }
}

export default useAgentsData
