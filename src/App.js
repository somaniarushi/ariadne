import logo from './logo.svg';
import './App.css';
import Graph from "react-graph-vis";
import data from './data.json';
import { useState } from 'react';

const initialGraph = data

initialGraph.edges.forEach((edge) => {
  if (edge.from === 2) {
    let to = edge.to;
    initialGraph.nodes.forEach((node) => {
      if (node.id === to) {
        let date = new Date(node.last_met);
        if (date !== null) {
          let now = new Date();
          let diff = now.getTime() - date.getTime();
          let days = Math.floor(diff / (1000 * 60 * 60 * 24));
          console.log(node.title + " " + diff + " " + days);
          if (days <= 0) {
            edge.color = "rgb(0, 11, 58)";
          }
          else if (days <= 7) {
            edge.color = "rgb(0, 11, 150)";
          }
          else {
            edge.color = "rgb(0, 49, 255)";
          }
        }
      }
    });
  }
});

function App() {

  const [graph, setGraph] = useState(initialGraph);
  const [formData, setFormData] = useState({});

  const options = {
    height: "500px",
    edges: {
      color: "#bebcbc",
      arrows: {
        to: {
          enabled: false
        }
      },
      width: 1.3,
    },
    nodes: {
      shape: "box",
    },
    manipulation: {
      enabled: true,
      initiallyActive: true,
      addNode: function (data, callback) {
        data.label = formData.label;
        data.group = formData.group;
        callback(data);
      },
      addEdge: true,
    }
  }

  const events = {
    select: function (event) {
      var { nodes, edges } = event;
    }
  };
  return (
    <div className="App">
      <Graph
        graph={graph}
        options={options}
        events={events}
        getNetwork={network => {
          network.addNodeMode();
        }}
      />

      <form
      onChange={(e) => {
        e.preventDefault();

        let id = graph.nodes.length + 1;
        let label = e.target[0].value;
        let title = e.target[0].value;
        let group = e.target[1].value;
        let notes = e.target[2].value;

        setFormData({
          id: id,
          label: label,
          group: group,
          title: title,
          notes: [notes],
          last_met: JSON.stringify(new Date()),
          date_created: JSON.stringify(new Date())
        });

      }}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <label>
          Name: <input type="text" />
        </label>
        <label>
          Primary Relationship <input type="text" />
        </label>
        <label>
          Notes: <input type="text" />
        </label>
      </div>
    </form>
    </div >

  );
}

export default App;
