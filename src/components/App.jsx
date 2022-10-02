import React, { useState } from 'react';
import Statistics from './Statistics';
import FeedbackOptions from './FeedbackOptions';
import Section from './Section';

export const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const onLeaveFeedback = event => {
    const vote = event.currentTarget.name;

    if (vote === 'good') {
      return setGood(prev => prev + 1);
    }

    if (vote === 'neutral') {
      return setNeutral(prev => prev + 1);
    }

    if (vote === 'bad') {
      return setBad(prev => prev + 1);
    }
  };

  const countTotalFeedback = () => {
    return bad + neutral + good;
  };

  const countPositiveFeedbackPercentage = () => {
    let startPositivePercentage = 0;
    const finalPositivePercentage = Math.round(
      (good / (bad + neutral + good)) * 100
    );
    if (finalPositivePercentage > 0) {
      startPositivePercentage = finalPositivePercentage;
    }
    return startPositivePercentage;
  };

  const isFeedback = good || bad || neutral;

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 20,
        color: '#010101',
      }}
    >
      <div>
        <Section title="Please leave feedback">
          <FeedbackOptions
            options={Object.keys({ good, neutral, bad })}
            onLeaveFeedback={onLeaveFeedback}
          />
        </Section>

        <Section title="Statistics">
          {isFeedback ? (
            <Statistics
              good={good}
              neutral={neutral}
              bad={bad}
              total={countTotalFeedback()}
              positivePercentage={countPositiveFeedbackPercentage()}
            />
          ) : (
            'No feedback given'
          )}
        </Section>
      </div>
    </div>
  );
};
