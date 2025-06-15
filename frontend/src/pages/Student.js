import React, { useState } from "react";
import axios from "axios";

export default function Student() {
  const [code, setCode] = useState(`public class Main {
    public static void main(String[] args) {
        System.out.println("Hello World!");
    }
}`);
  const [expectedOutput, setExpectedOutput] = useState("Hello World!");
  const [result, setResult] = useState(null);          // ⬅ NEW: can be string *or* object

  /* ---------------- helpers ---------------- */
  const runCode = async () => {
    try {
      const { data } = await axios.post("http://localhost:8080/api/code/run", {
        code,
        language: "java",
      });
      setResult(data.output || "No output");
    } catch (err) {
      setResult("Run error: " + (err.response?.data?.output || err.message));
    }
  };

  const submitCode = async () => {
    try {
      const { data } = await axios.post("http://localhost:8080/api/code/submit", {
        code,
        language: "java",
        expected: expectedOutput,
      });
      setResult(data);              // {correct, actual, expected}
    } catch (err) {
      setResult("Submit error: " + err.message);
    }
  };

  /* ---------------- view helpers ---------------- */
  const renderResult = () => {
    if (result == null) return null;

    // plain string (run)  ➜ show as‑is
    if (typeof result === "string") {
      return <pre>{result}</pre>;
    }

    // object (submit)  ➜ nice formatting
    return (
      <pre>
{result.correct
  ? `✅ Correct!\n\nExpected & Actual → ${result.expected}`
  : `❌ Incorrect.\n\nExpected → ${result.expected}\nYour output → ${result.actual}`
}
      </pre>
    );
  };

  /* ---------------- UI ---------------- */
  return (
    <div style={{ padding: 20, maxWidth: 1000, margin: "auto" }}>
      <h2>🧑‍🎓 Practice Java Code</h2>

      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        style={{
          width: "100%", height: "60vh", fontFamily: "monospace",
          fontSize: 16, padding: 10, border: "1px solid #ccc", borderRadius: 8,
          resize: "vertical", overflow: "auto",
        }}
      />

      <div style={{ marginTop: 20 }}>
        <label>Expected Output:</label>
        <input
          type="text"
          value={expectedOutput}
          onChange={(e) => setExpectedOutput(e.target.value)}
          style={{
            width: "100%", padding: 10, fontSize: 16, marginTop: 8,
            border: "1px solid #ccc", borderRadius: 6,
          }}
        />
      </div>

      <div style={{ marginTop: 20, display: "flex", gap: 10 }}>
        <button onClick={runCode}    style={btn}>▶ Run</button>
        <button onClick={submitCode} style={btn}>✅ Submit</button>
      </div>

      <div style={{ marginTop: 20, background: "#f4f4f4", padding: 15, borderRadius: 8 }}>
        <h3>🖨 Output:</h3>
        {renderResult()}
      </div>
    </div>
  );
}

const btn = {
  padding: "10px 20px",
  fontSize: 16,
  cursor: "pointer",
  background: "#007bff",
  color: "#fff",
  border: "none",
  borderRadius: 6,
};
