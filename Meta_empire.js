import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';

const MetaLayeredSurveillance = () => {
  const svgRef = useRef(null);
  const [activeLayer, setActiveLayer] = useState(1); // Default to layer 1
  const [selectedNode, setSelectedNode] = useState(null);
  
  // Node information with descriptions
  const nodeInfo = {
    // Layer 1: Apps You Use Daily
    "Meta": "The central company that owns and controls all these platforms. Everything connects back here.",
    "Facebook": "Tracks what you like, who you know, what content keeps you scrolling, and your political leanings.",
    "Instagram": "Maps what images appeal to you, who you wish you were, and what products catch your eye.",
    "WhatsApp": "Analyzes who you talk to most, when you're active, and the patterns in your conversations.",
    "Threads": "Monitors your opinions, who you follow, and what topics engage you in public discussions.",
    "Messenger": "Tracks your private conversations, sharing habits, and closest connections.",
    
    // Layer 2: Hidden Tracking Tools
    "Facebook Pixel": "Invisible code embedded in millions of websites that tracks everything you do online, even when you're not on Facebook.",
    "Auth Services": "Those 'Login with Facebook' buttons? They track every app and site where you use them.",
    "API Platform": "Technical systems that allow Meta to exchange your data with thousands of other companies.",
    "SDK Integrations": "Software tools embedded in other apps that send your behavior data back to Meta.",
    "Oculus/Quest": "VR headsets that track your physical movements, reactions, and what captures your attention in virtual space.",
    "Portal": "Home devices that observe your living space, voice patterns, and domestic routines.",
    "Ray-Ban AR": "Smart glasses that record what you see in the real world and where you look longest.",
    
    // Layer 3: What They Learn About You
    "Browsing Data": "Which websites you visit, how long you stay, and what content you engage with.",
    "Engagement": "What makes you click, comment, share, and how long you pay attention to content.",
    "Visual Preferences": "Which images and videos you respond to and what visual styles appeal to you.",
    "Identity Markers": "Your demographic details, political leanings, and psychographic profile.",
    "Communications": "Who you talk to, how often, and what topics dominate your conversations.",
    "Web Activity": "Your behavior across millions of non-Meta websites with tracking pixels.",
    "App Usage": "How you use thousands of apps that have Meta's code embedded in them.",
    "Physical Movements": "How you move in VR and eventually AR environments.",
    "Home Environment": "What your living space looks like and how you interact with it.",
    "Visual Field": "What catches your attention in the real world through AR glasses.",
    "Purchase History": "What you buy, consider buying, and abandon in shopping carts.",
    "Biometric Data": "Your physical responses, potentially including eye movements and reactions.",
    "Location Data": "Where you go, how long you stay, and patterns in your movements.",
    "Voice Patterns": "How you speak, your accent, and potentially what emotions your voice conveys.",
    
    // Layer 4: Your Digital Twin
    "User Profile 1": "Digital twin aggregating your behavioral patterns across all Meta platforms.",
    "User Profile 2": "Secondary profile tracking your activity across the broader web.",
    "User Profile 3": "Identity verification profile confirming who you are across devices.",
    "User Profile 4": "Prediction model anticipating your future actions and interests.",
    "Social Graph": "The map of all human connections - who influences whom, with what effectiveness.",
    
    // Layer 5: How They Use Your Data
    "Influence Mapping": "Identifying who can change other people's minds and behaviors in a network.",
    "Behavior Prediction": "Anticipating what you'll do next before you know it yourself.",
    "Decision Modeling": "Understanding how and why you make choices to better influence them.",
    "Ad Targeting": "Delivering ads at precisely the moment you're most likely to be influenced.",
    "Content Algorithms": "Controlling what appears in your feed to maximize your engagement and time spent.",
    "Identity Verification": "Using your behavior patterns to confirm who you are across devices and platforms."
  };
  
  // Layer definitions with simplified titles and explanatory text
  const layers = [
    {
      id: 1,
      name: "Apps You Use Daily",
      subtitle: "These are the apps you interact with every day. Each one is designed to capture different aspects of your behavior. Data constantly flows from these apps back to Meta's core, creating a multi-dimensional picture of your digital life."
    },
    {
      id: 2,
      name: "Hidden Tracking Tools",
      subtitle: "Beyond the apps you recognize are invisible tools that track you across the internet. This system extends Meta's reach far beyond its branded apps - tracking your activity on millions of websites and other apps you use."
    },
    {
      id: 3, 
      name: "What They Learn About You",
      subtitle: "Every click, scroll, and pause generates data about you. Circle size represents the relative volume of data collected in each category - notice which aspects of your life generate the most valuable data for Meta."
    },
    {
      id: 4,
      name: "Your Digital Twin",
      subtitle: "All your data flows into complex profiles about you. Meta creates multiple user profiles that feed into their Social Graph - the map of human connections that powers their predictive capabilities and represents their most valuable asset."
    },
    {
      id: 5,
      name: "How They Use Your Data",
      subtitle: "The Social Graph enables unprecedented capabilities for predicting and influencing human behavior. These functions represent how Meta transforms your data into actionable intelligence that shapes what you see and influences what you do."
    }
  ];

  useEffect(() => {
    if (!svgRef.current) return;
    
    // Clear any existing SVG content
    d3.select(svgRef.current).selectAll("*").remove();
    
    // Reset selected node when changing layers
    setSelectedNode(null);
    
    const width = 900;
    const height = 700;
    
    // Create SVG
    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto;");
    
    // Add custom fonts
    svg.append("style").text(`
      @import url('https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@400;700&display=swap');
      .node-text { font-family: 'Inter', sans-serif; }
      .highlighted-text { font-family: 'Anton', Impact, sans-serif; letter-spacing: 0.5px; }
      .layer-text { font-family: 'Inter', sans-serif; }
      .title-text { font-family: 'Anton', Impact, sans-serif; }
    `);
    
    // Define data for each layer
    const layerData = {
      // Layer 1: Apps You Use Daily (with Meta at center)
      1: {
        nodes: [
          { id: "Meta", group: 0, radius: 60, label: "META" },
          { id: "Facebook", group: 1, radius: 45, label: "FACEBOOK" },
          { id: "Instagram", group: 1, radius: 45, label: "INSTAGRAM" },
          { id: "WhatsApp", group: 1, radius: 45, label: "WHATSAPP" },
          { id: "Threads", group: 1, radius: 45, label: "THREADS" },
          { id: "Messenger", group: 1, radius: 45, label: "MESSENGER" }
        ],
        links: [
          { source: "Facebook", target: "Meta", value: 8 },
          { source: "Instagram", target: "Meta", value: 8 },
          { source: "WhatsApp", target: "Meta", value: 8 },
          { source: "Threads", target: "Meta", value: 8 },
          { source: "Messenger", target: "Meta", value: 8 }
        ]
      },
      
      // Layer 2: Hidden Tracking Tools
      2: {
        nodes: [
          { id: "Meta", group: 0, radius: 60, label: "META" },
          { id: "Facebook Pixel", group: 2, radius: 40, label: "FACEBOOK PIXEL" },
          { id: "Auth Services", group: 2, radius: 40, label: "AUTH SERVICES" },
          { id: "API Platform", group: 2, radius: 40, label: "API PLATFORM" },
          { id: "SDK Integrations", group: 2, radius: 40, label: "SDK INTEGRATIONS" },
          { id: "Oculus/Quest", group: 7, radius: 40, label: "OCULUS/QUEST" },
          { id: "Portal", group: 7, radius: 40, label: "PORTAL" },
          { id: "Ray-Ban AR", group: 7, radius: 40, label: "RAY-BAN AR" }
        ],
        links: [
          { source: "Facebook Pixel", target: "Meta", value: 6 },
          { source: "Auth Services", target: "Meta", value: 6 },
          { source: "API Platform", target: "Meta", value: 6 },
          { source: "SDK Integrations", target: "Meta", value: 6 },
          { source: "Oculus/Quest", target: "Meta", value: 6 },
          { source: "Portal", target: "Meta", value: 6 },
          { source: "Ray-Ban AR", target: "Meta", value: 6 }
        ]
      },
      
      // Layer 3: What They Learn About You (with varying circle sizes to represent data volume)
      3: {
        nodes: [
          { id: "Browsing Data", group: 3, radius: 55, label: "BROWSING DATA" },
          { id: "Engagement", group: 3, radius: 60, label: "ENGAGEMENT" },
          { id: "Visual Preferences", group: 3, radius: 50, label: "VISUAL PREFERENCES" },
          { id: "Identity Markers", group: 3, radius: 45, label: "IDENTITY MARKERS" },
          { id: "Communications", group: 3, radius: 65, label: "COMMUNICATIONS" },
          { id: "Web Activity", group: 3, radius: 50, label: "WEB ACTIVITY" },
          { id: "App Usage", group: 3, radius: 45, label: "APP USAGE" },
          { id: "Physical Movements", group: 3, radius: 40, label: "PHYSICAL MOVEMENTS" },
          { id: "Home Environment", group: 3, radius: 35, label: "HOME ENVIRONMENT" },
          { id: "Visual Field", group: 3, radius: 35, label: "VISUAL FIELD" },
          { id: "Purchase History", group: 3, radius: 55, label: "PURCHASE HISTORY" },
          { id: "Biometric Data", group: 3, radius: 40, label: "BIOMETRIC DATA" },
          { id: "Location Data", group: 3, radius: 60, label: "LOCATION DATA" },
          { id: "Voice Patterns", group: 3, radius: 35, label: "VOICE PATTERNS" }
        ],
        links: []
      },
      
      // Layer 4: Your Digital Twin (3 rows structure)
      4: {
        nodes: [
          // Row 1: Data types
          { id: "Browsing Data", group: 3, radius: 25, label: "BROWSING DATA", row: 1, x: 150, y: 150 },
          { id: "Engagement", group: 3, radius: 25, label: "ENGAGEMENT", row: 1, x: 250, y: 150 },
          { id: "Visual Preferences", group: 3, radius: 25, label: "VISUAL PREFERENCES", row: 1, x: 350, y: 150 },
          { id: "Identity Markers", group: 3, radius: 25, label: "IDENTITY MARKERS", row: 1, x: 450, y: 150 },
          { id: "Communications", group: 3, radius: 25, label: "COMMUNICATIONS", row: 1, x: 550, y: 150 },
          { id: "Location Data", group: 3, radius: 25, label: "LOCATION DATA", row: 1, x: 650, y: 150 },
          { id: "Purchase History", group: 3, radius: 25, label: "PURCHASE HISTORY", row: 1, x: 750, y: 150 },
          
          // Row 2: User profiles
          { id: "User Profile 1", group: 4, radius: 40, label: "USER PROFILE 1", row: 2, x: 200, y: 300 },
          { id: "User Profile 2", group: 4, radius: 40, label: "USER PROFILE 2", row: 2, x: 350, y: 300 },
          { id: "User Profile 3", group: 4, radius: 40, label: "USER PROFILE 3", row: 2, x: 500, y: 300 },
          { id: "User Profile 4", group: 4, radius: 40, label: "USER PROFILE 4", row: 2, x: 650, y: 300 },
          
          // Row 3: Social Graph
          { id: "Social Graph", group: 4, radius: 70, label: "SOCIAL GRAPH", row: 3, x: 450, y: 500 }
        ],
        links: [
          // Data to profiles
          { source: "Browsing Data", target: "User Profile 1", value: 2 },
          { source: "Engagement", target: "User Profile 1", value: 2 },
          { source: "Visual Preferences", target: "User Profile 1", value: 2 },
          { source: "Web Activity", target: "User Profile 2", value: 2 },
          { source: "Identity Markers", target: "User Profile 3", value: 2 },
          { source: "Communications", target: "User Profile 1", value: 2 },
          { source: "Purchase History", target: "User Profile 4", value: 2 },
          { source: "Location Data", target: "User Profile 2", value: 2 },
          
          // Profiles to Social Graph
          { source: "User Profile 1", target: "Social Graph", value: 4 },
          { source: "User Profile 2", target: "Social Graph", value: 4 },
          { source: "User Profile 3", target: "Social Graph", value: 4 },
          { source: "User Profile 4", target: "Social Graph", value: 4 }
        ]
      },
      
      // Layer 5: How They Use Your Data (connected to Social Graph)
      5: {
        nodes: [
          // Center: Social Graph
          { id: "Social Graph", group: 4, radius: 70, label: "SOCIAL GRAPH", x: 450, y: 350 },
          
          // Surrounding capabilities
          { id: "Influence Mapping", group: 5, radius: 45, label: "INFLUENCE MAPPING", x: 300, y: 200 },
          { id: "Behavior Prediction", group: 5, radius: 45, label: "BEHAVIOR PREDICTION", x: 600, y: 200 },
          { id: "Decision Modeling", group: 5, radius: 45, label: "DECISION MODELING", x: 300, y: 500 },
          { id: "Ad Targeting", group: 5, radius: 45, label: "AD TARGETING", x: 600, y: 500 },
          { id: "Content Algorithms", group: 5, radius: 45, label: "CONTENT ALGORITHMS", x: 450, y: 150 },
          { id: "Identity Verification", group: 5, radius: 45, label: "IDENTITY VERIFICATION", x: 450, y: 550 }
        ],
        links: [
          // All connect to Social Graph
          { source: "Social Graph", target: "Influence Mapping", value: 5 },
          { source: "Social Graph", target: "Behavior Prediction", value: 5 },
          { source: "Social Graph", target: "Decision Modeling", value: 5 },
          { source: "Social Graph", target: "Ad Targeting", value: 5 },
          { source: "Social Graph", target: "Content Algorithms", value: 5 },
          { source: "Social Graph", target: "Identity Verification", value: 5 },
          
          // Interconnections between capabilities
          { source: "Influence Mapping", target: "Behavior Prediction", value: 3 },
          { source: "Behavior Prediction", target: "Content Algorithms", value: 3 },
          { source: "Content Algorithms", target: "Ad Targeting", value: 3 },
          { source: "Decision Modeling", target: "Ad Targeting", value: 3 },
          { source: "Influence Mapping", target: "Decision Modeling", value: 3 },
          { source: "Identity Verification", target: "Ad Targeting", value: 3 }
        ]
      }
    };
    
    // Default color scheme (dark background, light text)
    const defaultNodeColor = "#666769";
    const defaultTextColor = "#f3f5f9";
    
    // Highlighted color scheme
    const highlightNodeColor = "#020301";
    const highlightTextColor = "#ffdb15";
    
    // Get data for current layer
    const currentNodes = layerData[activeLayer].nodes;
    const currentLinks = layerData[activeLayer].links;
    
    // Improved function to wrap text within circles - ensures all text stays within
    function wrapText(text, radius) {
      const words = text.text().split(/\s+/).reverse();
      let word;
      let line = [];
      let lineNumber = 0;
      const lineHeight = 1.1; // ems
      const y = 0;
      const dy = 0;
      let tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
      
      // Calculate max line length - more conservative to ensure text fits
      const maxLength = Math.floor(radius * 1.5);
      
      // Maximum font size based on radius
      const fontSize = Math.max(10, Math.min(14, radius / 4));
      text.attr("font-size", `${fontSize}px`);
      
      while (word = words.pop()) {
        line.push(word);
        tspan.text(line.join(" "));
        if (tspan.node().getComputedTextLength() > maxLength) {
          line.pop();
          tspan.text(line.join(" "));
          line = [word];
          tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
        }
      }
      
      // Center text vertically based on number of lines
      const totalLines = text.selectAll("tspan").size();
      text.selectAll("tspan").attr("dy", function(d, i) {
        return (i - (totalLines - 1) / 2) * lineHeight + "em";
      });
    }
    
    // Create force simulation or use fixed positions
    let simulation;
    
    if (activeLayer === 3) {
      // For Layer 3, use dynamic layout
      simulation = d3.forceSimulation(currentNodes)
        .force("charge", d3.forceManyBody().strength(-300))
        .force("center", d3.forceCenter(width / 2, height / 2))
        .force("collision", d3.forceCollide().radius(d => d.radius * 1.3));
    } else if (activeLayer === 4 || activeLayer === 5) {
      // For organized layers 4 & 5, use fixed positions
      simulation = d3.forceSimulation(currentNodes)
        .force("x", d3.forceX().x(d => d.x).strength(0.9))
        .force("y", d3.forceY().y(d => d.y).strength(0.9))
        .force("collision", d3.forceCollide().radius(d => d.radius * 1.1));
    } else {
      // For dynamic layers 1 & 2, use force layout
      simulation = d3.forceSimulation(currentNodes)
        .force("link", d3.forceLink(currentLinks).id(d => d.id).distance(d => 150))
        .force("charge", d3.forceManyBody().strength(-800))
        .force("center", d3.forceCenter(width / 2, height / 2))
        .force("collide", d3.forceCollide().radius(d => d.radius * 1.5));
    }
    
    // Group for everything
    const g = svg.append("g");
    
    // Create data flow animation for Layer 1
    if (activeLayer === 1) {
      const defs = svg.append("defs");
      
      // Add gradient for data flow animation
      const gradient = defs.append("linearGradient")
        .attr("id", "dataflow-gradient")
        .attr("gradientUnits", "userSpaceOnUse");
      
      gradient.append("stop")
        .attr("offset", "0%")
        .attr("stop-color", "#666769");
        
      gradient.append("stop")
        .attr("offset", "50%")
        .attr("stop-color", "#f3f5f9");
        
      gradient.append("stop")
        .attr("offset", "100%")
        .attr("stop-color", "#666769");
        
      // Add animation
      const animate = defs.append("animate")
        .attr("xlink:href", "#dataflow-gradient")
        .attr("attributeName", "x1")
        .attr("from", "0%")
        .attr("to", "100%")
        .attr("dur", "3s")
        .attr("repeatCount", "indefinite");
    }
    
    // Create links
    const link = g.append("g")
      .attr("stroke", d => activeLayer === 1 ? "url(#dataflow-gradient)" : "#999")
      .attr("stroke-opacity", 0.6)
      .selectAll("line")
      .data(currentLinks)
      .join("line")
      .attr("stroke-width", d => d.value || 3);
      
    // Add arrows for data flow direction in Layer 1
    if (activeLayer === 1 || activeLayer === 2) {
      svg.append("defs").selectAll("marker")
        .data(["end"])
        .join("marker")
        .attr("id", "arrow")
        .attr("viewBox", "0 -5 10 10")
        .attr("refX", 15)
        .attr("refY", 0)
        .attr("markerWidth", 6)
        .attr("markerHeight", 6)
        .attr("orient", "auto")
        .append("path")
        .attr("fill", "#f3f5f9")
        .attr("d", "M0,-5L10,0L0,5");
        
      link.attr("marker-end", "url(#arrow)");
      
      // Add animated dots for data flow
      g.selectAll(".data-pulse")
        .data(currentLinks)
        .join("circle")
        .attr("class", "data-pulse")
        .attr("r", 3)
        .attr("fill", "#f3f5f9")
        .each(function(d) {
          const pulseCircle = d3.select(this);
          
          // Create animation
          function animatePulse() {
            pulseCircle
              .attr("cx", d.source.x)
              .attr("cy", d.source.y)
              .transition()
              .duration(2000)
              .attr("cx", d.target.x)
              .attr("cy", d.target.y)
              .on("end", animatePulse);
          }
          
          // Start animation after positions are calculated
          setTimeout(animatePulse, 100);
        });
    }
    
    // Special highlight for the Social Graph
    if (activeLayer === 4 || activeLayer === 5) {
      g.append("circle")
        .attr("cx", currentNodes.find(n => n.id === "Social Graph").x)
        .attr("cy", currentNodes.find(n => n.id === "Social Graph").y)
        .attr("r", currentNodes.find(n => n.id === "Social Graph").radius + 5)
        .attr("fill", "none")
        .attr("stroke", "#E50914")
        .attr("stroke-width", 2)
        .attr("stroke-dasharray", "5,3");
    }
    
    // Create node groups
    const node = g.append("g")
      .selectAll(".node")
      .data(currentNodes)
      .join("g")
      .attr("class", "node")
      .attr("id", d => `node-${d.id.replace(/\s+/g, '-').toLowerCase()}`)
      .call(drag(simulation))
      .on("click", function(event, d) {
        // Set selected node for info display
        setSelectedNode(selectedNode === d.id ? null : d.id);
        
        // Update visual states
        d3.selectAll(".node circle")
          .transition()
          .duration(300)
          .attr("fill", n => n.id === d.id && selectedNode === d.id ? highlightNodeColor : defaultNodeColor);
          
        d3.selectAll(".node text")
          .transition()
          .duration(300)
          .attr("fill", n => n.id === d.id && selectedNode === d.id ? highlightTextColor : defaultTextColor)
          .attr("class", n => n.id === d.id && selectedNode === d.id ? "highlighted-text" : "node-text");
      });
    
    // Node circles with default background color
    node.append("circle")
      .attr("r", d => d.radius)
      .attr("fill", defaultNodeColor)
      .attr("stroke", "#fff")
      .attr("stroke-width", 1.5);
    
    // Node labels with default text color, smaller, and wrapped
    node.append("text")
      .attr("class", "node-text")
      .attr("text-anchor", "middle")
      .attr("fill", defaultTextColor)
      .text(d => d.label)
      .each(function(d) { wrapText(d3.select(this), d.radius * 0.8); });
    
    // Handle simulation ticks
    simulation.on("tick", () => {
      link
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);
        
      node.attr("transform", d => {
        // Constrain nodes to SVG boundaries
        const x = Math.max(d.radius, Math.min(width - d.radius, d.x));
        const y = Math.max(d.radius, Math.min(height - d.radius, d.y));
        return `translate(${x},${y})`;
      });
      
      // Update data flow animation positions
      d3.selectAll(".data-pulse")
        .each(function(d) {
          const pulse = d3.select(this);
          if (!pulse.attr("cx")) {
            pulse.attr("cx", d.source.x).attr("cy", d.source.y);
          }
        });
    });
    
    // Add title
    svg.append("text")
      .attr("class", "title-text")
      .attr("x", width / 2)
      .attr("y", 40)
      .attr("text-anchor", "middle")
      .attr("font-size", "20px")
      .attr("font-weight", "bold")
      .attr("fill", "#f3f5f9")
      .text("META'S NEURAL SURVEILLANCE SYSTEM");
    
    // Zoom functionality
    const zoom = d3.zoom()
      .scaleExtent([0.5, 3])
      .on("zoom", (event) => {
        g.attr("transform", event.transform);
      });
      
    svg.call(zoom);
    
    // Drag functions
    function drag(simulation) {
      function dragstarted(event) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        event.subject.fx = event.subject.x;
        event.subject.fy = event.subject.y;
      }
      
      function dragged(event) {
        event.subject.fx = event.x;
        event.subject.fy = event.y;
      }
      
      function dragended(event) {
        if (!event.active) simulation.alphaTarget(0);
        event.subject.fx = null;
        event.subject.fy = null;
      }
      
      return d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended);
    }
    
    // Set background
    svg.style("background-color", "#222");
    
    // Run simulation
    simulation.alpha(1).restart();
    
  }, [activeLayer, selectedNode]); // Re-render when active layer or selected node changes
  
  return (
    <div className="bg-gray-900 p-4 rounded-lg shadow-lg">
      <div className="flex mb-4">
        <div className="w-64 bg-gray-800 p-4 rounded-l-lg">
          <h3 className="text-xl font-bold text-white mb-4">META'S NEURAL MESH</h3>
          {layers.map(layer => (
            <div 
              key={layer.id}
              className={`p-3 mb-3 rounded cursor-pointer transition-all ${activeLayer === layer.id ? 'bg-gray-700 border-l-4 border-yellow-400' : 'hover:bg-gray-700'}`}
              onClick={() => setActiveLayer(layer.id)}
            >
              <span className="text-white font-medium">{layer.name}</span>
            </div>
          ))}
          <div className="mt-8 text-xs text-gray-400">
            <p className="mb-1">• Click circles to see details</p>
            <p className="mb-1">• Drag to reposition</p>
            <p>• Scroll to zoom</p>
          </div>
        </div>
        <div className="flex-1 relative bg-gray-800 rounded-r-lg">
          <svg ref={svgRef} width="100%" height="700px" style={{ backgroundColor: "#222" }}></svg>
          
          {/* Node information display */}
          {selectedNode && (
            <div className="absolute bottom-4 left-4 right-4 bg-gray-900 p-3 rounded-lg border border-gray-700 shadow-lg">
              <h3 className="text-yellow-400 font-bold mb-1">{selectedNode}</h3>
              <p className="text-white text-sm">{nodeInfo[selectedNode]}</p>
            </div>
          )}
        </div>
      </div>
      <div className="text-sm text-gray-300 bg-gray-800 p-4 rounded-lg">
        <p>{layers.find(l => l.id === activeLayer).subtitle}</p>
      </div>
    </div>
  );
};

export default MetaLayeredSurveillance;
