import { useRef, useState } from "react";

const HomePage = () => {
  const [feedbackItems, setFeedbackItems] = useState([]);
  const emailInputRef = useRef();
  const feedbackInputRef = useRef();

  function submitFormHandler(event) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredFeedback = feedbackInputRef.current.value;

    fetch("/api/feedback", {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        text: enteredFeedback,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json()) // { email: 'ee@ee.com', text: 'Some feedback text' }
      .then((data) => console.log(data));
  }

  function loadFeedbackHandler() {
    fetch("/api/feedback")
      .then((response) => response.json()) // { email: 'ee@ee.com', text: 'Some feedback text' }
      .then(({ feedback }) => setFeedbackItems(feedback));
  }

  return (
    <div>
      <h1>Hello World!</h1>
      <form onSubmit={submitFormHandler}>
        <div>
          <label htmlFor="email">Your Email address</label>
          <input type="email" id="email" ref={emailInputRef} />
        </div>
        <div>
          <label htmlFor="feedback">Your Feedback</label>
          <textarea id="feedback" rows="5" ref={feedbackInputRef} />
        </div>
        <button>Send Feedback</button>
      </form>
      <hr />
      <button onClick={loadFeedbackHandler}>Load Feedback</button>
      <ul>
        {feedbackItems.map((feedback) => (
          <li key={feedback.id}>{feedback.text}</li>
        ))}
      </ul>
    </div>
  );
};
export default HomePage;
