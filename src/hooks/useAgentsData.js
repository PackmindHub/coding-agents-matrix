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
        cliDetail: agent.cli?.detail ?? null,
        dedicatedIde: agent.dedicatedIde.value,
        dedicatedIdeDetail: agent.dedicatedIde?.detail ?? null,
        ideExtension: agent.ideExtension.value,
        ideExtensionDetail: agent.ideExtension?.detail ?? null,
        byoLlm: agent.byoLlm.value,
        byoLlmDetail: agent.byoLlm?.detail ?? null,
        mcpSupport: agent.mcpSupport.value,
        mcpSupportDetail: agent.mcpSupport?.detail ?? null,
        customRules: agent.customRules.value,
        customRulesDetail: agent.customRules?.detail ?? null,
        agentsMdSupport: agent.agentsMdSupport.value,
        agentsMdSupportDetail: agent.agentsMdSupport?.detail ?? null,
        agentSkillsSupport: agent.agentSkillsSupport.value,
        agentSkillsSupportDetail: agent.agentSkillsSupport?.detail ?? null,
        commandsReusablePrompts: agent.commandsReusablePrompts.value,
        commandsReusablePromptsDetail: agent.commandsReusablePrompts?.detail ?? null,
        subagentsSupport: agent.subagentsSupport.value,
        subagentsSupportDetail: agent.subagentsSupport?.detail ?? null,
        planMode: agent.planMode.value,
        planModeDetail: agent.planMode?.detail ?? null,
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
