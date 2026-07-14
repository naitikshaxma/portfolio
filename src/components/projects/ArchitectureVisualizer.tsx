
interface Node {
  id: string
  label: string
  x: number
  y: number
  type: 'input' | 'process' | 'storage'
}

interface Link {
  from: string
  to: string
}

interface ArchitectureVisualizerProps {
  projectId: string
}

export function ArchitectureVisualizer({ projectId }: ArchitectureVisualizerProps) {
  // Define diagrams for each project
  const graphData: Record<string, { nodes: Node[]; links: Link[] }> = {
    'voiceos-bharat': {
      nodes: [
        { id: '1', label: 'Dialect Audio Stream', x: 80, y: 100, type: 'input' },
        { id: '2', label: 'Whisper INT8 model', x: 260, y: 100, type: 'process' },
        { id: '3', label: 'FastAPI Semantic Core', x: 440, y: 100, type: 'process' },
        { id: '4', label: 'Web Action Automation', x: 620, y: 100, type: 'storage' },
      ],
      links: [
        { from: '1', to: '2' },
        { from: '2', to: '3' },
        { from: '3', to: '4' },
      ],
    },
    'campusgenie': {
      nodes: [
        { id: '1', label: 'Client Registration request', x: 80, y: 100, type: 'input' },
        { id: '2', label: 'Redis Cache locks', x: 260, y: 50, type: 'process' },
        { id: '3', label: 'PostgreSQL transactions', x: 440, y: 100, type: 'storage' },
        { id: '4', label: 'Genetic constraints core', x: 260, y: 150, type: 'process' },
      ],
      links: [
        { from: '1', to: '2' },
        { from: '1', to: '4' },
        { from: '2', to: '3' },
        { from: '4', to: '3' },
      ],
    },
    'skillmap-ai': {
      nodes: [
        { id: '1', label: 'Job Requirement crawlers', x: 80, y: 100, type: 'input' },
        { id: '2', label: 'Gemini LLM pipeline', x: 260, y: 100, type: 'process' },
        { id: '3', label: 'Neo4j learning graph', x: 440, y: 100, type: 'storage' },
        { id: '4', label: 'D3.js dynamic viewport', x: 620, y: 100, type: 'process' },
      ],
      links: [
        { from: '1', to: '2' },
        { from: '2', to: '3' },
        { from: '3', to: '4' },
      ],
    },
    'glamis-ai': {
      nodes: [
        { id: '1', label: 'WebRTC video stream', x: 80, y: 100, type: 'input' },
        { id: '2', label: 'TensorFlow WebGL filters', x: 260, y: 50, type: 'process' },
        { id: '3', label: 'Web Workers voice thread', x: 260, y: 150, type: 'process' },
        { id: '4', label: 'Scorecard analytics engine', x: 440, y: 100, type: 'storage' },
      ],
      links: [
        { from: '1', to: '2' },
        { from: '1', to: '3' },
        { from: '2', to: '4' },
        { from: '3', to: '4' },
      ],
    },
  }

  const data = graphData[projectId] || graphData['voiceos-bharat']

  return (
    <div className="w-full bg-[#11141a] border border-[#2b303c] rounded-xl p-6 select-none overflow-x-auto scrollbar-none">
      <h4 className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-4">SYSTEM PIPELINE DIAGRAM</h4>
      <div className="min-w-[700px] h-[220px] relative">
        <svg className="absolute inset-0 w-full h-full">
          <defs>
            <linearGradient id="line-glow" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00b4d8" stopOpacity="0.2" />
              <stop offset="50%" stopColor="#90e0ef" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#7209b7" stopOpacity="0.2" />
            </linearGradient>
          </defs>

          {/* Links */}
          {data.links.map((link, idx) => {
            const fromNode = data.nodes.find((n) => n.id === link.from)
            const toNode = data.nodes.find((n) => n.id === link.to)
            if (!fromNode || !toNode) return null

            return (
              <g key={idx}>
                {/* Static base line */}
                <line
                  x1={fromNode.x}
                  y1={fromNode.y}
                  x2={toNode.x}
                  y2={toNode.y}
                  stroke="rgba(255, 255, 255, 0.08)"
                  strokeWidth="2"
                />
                {/* Pulsing signal glow line */}
                <line
                  x1={fromNode.x}
                  y1={fromNode.y}
                  x2={toNode.x}
                  y2={toNode.y}
                  stroke="url(#line-glow)"
                  strokeWidth="2"
                  strokeDasharray="6 10"
                  className="animate-scanline"
                  style={{ animationDuration: '6s' }}
                />
              </g>
            )
          })}

          {/* Nodes */}
          {data.nodes.map((node) => {
            const isInput = node.type === 'input'
            const isStorage = node.type === 'storage'

            return (
              <g key={node.id}>
                {/* Radar ring */}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r="13"
                  fill="transparent"
                  stroke={isInput ? '#00b4d8' : isStorage ? '#7209b7' : '#90e0ef'}
                  strokeWidth="1"
                  className="animate-ping opacity-20"
                  style={{ animationDuration: '4s' }}
                />
                <circle
                  cx={node.x}
                  cy={node.y}
                  r="7"
                  fill="#0d0f12"
                  stroke={isInput ? '#00b4d8' : isStorage ? '#7209b7' : '#90e0ef'}
                  strokeWidth="2.5"
                />
                <text
                  x={node.x}
                  y={node.y + 26}
                  textAnchor="middle"
                  fill="#94a3b8"
                  fontSize="8.5px"
                  fontFamily="JetBrains Mono, monospace"
                  className="uppercase font-semibold tracking-wider select-none"
                >
                  {node.label}
                </text>
              </g>
            )
          })}
        </svg>
      </div>
    </div>
  )
}
