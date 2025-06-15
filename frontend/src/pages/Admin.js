import React, { useState, useEffect } from 'react';
import api from '../services/api';              // ✅ use shared Axios instance

function Admin() {
  const [lessons, setLessons] = useState([]);

  // lesson form
  const [title,   setTitle]   = useState('');
  const [content, setContent] = useState('');

  // problem form
  const [problemTitle,      setProblemTitle]   = useState('');
  const [problemDesc,       setProblemDesc]    = useState('');
  const [starterCode,       setStarterCode]    = useState('');
  const [expectedOutputs,   setExpectedOutputs]= useState('');

  /* -------------------------------------------------- */
  /* fetch all lessons on first render                   */
  /* -------------------------------------------------- */
  useEffect(() => {
    api.get('/lessons').then(res => setLessons(res.data));
  }, []);

  /* -------------------------------------------------- */
  /* create lesson                                       */
  /* -------------------------------------------------- */
  const addLesson = () => {
    if (!title.trim()) return alert('Enter a lesson title!');
    api.post('/lessons', { title, content })
       .then(res => {
         setLessons([...lessons, res.data]);
         setTitle(''); setContent('');
       });
  };

  /* -------------------------------------------------- */
  /* create practice problem for a lesson                */
  /* -------------------------------------------------- */
  const addProblem = (lessonId) => {
    if (!problemTitle.trim()) return alert('Enter a problem title!');
    const outputsArr = expectedOutputs
       .split('\n')
       .map(o => o.trim())
       .filter(Boolean);

    api.post('/problems', {
      title: problemTitle,
      description: problemDesc,
      starterCode,
      lesson: { id: lessonId },
      outputs: outputsArr.map(o => ({ output: o }))
    }).then(() => {
      alert('Problem added');
      setProblemTitle('');
      setProblemDesc('');
      setStarterCode('');
      setExpectedOutputs('');
    });
  };

  /* -------------------------------------------------- */
  /* render                                              */
  /* -------------------------------------------------- */
  return (
    <div>
      <h2>Admin Panel</h2>

      {/* ---------- add new lesson ---------- */}
      <div className="card p-3 my-3">
        <h5>Add New Concept / Lesson</h5>
        <input
          className="form-control mb-2"
          placeholder="Lesson Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <textarea
          className="form-control mb-2"
          placeholder="Content (HTML allowed)"
          rows={4}
          value={content}
          onChange={e => setContent(e.target.value)}
        />
        <button className="btn btn-primary" onClick={addLesson}>
          Save Lesson
        </button>
      </div>

      <hr />

      {/* ---------- existing lessons ---------- */}
      <h4>Existing Lessons</h4>
      {lessons.map(l => (
        <div key={l.id} className="border p-3 mb-3">
          <h5>{l.title}</h5>

          {/* collapse toggle */}
          <button
            className="btn btn-sm btn-outline-secondary"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target={`#addProb${l.id}`}
          >
            Add Practice Problem
          </button>

          {/* collapse body */}
          <div className="collapse mt-2" id={`addProb${l.id}`}>
            <input
              className="form-control mb-2"
              placeholder="Problem Title"
              value={problemTitle}
              onChange={e => setProblemTitle(e.target.value)}
            />
            <textarea
              className="form-control mb-2"
              placeholder="Problem Description"
              rows={3}
              value={problemDesc}
              onChange={e => setProblemDesc(e.target.value)}
            />
            <textarea
              className="form-control mb-2"
              placeholder="Starter Code"
              rows={3}
              value={starterCode}
              onChange={e => setStarterCode(e.target.value)}
            />
            <textarea
              className="form-control mb-2"
              placeholder="Expected Outputs (one per line)"
              rows={2}
              value={expectedOutputs}
              onChange={e => setExpectedOutputs(e.target.value)}
            />
            <button
              className="btn btn-success"
              onClick={() => addProblem(l.id)}
            >
              Save Problem
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Admin;
